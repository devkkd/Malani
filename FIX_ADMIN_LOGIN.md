# 🔧 Admin Login 401 Error - Complete Fix

## 🐛 Problem
```
401 Unauthorized - Invalid credentials
```

## ✅ Solution - 3 Steps

### Step 1: Add JWT Environment Variables (Render)

Go to Render Dashboard → malani backend → Environment

Add these:
```env
JWT_SECRET=malani-impex-super-secret-jwt-key-2024-change-in-production-min-32-chars
JWT_EXPIRE=7d
```

Click "Save Changes"

### Step 2: Create Admin User (Render Shell)

Go to Render Dashboard → malani backend → Shell tab

Run this command:
```bash
npm run create-admin
```

You'll see:
```
✅ Admin user created!
📧 Username: admin
🔑 Password: Admin@123
```

### Step 3: Login

Go to: `https://malani.vercel.app/admin`

Login with:
```
Username: admin
Password: Admin@123
```

## 🎯 Default Admin Credentials

```
Username: admin
Email: admin@malaniimpex.com
Password: Admin@123
```

## ✅ Done!

Admin login will work! 🎉
