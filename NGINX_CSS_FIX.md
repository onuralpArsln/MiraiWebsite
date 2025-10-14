# 🔧 Nginx CSS Fix - Static File Serving

## 🚨 **The Problem: Nginx Not Serving CSS**

When you use Nginx as a reverse proxy, it needs to be configured to serve static files (CSS, JS, images) directly instead of passing them to Node.js. This is the most common cause of CSS not loading in production.

## ✅ **The Solution: Configure Nginx to Serve Static Files**

### **Option 1: Simple Configuration (Recommended)**

1. **Edit your Nginx site configuration**:
```bash
sudo nano /etc/nginx/sites-available/your-site
```

2. **Add this configuration**:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Root directory of your MiraiWebsite project
    root /path/to/your/MiraiWebsite/public;
    
    # Serve CSS files directly
    location /css/ {
        try_files $uri $uri/ =404;
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Content-Type "text/css";
    }
    
    # Serve JavaScript files directly
    location /js/ {
        try_files $uri $uri/ =404;
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Content-Type "application/javascript";
    }
    
    # Serve images directly
    location /assets/ {
        try_files $uri $uri/ =404;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Serve all other requests through Node.js
    location / {
        proxy_pass http://localhost:3002;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

3. **Test and reload Nginx**:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### **Option 2: Complete Configuration**

Use the `nginx.conf` file I created for a more comprehensive setup.

## 🔧 **Step-by-Step Setup**

### **Step 1: Find Your Current Nginx Configuration**
```bash
# Find your site configuration
ls /etc/nginx/sites-available/

# Edit your site configuration
sudo nano /etc/nginx/sites-available/your-site-name
```

### **Step 2: Update the Configuration**
Replace your current configuration with the simple one above, making sure to:
- ✅ Update `your-domain.com` to your actual domain
- ✅ Update `/path/to/your/MiraiWebsite/public` to your actual path

### **Step 3: Test Configuration**
```bash
# Test Nginx configuration
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx
```

### **Step 4: Verify CSS is Working**
```bash
# Test CSS file directly
curl -I http://your-domain.com/css/styles.css

# Should return: HTTP/1.1 200 OK
# Content-Type: text/css
```

## 🔍 **Common Issues & Fixes**

### **Issue 1: Wrong Path**
**Problem**: `root /path/to/your/MiraiWebsite/public;` is incorrect.

**Fix**: Update to your actual path:
```bash
# Find your actual path
pwd
# Example: /var/www/mirai-website/public

# Update Nginx config with correct path
root /var/www/mirai-website/public;
```

### **Issue 2: File Permissions**
**Problem**: Nginx can't read CSS files.

**Fix**: Set proper permissions:
```bash
# Fix permissions for static files
sudo chmod 644 /path/to/your/MiraiWebsite/public/css/*.css
sudo chown -R www-data:www-data /path/to/your/MiraiWebsite/public/
```

### **Issue 3: Nginx Not Reloaded**
**Problem**: Configuration changes not applied.

**Fix**: Reload Nginx:
```bash
sudo nginx -t && sudo systemctl reload nginx
```

### **Issue 4: Port Mismatch**
**Problem**: Nginx proxying to wrong port.

**Fix**: Ensure proxy_pass matches your Node.js port:
```nginx
proxy_pass http://localhost:3002;  # Should match your Node.js port
```

## 🚀 **Quick Test Commands**

### **Test CSS Direct Access**:
```bash
curl -I http://your-domain.com/css/styles.css
```

### **Test Node.js Health**:
```bash
curl http://your-domain.com/health
```

### **Check Nginx Logs**:
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## 📋 **Complete Setup Checklist**

- [ ] ✅ Updated Nginx configuration with static file serving
- [ ] ✅ Set correct `root` path to `/path/to/MiraiWebsite/public`
- [ ] ✅ Updated domain name in configuration
- [ ] ✅ Tested configuration with `sudo nginx -t`
- [ ] ✅ Reloaded Nginx with `sudo systemctl reload nginx`
- [ ] ✅ Verified CSS file access: `curl -I http://domain.com/css/styles.css`
- [ ] ✅ Checked file permissions on CSS files
- [ ] ✅ Node.js app running on port 3002 with PM2

## 🎯 **Expected Results**

After proper configuration:
- ✅ `http://your-domain.com/css/styles.css` returns 200 OK
- ✅ CSS loads properly in browser
- ✅ Website displays with correct styling
- ✅ Nginx serves static files directly (faster)
- ✅ Node.js only handles dynamic requests

## 🆘 **Still Having Issues?**

If CSS still doesn't load:

1. **Check Nginx error logs**: `sudo tail -f /var/log/nginx/error.log`
2. **Verify file paths**: `ls -la /path/to/your/MiraiWebsite/public/css/`
3. **Test Node.js directly**: `curl http://localhost:3002/css/styles.css`
4. **Check Nginx configuration**: `sudo nginx -t`

---

**The key is: Nginx must serve static files directly, not pass them to Node.js!** 🚀
