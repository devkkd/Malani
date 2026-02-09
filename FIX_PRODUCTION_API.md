# 🔧 Production API 404 Error - Fix Guide

## 🐛 Problem

Backend logs show:
```
GET /seasons HTTP/1.1" 404
GET /techniques HTTP/1.1" 404
```

**Issue:** Frontend is calling `/seasons` instead of `/api/seasons`

## ✅ Root Cause

**Vercel environment variable missing or incorrect!**

Your backend is at: `https://malani.onrender.com`
Routes are: `/api/seasons`, `/api/techniques`, etc.

But frontend is calling without `/api` prefix.

## 🚀 Solution - Update Vercel Environment Variables

### Step 1: Go to Vercel Dashboard
1. Open https://vercel.com/dashboard
2. Select your project: **malani**
3. Go to **Settings** tab
4. Click **Environment Variables**

### Step 2: Add/Update Variable

**Variable Name:**
```
NEXT_PUBLIC_API_URL
```

**Value:**
```
https://malani.onrender.com/api
```

**Important:** Include `/api` at the end!

### Step 3: Select Environments
- ✅ Production
- ✅ Preview
- ✅ Development

### Step 4: Save and Redeploy

After saving:
1. Go to **Deployments** tab
2. Click **...** (three dots) on latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

## 📋 Complete Environment Variables for Vercel

```env
# Required
NEXT_PUBLIC_API_URL=https://malani.onrender.com/api

# Optional (if using)
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID=your_account_id
NEXT_PUBLIC_CLOUDFLARE_IMAGES_URL=your_images_url
```

## 🔍 Verify After Deployment

### Check 1: Open Browser Console
```javascript
console.log(process.env.NEXT_PUBLIC_API_URL)
// Should show: https://malani.onrender.com/api
```

### Check 2: Test API Calls
Open your site and check Network tab:
- ✅ Should call: `https://malani.onrender.com/api/seasons`
- ✅ Should call: `https://malani.onrender.com/api/techniques`
- ❌ NOT: `https://malani.onrender.com/seasons`

### Check 3: Backend Logs
Render logs should show:
```
GET /api/seasons HTTP/1.1" 200
GET /api/techniques HTTP/1.1" 200
```

## 🎯 Quick Fix Commands

### If you have Vercel CLI:
```bash
# Set environment variable
vercel env add NEXT_PUBLIC_API_URL production

# When prompted, enter:
https://malani.onrender.com/api

# Redeploy
vercel --prod
```

## 📱 Alternative: Update via Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Add environment variable
vercel env add NEXT_PUBLIC_API_URL

# Enter value when prompted:
# https://malani.onrender.com/api

# Select: Production, Preview, Development

# Deploy
vercel --prod
```

## 🔐 Backend CORS Check

Also verify backend `.env` has correct CORS:

```env
# In Render dashboard, set:
PRODUCTION_URL=https://malani.vercel.app
FRONTEND_URL=https://malani.vercel.app
NODE_ENV=production
```

## 🎯 Complete Checklist

### Vercel (Frontend)
- [ ] `NEXT_PUBLIC_API_URL` = `https://malani.onrender.com/api`
- [ ] Environment set for Production
- [ ] Redeployed after adding variable

### Render (Backend)
- [ ] `PRODUCTION_URL` = `https://malani.vercel.app`
- [ ] `FRONTEND_URL` = `https://malani.vercel.app`
- [ ] `NODE_ENV` = `production`
- [ ] CORS configured correctly

## 🧪 Test After Fix

1. **Open your site:** https://malani.vercel.app
2. **Open DevTools** (F12)
3. **Go to Network tab**
4. **Refresh page**
5. **Check API calls:**
   - ✅ Should see: `malani.onrender.com/api/seasons` (200 OK)
   - ✅ Should see: `malani.onrender.com/api/techniques` (200 OK)

## 🎊 Expected Result

### Before Fix:
```
❌ GET /seasons 404
❌ GET /techniques 404
```

### After Fix:
```
✅ GET /api/seasons 200
✅ GET /api/techniques 200
✅ GET /api/products 200
```

## 📝 Common Mistakes

### ❌ Wrong:
```
NEXT_PUBLIC_API_URL=https://malani.onrender.com
```
Missing `/api` at the end!

### ❌ Wrong:
```
NEXT_PUBLIC_API_URL=https://malani.onrender.com/api/
```
Extra `/` at the end!

### ✅ Correct:
```
NEXT_PUBLIC_API_URL=https://malani.onrender.com/api
```

## 🔄 If Still Not Working

### 1. Clear Vercel Cache
```bash
vercel --prod --force
```

### 2. Check Build Logs
- Go to Vercel deployment
- Check build logs for environment variables
- Should see: `NEXT_PUBLIC_API_URL` loaded

### 3. Hard Refresh Browser
```
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

### 4. Check Backend Health
```bash
curl https://malani.onrender.com/api/seasons
```
Should return JSON data, not 404.

## 🎯 Quick Visual Guide

```
┌─────────────────────────────────────┐
│  Vercel Dashboard                   │
├─────────────────────────────────────┤
│  Settings → Environment Variables   │
│                                     │
│  Name:  NEXT_PUBLIC_API_URL        │
│  Value: https://malani.onrender.com/api │
│                                     │
│  [✓] Production                     │
│  [✓] Preview                        │
│  [✓] Development                    │
│                                     │
│  [Save]                             │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│  Deployments → Redeploy             │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│  ✅ Site Working!                   │
└─────────────────────────────────────┘
```

## 🎉 Done!

After following these steps, your production site will work perfectly!

---

**Need Help?**
- Check Vercel docs: https://vercel.com/docs/environment-variables
- Check Render docs: https://render.com/docs/environment-variables
