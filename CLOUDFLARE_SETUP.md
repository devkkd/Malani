# ☁️ Cloudflare Images Setup Guide

## 🎯 What's Integrated

✅ Backend upload route (`/api/upload/image`)
✅ Frontend ImageUpload component
✅ Automatic image upload to Cloudflare
✅ Image preview before upload
✅ Delete functionality
✅ File validation (type & size)

---

## 📋 Setup Steps

### 1. Get Cloudflare Credentials

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your account
3. Go to **Images** section
4. Note your **Account ID** (top right)
5. Create API Token:
   - Go to **My Profile** → **API Tokens**
   - Click **Create Token**
   - Use template: **Edit Cloudflare Images**
   - Or create custom with permissions:
     - Account → Cloudflare Images → Edit
   - Copy the token (you won't see it again!)

### 2. Add to Backend .env

Edit `backend/.env`:

```env
# Cloudflare Images Configuration
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
CLOUDFLARE_API_TOKEN=your_api_token_here
```

### 3. Restart Backend

```bash
cd backend
# Stop current server (Ctrl+C)
npm run dev
```

---

## 🎨 How to Use in Admin

### Product Images:

1. Go to **Products → Add Product**
2. In **Images** section, click **"Click to upload image"**
3. Select image from your computer
4. Image automatically uploads to Cloudflare
5. Preview shows immediately
6. Cloudflare URL is saved in product
7. Click **X** to remove and upload different image

### Features:
- ✅ Drag & drop support
- ✅ Image preview
- ✅ Upload progress indicator
- ✅ File type validation (PNG, JPG, WEBP)
- ✅ File size validation (max 10MB)
- ✅ Error handling with toast notifications
- ✅ Remove and re-upload

---

## 🔧 Technical Details

### Upload Flow:
```
1. User selects image
2. Frontend converts to base64
3. Shows preview immediately
4. Sends to backend API
5. Backend uploads to Cloudflare
6. Returns Cloudflare URL
7. Frontend saves URL in form
```

### API Endpoints:

**Upload Image:**
```
POST /api/upload/image
Headers: Authorization: Bearer <token>
Body: { "image": "data:image/png;base64,..." }
Response: { 
  "success": true, 
  "data": { 
    "id": "...", 
    "url": "https://imagedelivery.net/...",
    "thumbnail": "..." 
  } 
}
```

**Delete Image:**
```
DELETE /api/upload/image/:imageId
Headers: Authorization: Bearer <token>
Response: { "success": true, "message": "Image deleted" }
```

---

## 📦 Component Usage

### In any admin form:

```jsx
import ImageUpload from '@/components/admin/ImageUpload';

// In your component:
const [imageUrl, setImageUrl] = useState('');

<ImageUpload 
  onUploadComplete={(url) => setImageUrl(url)}
  existingUrl={imageUrl}
/>
```

### Props:
- `onUploadComplete`: Callback function that receives uploaded image URL
- `existingUrl`: (Optional) Show existing image

---

## 🎯 Cloudflare Images Benefits

✅ **Fast CDN delivery** - Images served from nearest location
✅ **Automatic optimization** - Cloudflare optimizes images
✅ **Variants** - Multiple sizes automatically generated
✅ **Reliable** - 99.9% uptime
✅ **Affordable** - First 100,000 images free
✅ **No storage limits** - Pay only for what you use

---

## 💰 Pricing

- **Free tier:** 100,000 images stored
- **Delivery:** 100,000 requests/month free
- **After free tier:** $5/month per 100,000 images
- **Bandwidth:** Unlimited (included)

---

## 🔒 Security

✅ Protected routes (admin only)
✅ JWT authentication required
✅ File type validation
✅ File size limits
✅ Cloudflare API token secured in backend
✅ No direct client access to Cloudflare

---

## 🐛 Troubleshooting

### Issue: "Cloudflare credentials not configured"
**Fix:** Add CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN to backend/.env

### Issue: "Upload failed"
**Fix:** 
- Check Cloudflare API token is valid
- Verify Account ID is correct
- Check token has "Edit Cloudflare Images" permission

### Issue: "Image too large"
**Fix:** Resize image to under 10MB before uploading

### Issue: "Invalid file type"
**Fix:** Only PNG, JPG, JPEG, WEBP allowed

---

## 📝 Example .env

```env
# Backend .env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
CLOUDFLARE_ACCOUNT_ID=abc123def456
CLOUDFLARE_API_TOKEN=your-cloudflare-token-here
```

---

## ✅ Testing

1. Login to admin
2. Go to Products → Add Product
3. Click upload button in Images section
4. Select an image
5. Should see:
   - Preview immediately
   - "Uploading..." indicator
   - "Image uploaded successfully!" toast
   - Cloudflare URL in form

---

## 🚀 Production Ready

✅ Error handling
✅ Loading states
✅ File validation
✅ Secure API
✅ Toast notifications
✅ Image preview
✅ Remove functionality

**Your image upload system is production-ready!** 🎉

---

## 📚 Resources

- [Cloudflare Images Docs](https://developers.cloudflare.com/images/)
- [API Reference](https://developers.cloudflare.com/api/operations/cloudflare-images-upload-an-image-via-url)
- [Pricing](https://www.cloudflare.com/products/cloudflare-images/)
