# Environment Variables Setup

## Overview

The frontend now uses environment variables for the API base URL instead of hardcoding `http://localhost:5000`.

---

## Files Created/Updated

### 1. `frontend/src/config.ts` (New)
Centralized configuration file that reads the API URL from environment variables:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

**Usage in components:**
```typescript
import API_BASE_URL from '@/config';

fetch(`${API_BASE_URL}/api/users/submit`, { ... })
```

### 2. `frontend/.env.local` (New)
Local development environment variables (not committed to git):

```
VITE_API_URL=http://localhost:5000
```

### 3. `frontend/.env.production.example` (Updated)
Production example template:

```
VITE_API_URL=https://your-backend-project.vercel.app
```

### 4. Updated Components
Both components now import and use the config file:

- **[App.tsx](./src/app/App.tsx)** - Line 5 & 214
  - Imports: `import API_BASE_URL from '@/config';`
  - Usage: `fetch(\`${API_BASE_URL}/api/users/submit\`)`

- **[AdminResponses.tsx](./src/app/AdminResponses.tsx)** - Line 3 & 77
  - Imports: `import API_BASE_URL from '@/config';`
  - Usage: `fetch(\`${API_BASE_URL}/api/users/all\`)`

---

## Environment Variable Names

| Variable | Purpose | Development | Production |
|----------|---------|-------------|-----------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` | `https://your-backend.vercel.app` |

**Note:** Must start with `VITE_` to be exposed to Vite frontend

---

## Local Development Setup

### 1. Ensure `.env.local` exists:
```bash
cd frontend
cat .env.local
# Should show: VITE_API_URL=http://localhost:5000
```

### 2. Start backend on port 5000:
```bash
cd backend
npm run dev
```

### 3. Start frontend (will use .env.local):
```bash
cd frontend
npm run dev
```

---

## Production Deployment (Vercel)

### 1. Set Environment Variable in Vercel Dashboard:

Frontend project → Settings → Environment Variables

Add:
```
VITE_API_URL=https://your-backend-project.vercel.app
```

### 2. Redeploy Frontend:
Vercel will automatically pick up the new environment variable

---

## How It Works

### Development
- `frontend/.env.local` is loaded automatically by Vite
- `VITE_API_URL=http://localhost:5000` from `.env.local`
- Components fetch from `http://localhost:5000`

### Production
- Vercel dashboard environment variables are used
- `VITE_API_URL=https://your-backend.vercel.app`
- Components fetch from the production backend URL

---

## Important Notes

✅ **`.env.local` is ignored by Git** (see `.gitignore`)
- Won't be committed to repository
- Each developer can have different local settings

✅ **Never commit `.env.local`** 
- Sensitive data (API keys, secrets) go here

✅ **Production values set in Vercel Dashboard**
- Not in repository
- Securely managed by Vercel

---

## Git Ignore Configuration

The `.gitignore` file already excludes:

```
.env              # All .env files
.env.local        # Local development
.env.*.local      # Environment-specific local files
.env.production   # Production env file (if present)
```

---

## Fallback Behavior

If `VITE_API_URL` is not set, the config defaults to:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

So it will use `http://localhost:5000` as fallback for local development.

---

## Testing Environment Variables

### Check what's being used:
```typescript
console.log('API URL:', import.meta.env.VITE_API_URL);
```

### Verify in browser DevTools:
Open DevTools Console and check the network requests to see if they're going to the correct URL

---

## Common Issues

**Problem:** Frontend can't connect to backend

**Solution:**
1. Verify `VITE_API_URL` is set correctly
2. Check backend is actually running on that URL
3. Test: `curl ${VITE_API_URL}/api/health`
4. Check browser console for error messages

---

## Summary

✅ Frontend now uses environment variables for API URL  
✅ Development: `.env.local` with `http://localhost:5000`  
✅ Production: Set `VITE_API_URL` in Vercel dashboard  
✅ Config centralized in `frontend/src/config.ts`  
✅ Both components updated to use the config
