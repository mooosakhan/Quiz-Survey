# Backend Setup Guide

Quick start for setting up and deploying the backend to Vercel.

---

## Local Development

### Install Dependencies
```bash
npm install
```

### Create `.env` File

Copy or create `.env` in backend directory:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

Get your MongoDB connection string from [MongoDB Atlas](https://cloud.mongodb.com)

### Start Development Server
```bash
npm run dev
```

Server runs on `http://localhost:5000`

Check health: `http://localhost:5000/api/health`

---

## Environment Variables

### Development (`.env` in this directory)
```
MONGODB_URI=mongodb://localhost:27017/survey-db
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Production (Set in Vercel)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/database
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://your-frontend.vercel.app
```

---

## Deploying to Vercel

### Step 1: Push to Git
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Create Vercel Project
1. Go to [vercel.com/new](https://vercel.com/new)
2. Select your repository
3. **Root Directory**: Leave blank (if backend-only) or set to `backend`
4. Click **"Deploy"**

### Step 3: Set Environment Variables
1. After deployment, go to **Settings** → **Environment Variables**
2. Add:
   - `MONGODB_URI` = Your MongoDB connection string
   - `NODE_ENV` = `production`
   - `PORT` = `3001`
   - `CORS_ORIGIN` = `https://your-frontend.vercel.app` (set after frontend deployed)
3. Click **"Save"**
4. Redeploy

### Step 4: Test Health Endpoint
```
GET https://your-backend.vercel.app/api/health
```

Should return 200 with success message.

---

## Tech Stack

- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Validation**: express-validator
- **CORS**: cors
- **Environment**: dotenv
- **Runtime**: Node.js 18.x

---

## Available Scripts

```bash
npm start       # Start production server
npm run dev     # Start with nodemon (auto-reload)
npm run build   # No-op for Vercel (just npm install)
```

---

## MongoDB Setup

### Option 1: MongoDB Atlas (Cloud - Recommended)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create account and cluster
3. Get connection string
4. Add to `.env` as `MONGODB_URI`
5. In MongoDB Atlas, add Vercel IP to whitelist (or allow all: 0.0.0.0/0)

### Option 2: Local MongoDB
```bash
# Linux
sudo systemctl start mongodb

# Store connection string
MONGODB_URI=mongodb://localhost:27017/survey-db
```

---

## API Endpoints

### Health Check
```
GET /api/health
```

Returns server status.

### POST /api/users/submit
Save user survey responses

**Request:**
```json
{
  "name": "John Doe",
  "designation": "UXUI Designer",
  "responses": {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 0,
    "4": 1
  },
  "ratings": {
    "onboarding1": 8,
    "onboarding2": 7,
    "modern": 9,
    "gamified1": 6,
    "professional1": 8,
    "professional2": 7,
    "clean": 9,
    "gamified2": 8,
    "gamified3": 7
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "User data saved successfully",
  "userId": "507f1f77bcf86cd799439011",
  "user": { ... }
}
```

### GET /api/users/all
Get all users (admin)

### GET /api/users/:id
Get specific user by ID

### GET /api/users/stats/overview
Get statistics overview

---

## Database Schema

User collection includes:
- name (String)
- designation (String)
- responses (Map of question index to selected option)
- ratings (Object with design ratings)
- metadata (userAgent, ipAddress, submittedAt)
- timestamps (createdAt, updatedAt)

---

## Troubleshooting

**Server won't start?**
- Check Node version: `node --version` (need 18.x+)
- Check `.env` file exists
- Run `npm install` again

**MongoDB connection error?**
- Verify connection string format
- Check MongoDB is running (if local)
- Verify IP whitelist in MongoDB Atlas (if cloud)
- Test connection string locally first

**CORS errors?**
- Update `CORS_ORIGIN` in `.env`
- Must match frontend URL exactly
- Redeploy after changing

**Port already in use?**
- Change `PORT` in `.env`
- Or kill existing process: `lsof -i :5000`

---

For full deployment guide, see [../DEPLOYMENT.md](../DEPLOYMENT.md)
