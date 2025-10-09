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

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://api.emailjs.com"]
        }
    }
}));

// Compression middleware
app.use(compression());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files with cache control
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: config.nodeEnv === 'production' ? '1y' : 0,
    etag: true
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

