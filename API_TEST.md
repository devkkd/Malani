# 🧪 API Testing Guide

## Test Backend API

### 1. Health Check
```bash
curl http://localhost:5000/health
```

Expected: `{"status":"OK","timestamp":"...","uptime":...}`

---

## Authentication Tests

### 2. Login (Get Token)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"password\":\"Admin@123\"}"
```

Expected: 
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "admin": {...}
}
```

**Save the token for next requests!**

---

## Techniques API Tests

### 3. Get All Techniques (Public)
```bash
curl http://localhost:5000/api/techniques
```

### 4. Create Technique (Protected)
```bash
curl -X POST http://localhost:5000/api/techniques \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d "{\"name\":\"Hand Block Printed\",\"slug\":\"hand-block-printed\",\"displayOrder\":1,\"active\":true}"
```

---

## Seasons API Tests

### 5. Get All Seasons (Public)
```bash
curl http://localhost:5000/api/seasons
```

### 6. Create Season (Protected)
```bash
curl -X POST http://localhost:5000/api/seasons \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d "{\"name\":\"Summer Collection\",\"slug\":\"summer\",\"displayOrder\":1,\"active\":true}"
```

---

## Products API Tests

### 7. Get All Products (Public)
```bash
curl http://localhost:5000/api/products
```

### 8. Create Product (Protected) - MINIMAL
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Test Product",
    "slug": "test-product",
    "technique": "TECHNIQUE_ID_HERE",
    "images": [{"url": "/test.jpg", "alt": "Test", "isPrimary": true}],
    "pricingTiers": [{"minQuantity": 100, "pricePerUnit": 50}],
    "sizes": [{"size": "Medium", "available": true}],
    "active": true
  }'
```

---

## Using Postman/Thunder Client

### Setup:
1. Create new request
2. Method: POST
3. URL: http://localhost:5000/api/auth/login
4. Headers: Content-Type: application/json
5. Body (JSON):
```json
{
  "username": "admin",
  "password": "Admin@123"
}
```
6. Send → Copy token from response

### Test Create Product:
1. Method: POST
2. URL: http://localhost:5000/api/products
3. Headers:
   - Content-Type: application/json
   - Authorization: Bearer YOUR_TOKEN
4. Body (JSON):
```json
{
  "name": "Cotton Cushion Cover",
  "slug": "cotton-cushion-cover",
  "modelNumber": "CC-001",
  "brandName": "Malani Impex",
  "technique": "PUT_TECHNIQUE_ID_HERE",
  "season": null,
  "description": "Beautiful cotton cushion cover",
  "images": [
    {
      "url": "/images/products/cushion1.jpg",
      "alt": "Cushion Cover",
      "isPrimary": true
    }
  ],
  "pricingTiers": [
    {
      "minQuantity": 100,
      "maxQuantity": 299,
      "pricePerUnit": 42,
      "label": "100-299 pieces ₹42"
    }
  ],
  "sizes": [
    {
      "size": "12x12 inches",
      "dimensions": "30cm x 30cm",
      "available": true
    }
  ],
  "specifications": {
    "material": "Cotton",
    "fabric": "100% Cotton"
  },
  "features": ["Handmade", "Eco-friendly"],
  "customization": {
    "available": true,
    "options": ["Custom colors"],
    "bulkOrdersWithDesign": true
  },
  "oemService": "Available",
  "inStock": true,
  "featured": false,
  "active": true
}
```

---

## Common Errors & Solutions

### 400 Bad Request
**Cause:** Missing required fields or validation error

**Check:**
- `technique` field is required (must be valid ObjectId)
- `name` and `slug` are required
- `images` array must have at least one image
- `pricingTiers` and `sizes` must be arrays

**Solution:** Check backend logs for exact validation error

### 401 Unauthorized
**Cause:** Missing or invalid token

**Solution:** 
1. Login again to get fresh token
2. Add token to Authorization header: `Bearer YOUR_TOKEN`

### 404 Not Found
**Cause:** Route doesn't exist or wrong URL

**Solution:** Check URL is correct: `http://localhost:5000/api/products`

---

## Debug Steps

1. **Check Backend Logs:**
   - Look at terminal where backend is running
   - See exact error message

2. **Test with Minimal Data:**
   ```json
   {
     "name": "Test",
     "slug": "test",
     "technique": "VALID_TECHNIQUE_ID",
     "images": [{"url": "/test.jpg", "isPrimary": true}],
     "pricingTiers": [{"minQuantity": 1, "pricePerUnit": 1}],
     "sizes": [{"size": "Test", "available": true}],
     "active": true
   }
   ```

3. **Verify Technique Exists:**
   - First create a technique
   - Use that technique's `_id` in product

4. **Check Token:**
   - Login and get fresh token
   - Token expires after 7 days

---

## Quick Test Script

Save as `test-api.sh`:

```bash
#!/bin/bash

# 1. Login
echo "1. Testing Login..."
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@123"}' \
  | grep -o '"token":"[^"]*' | cut -d'"' -f4)

echo "Token: $TOKEN"

# 2. Create Technique
echo "\n2. Creating Technique..."
TECH_ID=$(curl -s -X POST http://localhost:5000/api/techniques \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Test Technique","slug":"test-technique","active":true}' \
  | grep -o '"_id":"[^"]*' | cut -d'"' -f4)

echo "Technique ID: $TECH_ID"

# 3. Create Product
echo "\n3. Creating Product..."
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{
    \"name\": \"Test Product\",
    \"slug\": \"test-product\",
    \"technique\": \"$TECH_ID\",
    \"images\": [{\"url\": \"/test.jpg\", \"isPrimary\": true}],
    \"pricingTiers\": [{\"minQuantity\": 100, \"pricePerUnit\": 50}],
    \"sizes\": [{\"size\": \"Medium\", \"available\": true}],
    \"active\": true
  }"

echo "\n\nDone!"
```

Run: `bash test-api.sh`
