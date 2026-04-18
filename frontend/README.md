# Frontend Setup Guide

Quick start for deploying the frontend to Vercel.

---

## Local Development

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

Opens at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

Output directory: `dist/`

---

## Environment Variables

### Development (`.env` in root)
```
VITE_API_URL=http://localhost:5000
```

### Production (Set in Vercel Dashboard)
```
VITE_API_URL=https://your-backend.vercel.app
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
3. **Framework**: Vite (auto-detected)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. Click **"Deploy"**

### Step 3: Set Environment Variable
1. After deployment, go to **Settings** → **Environment Variables**
2. Add `VITE_API_URL` = `https://your-backend.vercel.app`
3. Click **"Save"**
4. Redeploy

---

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui & Radix UI
- **State Management**: React Context
- **Forms**: React Hook Form

---

## Project Structure

```
frontend/
├── src/
│   ├── app/           # Main app components
│   │   ├── App.tsx    # Root component
│   │   ├── components/# Reusable components
│   │   └── styles/    # Global styles
│   ├── main.tsx       # Entry point
│   └── config.ts      # API configuration
├── index.html         # HTML template
├── vite.config.ts     # Vite configuration
├── package.json       # Dependencies
├── tailwind.config.js # Tailwind config
└── tsconfig.json      # TypeScript config
```

---

## Available Scripts

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build locally
```

---

## Troubleshooting

**Build fails?**
- Run `npm install` to ensure dependencies
- Check Node version (18.x+)

**API calls fail?**
- Verify `VITE_API_URL` environment variable
- Check backend is deployed and running
- Test `{API_URL}/api/health` in browser

**Styles not loading?**
- Clear browser cache
- Rebuild project: `npm run build`

---

For full deployment guide, see [../DEPLOYMENT.md](../DEPLOYMENT.md)
