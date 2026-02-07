# ✅ Development & Deployment Checklist

## 🔧 Local Development Setup

### Backend Setup
- [ ] Navigate to `backend` folder
- [ ] Run `npm install`
- [ ] Create `.env` file from `.env.example`
- [ ] Add MongoDB Atlas connection string
- [ ] Run `npm run dev` to start server
- [ ] Test health endpoint: http://localhost:5000/health
- [ ] (Optional) Run `npm run seed` to add sample data

### Frontend Setup
- [ ] Navigate to `frontend` folder
- [ ] Run `npm install`
- [ ] Create `.env.local` file from `.env.local.example`
- [ ] Add backend API URL
- [ ] Run `npm run dev` to start frontend
- [ ] Open http://localhost:3000 in browser
- [ ] Check browser console for errors

### MongoDB Atlas
- [ ] Create free cluster
- [ ] Create database user
- [ ] Whitelist IP (0.0.0.0/0)
- [ ] Get connection string
- [ ] Test connection from backend

---

## 🧪 Testing Checklist

### API Testing
- [ ] GET /api/products - Returns products list
- [ ] GET /api/seasons - Returns seasons list
- [ ] GET /api/techniques - Returns techniques list
- [ ] POST /api/inquiries - Creates inquiry
- [ ] All endpoints return proper JSON
- [ ] Error handling works correctly

### Frontend Testing
- [ ] Home page loads
- [ ] Navigation works
- [ ] Product pages load
- [ ] Season pages load
- [ ] Technique pages load
- [ ] Contact/Inquiry form works
- [ ] Cart functionality works
- [ ] Images load correctly
- [ ] Mobile responsive
- [ ] No console errors

---

## 🚀 Pre-Deployment Checklist

### Code Quality
- [ ] Remove console.logs (except important ones)
- [ ] Remove commented code
- [ ] Check for hardcoded values
- [ ] Update environment variables
- [ ] Test error scenarios
- [ ] Check mobile responsiveness

### Security
- [ ] Environment variables not committed
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Input validation working
- [ ] No sensitive data in frontend
- [ ] MongoDB user has proper permissions

### Performance
- [ ] Images optimized
- [ ] API responses cached (if needed)
- [ ] Database indexes created
- [ ] Compression enabled
- [ ] Unnecessary dependencies removed

### Documentation
- [ ] README.md updated
- [ ] API endpoints documented
- [ ] Environment variables documented
- [ ] Setup instructions clear
- [ ] Deployment guide ready

---

## 🌐 Production Deployment

### Backend Deployment
- [ ] Choose hosting platform (Railway/Render/VPS)
- [ ] Push code to GitHub
- [ ] Connect repository to platform
- [ ] Set environment variables
- [ ] Deploy backend
- [ ] Test API endpoints
- [ ] Check logs for errors
- [ ] Save backend URL

### Frontend Deployment
- [ ] Choose hosting platform (Vercel recommended)
- [ ] Connect GitHub repository
- [ ] Set NEXT_PUBLIC_API_URL
- [ ] Deploy frontend
- [ ] Test website functionality
- [ ] Check browser console
- [ ] Test on mobile devices

### Domain & SSL (Optional)
- [ ] Purchase domain name
- [ ] Configure DNS settings
- [ ] Point domain to hosting
- [ ] Setup SSL certificate
- [ ] Test HTTPS connection
- [ ] Update CORS settings

---

## 📊 Post-Deployment

### Monitoring
- [ ] Setup error tracking (Sentry/LogRocket)
- [ ] Monitor API response times
- [ ] Check MongoDB Atlas metrics
- [ ] Setup uptime monitoring
- [ ] Configure alerts

### Maintenance
- [ ] Document deployment process
- [ ] Setup backup strategy
- [ ] Plan update schedule
- [ ] Monitor costs
- [ ] Keep dependencies updated

### User Testing
- [ ] Test all pages
- [ ] Test forms submission
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Get user feedback
- [ ] Fix reported issues

---

## 🐛 Common Issues & Solutions

### Issue: MongoDB Connection Failed
**Check:**
- [ ] Connection string correct
- [ ] Username/password correct
- [ ] IP whitelisted
- [ ] Database name correct

### Issue: CORS Error
**Check:**
- [ ] FRONTEND_URL in backend .env
- [ ] Backend restarted after .env change
- [ ] CORS middleware configured

### Issue: API Not Working
**Check:**
- [ ] Backend server running
- [ ] Correct API URL in frontend
- [ ] Network tab in browser
- [ ] Backend logs for errors

### Issue: Images Not Loading
**Check:**
- [ ] Image paths correct
- [ ] Images in public folder
- [ ] Next.js Image component used
- [ ] Image optimization settings

---

## 📝 Final Verification

Before going live:
- [ ] All features working
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Forms submitting correctly
- [ ] Database connected
- [ ] API endpoints working
- [ ] SSL certificate active
- [ ] Performance acceptable
- [ ] SEO basics covered
- [ ] Analytics setup (optional)

---

## 🎉 Launch Day

- [ ] Final testing on production
- [ ] Monitor error logs
- [ ] Check analytics
- [ ] Announce launch
- [ ] Collect feedback
- [ ] Plan next updates

---

**Status:** 
- Development: ⏳ In Progress
- Testing: ⏳ Pending
- Deployment: ⏳ Pending
- Live: ⏳ Pending

Update status as you complete each phase! 🚀
