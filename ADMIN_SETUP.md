# 🔐 Admin Authentication Setup Guide

## ✅ Complete! Admin System Ready

Your admin authentication system is now fully configured with:

- ✅ JWT-based authentication
- ✅ Protected admin routes
- ✅ Login/Logout functionality
- ✅ Admin dashboard with sidebar & header
- ✅ Role-based access control
- ✅ Secure password hashing (bcrypt)

---

## 🚀 Quick Start

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

New packages added:
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT tokens
- `cookie-parser` - Cookie handling

### 2. Update Environment Variables

Add to `backend/.env`:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
```

### 3. Seed Database with Admin User

```bash
cd backend
npm run seed
```

This will create:
- **Username:** `admin`
- **Password:** `Admin@123`
- **Email:** `admin@malaniimpex.com`
- **Role:** `super-admin`

⚠️ **IMPORTANT:** Change the password after first login!

### 4. Start Backend Server

```bash
cd backend
npm run dev
```

Backend running on: http://localhost:5000

### 5. Start Frontend

```bash
cd frontend
npm run dev
```

Frontend running on: http://localhost:3000

---

## 🔑 Admin Login

1. Visit: http://localhost:3000/admin
2. Enter credentials:
   - Username: `admin`
   - Password: `Admin@123`
3. Click "Sign In"
4. You'll be redirected to: http://localhost:3000/admin/dashboard

---

## 📁 Admin Routes

| Route | Description | Protected |
|-------|-------------|-----------|
| `/admin` | Login page | Public |
| `/admin/dashboard` | Main dashboard | ✅ Yes |
| `/admin/products` | Products management | ✅ Yes |
| `/admin/seasons` | Seasons management | ✅ Yes |
| `/admin/techniques` | Techniques management | ✅ Yes |
| `/admin/inquiries` | Customer inquiries | ✅ Yes |
| `/admin/settings` | Admin settings | ✅ Yes |

---

## 🎨 Admin Theme

Colors used (matching your website):
- **Primary:** `#666141` (Brown)
- **Background:** `#FFFEF5` (Cream)
- **Accent:** `#E9E4B5` (Light Yellow)
- **Text:** `#000000` (Black)

Logo: `/images/logo/MalaniLogo.png`

---

## 🔒 Security Features

### Backend
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token authentication
- ✅ Protected API routes with middleware
- ✅ Token expiration (7 days default)
- ✅ Role-based access control
- ✅ Input validation

### Frontend
- ✅ Protected routes with authentication check
- ✅ Token stored in localStorage
- ✅ Auto-redirect if not authenticated
- ✅ Loading states
- ✅ Error handling

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/login          - Admin login
GET    /api/auth/me             - Get current admin (protected)
POST   /api/auth/logout         - Logout (protected)
PUT    /api/auth/change-password - Change password (protected)
```

### Example Login Request
```javascript
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "Admin@123"
}
```

### Example Response
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "...",
    "username": "admin",
    "email": "admin@malaniimpex.com",
    "name": "Malani Admin",
    "role": "super-admin"
  }
}
```

---

## 🛠️ How It Works

### 1. Login Flow
```
User enters credentials
    ↓
Frontend sends POST to /api/auth/login
    ↓
Backend validates credentials
    ↓
Backend generates JWT token
    ↓
Frontend stores token in localStorage
    ↓
User redirected to dashboard
```

### 2. Protected Routes
```
User visits /admin/dashboard
    ↓
ProtectedRoute component checks authentication
    ↓
If not authenticated → Redirect to /admin
    ↓
If authenticated → Show dashboard
```

### 3. API Requests
```
Frontend makes API request
    ↓
Includes token in Authorization header
    ↓
Backend middleware verifies token
    ↓
If valid → Process request
    ↓
If invalid → Return 401 Unauthorized
```

---

## 🔧 Customization

### Change Token Expiration
Edit `backend/.env`:
```env
JWT_EXPIRE=30d  # 30 days
JWT_EXPIRE=24h  # 24 hours
JWT_EXPIRE=7d   # 7 days (default)
```

### Add More Admins
Use the seed script or create via API:
```javascript
POST /api/auth/register  // You need to create this endpoint
{
  "username": "newadmin",
  "email": "newadmin@example.com",
  "password": "SecurePass123",
  "name": "New Admin",
  "role": "admin"
}
```

### Change Default Credentials
Edit `backend/scripts/seedData.js`:
```javascript
const defaultAdmin = {
  username: 'yourusername',
  email: 'your@email.com',
  password: 'YourPassword123',
  name: 'Your Name',
  role: 'super-admin'
};
```

---

## 🐛 Troubleshooting

### Issue: "Invalid credentials"
**Solution:**
- Check username/password are correct
- Ensure database is seeded: `npm run seed`
- Check backend logs for errors

### Issue: "Token is invalid or expired"
**Solution:**
- Clear localStorage: `localStorage.clear()`
- Login again
- Check JWT_SECRET in backend .env

### Issue: Redirected to login after refresh
**Solution:**
- Check if token exists: `localStorage.getItem('adminToken')`
- Verify backend is running
- Check browser console for errors

### Issue: CORS error
**Solution:**
- Verify FRONTEND_URL in backend .env
- Restart backend server
- Check CORS configuration in server.js

---

## 📝 Next Steps

1. ✅ Test login functionality
2. ✅ Change default password
3. 🔄 Build product management pages
4. 🔄 Build inquiry management
5. 🔄 Add image upload functionality
6. 🔄 Add admin user management
7. 🔄 Add analytics/reports

---

## 🎉 Success Checklist

- [ ] Backend dependencies installed
- [ ] JWT_SECRET added to .env
- [ ] Database seeded with admin user
- [ ] Backend server running
- [ ] Frontend server running
- [ ] Can login at /admin
- [ ] Dashboard loads correctly
- [ ] Sidebar navigation works
- [ ] Logout works
- [ ] Protected routes redirect properly

---

## 📞 Production Deployment

### Important Changes for Production:

1. **Change JWT Secret:**
   ```env
   JWT_SECRET=use-a-very-long-random-string-here-minimum-32-characters
   ```

2. **Remove Default Credentials Display:**
   Edit `frontend/src/app/admin/page.jsx` and remove the credentials info box.

3. **Change Default Admin Password:**
   Login and use the change password feature.

4. **Enable HTTPS:**
   Always use HTTPS in production for secure token transmission.

5. **Set Secure Cookie Options:**
   Update backend to use secure cookies in production.

---

**Admin system is ready! 🎊**

Login at: http://localhost:3000/admin
Username: `admin`
Password: `Admin@123`
