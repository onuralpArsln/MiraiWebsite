#!/bin/bash

# PM2 Deployment Script for Mirai Website

echo "🚀 Starting PM2 deployment for Mirai Website..."

# Stop existing PM2 process if running
echo "⏹️  Stopping existing PM2 process..."
pm2 stop mirai-website 2>/dev/null || echo "No existing process to stop"

# Delete existing PM2 process
echo "🗑️  Removing existing PM2 process..."
pm2 delete mirai-website 2>/dev/null || echo "No existing process to delete"

# Create logs directory if it doesn't exist
echo "📁 Creating logs directory..."
mkdir -p logs

# Start with PM2 using ecosystem config
echo "▶️  Starting with PM2..."
pm2 start ecosystem.config.js

# Save PM2 configuration
echo "💾 Saving PM2 configuration..."
pm2 save

# Show PM2 status
echo "📊 PM2 Status:"
pm2 status

echo "✅ Deployment complete!"
echo ""
echo "🔍 Debugging URLs:"
echo "   Health check: http://your-domain:3002/health"
echo "   CSS test: http://your-domain:3002/test-css"
echo "   Main CSS: http://your-domain:3002/css/styles.css"
echo ""
echo "📋 Useful PM2 commands:"
echo "   pm2 logs mirai-website    # View logs"
echo "   pm2 restart mirai-website # Restart app"
echo "   pm2 stop mirai-website    # Stop app"
