import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';

const router = express.Router();

// Logger utility
const logger = {
  log: (level, message, data = {}) => {
    const timestamp = new Date().toISOString();
    const errorId = `[${timestamp}] [${level}]`;
    console.log(errorId, message, JSON.stringify(data, null, 2));
    return errorId;
  },
  info: (message, data) => logger.log('INFO', message, data),
  warn: (message, data) => logger.log('WARN', message, data),
  error: (message, data) => logger.log('ERROR', message, data),
};

// ========== RETRY UTILITY FOR PRODUCTION RELIABILITY ==========
/**
 * Wraps database operations with retry logic for timeout issues
 * Uses exponential backoff to handle transient failures
 */
async function withRetry(operation, operationId, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      logger.info(`[${operationId}] Attempt ${attempt}/${maxRetries}`);
      return await operation();
    } catch (error) {
      lastError = error;
      
      // Identify retryable errors
      const isTimeout = error.message.includes('timed out') || 
                       error.message.includes('buffering') ||
                       error.code === 'ETIMEDOUT';
      const isConnRefused = error.message.includes('ECONNREFUSED') ||
                           error.code === 'ECONNREFUSED';
      const isRetryable = isTimeout || isConnRefused;
      
      logger.warn(`[${operationId}] Attempt ${attempt} failed`, {
        errorType: error.name,
        errorMessage: error.message,
        isTimeout,
        isConnRefused,
        isRetryable,
        willRetry: isRetryable && attempt < maxRetries
      });
      
      // Don't retry if not a timeout/connection error, or if last attempt
      if (!isRetryable || attempt === maxRetries) {
        throw error;
      }
      
      // Exponential backoff: 500ms, 1000ms, 1500ms
      const delayMs = attempt * 500;
      logger.info(`[${operationId}] Waiting ${delayMs}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  throw lastError;
}

// Validation middleware
const validateUserSubmission = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('designation').trim().notEmpty().withMessage('Designation is required'),
  body('responses').isObject().withMessage('Responses must be an object'),
  body('ratings').isObject().withMessage('Ratings must be an object')
];

// POST - Create new user with survey responses
router.post('/submit', validateUserSubmission, async (req, res) => {
  const operationId = `OP-${Date.now()}`;
  
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorId = `ERR-${Date.now()}`;
      logger.warn(`[${operationId}] Validation failed for /submit`, {
        errorId,
        errors: errors.array().map(e => ({
          field: e.param,
          message: e.msg,
          value: e.value
        }))
      });
      
      return res.status(400).json({
        success: false,
        error: {
          id: errorId,
          type: 'ValidationError',
          code: 'INVALID_INPUT',
          message: 'Validation failed',
          details: errors.array().map(e => ({
            field: e.param,
            message: e.msg
          })),
          timestamp: new Date().toISOString()
        }
      });
    }

    const { name, designation, responses, ratings } = req.body;

    logger.info(`[${operationId}] Attempting to save user`, {
      name,
      designation,
      responseCount: Object.keys(responses).length,
      ratingCount: Object.keys(ratings).length
    });

    // Use retry wrapper for save operation (3 attempts with exponential backoff)
    const savedUser = await withRetry(async () => {
      const newUser = new User({
        name,
        designation,
        responses: new Map(Object.entries(responses)),
        ratings,
        metadata: {
          userAgent: req.get('user-agent'),
          ipAddress: req.ip,
          operationId
        }
      });

      return await newUser.save();
    }, operationId, 3);

    logger.info(`[${operationId}] ✅ User saved successfully`, {
      userId: savedUser._id,
      createdAt: savedUser.createdAt
    });

    res.status(201).json({
      success: true,
      message: 'User data saved successfully',
      userId: savedUser._id,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const errorId = `ERR-${Date.now()}`;
    const isTimeout = error.message.includes('timed out') || 
                     error.message.includes('buffering');
    
    logger.error(`[${operationId}] Failed to save user after retries`, {
      errorId,
      errorType: error.name,
      errorMessage: error.message,
      errorCode: error.code,
      isTimeout,
      attemptsExhausted: true,
      stack: error.stack,
      body: req.body
    });
    
    // Check for specific MongoDB errors
    let statusCode = 500;
    let errorType = 'InternalServerError';
    let errorCode = 'SAVE_FAILED';
    let message = 'Error saving user data';

    if (isTimeout) {
      statusCode = 503;
      errorType = 'ServiceUnavailable';
      errorCode = 'TIMEOUT_ERROR';
      message = 'Database operation timed out after 3 retry attempts. Please try again.';
    } else if (error.code === 11000) {
      statusCode = 409;
      errorType = 'DuplicateKeyError';
      errorCode = 'DUPLICATE_ENTRY';
      message = 'User with this information already exists';
    } else if (error.name === 'ValidationError') {
      statusCode = 400;
      errorType = 'ValidationError';
      errorCode = 'VALIDATION_FAILED';
      message = 'Invalid user data';
    } else if (error.name === 'MongooseError' || error.name === 'MongoError') {
      statusCode = 500;
      errorType = 'DatabaseError';
      errorCode = 'DB_ERROR';
      message = 'Database error occurred';
    }

    res.status(statusCode).json({
      success: false,
      error: {
        id: errorId,
        type: errorType,
        code: errorCode,
        message,
        timestamp: new Date().toISOString(),
        ...(isTimeout && { retryable: true, hint: 'This error is temporary. You can retry the operation.' })
      }
    });
  }
});

// GET - Retrieve all users (for admin purposes)
router.get('/all', async (req, res) => {
  const operationId = `OP-${Date.now()}`;
  
  try {
    logger.info(`[${operationId}] Fetching all users`);

    const users = await withRetry(async () => {
      return await User.find().sort({ createdAt: -1 });
    }, operationId, 2);

    logger.info(`[${operationId}] ✅ Retrieved ${users.length} users`);

    res.json({
      success: true,
      count: users.length,
      users,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const errorId = `ERR-${Date.now()}`;
    const isTimeout = error.message.includes('timed out') || 
                     error.message.includes('buffering');
    
    logger.error(`[${operationId}] Failed to retrieve users after retries`, {
      errorId,
      errorType: error.name,
      errorMessage: error.message,
      isTimeout,
      stack: error.stack
    });

    res.status(isTimeout ? 503 : 500).json({
      success: false,
      error: {
        id: errorId,
        type: isTimeout ? 'ServiceUnavailable' : 'DatabaseError',
        code: isTimeout ? 'TIMEOUT_ERROR' : 'FETCH_FAILED',
        message: isTimeout ? 'Database operation timed out. Please try again.' : 'Error retrieving users',
        timestamp: new Date().toISOString(),
        ...(isTimeout && { retryable: true })
      }
    });
  }
});
  


// GET - Retrieve single user by ID
router.get('/:id', async (req, res) => {
  const operationId = `OP-${Date.now()}`;
  const userId = req.params.id;
  
  try {
    logger.info(`[${operationId}] Fetching user by ID`, { userId });

    // Validate MongoDB ObjectId format
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      const errorId = `ERR-${Date.now()}`;
      logger.warn(`[${operationId}] Invalid user ID format`, { userId, errorId });
      
      return res.status(400).json({
        success: false,
        error: {
          id: errorId,
          type: 'ValidationError',
          code: 'INVALID_ID_FORMAT',
          message: 'Invalid user ID format',
          timestamp: new Date().toISOString()
        }
      });
    }

    const user = await withRetry(async () => {
      return await User.findById(userId);
    }, operationId, 2);

    if (!user) {
      const errorId = `ERR-${Date.now()}`;
      logger.warn(`[${operationId}] User not found`, { userId, errorId });
      
      return res.status(404).json({
        success: false,
        error: {
          id: errorId,
          type: 'NotFound',
          code: 'USER_NOT_FOUND',
          message: `User with ID ${userId} not found`,
          timestamp: new Date().toISOString()
        }
      });
    }

    logger.info(`[${operationId}] ✅ User found`, { userId, name: user.name });

    res.json({
      success: true,
      user,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const errorId = `ERR-${Date.now()}`;
    const isTimeout = error.message.includes('timed out') || 
                     error.message.includes('buffering');
    
    logger.error(`[${operationId}] Failed to retrieve user after retries`, {
      errorId,
      userId,
      errorType: error.name,
      errorMessage: error.message,
      isTimeout,
      stack: error.stack
    });

    res.status(isTimeout ? 503 : 500).json({
      success: false,
      error: {
        id: errorId,
        type: isTimeout ? 'ServiceUnavailable' : 'DatabaseError',
        code: isTimeout ? 'TIMEOUT_ERROR' : 'FETCH_FAILED',
        message: isTimeout ? 'Database operation timed out. Please try again.' : 'Error retrieving user',
        timestamp: new Date().toISOString(),
        ...(isTimeout && { retryable: true })
      }
    });
  }
});

// GET - Get statistics
router.get('/stats/overview', async (req, res) => {
  const operationId = `OP-${Date.now()}`;
  
  try {
    logger.info(`[${operationId}] Calculating statistics`);

    const result = await withRetry(async () => {
      const totalUsers = await User.countDocuments();
      const avgRating = await User.aggregate([
        {
          $group: {
            _id: null,
            avgOnboarding1: { $avg: '$ratings.onboarding1' },
            avgOnboarding2: { $avg: '$ratings.onboarding2' },
            avgModern: { $avg: '$ratings.modern' },
            avgGamified1: { $avg: '$ratings.gamified1' }
          }
        }
      ]);
      
      return { totalUsers, avgRating };
    }, operationId, 2);

    logger.info(`[${operationId}] ✅ Statistics calculated`, {
      totalUsers: result.totalUsers,
      averageRatings: result.avgRating[0] || {}
    });

    res.json({
      success: true,
      stats: {
        totalUsers: result.totalUsers,
        averageRatings: result.avgRating[0] || {}
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const errorId = `ERR-${Date.now()}`;
    const isTimeout = error.message.includes('timed out') || 
                     error.message.includes('buffering');
    
    logger.error(`[${operationId}] Failed to calculate statistics after retries`, {
      errorId,
      errorType: error.name,
      errorMessage: error.message,
      isTimeout,
      stack: error.stack
    });

    res.status(isTimeout ? 503 : 500).json({
      success: false,
      error: {
        id: errorId,
        type: isTimeout ? 'ServiceUnavailable' : 'DatabaseError',
        code: isTimeout ? 'TIMEOUT_ERROR' : 'STATS_FAILED',
        message: isTimeout ? 'Database operation timed out. Please try again.' : 'Error calculating statistics',
        timestamp: new Date().toISOString(),
        ...(isTimeout && { retryable: true })
      }
    });
      }
    });


export default router;
