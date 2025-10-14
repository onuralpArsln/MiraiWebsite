#!/bin/bash

# CSS Animations Fix Deployment Script
# This script applies all the animation compatibility fixes

echo "🚀 Deploying CSS Animation Compatibility Fixes..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "server.js" ]; then
    print_error "Please run this script from the MiraiWebsite root directory"
    exit 1
fi

print_info "Current directory: $(pwd)"

# 1. Run the animation fix script
print_info "Running animation compatibility fixes..."
if node fix-animations.js; then
    print_status "Animation fixes applied successfully"
else
    print_error "Failed to apply animation fixes"
    exit 1
fi

# 2. Test the local server
print_info "Testing local server..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/health | grep -q "200"; then
    print_status "Local server is running"
else
    print_warning "Local server not running. Starting server..."
    # Start server in background
    nohup node server.js > server.log 2>&1 &
    SERVER_PID=$!
    echo $SERVER_PID > server.pid
    
    # Wait for server to start
    sleep 3
    
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/health | grep -q "200"; then
        print_status "Local server started successfully"
    else
        print_error "Failed to start local server"
        exit 1
    fi
fi

# 3. Test CSS files
print_info "Testing CSS file accessibility..."
CSS_FILES=("/css/styles.css" "/css/demo.css" "/css/animations.css")

for css_file in "${CSS_FILES[@]}"; do
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3002$css_file | grep -q "200"; then
        print_status "CSS file accessible: $css_file"
    else
        print_error "CSS file not accessible: $css_file"
    fi
done

# 4. Test animation test page
print_info "Testing animation test page..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/animation-test.html | grep -q "200"; then
    print_status "Animation test page accessible"
else
    print_error "Animation test page not accessible"
fi

# 5. Check for nginx configuration
print_info "Checking nginx configuration..."
if [ -f "nginx-animations-fix.conf" ]; then
    print_status "Enhanced nginx configuration available"
    print_info "To apply nginx fixes:"
    echo "  1. Copy nginx-animations-fix.conf to your server"
    echo "  2. Update the paths and domain in the config"
    echo "  3. Test with: sudo nginx -t"
    echo "  4. Reload with: sudo systemctl reload nginx"
else
    print_warning "Enhanced nginx configuration not found"
fi

# 6. Create deployment summary
cat > deployment-summary.md << EOF
# CSS Animation Compatibility Fix - Deployment Summary

## ✅ Fixes Applied

### 1. Enhanced CSS Animations
- Added vendor prefixes for better browser compatibility
- Implemented hardware acceleration for Windows
- Added fallback animations for unsupported browsers
- Created touch device support

### 2. JavaScript Fallbacks
- Created animation detection script
- Added platform-specific optimizations
- Implemented graceful degradation

### 3. Server Optimizations
- Enhanced CSS file serving headers
- Added CORS support for static files
- Improved caching strategies

### 4. Testing Tools
- Created comprehensive test page: /animation-test.html
- Added browser compatibility detection
- Implemented animation status monitoring

## 🧪 Testing Instructions

### Local Testing
1. Visit: http://localhost:3002/animation-test.html
2. Test hover animations on all cards
3. Check browser console for any warnings
4. Test on different browsers (Chrome, Firefox, Edge)

### Production Testing
1. Deploy the updated files to your server
2. Apply the nginx configuration (nginx-animations-fix.conf)
3. Test on the deployed server
4. Verify animations work on both desktop and mobile

## 🔧 Files Modified

- \`public/css/animations.css\` - Enhanced with browser compatibility
- \`server.js\` - Improved CSS serving headers
- \`views/partials/header.ejs\` - Added animation fallback script
- \`public/js/animation-fallback.js\` - New fallback script
- \`public/animation-test.html\` - New test page

## 📋 Next Steps

1. **Test Locally**: Visit the animation test page
2. **Deploy to Server**: Upload all modified files
3. **Update Nginx**: Apply the enhanced nginx configuration
4. **Monitor**: Check server logs for any issues
5. **Verify**: Test animations on different devices and browsers

## 🚨 Troubleshooting

If animations still don't work:

1. Check browser console for errors
2. Verify CSS files are loading (Network tab)
3. Test with different browsers
4. Check nginx logs: \`sudo tail -f /var/log/nginx/error.log\`
5. Verify file permissions on CSS files

## 📞 Support

If you continue to have issues:
- Check the browser console for specific error messages
- Test the animation test page for detailed diagnostics
- Verify all files were uploaded correctly
- Check nginx configuration syntax

EOF

print_status "Deployment summary created: deployment-summary.md"

# 7. Final status
echo ""
echo "🎉 CSS Animation Compatibility Fix Deployment Complete!"
echo "======================================================"
echo ""
print_info "Local server status:"
if [ -f "server.pid" ]; then
    SERVER_PID=$(cat server.pid)
    if ps -p $SERVER_PID > /dev/null; then
        print_status "Server running (PID: $SERVER_PID)"
    else
        print_warning "Server process not found"
    fi
fi

echo ""
print_info "Next steps:"
echo "  1. Test locally: http://localhost:3002/animation-test.html"
echo "  2. Deploy files to your server"
echo "  3. Apply nginx configuration if needed"
echo "  4. Test on deployed server"
echo ""
print_info "Files to deploy:"
echo "  - All files in public/css/"
echo "  - All files in public/js/"
echo "  - views/partials/header.ejs"
echo "  - server.js"
echo "  - nginx-animations-fix.conf (for nginx config)"
echo ""
print_info "Test page: /animation-test.html"
print_info "Health check: /health"
print_info "CSS test: /test-css"
echo ""
print_status "Deployment complete! 🚀"
