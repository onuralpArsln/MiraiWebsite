const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const config = require('./config');

const app = express();
const PORT = config.port;

// Trust proxy for rate limiting
app.set('trust proxy', 1);

// Security middleware - temporarily relaxed for CSS debugging
app.use(helmet({
    contentSecurityPolicy: false  // Temporarily disable CSP for debugging
}));

// Compression middleware
app.use(compression());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add middleware to handle potential deployment issues
app.use((req, res, next) => {
    // Enhanced logging for PM2 debugging
    if (req.url.includes('.css') || req.url.includes('.js') || req.url.includes('.png') || req.url.includes('.jpg')) {
        console.log(`📁 [${new Date().toISOString()}] Static file request: ${req.method} ${req.url}`);
        console.log(`📁 Working directory: ${process.cwd()}`);
        console.log(`📁 Public path exists: ${require('fs').existsSync(path.join(__dirname, 'public'))}`);
        console.log(`📁 CSS file exists: ${require('fs').existsSync(path.join(__dirname, 'public', 'css', 'styles.css'))}`);
    }
    next();
});

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files with cache control and proper headers
app.use('/css', express.static(path.join(__dirname, 'public/css'), {
    maxAge: '1y',
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        // Enable CORS for CSS files to prevent loading issues
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        // Ensure proper MIME type for animations
        if (filePath.includes('animations.css')) {
            res.setHeader('X-Content-Type-Options', 'nosniff');
        }
    }
}));

app.use('/js', express.static(path.join(__dirname, 'public/js'), {
    maxAge: '1y',
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
}));

app.use('/assets', express.static(path.join(__dirname, 'public/assets'), {
    maxAge: '1y',
    etag: true,
    lastModified: true
}));

// Serve other static files
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1y',
    etag: true,
    lastModified: true
}));

// General rate limiter
const generalLimiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.maxRequests,
    message: 'Too many requests from this IP, please try again later.'
});

app.use(generalLimiter);

// Contact form rate limiter (more strict)
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: config.rateLimit.contactFormLimit,
    message: 'Too many contact form submissions, please try again later.',
    skipSuccessfulRequests: true
});

// Health check endpoint for debugging
app.get('/health', (req, res) => {
    const fs = require('fs');
    const publicPath = path.join(__dirname, 'public');
    const cssPath = path.join(publicPath, 'css', 'styles.css');

    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv,
        port: config.port,
        workingDirectory: process.cwd(),
        serverDirectory: __dirname,
        staticFilesPath: publicPath,
        publicExists: fs.existsSync(publicPath),
        cssExists: fs.existsSync(cssPath),
        cssFiles: {
            styles: '/css/styles.css',
            demo: '/css/demo.css',
            animations: '/css/animations.css'
        },
        pm2: {
            isPM2: process.env.PM2_HOME ? true : false,
            pm2Home: process.env.PM2_HOME || 'Not running in PM2'
        }
    });
});

// Direct CSS test endpoint
app.get('/test-css', (req, res) => {
    const fs = require('fs');
    const cssPath = path.join(__dirname, 'public', 'css', 'styles.css');

    if (fs.existsSync(cssPath)) {
        res.setHeader('Content-Type', 'text/css');
        res.send(fs.readFileSync(cssPath, 'utf8'));
    } else {
        res.status(404).json({
            error: 'CSS file not found',
            path: cssPath,
            exists: fs.existsSync(cssPath)
        });
    }
});

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        pageTitle: 'Mirai - Yapay Zeka Çözümleri ile İşinizi Dönüştürün',
        seo: config.seo
    });
});

// Contact form endpoint (for future API use)
app.post('/api/contact', contactLimiter, (req, res) => {
    // This will be handled by EmailJS on the frontend
    // But we add the endpoint for rate limiting
    res.status(200).json({ message: 'Request received' });
});

// Robots.txt
app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /
Sitemap: ${config.seo.siteUrl}/sitemap.xml`);
});

// Sitemap.xml
app.get('/sitemap.xml', (req, res) => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${config.seo.siteUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
});

// 404 Handler
app.use((req, res) => {
    res.status(404).render('404', {
        pageTitle: '404 - Sayfa Bulunamadı',
        seo: config.seo
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', {
        pageTitle: '500 - Sunucu Hatası',
        seo: config.seo,
        error: config.nodeEnv === 'development' ? err : {}
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Mirai server is running on http://localhost:${PORT}`);
    console.log(`📁 Serving static files from: ${path.join(__dirname, 'public')}`);
    console.log(`👁️  Views directory: ${path.join(__dirname, 'views')}`);
    console.log(`🔒 Security: Helmet enabled`);
    console.log(`⚡ Compression: Enabled`);
    console.log(`🛡️  Rate limiting: Active`);
});

