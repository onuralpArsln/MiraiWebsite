#!/bin/bash

# CSS Fix Script for Mirai Website
# This script fixes common CSS serving issues

echo "🔧 CSS Fix Script for Mirai Website"
echo "===================================="
echo ""

# Get the current directory (where the script is run from)
CURRENT_DIR=$(pwd)
echo "Current directory: $CURRENT_DIR"

# Check if we're in the right directory
if [ ! -f "server.js" ]; then
    echo "❌ server.js not found. Please run this script from your MiraiWebsite directory"
    exit 1
fi

# Check if public/css directory exists
if [ ! -d "public/css" ]; then
    echo "❌ public/css directory not found!"
    echo "   Please ensure you're in the correct directory with the public folder"
    exit 1
fi

echo "✅ Found public/css directory"

# Check CSS files
echo ""
echo "📁 Checking CSS files..."
if [ -f "public/css/styles.css" ]; then
    echo "✅ styles.css exists ($(stat -c%s public/css/styles.css) bytes)"
else
    echo "❌ styles.css missing!"
fi

if [ -f "public/css/demo.css" ]; then
    echo "✅ demo.css exists"
else
    echo "❌ demo.css missing!"
fi

if [ -f "public/css/animations.css" ]; then
    echo "✅ animations.css exists"
else
    echo "❌ animations.css missing!"
fi

# Fix file permissions
echo ""
echo "🔧 Fixing file permissions..."
chmod 644 public/css/*.css 2>/dev/null
chmod 755 public/css/
chmod 755 public/
echo "✅ File permissions fixed"

# Restart PM2
echo ""
echo "🔄 Restarting PM2 process..."
pm2 restart miraiweb
echo "✅ PM2 restarted"

# Wait a moment for restart
sleep 3

# Test endpoints
echo ""
echo "🧪 Testing endpoints..."

# Test health endpoint
echo "Testing health endpoint..."
if curl -s http://localhost:3002/health > /dev/null; then
    echo "✅ Health endpoint working"
else
    echo "❌ Health endpoint failed"
fi

# Test CSS endpoint
echo "Testing CSS endpoint..."
CSS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/css/styles.css)
if [ "$CSS_STATUS" = "200" ]; then
    echo "✅ CSS endpoint working (HTTP $CSS_STATUS)"
else
    echo "❌ CSS endpoint failed (HTTP $CSS_STATUS)"
fi

# Test main page
echo "Testing main page..."
PAGE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/)
if [ "$PAGE_STATUS" = "200" ]; then
    echo "✅ Main page working (HTTP $PAGE_STATUS)"
else
    echo "❌ Main page failed (HTTP $PAGE_STATUS)"
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Test your website: http://31.57.33.159:3002/"
echo "2. Check PM2 logs: pm2 logs miraiweb"
echo "3. If still not working, run: ./debug-css.sh"
echo ""
echo "📋 Debug Commands:"
echo "   curl http://localhost:3002/health"
echo "   curl -I http://localhost:3002/css/styles.css"
echo "   pm2 logs miraiweb --lines 20"
