# Render Deployment Guide - Malani Impex

## Overview
Deploy karne ka order:
1. Backend deploy karo (Node.js)
2. Backend ka URL copy karo
3. Frontend deploy karo (Next.js)

---

## Part 1: Backend Deployment (Node.js API)

### Step 1: Create Web Service

1. Render dashboard me jao: https://dashboard.render.com/
2. Click **"New +"** > **"Web Service"**
3. Connect your Git repository
4. Select your repository

### Step 2: Configure Backend Settings

**Basic Settings**:
- **Name**: `malani-backend`
- **Region**: Singapore (ya closest)
- **Branch**: `main`
- **Root Directory**: `backend` ⚠️ (Important!)
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type**:
- Free tier select karo (ya paid if needed)

### Step 3: Environment Variables

Backend ke liye ye environment variables add karo:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://developmentkontentkraftdigital_db_user:malani@cluster0.3elkyak.mongodb.net/?appName=Cluster0
JWT_SECRET=malani-impex-super-secret-jwt-key-2024-change-in-production-min-32-chars
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-url.onrender.com
PRODUCTION_URL=https://your-frontend-url.onrender.com
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
```

⚠️ **Note**: `FRONTEND_URL` abhi placeholder hai, frontend deploy hone ke baad update karoge

### Step 4: Deploy Backend

1. Click **"Create Web Service"**
2. Wait for deployment (2-3 minutes)
3. Backend URL milega: `https://malani-backend.onrender.com`
4. **Is URL ko copy kar lo** - frontend me use hoga

### Step 5: Test Backend

Browser me jao:
```
https://malani-backend.onrender.com/health
```

Response aana chahiye:
```json
{
  "status": "OK",
  "timestamp": "2026-02-07T...",
  "uptime": 123.45
}
```

---

## Part 2: Frontend Deployment (Next.js)

### Step 1: Create Web Service

1. Render dashboard me jao
2. Click **"New +"** > **"Web Service"**
3. Same repository select karo

### Step 2: Configure Frontend Settings

**Basic Settings**:
- **Service Type**: **Web Service** ⚠️ (NOT Static Site!)
- **Name**: `malani-frontend`
- **Region**: Singapore (same as backend)
- **Branch**: `main`
- **Root Directory**: `frontend` ⚠️ (Important!)
- **Runtime**: Node
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Publish Directory**: `.next` (agar required ho toh)

**Instance Type**:
- Free tier select karo

### Step 3: Environment Variables

Frontend ke liye ye environment variable add karo:

```env
NEXT_PUBLIC_API_URL=https://malani-backend.onrender.com/api
```

⚠️ Replace `malani-backend.onrender.com` with your actual backend URL

### Step 4: Deploy Frontend

1. Click **"Create Web Service"**
2. Wait for deployment (3-5 minutes)
3. Frontend URL milega: `https://malani-frontend.onrender.com`

### Step 5: Update Backend CORS

Backend deploy hone ke baad, backend ke environment variables me jao aur update karo:

```env
FRONTEND_URL=https://malani-frontend.onrender.com
PRODUCTION_URL=https://malani-frontend.onrender.com
```

Backend automatically restart hoga.

---

## Part 3: Post-Deployment Setup

### 1. Seed Admin User

Backend terminal me jao (Render dashboard > Shell):
```bash
cd backend
npm run seed
```

Ya local se seed karo with production MongoDB URI.

### 2. Test Admin Login

```
https://malani-frontend.onrender.com/admin
Username: admin
Password: Admin@123
```

### 3. Change Admin Password

Settings page se password change karo immediately!

---

## Render Configuration Files (Optional)

### render.yaml (Root of repository)

Agar chahte ho ki ek hi file se dono deploy ho:

```yaml
services:
  # Backend Service
  - type: web
    name: malani-backend
    runtime: node
    rootDir: backend
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: JWT_EXPIRE
        value: 7d
      - key: CLOUDFLARE_ACCOUNT_ID
        sync: false
      - key: CLOUDFLARE_API_TOKEN
        sync: false

  # Frontend Service
  - type: web
    name: malani-frontend
    runtime: node
    rootDir: frontend
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NEXT_PUBLIC_API_URL
        value: https://malani-backend.onrender.com/api
```

---

## Important Settings Summary

### Backend:
```
Root Directory: backend
Build Command: npm install
Start Command: npm start
Publish Directory: (empty)
```

### Frontend:
```
Service Type: Web Service (NOT Static Site!)
Root Directory: frontend
Build Command: npm install && npm run build
Start Command: npm start
Publish Directory: .next
```

