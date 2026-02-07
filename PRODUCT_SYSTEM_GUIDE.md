# 🛍️ Product System Guide - B2B Flow

## 📋 System Overview

### Product Flow Logic:
1. **Techniques** (Mandatory) - Every product MUST have a technique
2. **Seasons** (Optional) - Products can optionally belong to a season
3. **Frontend Display:**
   - **Techniques Section:** Shows ALL products
   - **Seasons Section:** Shows ONLY products with a season assigned

---

## 🗂️ Data Models

### 1. Technique Model (Simple)
```javascript
{
  name: String,        // e.g., "Hand Block Printed"
  slug: String,        // e.g., "hand-block-printed"
  active: Boolean,
  displayOrder: Number
}
```

### 2. Season Model (Simple)
```javascript
{
  name: String,        // e.g., "Summer Collection"
  slug: String,        // e.g., "summer"
  active: Boolean,
  displayOrder: Number
}
```

### 3. Product Model (Complete B2B)
```javascript
{
  // Basic Info
  name: String,
  slug: String,
  modelNumber: String,
  brandName: String,
  
  // Relationships
  technique: ObjectId (ref: Technique) - REQUIRED,
  season: ObjectId (ref: Season) - OPTIONAL,
  
  // Images
  images: [{
    url: String,
    alt: String,
    isPrimary: Boolean
  }],
  
  // B2B Pricing Tiers
  pricingTiers: [{
    minQuantity: Number,      // 100
    maxQuantity: Number,      // 299
    pricePerUnit: Number,     // 42
    label: String            // "100 - 299 pieces ₹42"
  }],
  
  // Multiple Sizes
  sizes: [{
    size: String,            // "12" x 12" (30cm x 30cm)"
    dimensions: String,
    available: Boolean
  }],
  
  // Specifications
  specifications: {
    material: String,
    fabric: String,
    pattern: String,
    style: String,
    shape: String,
    use: String,
    closureType: String,
    colorTechnique: String,
    placeOfOrigin: String
  },
  
  // Features
  features: [String],
  
  // Customization
  customization: {
    available: Boolean,
    options: [String],
    bulkOrdersWithDesign: Boolean
  },
  
  // OEM Service
  oemService: String,  // "Available", "Not Available", "Customizable"
  
  // Description & Craft
  description: String,
  craftDetails: {
    process: String,
    technique: String,
    timeToCreate: String,
    artisanInfo: String
  },
  
  // Status
  inStock: Boolean,
  featured: Boolean,
  active: Boolean
}
```

---

## 📡 API Endpoints

### Public Endpoints

#### Get All Products
```
GET /api/products
Query params:
  - technique: ObjectId (filter by technique)
  - season: ObjectId or "none" (filter by season or no season)
  - featured: Boolean
  - search: String
  - page: Number
  - limit: Number
```

#### Get Products by Technique
```
GET /api/products/by-technique/:techniqueSlug
Returns: All products with that technique
```

#### Get Products by Season
```
GET /api/products/by-season/:seasonSlug
Returns: Only products with that season
```

#### Get Single Product
```
GET /api/products/:slug
Returns: Product with populated technique and season
```

#### Get All Techniques
```
GET /api/techniques
Returns: All active techniques
```

#### Get All Seasons
```
GET /api/seasons
Returns: All active seasons
```

### Admin Endpoints (Protected)

#### Create Product
```
POST /api/products
Headers: Authorization: Bearer <token>
Body: Product object (technique is required)
```

#### Update Product
```
PUT /api/products/:id
Headers: Authorization: Bearer <token>
Body: Updated product data
```

#### Delete Product
```
DELETE /api/products/:id
Headers: Authorization: Bearer <token>
```

#### Technique CRUD
```
POST /api/techniques
PUT /api/techniques/:id
DELETE /api/techniques/:id
```

#### Season CRUD
```
POST /api/seasons
PUT /api/seasons/:id
DELETE /api/seasons/:id
```

---

## 🎨 Frontend Display Logic

### Techniques Section (Shows ALL Products)
```javascript
// Get all products
const response = await fetch('/api/products');
const products = response.data;

// OR get by specific technique
const response = await fetch('/api/products/by-technique/hand-block-printed');
```

### Seasons Section (Shows ONLY Seasonal Products)
```javascript
// Get products with specific season
const response = await fetch('/api/products/by-season/summer');
const seasonalProducts = response.data;

// These products will also appear in techniques section
```

