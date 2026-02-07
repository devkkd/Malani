# Cloudflare Images Integration - Complete Guide

## ✅ What's Already Done

### Backend
- ✅ Upload route created at `/api/upload/image` (POST)
- ✅ Delete route created at `/api/upload/image/:imageId` (DELETE)
- ✅ Routes registered in `server.js`
- ✅ Authentication middleware applied (admin only)
- ✅ Base64 to buffer conversion
- ✅ Error handling and validation

### Frontend
- ✅ `ImageUpload` component created with:
  - File selection and validation
  - Image preview
  - Upload progress indicator
  - Remove/re-upload functionality
- ✅ Integrated into product create page
- ✅ Multiple image support

### Configuration
- ✅ Environment variables added to `.env` and `.env.example`
- ✅ CORS configured for image uploads

---

## 🔧 What You Need to Do

### Step 1: Get Cloudflare Credentials

1. **Sign up for Cloudflare** (if you haven't already)
   - Go to https://dash.cloudflare.com/sign-up
   - Create a free account

2. **Enable Cloudflare Images**
   - Go to https://dash.cloudflare.com/
   - Navigate to **Images** in the left sidebar
   - Click **Get Started** if not already enabled
   - Note: Cloudflare Images has a free tier with 100,000 images

3. **Get Your Account ID**
   - In the Cloudflare Dashboard, go to **Images**
   - Your **Account ID** is displayed at the top
   - Copy this ID

4. **Create an API Token**
   - Go to **My Profile** (top right) > **API Tokens**
   - Click **Create Token**
   - Use the **Edit Cloudflare Images** template
   - Or create a custom token with these permissions:
     - Account > Cloudflare Images > Edit
   - Click **Continue to Summary** > **Create Token**
   - **IMPORTANT**: Copy the token immediately (you won't see it again!)

### Step 2: Update Backend Environment Variables

Open `Malani/backend/.env` and replace the placeholder values:

```env
CLOUDFLARE_ACCOUNT_ID=your_actual_account_id_here
CLOUDFLARE_API_TOKEN=your_actual_api_token_here
```

### Step 3: Restart Backend Server

```bash
cd Malani/backend
npm run dev
```

### Step 4: Test the Integration

1. **Login to Admin Dashboard**
   - Go to http://localhost:3000/admin
   - Login with: admin / Admin@123

2. **Create a Product**
   - Navigate to Products > Create New Product
   - Fill in the basic information
   - In the Images section, click "Click to upload image"
   - Select an image file (PNG, JPG, WEBP up to 10MB)
   - Wait for upload to complete
   - You should see the image preview

3. **Verify Upload**
   - Check browser console for any errors
   - Check backend terminal for upload logs
   - The image URL should be a Cloudflare URL like:
     `https://imagedelivery.net/[account-hash]/[image-id]/public`

---

## 🎯 How It Works

### Upload Flow

1. **User selects image** → File validation (type, size)
2. **Convert to base64** → Show preview immediately
3. **Send to backend** → POST `/api/upload/image` with base64 data
4. **Backend converts** → Base64 to Buffer
5. **Upload to Cloudflare** → Using Cloudflare Images API
6. **Return URL** → Cloudflare image URL saved to product
7. **Display** → Image shown from Cloudflare CDN

### Image Variants

Cloudflare automatically creates optimized variants:
- **public**: Full-size image
- **thumbnail**: Smaller version for previews
- Custom variants can be configured in Cloudflare Dashboard

---

## 🐛 Troubleshooting

### Error: "Cloudflare credentials not configured"
- Check that `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` are set in `.env`
- Restart the backend server after updating `.env`

### Error: "Failed to upload image to Cloudflare"
- Verify your API token has the correct permissions
- Check that your Cloudflare Images service is enabled
- Look at backend console for detailed error messages

### Error: "Image size must be less than 10MB"
- The image file is too large
- Compress the image before uploading
- Or increase the limit in `ImageUpload.jsx` (line 24)

### Upload is slow
- This is normal for large images
- Cloudflare Images optimizes on upload
- Consider showing a progress bar (future enhancement)

### Images not displaying
- Check browser console for CORS errors
- Verify the Cloudflare URL is accessible
- Check that the image was actually uploaded (check Cloudflare Dashboard > Images)

---

## 📝 API Reference

### POST /api/upload/image

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Body:**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "cloudflare-image-id",
    "url": "https://imagedelivery.net/.../public",
    "thumbnail": "https://imagedelivery.net/.../thumbnail"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error"
}
```

### DELETE /api/upload/image/:imageId

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

---

## 🚀 Next Steps (Optional Enhancements)

1. **Add Progress Bar**
   - Show upload percentage
   - Use XMLHttpRequest instead of fetch

2. **Image Cropping**
   - Add client-side image cropping
   - Use libraries like `react-image-crop`

3. **Bulk Upload**
   - Allow multiple images at once
   - Show upload queue

4. **Image Optimization**
   - Compress images before upload
   - Use libraries like `browser-image-compression`

5. **Delete Old Images**
   - When updating product images
   - Clean up unused images from Cloudflare

---

## 💰 Cloudflare Images Pricing

- **Free Tier**: 100,000 images stored, 500,000 images delivered/month
- **Paid**: $5/month for 100,000 images stored, $1 per 100,000 delivered
- More info: https://www.cloudflare.com/products/cloudflare-images/

---

## 📚 Additional Resources

- [Cloudflare Images Documentation](https://developers.cloudflare.com/images/)
- [Cloudflare Images API](https://developers.cloudflare.com/api/operations/cloudflare-images-upload-an-image-via-url)
- [Cloudflare Dashboard](https://dash.cloudflare.com/)

---

## ✅ Checklist

- [ ] Cloudflare account created
- [ ] Cloudflare Images enabled
- [ ] Account ID copied
- [ ] API Token created with correct permissions
- [ ] `.env` file updated with credentials
- [ ] Backend server restarted
- [ ] Test upload successful
- [ ] Images displaying correctly

---

**Status**: Integration complete, awaiting Cloudflare credentials configuration.

**Last Updated**: February 7, 2026
