# Production Deployment Guide

## ✅ Pre-Deployment Checklist

### 1. Console Logs Removed
- ✅ All console.log statements removed from frontend
- ✅ Backend console.logs cleaned (only server start logs remain)
- ✅ Image quality warnings fixed in next.config.mjs

### 2. Build Tested
- ✅ Frontend build successful
- ✅ All routes compiled correctly
- ✅ No build errors

### 3. Environment Variables

#### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=production

# MongoDB Atlas Connection
MONGODB_URI=your_production_mongodb_uri

# Frontend URL (for CORS)
FRONTEND_URL=https://your-domain.com

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRE=7d

# Cloudflare Images Configuration
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_key
CLOUDFLARE_R2_BUCKET_NAME=your_bucket_name
CLOUDFLARE_R2_PUBLIC_URL=https://your-r2-url.r2.dev
```

#### Frontend (.env.local)
```env
# Backend API URL
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

## 🚀 Deployment Steps

### Backend Deployment (Node.js)

1. **Upload backend folder to server**
2. **Install dependencies:**
   ```bash
   cd backend
   npm install --production
   ```

3. **Set environment variables** (create .env file with production values)

4. **Start with PM2:**
   ```bash
   npm install -g pm2
   pm2 start server.js --name malani-backend
   pm2 save
   pm2 startup
   ```

### Frontend Deployment (Vercel/Netlify)

#### Option 1: Vercel
1. Connect GitHub repository
2. Set root directory to `frontend`
3. Add environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy

#### Option 2: Netlify
1. Connect GitHub repository
2. Build command: `cd frontend && npm run build`
3. Publish directory: `frontend/.next`
4. Add environment variable: `NEXT_PUBLIC_API_URL`
5. Deploy

#### Option 3: Self-hosted
```bash
cd frontend
npm run build
npm start
```

Or with PM2:
```bash
pm2 start npm --name malani-frontend -- start
pm2 save
```

## 🔒 Security Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Update CORS settings in backend/server.js with production domain
- [ ] Enable HTTPS on both frontend and backend
- [ ] Set NODE_ENV=production
- [ ] Review and update MongoDB connection string
- [ ] Secure Cloudflare API tokens

## 📝 Post-Deployment

1. **Test all features:**
   - Product pages with slugs
   - Admin login
   - Image uploads
   - Inquiry forms
   - Cart functionality

2. **Monitor logs:**
   ```bash
   pm2 logs malani-backend
   pm2 logs malani-frontend
   ```

3. **Set up monitoring:**
   - PM2 monitoring: `pm2 monitor`
   - Or use services like Sentry, LogRocket

## 🐛 Troubleshooting

### 404 on Product Pages
- Ensure backend is running
- Check API URL in frontend .env.local
- Verify products have slugs in database

### CORS Errors
- Update FRONTEND_URL in backend .env
- Check CORS settings in backend/server.js

### Build Errors
- Clear .next folder: `rm -rf .next`
- Reinstall dependencies: `npm install`
- Try build again: `npm run build`

## 📊 Performance Optimization

- ✅ Image optimization configured
- ✅ Console.log removal in production
- ✅ Webpack optimization enabled
- ✅ Static page generation where possible

## 🔄 Updates

To update production:
```bash
git pull origin main
cd backend && npm install && pm2 restart malani-backend
cd ../frontend && npm install && npm run build && pm2 restart malani-frontend
```
