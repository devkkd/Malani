# Cart System Testing Guide

## 🧪 Quick Test Steps

### 1. Start the Application
```bash
# Terminal 1 - Backend
cd Malani/backend
npm start

# Terminal 2 - Frontend
cd Malani/frontend
npm run dev
```

### 2. Test Cart Functionality

#### A. Add to Cart
1. Go to any product page: `http://localhost:3000/product/[product_id]`
2. Click "Add to Inquiry List" button
3. ✅ Should see green success toast
4. ✅ Button should change to "Added to Inquiry List" with quantity
5. ✅ Header cart badge should show count

#### B. View Cart
1. Click cart icon in header
2. ✅ Should see product in cart
3. ✅ Quantity controls should be visible

#### C. Update Quantity
1. Click + button
2. ✅ Quantity should increase
3. ✅ Total items count should update
4. Click - button
5. ✅ Quantity should decrease
6. Type number directly in input
7. ✅ Should accept valid numbers (1-9999)

#### D. Remove from Cart
1. Click "Remove" button on cart page
2. ✅ Item should be removed
3. ✅ Cart badge should update
4. ✅ If last item, should show empty state

#### E. Persistence Test
1. Add items to cart
2. Refresh page (F5)
3. ✅ Items should still be in cart
4. Close browser
5. Open again and go to cart
6. ✅ Items should still be there

#### F. Form Submission
1. Add items to cart
2. Fill in form:
   - Name: Test User
   - Email: test@example.com
   - Phone: +91 1234567890
3. Click "Send Inquiry Now"
4. ✅ Should see loading spinner
5. ✅ Should see success message
6. ✅ Cart should clear after 2 seconds
7. ✅ Form should reset

### 3. Test Edge Cases

#### A. Empty Cart
1. Remove all items
2. ✅ Should show empty state
3. ✅ "Browse Collections" button should work

#### B. Multiple Products
1. Add 5 different products
2. ✅ All should appear in cart
3. ✅ Each should have independent quantity
4. ✅ Total count should be sum of all quantities

#### C. Same Product Twice
1. Add product from product page
2. Go back and add same product again
3. ✅ Quantity should increase, not duplicate

#### D. Form Validation
1. Try to submit empty form
2. ✅ Should show error message
3. Fill only name
4. ✅ Should still show error
5. Fill all required fields
6. ✅ Should submit successfully

### 4. Test Expiry (Optional - Long Test)

#### Manual Expiry Test
1. Add items to cart
2. Open browser DevTools > Application > Local Storage
3. Find key: `malani_cart_items`
4. Edit the `addedAt` timestamp to 8 days ago:
   ```javascript
   // Current timestamp
   const now = Date.now();
   // 8 days ago
   const eightDaysAgo = now - (8 * 24 * 60 * 60 * 1000);
   ```
5. Refresh page
6. ✅ Items should be removed (expired)

### 5. Test Responsive Design

#### Mobile View
1. Open DevTools > Toggle device toolbar
2. Select iPhone or Android device
3. ✅ Cart icon should be visible
4. ✅ Mobile menu should show cart link
5. ✅ Cart page should be mobile-friendly
6. ✅ Form should be easy to fill

#### Tablet View
1. Select iPad or tablet device
2. ✅ Layout should adapt properly
3. ✅ All features should work

### 6. Test Backend Integration

#### Check Backend Logs
```bash
# In backend terminal, you should see:
POST /api/inquiries 201 - Inquiry submitted successfully
```

#### Check Database
```bash
# Connect to MongoDB
mongosh

# Use your database
use malani_db

# Check inquiries
db.inquiries.find().pretty()
```

✅ Should see your submitted inquiry with:
- Customer details
- Products array with quantities
- Timestamps

## 🐛 Common Issues & Solutions

### Issue 1: Cart not persisting
**Solution:** Check if localStorage is enabled in browser

### Issue 2: Form not submitting
**Solution:** 
- Check backend is running
- Verify NEXT_PUBLIC_API_URL in .env.local
- Check browser console for errors

### Issue 3: Cart badge not updating
**Solution:** 
- Verify CartContext is wrapped in layout
- Check getTotalItems() is being called

### Issue 4: Images not showing
**Solution:**
- Verify Cloudflare images are configured
- Check image URLs in product data

## ✅ Success Criteria

All these should work:
- [x] Add to cart
- [x] Remove from cart
- [x] Update quantity
- [x] Cart persists on refresh
- [x] Cart badge shows correct count
- [x] Form validation works
- [x] Form submits to backend
- [x] Success message shows
- [x] Cart clears after submission
- [x] Empty state displays
- [x] Mobile responsive
- [x] Toast notifications
- [x] 7-day expiry

## 🎉 If All Tests Pass

Your cart system is production-ready! 🚀

## 📞 Need Help?

Check these files:
- `CART_SYSTEM_GUIDE.md` - Complete documentation
- `CartContext.jsx` - Core logic
- `cart/page.jsx` - Cart UI
- `InquiryBtn.jsx` - Add to cart button
