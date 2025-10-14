#!/bin/bash

# CSS Debug Script for Mirai Website
# Run this on your server to diagnose CSS issues

echo "🔍 CSS Debug Script for Mirai Website"
echo "======================================"
echo ""

# Check if Node.js app is running
echo "1. Checking if Node.js app is running..."
if curl -s http://localhost:3002/health > /dev/null; then
    echo "✅ Node.js app is running on port 3002"
else
    echo "❌ Node.js app is NOT running on port 3002"
    echo "   Start it with: pm2 start ecosystem.config.js"
    exit 1
fi
echo ""

# Check if CSS files exist
echo "2. Checking if CSS files exist..."
CSS_PATH="/path/to/your/MiraiWebsite/public/css"
if [ -f "$CSS_PATH/styles.css" ]; then
    echo "✅ styles.css exists"
    echo "   File size: $(stat -c%s "$CSS_PATH/styles.css") bytes"
else
    echo "❌ styles.css NOT found at: $CSS_PATH"
    echo "   Please update CSS_PATH in this script to your actual path"
fi

if [ -f "$CSS_PATH/demo.css" ]; then
    echo "✅ demo.css exists"
else
    echo "❌ demo.css NOT found"
fi

if [ -f "$CSS_PATH/animations.css" ]; then
    echo "✅ animations.css exists"
else
    echo "❌ animations.css NOT found"
fi
echo ""

# Test CSS endpoints
echo "3. Testing CSS endpoints..."
echo "Testing: http://localhost:3002/css/styles.css"
CSS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/css/styles.css)
if [ "$CSS_RESPONSE" = "200" ]; then
    echo "✅ CSS endpoint returns 200 OK"
else
    echo "❌ CSS endpoint returns: $CSS_RESPONSE"
fi

echo "Testing: http://localhost:3002/test-css"
TEST_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/test-css)
if [ "$TEST_RESPONSE" = "200" ]; then
    echo "✅ Test CSS endpoint returns 200 OK"
else
    echo "❌ Test CSS endpoint returns: $TEST_RESPONSE"
fi
echo ""

# Check health endpoint
echo "4. Checking health endpoint..."
HEALTH_RESPONSE=$(curl -s http://localhost:3002/health)
echo "Health endpoint response:"
echo "$HEALTH_RESPONSE" | jq . 2>/dev/null || echo "$HEALTH_RESPONSE"
echo ""

# Check PM2 logs
echo "5. Recent PM2 logs (last 10 lines):"
pm2 logs miraiweb --lines 10 --nostream
echo ""

# Check file permissions
echo "6. Checking file permissions..."
if [ -d "$CSS_PATH" ]; then
    echo "CSS directory permissions:"
    ls -la "$CSS_PATH"
else
    echo "❌ CSS directory not found at: $CSS_PATH"
fi
echo ""

echo "🔧 Quick Fixes to Try:"
echo "1. Update CSS_PATH in this script to your actual path"
echo "2. Check PM2 logs: pm2 logs miraiweb"
echo "3. Restart PM2: pm2 restart miraiweb"
echo "4. Test CSS directly: curl http://localhost:3002/css/styles.css"
