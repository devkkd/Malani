# Malani Impex - Textile Business Website

Full-stack textile business website with Next.js frontend and Node.js + MongoDB backend.

## 🏗️ Project Structure

```
Malani/
├── frontend/          # Next.js 15 frontend
│   ├── src/
│   │   ├── app/      # App router pages
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   └── lib/      # API integration
│   └── public/
└── backend/          # Node.js + Express API
    ├── config/       # Database config
    ├── models/       # Mongoose models
    ├── routes/       # API routes
    ├── middleware/
    └── scripts/      # Seed data
```

## 🚀 Quick Setup

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env and add your MongoDB Atlas URI
# Get it from: https://cloud.mongodb.com

# Start backend server
npm run dev
```

Backend runs on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local

# Start frontend
npm run dev
```

Frontend runs on `http://localhost:3000`

## 🗄️ MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account and cluster
3. Create database user (Database Access)
4. Whitelist IP: `0.0.0.0/0` (Network Access)
5. Get connection string: Connect → Drivers
6. Add to `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/malani-impex
   ```

### Seed Sample Data

```bash
cd backend
npm run seed
```

## 📡 API Endpoints

- **Products**: `/api/products`
- **Seasons**: `/api/seasons`
- **Techniques**: `/api/techniques`
- **Inquiries**: `/api/inquiries`

See `backend/README.md` for detailed API documentation.

## 🛠️ Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- React Hot Toast

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Helmet, CORS, Rate Limiting
- Compression & Morgan

## 📦 Production Deployment

### Backend (Railway/Render/Vercel)
1. Push to GitHub
2. Connect repository
3. Add environment variables
4. Deploy

### Frontend (Vercel)
1. Connect GitHub repo
2. Add `NEXT_PUBLIC_API_URL` env variable
3. Deploy

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_uri
FRONTEND_URL=http://localhost:3000
PRODUCTION_URL=https://your-domain.com
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🔒 Security Features

- Helmet.js security headers
- CORS protection
- Rate limiting
- Input validation
- Error handling

## 📄 License

Private - Malani Impex