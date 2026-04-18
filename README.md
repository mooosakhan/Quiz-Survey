# Survey App - Frontend & Backend (Separate Projects)

This directory contains two completely independent projects:

## 📁 Projects

### 1. [Frontend](./frontend/) - React + Vite
- **Type**: React + Vite (single-page application)
- **Deploy to**: Vercel
- **Port**: 3000 (production) / 5173 (development)
- **Setup**: `cd frontend && npm install && npm run dev`

### 2. [Backend](./backend/) - Node.js + Express
- **Type**: Express REST API
- **Deploy to**: Vercel
- **Port**: 3000 (Vercel) / 5000 (development)
- **Setup**: `cd backend && npm install && npm run dev`

---

## 🚀 Deployment Overview

Both projects are **completely independent** and should be deployed as separate Vercel projects:

| Project | Repository | Vercel URL | Root Dir |
|---------|-----------|-----------|----------|
| Frontend | Your repo | `https://frontend-name.vercel.app` | `frontend/` |
| Backend | Your repo | `https://backend-name.vercel.app` | `backend/` |

---

## 📋 Quick Start

### Option A: Two Separate Git Repositories (Recommended)

**Frontend Repository:**
```bash
cd frontend
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/survey-frontend.git
git push -u origin main
```

**Backend Repository:**
```bash
cd backend
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/survey-backend.git
git push -u origin main
```

### Option B: Same Repository, Separate Deployments

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/survey-app.git
git push -u origin main
```

Then deploy each folder separately on Vercel (see deployment guides below).

---

## 🎯 Deployment Steps

### Frontend Deployment
1. Go to [vercel.com/new](https://vercel.com/new)
2. Select your frontend repository (or main repo)
3. **Set Root Directory**: `frontend/`
4. Click Deploy
5. Add Environment Variable: `VITE_API_URL=https://your-backend.vercel.app`
6. Redeploy

See [frontend/README.md](./frontend/README.md) for detailed instructions.

### Backend Deployment
1. Go to [vercel.com/new](https://vercel.com/new)
2. Select your backend repository (or main repo)
3. **Set Root Directory**: `backend/`
4. Click Deploy
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `CORS_ORIGIN`: Your frontend URL (e.g., `https://frontend-name.vercel.app`)
   - `NODE_ENV`: `production`
6. Redeploy

See [backend/README.md](./backend/README.md) for detailed instructions.

---

## 📖 Documentation

- **Frontend**: See [frontend/README.md](./frontend/README.md)
- **Backend**: See [backend/README.md](./backend/README.md)

---

## 🔗 Connecting Frontend to Backend

Update `frontend/src/config.ts`:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export default API_URL;
```

Then use in components:
```typescript
import API_URL from '@/config';
fetch(`${API_URL}/api/users`);
```

---

## 🧪 Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
# Opens http://localhost:5173
```

### Backend
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:5000
```

---

## 📊 Project Structure

```
survey-app/
├── frontend/                 # React + Vite (separate project)
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── vercel.json
│   └── README.md
│
└── backend/                  # Express + MongoDB (separate project)
    ├── server.js
    ├── routes/
    ├── models/
    ├── package.json
    ├── .env
    ├── vercel.json
    └── README.md
```

---

## 🤝 Environment Variables

### Frontend (`.env.production` in `frontend/`)
```
VITE_API_URL=https://your-backend-name.vercel.app
```

### Backend (`.env` in `backend/`)
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Backend Production (Set in Vercel)
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-name.vercel.app
```

---

## ✅ Before Deployment Checklist

- [ ] Frontend dependencies installed (`npm install` in `frontend/`)
- [ ] Backend dependencies installed (`npm install` in `backend/`)
- [ ] MongoDB Atlas account created and connection string obtained
- [ ] Both projects tested locally
- [ ] Git repositories created and pushed
- [ ] Vercel accounts created
- [ ] Environment variables prepared

---

## 🔧 Troubleshooting

**Frontend can't connect to backend?**
- Verify `VITE_API_URL` environment variable is set
- Check `CORS_ORIGIN` in backend matches frontend URL

**Backend 502 error?**
- Check Vercel logs
- Verify MongoDB connection string is correct
- Ensure IP whitelist includes Vercel

**Build fails?**
- Check build logs in Vercel
- Ensure all dependencies in `package.json`
- Verify Node version compatibility

---

## 📞 Need Help?

See respective README files:
- [Frontend Setup Guide](./frontend/README.md)
- [Backend Setup Guide](./backend/README.md)
