# 🚀 Complete Setup Guide - Malani Impex

## Step-by-Step Setup (Hindi + English)

### 1️⃣ MongoDB Atlas Setup

**English:**
1. Visit https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new cluster (free M0 tier)
4. Wait 3-5 minutes for cluster creation

**Hindi:**
1. MongoDB Atlas pe jao aur free account banao
2. New cluster create karo (free M0)
3. 3-5 minute wait karo cluster ready hone ke liye

### 2️⃣ Database User & Network Access

**Create Database User:**
1. Click "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Username: `malani_admin`
4. Password: Generate strong password (save it!)
5. Database User Privileges: "Read and write to any database"
6. Click "Add User"

**Network Access:**
1. Click "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 3️⃣ Get Connection String

1. Click "Database" (left sidebar)
2. Click "Connect" button on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with `malani-impex`

Example:
```
mongodb+srv://malani_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/malani-impex?retryWrites=true&w=majority
```

### 4️⃣ Backend Setup

```bash
# Terminal me backend folder me jao
cd Malani/backend

# Dependencies install karo
npm install

# .env file banao
# Windows:
copy .env.example .env

# Mac/Linux:
cp .env.example .env
```

**Edit `.env` file:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://malani_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/malani-impex?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:3000
PRODUCTION_URL=https://your-domain.com
```

**Start Backend:**
```bash
npm run dev
```

✅ Backend running on http://localhost:5000

**Seed Sample Data (Optional):**
```bash
npm run seed
```

### 5️⃣ Frontend Setup

```bash
# New terminal me frontend folder me jao
cd Malani/frontend

# Dependencies install karo
npm install

# .env.local file banao
# Windows:
copy .env.local.example .env.local

# Mac/Linux:
cp .env.local.example .env.local
```

**Edit `.env.local` file:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Start Frontend:**
```bash
npm run dev
```

✅ Frontend running on http://localhost:3000

### 6️⃣ Test Everything

1. Open browser: http://localhost:3000
2. Check if website loads
3. Check browser console for errors
4. Test API: http://localhost:5000/health

## 🐛 Common Issues & Solutions

### Issue 1: MongoDB Connection Failed
**Error:** `MongoServerError: bad auth`
**Solution:** 
- Check username/password in .env
- Make sure password doesn't have special characters (or encode them)
- Verify database user is created in Atlas

### Issue 2: CORS Error
**Error:** `Access to fetch blocked by CORS policy`
**Solution:**
- Check FRONTEND_URL in backend .env matches your frontend URL
- Restart backend server after changing .env

### Issue 3: Port Already in Use
**Error:** `Port 5000 is already in use`
**Solution:**
```bash
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

### Issue 4: Module Not Found
**Error:** `Cannot find module`
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📞 Need Help?

Check these files:
- `backend/README.md` - Backend documentation
- `README.md` - Project overview
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/

## 🎉 Success Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Backend .env file configured
- [ ] Backend running on port 5000
- [ ] Frontend .env.local configured
- [ ] Frontend running on port 3000
- [ ] Website loads without errors
- [ ] API health check works

Sab kuch working hai? Congratulations! 🎊