### Product Without Season
```javascript
// Product with technique but no season
{
  technique: "handloom",
  season: null  // Will show ONLY in techniques section
}
```

### Product With Season
```javascript
// Product with both technique and season
{
  technique: "hand-block-printed",
  season: "summer"  // Will show in BOTH sections
}
```

---

## 💼 B2B Features

### 1. Pricing Tiers
```javascript
pricingTiers: [
  { minQuantity: 100, maxQuantity: 299, pricePerUnit: 42, label: "100 - 299 pieces ₹42" },
  { minQuantity: 300, maxQuantity: 499, pricePerUnit: 38, label: "300 - 499 pieces ₹38" },
  { minQuantity: 500, pricePerUnit: 35, label: "≥ 500 pieces ₹35" }
]
```

### 2. Multiple Sizes
```javascript
sizes: [
  { size: '12" x 12" (30cm x 30cm)', available: true },
  { size: '16" x 16" (40cm x 40cm)', available: true },
  { size: '18" x 18" (45cm x 45cm) Most Popular', available: true },
  { size: 'Custom Size Available', available: true }
]
```

### 3. Customization Options
```javascript
customization: {
  available: true,
  options: [
    'Custom colors and shapes',
    'Color variations',
    'Pattern modifications',
    'Logo/branding (for quantity applied)',
    'Bulk orders with your design'
  ],
  bulkOrdersWithDesign: true
}
```

### 4. Key Attributes
```javascript
specifications: {
  material: 'Premium Cotton',
  fabric: '100% Premium Cotton',
  pattern: 'Floral',
  style: 'Bohemian',
  shape: 'Square',
  use: 'Home Décor',
  closureType: 'Hidden Zipper',
  colorTechnique: 'Shade & 5% Natural (Botanical)',
  placeOfOrigin: 'Rajasthan, India'
}
```

---

## 🔄 Example Workflows

### Creating a Product (Admin)

#### 1. Create Technique First
```javascript
POST /api/techniques
{
  "name": "Hand Block Printed",
  "slug": "hand-block-printed"
}
```

#### 2. Create Season (Optional)
```javascript
POST /api/seasons
{
  "name": "Summer Collection",
  "slug": "summer"
}
```

#### 3. Create Product
```javascript
POST /api/products
{
  "name": "Cotton Cushion Cover",
  "slug": "cotton-cushion-cover",
  "technique": "<technique_id>",  // Required
  "season": "<season_id>",        // Optional (null for no season)
  "pricingTiers": [...],
  "sizes": [...],
  // ... other fields
}
```

### Frontend Display

#### Techniques Page
```javascript
// Show all products grouped by technique
const techniques = await fetch('/api/techniques');

for (const technique of techniques.data) {
  const products = await fetch(`/api/products/by-technique/${technique.slug}`);
  // Display all products for this technique
}
```

#### Seasons Page
```javascript
// Show only seasonal products
const seasons = await fetch('/api/seasons');

for (const season of seasons.data) {
  const products = await fetch(`/api/products/by-season/${season.slug}`);
  // Display only products with this season
}
```

---

## 🧪 Testing

### Seed Database
```bash
cd backend
npm run seed
```

This creates:
- 5 Techniques
- 4 Seasons
- 2 Sample Products:
  - Product 1: With season (shows in both sections)
  - Product 2: Without season (shows only in techniques)

### Test API
```bash
# Get all products
curl http://localhost:5000/api/products

# Get products by technique
curl http://localhost:5000/api/products/by-technique/hand-block-printed

# Get products by season
curl http://localhost:5000/api/products/by-season/summer

# Get products without season
curl http://localhost:5000/api/products?season=none
```

---

## ✅ Key Points

1. ✅ **Technique is MANDATORY** for every product
2. ✅ **Season is OPTIONAL** for products
3. ✅ Products with season show in **BOTH** sections
4. ✅ Products without season show **ONLY** in techniques section
5. ✅ Multiple pricing tiers for B2B
6. ✅ Multiple sizes support
7. ✅ Customization options
8. ✅ Complete product specifications
9. ✅ Admin can manage techniques, seasons, and products
10. ✅ Frontend can filter by technique or season

---

## 🚀 Next Steps

1. Run seed: `npm run seed`
2. Test API endpoints
3. Build admin CRUD pages for:
   - Techniques management
   - Seasons management
   - Products management
4. Build frontend product display pages
5. Integrate with existing website

---

**System is ready for B2B textile business!** 🎊
