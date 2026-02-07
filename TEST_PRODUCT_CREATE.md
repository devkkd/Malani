# 🧪 Test Product Creation

## Steps to Debug & Test

### 1. First Create a Technique
Go to: http://localhost:3000/admin/techniques

Click "Add Technique" and create:
- Name: `Hand Block Printed`
- Slug: `hand-block-printed` (auto-generated)
- Display Order: `1`
- Active: ✓

**Copy the Technique ID from the card or browser console**

### 2. Create a Season (Optional)
Go to: http://localhost:3000/admin/seasons

Click "Add Season" and create:
- Name: `Summer Collection`
- Slug: `summer`
- Display Order: `1`
- Active: ✓

### 3. Create Product with Minimal Data
Go to: http://localhost:3000/admin/products/create

Fill ONLY required fields:
- **Product Name:** `Test Cotton Cushion`
- **Slug:** `test-cotton-cushion` (auto-generated)
- **Technique:** Select the technique you created
- **Season:** Leave empty or select one

**Images Section:**
- URL: `/images/test.jpg`
- Alt: `Test`
- Primary: ✓

**Pricing Tiers:**
- Min Quantity: `100`
- Max Quantity: `299`
- Price Per Unit: `50`
- Label: `100-299 pieces`

**Sizes:**
- Size: `12" x 12"`
- Dimensions: `30cm x 30cm`
- Available: ✓

**Status:**
- In Stock: ✓
- Featured: (leave unchecked)
- Active: ✓

Click "Create Product"

### 4. Check Browser Console
Open DevTools (F12) → Console tab

Look for:
```
Submitting product data: {...}
Response: {...}
```

### 5. Check Backend Logs
Look at backend terminal for:
```
Creating product with data: {...}
Product created successfully: 6...
```

OR error:
```
Product creation error: ...
```

---

## Common Issues & Fixes

### Issue 1: "technique is required"
**Fix:** Make sure you selected a technique from dropdown

### Issue 2: "Cast to ObjectId failed"
**Fix:** Technique ID is invalid. Create technique first and select from dropdown.

### Issue 3: "images is required"
**Fix:** Add at least one image URL

### Issue 4: "pricingTiers is required"
**Fix:** Add at least one pricing tier

### Issue 5: "sizes is required"
**Fix:** Add at least one size

---

## Minimal Valid Product JSON

```json
{
  "name": "Test Product",
  "slug": "test-product",
  "technique": "VALID_TECHNIQUE_ID",
  "season": null,
  "images": [
    {
      "url": "/images/test.jpg",
      "alt": "Test",
      "isPrimary": true
    }
  ],
  "pricingTiers": [
    {
      "minQuantity": 100,
      "maxQuantity": 299,
      "pricePerUnit": 50,
      "label": "100-299 pieces"
    }
  ],
  "sizes": [
    {
      "size": "Medium",
      "dimensions": "30cm x 30cm",
      "available": true
    }
  ],
  "specifications": {},
  "features": [],
  "customization": {
    "available": true,
    "options": [],
    "bulkOrdersWithDesign": false
  },
  "oemService": "Available",
  "inStock": true,
  "featured": false,
  "active": true
}
```

---

## Testing Workflow

1. ✅ Login to admin
2. ✅ Create at least 1 technique
3. ✅ (Optional) Create 1 season
4. ✅ Go to Products → Add Product
5. ✅ Fill minimal required fields
6. ✅ Submit
7. ✅ Check console for errors
8. ✅ Check backend logs
9. ✅ If success, product appears in products list

---

## Debug Checklist

- [ ] Backend is running (port 5000)
- [ ] Frontend is running (port 3000/3001)
- [ ] Logged in as admin
- [ ] Fresh token (login again if needed)
- [ ] At least 1 technique exists
- [ ] Technique selected in form
- [ ] All required fields filled
- [ ] Browser console open
- [ ] Backend terminal visible
- [ ] No CORS errors
- [ ] MongoDB connected

---

**If still failing, share:**
1. Browser console output
2. Backend terminal output
3. Screenshot of form data
