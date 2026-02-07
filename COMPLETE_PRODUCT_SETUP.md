# Complete Product Creation Setup Guide

## Overview
This guide will help you set up and create products in the Malani Impex admin dashboard with Cloudflare Images integration.

## Prerequisites Checklist

### 1. Backend Running ✓
- Backend server is running on `http://localhost:5000`
- MongoDB Atlas is connected
- All routes are registered

### 2. Frontend Running
- Frontend should be running on `http://localhost:3000`
- Admin dashboard accessible at `http://localhost:3000/admin`

### 3. Admin Account ✓
- Username: `admin`
- Password: `Admin@123`
- Created via seed script

---

## Step-by-Step Setup

### Step 1: Configure Cloudflare Images

#### A. Get Cloudflare Credentials

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Images** section
3. Copy your **Account ID** (shown at the top)
4. Create an API Token:
   - Go to **My Profile** > **API Tokens**
   - Click **Create Token**
   - Use template: **Edit Cloudflare Images**
   - Or create custom token with permission: **Account > Cloudflare Images > Edit**
   - Copy the generated token

#### B. Update Backend .env File

Open `Malani/backend/.env` and replace these lines:

```env
CLOUDFLARE_ACCOUNT_ID=your_actual_account_id_here
CLOUDFLARE_API_TOKEN=your_actual_api_token_here
```

#### C. Restart Backend Server

After updating .env, restart the backend:
```bash
cd Malani/backend
# Stop the current server (Ctrl+C)
npm start
```

---

### Step 2: Create Techniques (Mandatory)

Before creating products, you MUST create at least one technique.

1. Login to admin dashboard: `http://localhost:3000/admin`
2. Go to **Techniques** page
3. Click **Add Technique**
4. Enter:
   - **Name**: e.g., "Hand Block Printing"
   - **Slug**: Auto-generated (e.g., "hand-block-printing")
5. Click **Create**

**Example Techniques to Create:**
- Hand Block Printing
- Embroidery
- Tie & Dye
- Screen Printing
- Digital Printing

---

### Step 3: Create Seasons (Optional)

Seasons are optional but useful for seasonal products.

1. Go to **Seasons** page
2. Click **Add Season**
3. Enter:
   - **Name**: e.g., "Spring/Summer"
   - **Slug**: Auto-generated
4. Click **Create**

**Example Seasons to Create:**
- Spring/Summer
- Autumn/Winter
- Festive Collection
- Wedding Collection

---

### Step 4: Create Your First Product

1. Go to **Products** page
2. Click **Create Product**
3. Fill in the form:

#### Basic Information (Required)
- **Product Name**: e.g., "Hand Block Printed Cotton Cushion Cover"
- **Slug**: Auto-generated
- **Model Number**: e.g., "HBCP-001"
- **Brand Name**: Malani Impex Inc (pre-filled)
- **Technique**: Select from dropdown (MANDATORY)
- **Season**: Select from dropdown or leave as "No Season" (OPTIONAL)
- **Description**: Detailed product description

#### Product Images
- Click **"Click to upload image"** in the image upload area
- Select an image file (PNG, JPG, WEBP up to 10MB)
- Image will be uploaded to Cloudflare automatically
- Add **Alt Text** for accessibility
- Check **"Set as Primary Image"** for the main product image
- Click **"Add Image"** to add more images

#### B2B Pricing Tiers
- **Min Quantity**: e.g., 100
- **Max Quantity**: e.g., 299
- **Price Per Unit**: e.g., 42
- **Label**: e.g., "100-299 pieces"
- Click **"Add Tier"** for more pricing tiers

#### Available Sizes
- **Size**: e.g., 12" x 12"
- **Dimensions**: e.g., 30cm x 30cm
- **Available**: Check if in stock
- Click **"Add Size"** for more sizes

#### Product Specifications
- Material: e.g., Cotton
- Fabric: e.g., 100% Cotton
- Pattern: e.g., Floral
- Style: e.g., Traditional
- Shape: e.g., Square
- Use: e.g., Home Decoration
- Closure Type: e.g., Zipper
- Color Technique: e.g., Natural Dyes
- Place of Origin: India (pre-filled)

#### Product Features
- Add key features like:
  - "Eco-friendly natural dyes"
  - "Handmade by skilled artisans"
  - "Machine washable"
  - "Reversible design"
- Click **"Add Feature"** for more

#### Customization Options
- Check **"Customization Available"** if applicable
- Check **"Bulk Orders with Custom Design"** if applicable
- Add customization options:
  - "Custom Size"
  - "Custom Color"
  - "Custom Design"

#### Craft Details
- **Process**: e.g., "Hand Block Printing"
- **Technique**: e.g., "Traditional Wooden Blocks"
- **Time to Create**: e.g., "2-3 days"
- **Artisan Info**: e.g., "Made by skilled artisans from Rajasthan"

#### Additional Settings
- **OEM Service**: Available / Not Available / Customizable
- **In Stock**: Check if available
- **Featured Product**: Check to feature on homepage
- **Active**: Check to make visible on website

4. Click **"Create Product"**

---

## Product Display Logic

### Techniques Section (Frontend)
- Shows ALL products that have a technique selected
- Products appear here regardless of season

### Seasons Section (Frontend)
- Shows ONLY products that have BOTH technique AND season selected
- Products without season will NOT appear here

### Example:
```
Product A: Technique = "Hand Block Printing", Season = "Spring/Summer"
→ Shows in: Techniques section AND Seasons section

Product B: Technique = "Embroidery", Season = null
→ Shows in: Techniques section ONLY
```

---

## Troubleshooting

### Issue: "Failed to upload image"
**Solution:**
1. Check Cloudflare credentials in `backend/.env`
2. Restart backend server
3. Check browser console for detailed error
4. Verify image size is under 10MB

### Issue: "Technique is required"
**Solution:**
1. Create at least one technique first
2. Select technique from dropdown before submitting

### Issue: "401 Unauthorized"
**Solution:**
1. Login again to admin dashboard
2. Check if JWT token is valid
3. Token expires after 7 days

### Issue: "400 Bad Request"
**Solution:**
1. Check backend logs for validation errors
2. Ensure all required fields are filled:
   - Product Name
   - Slug
   - Technique (mandatory)
   - At least one image with URL
   - At least one pricing tier
   - At least one size

---

## Backend API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Techniques
- `GET /api/techniques` - Get all techniques
- `POST /api/techniques` - Create technique (Admin)
- `PUT /api/techniques/:id` - Update technique (Admin)
- `DELETE /api/techniques/:id` - Delete technique (Admin)

### Seasons
- `GET /api/seasons` - Get all seasons
- `POST /api/seasons` - Create season (Admin)
- `PUT /api/seasons/:id` - Update season (Admin)
- `DELETE /api/seasons/:id` - Delete season (Admin)

### Upload
- `POST /api/upload/image` - Upload image to Cloudflare (Admin)
- `DELETE /api/upload/image/:imageId` - Delete image from Cloudflare (Admin)

---

## Next Steps

1. ✅ Configure Cloudflare credentials
2. ✅ Create techniques
3. ✅ Create seasons (optional)
4. ✅ Create your first product
5. Test product display on frontend
6. Add more products
7. Configure product filters and search

---

## Support

If you encounter any issues:
1. Check backend logs in terminal
2. Check browser console for frontend errors
3. Verify all environment variables are set
4. Ensure MongoDB connection is active
5. Restart both frontend and backend servers

---

## Admin Credentials

**URL**: http://localhost:3000/admin
**Username**: admin
**Password**: Admin@123

⚠️ **IMPORTANT**: Change the admin password after first login from Settings page!
