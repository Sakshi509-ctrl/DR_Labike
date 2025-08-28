# 🚀 Render Deployment Guide

## ✅ Pre-Deployment Checklist

### 1. Environment Variables (CRITICAL)
Make sure these are set in your Render dashboard:

```bash
# Required
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=production

# Optional but recommended
PORT=5000
```

### 2. MongoDB Atlas Configuration
- ✅ Network Access: Add `0.0.0.0/0` for Render IPs
- ✅ Database User: Ensure user has read/write permissions
- ✅ Connection String: Use the latest MongoDB driver format

### 3. Render Service Configuration
- ✅ **Build Command**: `npm install`
- ✅ **Start Command**: `npm start`
- ✅ **Environment**: Node.js
- ✅ **Node Version**: 18.x or higher

## 🔍 Troubleshooting "Failed to Load Data"

### Step 1: Check Render Logs
1. Go to your Render dashboard
2. Click on your service
3. Go to "Logs" tab
4. Look for error messages

### Step 2: Test Health Endpoints
After deployment, test these endpoints:

```bash
# Test if server is running
GET https://your-app.onrender.com/api/test

# Check database connection
GET https://your-app.onrender.com/api/health
```

### Step 3: Common Issues & Solutions

#### Issue: "MONGO_URI environment variable is required"
**Solution**: Set MONGO_URI in Render environment variables

#### Issue: "MongoDB connection error"
**Solutions**:
- Check if MongoDB Atlas is accessible
- Verify connection string format
- Ensure IP whitelist includes Render

#### Issue: "CORS error"
**Solution**: Check if your frontend URL is in the CORS origins

#### Issue: "Port already in use"
**Solution**: Render automatically sets PORT environment variable

### Step 4: Database Connection Test

```bash
# Test MongoDB connection locally
curl -X GET https://your-app.onrender.com/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected",
  "uptime": 123.456
}
```

## 🛠️ Local Testing

### Test with Production Environment Variables
```bash
# Create .env.production file
cp .env .env.production

# Set production values
MONGO_URI=your-production-mongo-uri
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production

# Test locally
npm run dev
```

### Test Database Connection
```bash
# Check if you can connect to MongoDB Atlas
mongosh "your-connection-string"
```

## 📊 Monitoring

### Render Metrics to Watch
- **Response Time**: Should be < 2 seconds
- **Error Rate**: Should be < 1%
- **Memory Usage**: Should be < 80%
- **CPU Usage**: Should be < 70%

### Log Analysis
Look for these patterns in logs:
- ✅ "MongoDB Connected"
- ✅ "Server running on port"
- ❌ "MongoDB connection error"
- ❌ "Failed to start server"

## 🚨 Emergency Fixes

### If Database is Down
1. Check MongoDB Atlas status
2. Verify connection string
3. Check IP whitelist
4. Restart Render service

### If Service Won't Start
1. Check environment variables
2. Verify package.json scripts
3. Check for syntax errors
4. Review build logs

## 📞 Support

If issues persist:
1. Check Render status page
2. Review MongoDB Atlas status
3. Check your service logs
4. Contact support with logs attached

## 🔄 Deployment Commands

```bash
# Commit your changes
git add .
git commit -m "Fix deployment issues and add health checks"
git push origin main

# Render will automatically redeploy
# Monitor logs for any errors
```
