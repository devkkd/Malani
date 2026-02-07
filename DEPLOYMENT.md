# 🚀 Production Deployment Guide

## Option 1: Vercel (Frontend) + Railway (Backend) - RECOMMENDED

### Backend on Railway

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # Push your code to GitHub first
   git add .
   git commit -m "Backend ready for deployment"
   git push
   ```

3. **On Railway Dashboard**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select `backend` folder as root directory
   - Add environment variables:
     ```
     NODE_ENV=production
     MONGODB_URI=your_mongodb_atlas_uri
     FRONTEND_URL=https://your-frontend-domain.vercel.app
     PRODUCTION_URL=https://your-frontend-domain.vercel.app
     PORT=5000
     ```
   - Click "Deploy"

4. **Get Backend URL**
   - Railway will give you a URL like: `https://your-app.railway.app`
   - Save this URL for frontend setup

### Frontend on Vercel

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Deploy Frontend**
   - Click "Add New Project"
   - Import your GitHub repository
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Add environment variable:
     ```
     NEXT_PUBLIC_API_URL=https://your-app.railway.app/api
     ```
   - Click "Deploy"

3. **Done!** Your site is live 🎉

---

## Option 2: Render (Full Stack)

### Backend on Render

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure:
   - Name: `malani-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables (same as Railway)
6. Click "Create Web Service"

### Frontend on Render

1. Click "New +" → "Static Site"
2. Connect repository
3. Configure:
   - Name: `malani-frontend`
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `.next`
   - Add environment variable:
     ```
     NEXT_PUBLIC_API_URL=https://malani-backend.onrender.com/api
     ```
4. Click "Create Static Site"

---

## Option 3: VPS (DigitalOcean, AWS, Linode)

### Prerequisites
- Ubuntu 22.04 server
- Domain name (optional)
- SSH access

### 1. Server Setup

```bash
# SSH into your server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Install Nginx
apt install nginx -y

# Install Git
apt install git -y
```

### 2. Clone & Setup Backend

```bash
# Clone repository
cd /var/www
git clone https://github.com/your-username/malani-impex.git
cd malani-impex/backend

# Install dependencies
npm install

# Create .env file
nano .env
# Add your production environment variables
# Save: Ctrl+X, Y, Enter

# Start with PM2
pm2 start server.js --name malani-api
pm2 save
pm2 startup
```

### 3. Setup Frontend

```bash
cd /var/www/malani-impex/frontend

# Install dependencies
npm install

# Create .env.local
nano .env.local
# Add: NEXT_PUBLIC_API_URL=http://your-server-ip:5000/api

# Build
npm run build

# Start with PM2
pm2 start npm --name malani-frontend -- start
pm2 save
```

### 4. Configure Nginx

```bash
nano /etc/nginx/sites-available/malani
```

Add this configuration:

```nginx
# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
ln -s /etc/nginx/sites-available/malani /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 5. SSL Certificate (Optional but Recommended)

```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com

# Auto-renewal
certbot renew --dry-run
```

---

## Post-Deployment Checklist

- [ ] Backend API is accessible
- [ ] Frontend loads correctly
- [ ] MongoDB connection working
- [ ] CORS configured properly
- [ ] Environment variables set
- [ ] SSL certificate installed (if using custom domain)
- [ ] Test all API endpoints
- [ ] Test contact/inquiry form
- [ ] Check browser console for errors
- [ ] Test on mobile devices
- [ ] Setup monitoring (optional)

---

## Monitoring & Maintenance

### PM2 Commands (VPS)
```bash
pm2 status              # Check status
pm2 logs malani-api     # View logs
pm2 restart malani-api  # Restart
pm2 stop malani-api     # Stop
pm2 delete malani-api   # Remove
```

### Update Deployment
```bash
cd /var/www/malani-impex
git pull
cd backend && npm install && pm2 restart malani-api
cd ../frontend && npm install && npm run build && pm2 restart malani-frontend
```

---

## Cost Comparison

| Platform | Backend | Frontend | Total/Month |
|----------|---------|----------|-------------|
| Railway + Vercel | $5 | Free | $5 |
| Render | $7 | Free | $7 |
| DigitalOcean VPS | $6 | $6 | $6 |
| AWS/Azure | $10+ | $5+ | $15+ |

**Recommendation:** Start with Railway + Vercel for easiest setup and scaling.

---

## Need Help?

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- PM2 Docs: https://pm2.keymetrics.io/docs
