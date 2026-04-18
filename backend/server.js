import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/survey-app';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// ========== LOGGING UTILITY ==========
const logger = {
  log: (level, message, data = {}) => {
    const timestamp = new Date().toISOString();
    const errorId = `ERR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    console.log(`[${timestamp}] [${level}] [${errorId}]`, message, data);
    return errorId;
  },
  info: (message, data) => logger.log('INFO', message, data),
  warn: (message, data) => logger.log('WARN', message, data),
  error: (message, data) => logger.log('ERROR', message, data),
};

// Middleware
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== REQUEST LOGGING MIDDLEWARE ==========
app.use((req, res, next) => {
  const start = Date.now();
  const requestId = `REQ-${Date.now()}`;
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const statusType = status >= 400 ? '❌' : '✅';
    console.log(`${statusType} [${requestId}] ${req.method} ${req.path} - ${status} - ${duration}ms`);
  });
  
  next();
});

// Database connection - Optimized for Production
const mongooseOptions = {
  // Connection timeouts - increased for prod reliability
  connectTimeoutMS: 30000,        // increased from 10s to 30s (initial connection)
  socketTimeoutMS: 60000,         // increased from 45s to 60s (socket operations)
  serverSelectionTimeoutMS: 30000, // time to select a server before timing out
  waitQueueTimeoutMS: 30000,      // prevent operation buffering timeout
  
  // Connection pooling
  maxPoolSize: 20,                // increased for higher concurrency
  minPoolSize: 5,                 // maintain 5 connections minimum
  
  // Retry and reliability
  retryWrites: true,
  retryReads: true,
  w: 'majority',
  
  // Additional production settings
  family: 4                       // use IPv4
};

mongoose.connect(MONGODB_URI, mongooseOptions)
  .then(() => {
    logger.info('✅ MongoDB connected successfully', {
      database: new URL(MONGODB_URI).pathname.substring(1)
    });
  })
  .catch((error) => {
    const errorId = logger.error('❌ MongoDB connection error', {
      errorType: error.name,
      errorMessage: error.message,
      errorCode: error.code,
      mongodbUri: MONGODB_URI.replace(/:[^:/@]+@/, ':***@'), // Hide password
      details: error.toString()
    });
    console.error(`Failed to connect to MongoDB [${errorId}]`);
  });

// Routes
app.use('/api/users', userRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Survey API Server',
    version: '1.0.0',
    endpoints: {
      root: 'GET /',
      health: 'GET /api/health',
      submit: 'POST /api/users/submit',
      getAll: 'GET /api/users/all',
      getById: 'GET /api/users/:id',
      stats: 'GET /api/users/stats/overview'
    },
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,  
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Database status endpoint
app.get('/api/status', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({
    success: true,
    server: 'running',
    database: states[dbState] || 'unknown',
    databaseState: dbState,
    mongodb_uri: MONGODB_URI ? '✓ configured' : '✗ not configured',
    cors_origin: CORS_ORIGIN || 'not set',
    node_env: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const errorId = `ERR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const timestamp = new Date().toISOString();
  
  // Log full error details
  console.error(`[${timestamp}] [${errorId}] ERROR CAUGHT:`, {
    errorType: err.name || 'UnknownError',
    message: err.message,
    statusCode: err.status || 500,
    path: req.path,
    method: req.method,
    stack: err.stack,
    body: req.body,
  });
  
  const statusCode = err.status || err.statusCode || 500;
  
  res.status(statusCode).json({
    success: false,
    error: {
      id: errorId,
      type: err.name || 'InternalServerError',
      message: err.message || 'An unexpected error occurred',
      code: err.code || 'INTERNAL_ERROR',
      timestamp,
      ...(process.env.NODE_ENV === 'development' && {
        stack: err.stack,
        details: err.details
      })
    }
  });
});

// 404 handler
app.use((req, res) => {
  const errorId = `ERR-${Date.now()}`;
  const timestamp = new Date().toISOString();
  
  console.warn(`[${timestamp}] [${errorId}] 404 Not Found: ${req.method} ${req.path}`);
  
  res.status(404).json({
    success: false,
    error: {
      id: errorId,
      type: 'NotFound',
      message: `Route not found: ${req.method} ${req.path}`,
      code: 'ROUTE_NOT_FOUND',
      timestamp,
      availableEndpoints: [
        'GET /',
        'GET /api/health',
        'POST /api/users/submit',
        'GET /api/users/all',
        'GET /api/users/:id',
        'GET /api/users/stats/overview'
      ]
    }
  });
});

// Start server
app.listen(PORT, () => {
  logger.info('🚀 Server starting up', {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    corsOrigin: CORS_ORIGIN
  });
  console.log(`Server running on http://localhost:${PORT}`);
});

export { app, logger };
export default app;
