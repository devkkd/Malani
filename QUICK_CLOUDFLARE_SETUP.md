# 🚀 Quick Cloudflare Setup (5 Minutes)

## Step 1: Get Credentials

1. **Go to**: https://dash.cloudflare.com/
2. **Login or Sign Up** (free account)
3. **Click**: Images (left sidebar)
4. **Copy**: Account ID (shown at top)
5. **Click**: My Profile (top right) → API Tokens
6. **Click**: Create Token
7. **Select**: Edit Cloudflare Images template
8. **Click**: Create Token
9. **Copy**: The token (you won't see it again!)

## Step 2: Update .env

Open `Malani/backend/.env` and paste your credentials:

```env
CLOUDFLARE_ACCOUNT_ID=paste_your_account_id_here
CLOUDFLARE_API_TOKEN=paste_your_token_here
```

## Step 3: Restart Backend

```bash
cd Malani/backend
npm run dev
```

## Step 4: Test

1. Go to: http://localhost:3000/admin
2. Login: admin / Admin@123
3. Click: Products → Create New Product
4. Scroll to: Images section
5. Click: "Click to upload image"
6. Select: Any image file
7. Wait: Upload completes
8. See: Image preview

## ✅ Done!

Your images are now stored on Cloudflare's global CDN and will load super fast for users worldwide.

---

## Need Help?

See `CLOUDFLARE_IMAGES_INTEGRATION.md` for detailed guide and troubleshooting.
