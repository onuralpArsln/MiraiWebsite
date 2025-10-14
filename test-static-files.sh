#!/bin/bash

# Test Static File Serving
echo "🧪 Testing Static File Serving"
echo "=============================="

# Check if CSS files exist on disk
echo "1. Checking CSS files on disk..."
if [ -f "public/css/styles.css" ]; then
    echo "✅ styles.css exists on disk ($(stat -c%s public/css/styles.css) bytes)"
else
    echo "❌ styles.css NOT found on disk!"
fi

if [ -f "public/css/demo.css" ]; then
    echo "✅ demo.css exists on disk"
else
    echo "❌ demo.css NOT found on disk!"
fi

if [ -f "public/css/animations.css" ]; then
    echo "✅ animations.css exists on disk"
else
    echo "❌ animations.css NOT found on disk!"
fi
echo ""

# Test HTTP endpoints
echo "2. Testing HTTP endpoints..."
echo "Testing: http://localhost:3002/css/styles.css"
CSS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/css/styles.css)
echo "CSS endpoint status: $CSS_RESPONSE"

if [ "$CSS_RESPONSE" = "200" ]; then
    echo "✅ CSS endpoint working"
    
    # Get content type
    CONTENT_TYPE=$(curl -s -I http://localhost:3002/css/styles.css | grep -i content-type | cut -d: -f2 | tr -d ' \r\n')
    echo "Content-Type: $CONTENT_TYPE"
    
    # Check if it's actually CSS
    if [[ "$CONTENT_TYPE" == *"text/css"* ]]; then
        echo "✅ Correct Content-Type: text/css"
    else
        echo "❌ Wrong Content-Type: $CONTENT_TYPE"
    fi
else
    echo "❌ CSS endpoint failed"
fi
echo ""

# Test other static files
echo "3. Testing other static files..."
JS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/js/script.js)
echo "JS endpoint status: $JS_STATUS"

# Test main page
echo "4. Testing main page..."
PAGE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/)
echo "Main page status: $PAGE_STATUS"
echo ""

# Check directory listing
echo "5. Directory listing of public/css/:"
ls -la public/css/
echo ""

echo "🎯 Analysis:"
if [ "$CSS_RESPONSE" = "200" ]; then
    echo "✅ CSS endpoint returns 200 - Express is serving files"
    echo "✅ Issue might be browser caching or CSP"
    echo "   Try: Ctrl+F5 or clear browser cache"
else
    echo "❌ CSS endpoint not working - Express static serving issue"
    echo "   Need to fix Express configuration"
fi
