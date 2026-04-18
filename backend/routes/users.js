import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';

const router = express.Router();

// Validation middleware
const validateUserSubmission = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('designation').trim().notEmpty().withMessage('Designation is required'),
  body('responses').isObject().withMessage('Responses must be an object'),
  body('ratings').isObject().withMessage('Ratings must be an object')
];

// POST - Create new user with survey responses
router.post('/submit', validateUserSubmission, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, designation, responses, ratings } = req.body;

    const newUser = new User({
      name,
      designation,
      responses: new Map(Object.entries(responses)),
      ratings,
      metadata: {
        userAgent: req.get('user-agent'),
        ipAddress: req.ip
      }
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User data saved successfully',
      userId: savedUser._id,
      user: savedUser
    });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving user data',
      error: error.message
    });
  }
});

// GET - Retrieve all users (for admin purposes)
router.get('/all', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving users',
      error: error.message
    });
  }
});

// GET - Retrieve single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving user',
      error: error.message
    });
  }
});

// GET - Get statistics
router.get('/stats/overview', async (req, res) => {
  try {
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

    res.json({
      success: true,
      stats: {
        totalUsers,
        averageRatings: avgRating[0] || {}
      }
    });
  } catch (error) {
    console.error('Error getting statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting statistics',
      error: error.message
    });
  }
});

export default router;
