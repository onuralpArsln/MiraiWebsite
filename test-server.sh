#!/bin/bash

# Test Script for Mirai Website on Server
# Run this on your server at /root/project/MiraiWebsite

echo "🧪 Testing Mirai Website CSS Issue"
echo "=================================="
echo ""

# Current directory
echo "📍 Current directory: $(pwd)"

# Check if we're in the right place
if [ ! -f "server.js" ]; then
    echo "❌ server.js not found. Please run from /root/project/MiraiWebsite"
    exit 1
fi

echo "✅ Found server.js - we're in the right directory"
echo ""

# Check CSS files
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
echo ""

# Check file permissions
echo "🔐 Checking file permissions..."
ls -la public/css/
echo ""

# Test local endpoints
echo "🌐 Testing local endpoints..."
echo "Testing: http://localhost:3002/health"
HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/health)
echo "Health endpoint: $HEALTH_STATUS"

echo "Testing: http://localhost:3002/css/styles.css"
CSS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/css/styles.css)
echo "CSS endpoint: $CSS_STATUS"

echo "Testing: http://localhost:3002/test-css"
TEST_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/test-css)
echo "Test CSS endpoint: $TEST_STATUS"
echo ""

# Get actual CSS content
echo "📄 Checking CSS content..."
CSS_CONTENT=$(curl -s http://localhost:3002/css/styles.css | head -5)
echo "First 5 lines of CSS:"
echo "$CSS_CONTENT"
echo ""

# Check PM2 status
echo "📊 PM2 Status:"
pm2 status
echo ""

# Recent logs
echo "📋 Recent PM2 logs (last 5 lines):"
pm2 logs miraiweb --lines 5 --nostream
echo ""

echo "🎯 Next Steps:"
echo "1. If CSS endpoint returns 200 but website has no styling:"
echo "   - Check browser developer tools (F12) -> Console tab"
echo "   - Look for CSP errors or network errors"
echo ""
echo "2. If CSS endpoint returns 404:"
echo "   - Check file permissions: chmod 644 public/css/*.css"
echo "   - Restart PM2: pm2 restart miraiweb"
echo ""
echo "3. Test your website: http://31.57.33.159:3002/"
