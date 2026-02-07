# ⚡ Quick Start - Malani Impex

## 🎯 5-Minute Setup

### 1. MongoDB Atlas (2 minutes)
```
1. Visit: https://cloud.mongodb.com
2. Sign up → Create Cluster (Free M0)
3. Database Access → Add User (save password!)
4. Network Access → Add IP (0.0.0.0/0)
5. Connect → Get connection string
```

### 2. Backend (1 minute)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env - add MongoDB URI
npm run dev
```
✅ Backend: http://localhost:5000

### 3. Frontend (1 minute)
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local - add API URL
npm run dev
```
✅ Frontend: http://localhost:3000

### 4. Seed Data (30 seconds)
```bash
cd backend
npm run seed
```

## 🎊 Done! 

Visit http://localhost:3000 to see your website!

---

## 📚 Full Documentation

- **Setup Guide:** `SETUP.md` - Detailed setup with troubleshooting
- **Deployment:** `DEPLOYMENT.md` - Production deployment options
- **Checklist:** `CHECKLIST.md` - Complete development checklist
- **Backend API:** `backend/README.md` - API documentation

---

## 🆘 Quick Help

**MongoDB not connecting?**
- Check username/password in .env
- Verify IP whitelist (0.0.0.0/0)

**CORS error?**
- Check FRONTEND_URL in backend .env
- Restart backend server

**Port in use?**
- Change PORT in .env
- Or kill process: `lsof -ti:5000 | xargs kill -9`

---

## 📁 Project Structure

```
Malani/
├── backend/              # Node.js + Express API
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── config/          # Database config
│   └── server.js        # Main server file
│
├── frontend/            # Next.js 15 frontend
│   ├── src/app/        # Pages (App Router)
│   ├── src/components/ # React components
│   ├── src/lib/        # API integration
│   └── public/         # Static assets
│
└── Documentation files
```

---

## 🚀 Deploy to Production

**Easiest:** Railway (Backend) + Vercel (Frontend)

1. Push to GitHub
2. Connect Railway → Deploy backend
3. Connect Vercel → Deploy frontend
4. Done! 🎉

See `DEPLOYMENT.md` for detailed instructions.

---

## 💡 Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB
- **Database:** MongoDB Atlas (Cloud)
- **Deployment:** Vercel + Railway

---

## ✨ Features

- 🏠 Home page with hero section
- 📦 Product catalog with categories
- 🌸 Seasonal collections
- 🧵 Weaving techniques showcase
- 📧 Contact/Inquiry form
- 🛒 Shopping cart
- 📱 Fully responsive
- 🔒 Production-ready security

---

**Need detailed help?** Check `SETUP.md` for step-by-step guide!
