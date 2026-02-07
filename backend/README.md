# Malani Impex Backend API

Production-ready Node.js + Express + MongoDB backend for Malani Impex textile website.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user (Database Access)
4. Whitelist your IP (Network Access) - Add `0.0.0.0/0` for all IPs
5. Get your connection string from "Connect" → "Connect your application"

### 3. Environment Variables

Create `.env` file in backend folder:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/malani-impex?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:3000
PRODUCTION_URL=https://your-domain.com
```

Replace `username`, `password`, and cluster URL with your MongoDB Atlas credentials.

### 4. Run Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Seasons
- `GET /api/seasons` - Get all seasons
- `GET /api/seasons/:id` - Get single season
- `POST /api/seasons` - Create season
- `PUT /api/seasons/:id` - Update season

### Techniques
- `GET /api/techniques` - Get all techniques
- `GET /api/techniques/:slug` - Get single technique
- `POST /api/techniques` - Create technique
- `PUT /api/techniques/:slug` - Update technique

### Inquiries
- `POST /api/inquiries` - Submit inquiry
- `GET /api/inquiries` - Get all inquiries (admin)
- `GET /api/inquiries/:id` - Get single inquiry
- `PATCH /api/inquiries/:id/status` - Update inquiry status

## 🔒 Security Features

- Helmet.js for security headers
- CORS protection
- Rate limiting (100 requests per 15 minutes)
- Input validation with Mongoose
- Error handling middleware

## 📦 Production Deployment

### Vercel / Netlify
1. Push code to GitHub
2. Connect repository
3. Add environment variables
4. Deploy

### Railway / Render
1. Create new project
2. Connect GitHub repo
3. Add environment variables
4. Auto-deploy on push

### VPS (DigitalOcean, AWS, etc.)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone and setup
git clone your-repo
cd backend
npm install
pm2 start server.js --name malani-api
pm2 save
pm2 startup
```

## 🗄️ Database Models

- **Product**: Textile products with images, specs, pricing
- **Season**: Collections (Summer, Festival, Winter, Classics)
- **Technique**: Weaving/printing techniques
- **Inquiry**: Customer inquiries and requests

## 🛠️ Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Security: Helmet, CORS, Rate Limiting
- Compression & Morgan logging
