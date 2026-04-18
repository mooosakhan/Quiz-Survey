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

// Middleware
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const mongooseOptions = {
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 2,
  retryWrites: true,
  w: 'majority'
};

mongoose.connect(MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log('Database:', new URL(MONGODB_URI).pathname.substring(1));
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('MongoDB URI:', MONGODB_URI.replace(/:[^:/@]+@/, ':***@')); // Hide password
    // Don't exit on connection error for Vercel - allow requests to fail gracefully
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
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`MongoDB URI: ${MONGODB_URI}`);
  console.log(`CORS Origin: ${CORS_ORIGIN}`);
});

export default app;
