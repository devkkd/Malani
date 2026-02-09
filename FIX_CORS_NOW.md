# 🔧 CORS Error - Quick Fix

## 🐛 Error
```
Access to fetch at 'https://malani.onrender.com/api/techniques' 
from origin 'https://malani.vercel.app' has been blocked by CORS policy
```

## ✅ Solution - Render Environment Variables

### Go to Render Dashboard
1. Open: https://dashboard.render.com
2. Select your backend service: **malani**
3. Go to **Environment** tab
4. Add these variables:

### Required Variables:

```env
NODE_ENV=production
PRODUCTION_URL=https://malani.vercel.app
FRONTEND_URL=https://malani.vercel.app
```

### Click "Save Changes"

Backend will automatically restart.

## 🎯 Done!

After restart, CORS will work and site will load! ✅
