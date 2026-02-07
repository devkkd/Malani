# Production-Level Cart System - Complete Guide

## 🎯 Overview
Production-ready cart/inquiry system with 7-day persistence, quantity management, and backend integration.

## ✨ Key Features

### 1. **7-Day Persistence**
- Cart items automatically saved to localStorage
- Items expire after 7 days
- Automatic cleanup on load
- Timestamp tracking for each item

### 2. **Quantity Management**
- Add/remove quantity with +/- buttons
- Direct input for quantity
- Min: 1, Max: 9999
- Real-time updates

### 3. **Smart Cart Context**
```javascript
// Available methods:
- addInquiry(product, quantity)     // Add item with quantity
- removeInquiry(id)                 // Remove item
- updateQuantity(id, quantity)      // Update quantity
- clearInquiries()                  // Clear all items
- getTotalItems()                   // Get total quantity count
- isInCart(productId)               // Check if item exists
- getItemQuantity(productId)        // Get item quantity
```

### 4. **Form Submission**
- Full validation
- Loading states
- Success/error messages
- Auto-clear after submission
- Backend integration

## 📁 Updated Files

### 1. **CartContext.jsx** - Core Logic
```
Location: Malani/frontend/src/context/CartContext.jsx
```
**Features:**
- 7-day expiry with timestamp
- Structured data storage
- Quantity management
- Helper methods

### 2. **cart/page.jsx** - Cart Page
```
Location: Malani/frontend/src/app/(Website-group)/cart/page.jsx
```
**Features:**
- Quantity controls (+/- buttons)
- Form with validation
- Loading/success/error states
- Backend submission
- Empty state with CTA

### 3. **InquiryBtn.jsx** - Add to Cart Button
```
Location: Malani/frontend/src/components/website/InquiryBtn.jsx
```
**Features:**
- Smart state detection
- View cart button when added
- Toast notifications
- Quantity display

### 4. **Header.jsx** - Cart Badge
```
Location: Malani/frontend/src/components/website/Header.jsx
```
**Features:**
- Total items count badge
- Mobile + Desktop views
- Real-time updates

## 🔧 How It Works

### Adding to Cart
```javascript
// Product page
<InquiryBtn product={product} />

// Internally calls:
addInquiry(productData, 1);
```

### Cart Storage Structure
```json
{
  "items": [
    {
      "id": "product_id",
      "name": "Product Name",
      "images": ["url1", "url2"],
      "quantity": 2,
      "addedAt": 1707321600000,
      "lastUpdated": 1707321600000,
      "category": "rugs",
      "season": "Summer",
      "technique": "Hand Knotted"
    }
  ],
  "lastUpdated": 1707321600000,
  "version": "1.0"
}
```

### Form Submission Flow
1. User fills form (name, email, phone required)
2. Validation check
3. POST to `/api/inquiries` with:
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "phone": "+91 1234567890",
     "company": "ABC Corp",
     "location": "Jaipur, India",
     "message": "Custom requirements...",
     "products": [
       {
         "productId": "id",
         "name": "Product Name",
         "quantity": 2,
         "category": "rugs",
         "images": ["url"]
       }
     ],
     "totalItems": 5,
     "submittedAt": "2024-02-07T10:30:00.000Z"
   }
   ```
4. Success: Clear cart + show success message
5. Error: Show error message

## 🎨 UI Components

### Cart Item Card
- Product image
- Name & category
- Quantity controls
- Remove button
- Specifications display

### Consultation Form
- Required fields marked with *
- Real-time validation
- Loading spinner on submit
- Success/error alerts
- Disabled state after success

### Empty State
- Icon + message
- "Browse Collections" CTA
- Clean design

## 🔐 Data Persistence

### localStorage Key
```
malani_cart_items
```

### Expiry Logic
```javascript
const CART_EXPIRY_DAYS = 7;
const maxAge = CART_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

// On load, filter items:
const validItems = items.filter(item => {
  const itemAge = now - item.addedAt;
  return itemAge < maxAge;
});
```

## 🚀 Usage Examples

### Check if Product in Cart
```javascript
const { isInCart } = useInquiry();
const inCart = isInCart(productId);
```

### Get Total Items
```javascript
const { getTotalItems } = useInquiry();
const total = getTotalItems(); // Returns sum of all quantities
```

### Update Quantity
```javascript
const { updateQuantity } = useInquiry();
updateQuantity(productId, 5);
```

### Clear Cart
```javascript
const { clearInquiries } = useInquiry();
clearInquiries(); // Removes all items + localStorage
```

## 📱 Responsive Design
- Mobile-first approach
- Touch-friendly buttons
- Sticky form on desktop
- Collapsible mobile menu
- Optimized for all screen sizes

## ✅ Production Ready Features
- ✅ Error handling
- ✅ Loading states
- ✅ Form validation
- ✅ Toast notifications
- ✅ Automatic cleanup
- ✅ Data persistence
- ✅ Backend integration
- ✅ Responsive design
- ✅ Accessibility
- ✅ Performance optimized

## 🔄 Backend Integration

### Inquiry Model
```
Location: Malani/backend/models/Inquiry.js
```

### API Endpoint
```
POST /api/inquiries
```

### Response
```json
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "data": { /* inquiry object */ }
}
```

## 🎯 Testing Checklist

- [ ] Add product to cart
- [ ] Update quantity
- [ ] Remove product
- [ ] Cart persists on refresh
- [ ] Cart badge updates
- [ ] Form validation works
- [ ] Form submission successful
- [ ] Success message shows
- [ ] Cart clears after submission
- [ ] Items expire after 7 days
- [ ] Mobile responsive
- [ ] Toast notifications work

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Customize Expiry
```javascript
// In CartContext.jsx
const CART_EXPIRY_DAYS = 7; // Change this value
```

## 📝 Notes

1. **No Duplicates**: Same product can't be added twice, quantity increases instead
2. **Auto-Save**: Every change automatically saved to localStorage
3. **Validation**: Form requires name, email, and phone
4. **Cleanup**: Expired items removed on page load
5. **Toast**: Uses react-hot-toast for notifications

## 🎉 Done!

Your cart system is now production-ready with:
- 7-day persistence ✅
- Quantity management ✅
- Form submission ✅
- Backend integration ✅
- Professional UI/UX ✅
