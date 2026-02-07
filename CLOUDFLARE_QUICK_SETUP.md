# Cloudflare Images - Quick Setup (5 Minutes)

## What You Need

1. Cloudflare Account (Free tier works!)
2. Account ID
3. API Token

---

## Step 1: Get Account ID (1 minute)

1. Go to: https://dash.cloudflare.com/
2. Click on **Images** in the left sidebar
3. Your **Account ID** is displayed at the top
4. Copy it

---

## Step 2: Create API Token (2 minutes)

1. Click your profile icon (top right)
2. Go to **My Profile** > **API Tokens**
3. Click **Create Token**
4. Find **"Edit Cloudflare Images"** template
5. Click **Use template**
6. Click **Continue to summary**
7. Click **Create Token**
8. **COPY THE TOKEN NOW** (you won't see it again!)

---

## Step 3: Update Backend .env (1 minute)

Open `Malani/backend/.env` and update:

```env
CLOUDFLARE_ACCOUNT_ID=paste_your_account_id_here
CLOUDFLARE_API_TOKEN=paste_your_api_token_here
```

---

## Step 4: Restart Backend (1 minute)

```bash
cd Malani/backend
# Press Ctrl+C to stop current server
npm start
```

---

## Done! ✅

Now you can upload images in the admin dashboard:
1. Go to http://localhost:3000/admin/products/create
2. Click "Click to upload image"
3. Select an image
4. It will automatically upload to Cloudflare!

---

## Troubleshooting

### "Cloudflare credentials not configured"
- Check if you saved the .env file
- Restart the backend server
- Verify no extra spaces in credentials

### "Failed to upload image"
- Check image size (must be under 10MB)
- Check image format (PNG, JPG, WEBP)
- Check Cloudflare dashboard for quota limits

### "401 Unauthorized" from Cloudflare
- API token might be invalid
- Create a new token with "Edit Cloudflare Images" permission
- Update .env and restart backend

---

## Free Tier Limits

Cloudflare Images Free Tier:
- ✅ 100,000 images served per month
- ✅ Unlimited storage
- ✅ Automatic optimization
- ✅ Global CDN delivery

Perfect for getting started!

---

## Alternative: Skip Cloudflare (Temporary)

If you want to test without Cloudflare:
1. Use direct image URLs (from any CDN or hosting)
2. Paste URL directly in the image URL field
3. Set up Cloudflare later when ready

But Cloudflare is recommended for:
- ✅ Automatic image optimization
- ✅ Fast global delivery
- ✅ Responsive images
- ✅ WebP conversion
- ✅ Security