---

## Common Issues & Solutions

### Issue 1: "Cannot find module"
**Solution**: 
- Check `Root Directory` is set correctly
- Backend: `backend`
- Frontend: `frontend`

### Issue 2: "Build failed"
**Solution**:
- Check build logs
- Verify all dependencies in package.json
- Test build locally first: `npm run build`

### Issue 3: "API calls failing"
**Solution**:
- Check `NEXT_PUBLIC_API_URL` in frontend
- Check CORS settings in backend
- Verify backend is running: `/health` endpoint

### Issue 4: "MongoDB connection failed"
**Solution**:
- Check MongoDB Atlas whitelist
- Add `0.0.0.0/0` to allow all IPs (for Render)
- Verify MONGODB_URI is correct

### Issue 5: "Images not loading"
**Solution**:
- Check Cloudflare credentials
- Verify image URLs are correct
- Check browser console for errors

---

## Free Tier Limitations

### Render Free Tier:
- ✅ 750 hours/month (enough for 1 service 24/7)
- ✅ Automatic HTTPS
- ✅ Custom domains
- ⚠️ Services sleep after 15 minutes of inactivity
- ⚠️ Cold start takes 30-60 seconds

### Tips for Free Tier:
1. Use cron job to ping your service every 14 minutes
2. Or upgrade to paid tier ($7/month) for always-on
3. Frontend can stay on free tier (less critical)

---

## Monitoring & Logs

### View Logs:
1. Render dashboard > Your service
2. Click **"Logs"** tab
3. Real-time logs dikhenge

### View Metrics:
1. Click **"Metrics"** tab
2. CPU, Memory, Request count dekh sakte ho

---

## Custom Domain Setup (Optional)

### Add Custom Domain:

1. Render dashboard > Your service
2. Click **"Settings"** > **"Custom Domains"**
3. Add your domain: `www.malaniimpex.com`
4. Add DNS records in your domain provider:
   ```
   Type: CNAME
   Name: www
   Value: malani-frontend.onrender.com
   ```
5. Wait for DNS propagation (5-30 minutes)

---

## Deployment Checklist

### Before Deployment:
- ✅ Code pushed to Git
- ✅ MongoDB Atlas whitelist updated (0.0.0.0/0)
- ✅ Cloudflare credentials ready
- ✅ Build tested locally
- ✅ Environment variables prepared

### After Backend Deployment:
- ✅ Backend URL copied
- ✅ Health endpoint tested
- ✅ Admin user seeded

### After Frontend Deployment:
- ✅ Frontend URL copied
- ✅ Backend CORS updated
- ✅ Admin login tested
- ✅ API calls working

---

## Alternative: Vercel for Frontend

Agar frontend ke liye Vercel use karna chahte ho (recommended for Next.js):

### Vercel Settings:
- **Framework Preset**: Next.js
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: (auto-detected)
- **Install Command**: `npm install`

### Environment Variables:
```
NEXT_PUBLIC_API_URL=https://malani-backend.onrender.com/api
```

Vercel Next.js ke liye better hai kyunki:
- ✅ Faster builds
- ✅ Better Next.js optimization
- ✅ Edge functions support
- ✅ No cold starts
- ✅ Free tier more generous

---

## Cost Estimate

### Free Tier (Both on Render):
- Backend: Free (with sleep)
- Frontend: Free (with sleep)
- **Total**: $0/month

### Recommended Setup:
- Backend: Render Starter ($7/month) - Always on
- Frontend: Vercel Free - Always on
- **Total**: $7/month

### Production Setup:
- Backend: Render Standard ($25/month)
- Frontend: Vercel Pro ($20/month)
- **Total**: $45/month

---

## Support

### Render Support:
- Docs: https://render.com/docs
- Community: https://community.render.com/

### Vercel Support:
- Docs: https://vercel.com/docs
- Discord: https://vercel.com/discord

---

## Quick Reference

### Backend URL Format:
```
https://your-service-name.onrender.com
```

### Frontend URL Format:
```
https://your-service-name.onrender.com
```

### API Endpoint Format:
```
https://your-backend.onrender.com/api/products
https://your-backend.onrender.com/api/auth/login
```

---

## Final Notes

1. **Publish Directory** ko Next.js ke liye **EMPTY** hi rakhna hai
2. **Root Directory** zaroor set karo (`backend` ya `frontend`)
3. Backend pehle deploy karo, phir frontend
4. Environment variables carefully add karo
5. Free tier me service sleep hoti hai - paid tier consider karo production ke liye

---

**Questions?** Check Render documentation ya code comments dekho.
