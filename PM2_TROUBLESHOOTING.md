# 🔧 PM2 CSS Deployment Troubleshooting

## 🚨 **Common PM2 CSS Issues & Solutions**

### 1. **File Path Issues in PM2**
**Problem**: PM2 might be running from a different working directory.

**Solution**: Check the working directory and file paths:
```bash
# Check PM2 logs
pm2 logs mirai-website

# Check health endpoint
curl http://your-server:3002/health
```

### 2. **Static Files Not Found**
**Problem**: CSS files exist locally but not on server.

**Solution**: Verify file structure on server:
```bash
# SSH into your server and check:
ls -la /path/to/your/app/public/css/
ls -la /path/to/your/app/public/

# Should show:
# styles.css
# demo.css  
# animations.css
```

### 3. **PM2 Working Directory**
**Problem**: PM2 running from wrong directory.

**Solution**: Use the ecosystem.config.js file:
```bash
# Deploy using the ecosystem file
pm2 start ecosystem.config.js
```

### 4. **File Permissions**
**Problem**: Server can't read CSS files.

**Solution**: Fix permissions:
```bash
chmod 644 public/css/*.css
chmod 755 public/css/
chmod 755 public/
```

## 🚀 **Step-by-Step PM2 Deployment**

### 1. **Upload Files to Server**
```bash
# Make sure ALL files are uploaded including:
# - server.js
# - config.js
# - package.json
# - public/ folder (with all CSS files)
# - views/ folder
# - ecosystem.config.js
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Deploy with PM2**
```bash
# Option 1: Using ecosystem file (recommended)
pm2 start ecosystem.config.js

# Option 2: Direct command
pm2 start server.js --name mirai-website --env production

# Option 3: Using the deploy script
chmod +x deploy.sh
./deploy.sh
```

### 4. **Verify Deployment**
```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs mirai-website

# Test endpoints
curl http://localhost:3002/health
curl http://localhost:3002/test-css
curl -I http://localhost:3002/css/styles.css
```

## 🔍 **Debugging Commands**

### Check Health Endpoint:
```bash
curl http://your-server:3002/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "workingDirectory": "/path/to/your/app",
  "serverDirectory": "/path/to/your/app", 
  "publicExists": true,
  "cssExists": true,
  "pm2": {
    "isPM2": true
  }
}
```

### Check CSS Test Endpoint:
```bash
curl http://your-server:3002/test-css
```

**Expected**: Should return CSS content or error details.

### Check Static Files:
```bash
curl -I http://your-server:3002/css/styles.css
```

**Expected**: `HTTP/1.1 200 OK` with `Content-Type: text/css`

## 🐛 **Common Error Messages & Fixes**

### Error: "CSS file not found"
**Fix**: 
```bash
# Check if files exist on server
ls -la public/css/

# If missing, re-upload the public folder
rsync -av public/ user@server:/path/to/app/public/
```

### Error: "Cannot GET /css/styles.css"
**Fix**:
```bash
# Check PM2 working directory
pm2 show mirai-website

# Restart PM2 from correct directory
cd /path/to/your/app
pm2 restart mirai-website
```

### Error: "ENOENT: no such file or directory"
**Fix**:
```bash
# Check file permissions
ls -la public/css/styles.css

# Fix permissions
chmod 644 public/css/styles.css
chown -R www-data:www-data public/
```

## 📋 **PM2 Configuration (ecosystem.config.js)**

The ecosystem file ensures:
- ✅ Correct working directory
- ✅ Proper environment variables
- ✅ Logging configuration
- ✅ Memory limits
- ✅ Auto-restart on failure

## 🔧 **Quick Fixes**

### If CSS still doesn't work:

1. **Restart PM2**:
```bash
pm2 restart mirai-website
```

2. **Check PM2 logs**:
```bash
pm2 logs mirai-website --lines 50
```

3. **Test static file serving**:
```bash
# Direct test
curl http://localhost:3002/test-css

# Health check
curl http://localhost:3002/health
```

4. **Verify file structure**:
```bash
# On your server
find . -name "*.css" -type f
```

## ✅ **Success Checklist**

Your PM2 deployment is working when:
- ✅ `pm2 status` shows mirai-website as "online"
- ✅ `/health` endpoint returns all true values
- ✅ `/test-css` returns CSS content
- ✅ `/css/styles.css` returns 200 OK
- ✅ Website displays with proper styling

## 🆘 **Still Having Issues?**

If CSS still doesn't load:

1. **Check PM2 logs**: `pm2 logs mirai-website`
2. **Test health endpoint**: `curl http://localhost:3002/health`
3. **Verify file upload**: Ensure `public/` folder is complete
4. **Check server logs**: Look for static file request logs
5. **Test without PM2**: Run `node server.js` directly to isolate PM2 issues

---

**The enhanced server now includes detailed logging to help identify exactly what's happening with your CSS files in PM2!**
