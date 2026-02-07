# 🔧 Fix Cloudflare Authentication Error

## Problem
```
❌ Upload error: { success: false, errors: [ { code: 10000, message: 'Authentication error' } ] }
```

This means your API token doesn't have the correct permissions or is invalid.

---

## Solution: Create New API Token

### Step 1: Go to Cloudflare Dashboard
1. Open: https://dash.cloudflare.com/
2. Login to your account

### Step 2: Navigate to API Tokens
1. Click your **profile icon** (top right)
2. Click **My Profile**
3. Click **API Tokens** (left sidebar)
4. Click **Create Token** button

### Step 3: Use the Correct Template
1. Find **"Edit Cloudflare Images"** template
2. Click **Use template** button

**OR** if you don't see that template:

### Step 3 (Alternative): Create Custom Token
1. Click **Create Custom Token**
2. Set **Token name**: `Malani Images Upload`
3. Under **Permissions**, add:
   - **Account** → **Cloudflare Images** → **Edit**
4. Under **Account Resources**:
   - Select **Include** → **All accounts**
   - OR select your specific account
5. Under **Client IP Address Filtering** (optional):
   - Leave as **All IP addresses**
6. Under **TTL**:
   - Leave as default or set expiration date

### Step 4: Create and Copy Token
1. Click **Continue to summary**
2. Review the permissions
3. Click **Create Token**
4. **IMPORTANT**: Copy the token immediately (you won't see it again!)
5. The token should look like: `aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890`

### Step 5: Update .env File
Open `Malani/backend/.env` and replace the token:

```env
CLOUDFLARE_API_TOKEN=your_new_token_here
```

### Step 6: Restart Backend
```bash
cd Malani/backend
npm run dev
```

### Step 7: Test Upload Again
1. Go to http://localhost:3000/admin/products/create
2. Try uploading an image
3. Check terminal logs

---

## Expected Permissions

Your API token MUST have:
- ✅ **Account** → **Cloudflare Images** → **Edit** permission
- ✅ Access to your account (the one with Account ID: `3555ed54592ec9780d56e046396b6784`)

---

## Verify Your Account ID

While you're in the Cloudflare Dashboard:

1. Go to **Images** (left sidebar)
2. Check the **Account ID** shown at the top
3. Make sure it matches: `3555ed54592ec9780d56e046396b6784`
4. If different, update `CLOUDFLARE_ACCOUNT_ID` in `.env`

---

## Alternative: Use Global API Key (Not Recommended)

If you can't get the API token to work, you can use the Global API Key (less secure):

1. Go to **My Profile** → **API Tokens**
2. Scroll down to **Global API Key**
3. Click **View**
4. Copy the key

Then update the upload route to use:
```
X-Auth-Email: your-cloudflare-email@example.com
X-Auth-Key: your-global-api-key
```

But **API Token is preferred** for security!

---

## Common Issues

### Issue: "Account not found"
- Your Account ID is wrong
- Verify it in Dashboard → Images

### Issue: "Insufficient permissions"
- Token doesn't have "Edit" permission for Images
- Recreate token with correct permissions

### Issue: "Token expired"
- Token has expired
- Create a new token

---

## Need Help?

After creating the new token:
1. Update `.env` file
2. Restart backend
3. Try upload again
4. Send me the terminal logs if it still fails

The logs will show if it's still an auth error or a different issue.
