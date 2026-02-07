# 🎯 Complete Setup Guide - Malani Impex

## ✅ What's Ready

### Backend (Node.js + Express + MongoDB)
- ✅ MongoDB Atlas connection
- ✅ RESTful API endpoints
- ✅ JWT authentication system
- ✅ Admin user management
- ✅ Product, Season, Technique, Inquiry models
- ✅ Security (Helmet, CORS, Rate Limiting)
- ✅ Error handling
- ✅ Seed script with sample data

### Frontend (Next.js 15)
- ✅ Website pages (Home, About, Products, etc.)
- ✅ Admin login page
- ✅ Admin dashboard with sidebar & header
- ✅ Protected routes
- ✅ Authentication context
- ✅ Responsive design
- ✅ Theme colors (#666141, #FFFEF5)

---

## 🚀 Step-by-Step Setup (5 Minutes)

### Step 1: MongoDB Atlas (2 minutes)
```
1. Go to: https://cloud.mongodb.com
2. Sign up → Create free cluster (M0)
3. Database Access → Add user (save password!)
4. Network Access → Add IP (0.0.0.0/0)
5. Connect → Get connection string
```

### Step 2: Backend Setup (1 minute)
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env - Add these:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your-super-secret-key-minimum-32-characters
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Seed database (creates admin user + sample data)
npm run seed

# Start backend
npm run dev
```

✅ Backend running: http://localhost:5000

### Step 3: Frontend Setup (1 minute)
```bash
cd frontend

# Install dependencies
npm install

# Create .env.local
cp .env.local.example .env.local

# Edit .env.local - Add:
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start frontend
npm run dev
```

✅ Frontend running: http://localhost:3000

### Step 4: Test Everything (1 minute)
```
1. Website: http://localhost:3000
2. Admin Login: http://localhost:3000/admin
   - Username: admin
   - Password: Admin@123
3. Dashboard: http://localhost:3000/admin/dashboard
```

---

## 🔑 Default Admin Credentials

```
URL: http://localhost:3000/admin
Username: admin
Password: Admin@123
Email: admin@malaniimpex.com
Role: super-admin
```

⚠️ **IMPORTANT:** Change password after first login!

---

## 📁 Project Structure

```
Malani/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   ├── Admin.js             # Admin user model
│   │   ├── Product.js           # Product model
│   │   ├── Season.js            # Season model
│   │   ├── Technique.js         # Technique model
│   │   └── Inquiry.js           # Inquiry model
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── products.js          # Product CRUD
│   │   ├── seasons.js           # Season CRUD
│   │   ├── techniques.js        # Technique CRUD
│   │   └── inquiries.js         # Inquiry CRUD
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   └── errorHandler.js     # Error handling
│   ├── scripts/
│   │   └── seedData.js          # Database seeding
│   ├── .env                     # Environment variables
│   ├── server.js                # Main server file
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (Website-group)/  # Public website pages
│   │   │   ├── admin/            # Admin pages
│   │   │   │   ├── page.jsx      # Login page
│   │   │   │   ├── layout.jsx    # Admin layout
│   │   │   │   └── dashboard/    # Dashboard pages
│   │   │   ├── layout.jsx        # Root layout
│   │   │   └── globals.css       # Global styles
│   │   ├── components/
│   │   │   ├── website/          # Website components
│   │   │   └── admin/            # Admin components
│   │   │       ├── AdminSidebar.jsx
│   │   │       ├── AdminHeader.jsx
│   │   │       └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Admin authentication
│   │   │   └── CartContext.jsx   # Shopping cart
│   │   ├── lib/
│   │   │   └── api.js            # API functions
│   │   └── data/                 # Static data
│   ├── public/
│   │   └── images/               # Images & assets
│   ├── .env.local                # Frontend env variables
│   └── package.json
│
└── Documentation/
    ├── README.md                 # Project overview
    ├── QUICK_START.md            # 5-minute setup
    ├── SETUP.md                  # Detailed setup
    ├── ADMIN_SETUP.md            # Admin system guide
    ├── DEPLOYMENT.md             # Production deployment
    └── CHECKLIST.md              # Development checklist
```

---

## 📡 API Endpoints

### Public Endpoints
```
GET    /api/products              # Get all products
GET    /api/products/:id          # Get single product
GET    /api/seasons               # Get all seasons
GET    /api/seasons/:id           # Get single season
GET    /api/techniques            # Get all techniques
GET    /api/techniques/:slug      # Get single technique
POST   /api/inquiries             # Submit inquiry
```

### Admin Endpoints (Protected)
```
POST   /api/auth/login            # Admin login
GET    /api/auth/me               # Get current admin
POST   /api/auth/logout           # Logout
PUT    /api/auth/change-password  # Change password

POST   /api/products              # Create product
PUT    /api/products/:id          # Update product
DELETE /api/products/:id          # Delete product

POST   /api/seasons               # Create season
PUT    /api/seasons/:id           # Update season

POST   /api/techniques            # Create technique
PUT    /api/techniques/:slug      # Update technique

GET    /api/inquiries             # Get all inquiries (admin)
PATCH  /api/inquiries/:id/status  # Update inquiry status
```

---

## 🎨 Theme & Design

### Colors
```css
Primary:    #666141  /* Brown */
Background: #FFFEF5  /* Cream */
Accent:     #E9E4B5  /* Light Yellow */
Text:       #000000  /* Black */
Orange:     #FF5A00  /* Brand Orange */
```

### Fonts
- **Neiko** (Custom font loaded in layout)

### Logo
- Location: `/public/images/logo/MalaniLogo.png`

---

## 🔒 Security Features

### Backend
- ✅ Password hashing (bcrypt)
- ✅ JWT authentication
- ✅ Protected routes middleware
- ✅ CORS protection
- ✅ Rate limiting (100 req/15min)
- ✅ Helmet.js security headers
- ✅ Input validation
- ✅ Error handling

### Frontend
- ✅ Protected admin routes
- ✅ Token-based authentication
- ✅ Auto-redirect if not authenticated
- ✅ Secure token storage
- ✅ Loading states
- ✅ Error handling

---

## 🧪 Testing

### Test Backend
```bash
# Health check
curl http://localhost:5000/health

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@123"}'

# Test products
curl http://localhost:5000/api/products
```

### Test Frontend
1. Visit: http://localhost:3000
2. Check all pages load
3. Test navigation
4. Login to admin: http://localhost:3000/admin
5. Check dashboard loads
6. Test logout

---

## 🐛 Common Issues

### MongoDB Connection Failed
```
Error: MongoServerError: bad auth

Solution:
1. Check MONGODB_URI in .env
2. Verify username/password
3. Check IP whitelist (0.0.0.0/0)
4. Ensure database name is correct
```

### CORS Error
```
Error: Access blocked by CORS policy

Solution:
1. Check FRONTEND_URL in backend .env
2. Restart backend server
3. Clear browser cache
```

### Admin Login Failed
```
Error: Invalid credentials

Solution:
1. Run: npm run seed (in backend)
2. Use: admin / Admin@123
3. Check backend logs
4. Verify backend is running
```

### Port Already in Use
```
Error: Port 5000 is already in use

Solution:
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

---

## 📦 Production Deployment

### Quick Deploy (Recommended)
1. **Backend:** Railway.app
2. **Frontend:** Vercel
3. **Database:** MongoDB Atlas

See `DEPLOYMENT.md` for detailed instructions.

### Environment Variables (Production)

**Backend:**
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=very-long-random-secret-minimum-32-characters
FRONTEND_URL=https://your-domain.com
PRODUCTION_URL=https://your-domain.com
PORT=5000
JWT_EXPIRE=7d
```

**Frontend:**
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

---

## ✅ Success Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Backend dependencies installed
- [ ] Backend .env configured
- [ ] Database seeded
- [ ] Backend running (port 5000)
- [ ] Frontend dependencies installed
- [ ] Frontend .env.local configured
- [ ] Frontend running (port 3000)
- [ ] Website loads at localhost:3000
- [ ] Admin login works
- [ ] Dashboard loads
- [ ] All navigation works
- [ ] No console errors

---

## 📞 Support & Documentation

- **Quick Start:** `QUICK_START.md`
- **Detailed Setup:** `SETUP.md`
- **Admin Guide:** `ADMIN_SETUP.md`
- **Deployment:** `DEPLOYMENT.md`
- **Checklist:** `CHECKLIST.md`

---

## 🎉 You're All Set!

Your complete textile business website with admin panel is ready!

**Website:** http://localhost:3000
**Admin:** http://localhost:3000/admin
**API:** http://localhost:5000/api

**Default Admin:**
- Username: `admin`
- Password: `Admin@123`

Happy coding! 🚀
