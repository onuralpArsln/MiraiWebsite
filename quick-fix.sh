#!/bin/bash

# Quick CSS Fix Script
echo "🔧 Quick CSS Fix for Mirai Website"
echo "==================================="

# Restart PM2 with updated server.js
echo "🔄 Restarting PM2 with updated server.js..."
pm2 restart miraiweb

# Wait for restart
sleep 3

echo "✅ PM2 restarted with CSP disabled for debugging"
echo ""
echo "🧪 Testing CSS now..."

# Test CSS endpoint
CSS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/css/styles.css)
echo "CSS endpoint status: $CSS_STATUS"

if [ "$CSS_STATUS" = "200" ]; then
    echo "✅ CSS endpoint working"
else
    echo "❌ CSS endpoint still failing"
fi

echo ""
echo "🌐 Test your website now:"
echo "   http://31.57.33.159:3002/"
echo ""
echo "📋 If CSS still doesn't work, check:"
echo "   1. Browser developer tools (F12) -> Console tab"
echo "   2. Browser developer tools (F12) -> Network tab"
echo "   3. PM2 logs: pm2 logs miraiweb"
