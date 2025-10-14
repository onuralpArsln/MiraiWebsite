// Configuration file - env-less mode
module.exports = {
    port: process.env.PORT || 3002,
    nodeEnv: process.env.NODE_ENV || 'production',

    // EmailJS
    emailJS: {
        serviceId: process.env.EMAILJS_SERVICE_ID || 'service_1rkzjra',
        publicKey: process.env.EMAILJS_PUBLIC_KEY || 'OH6IvxL-FD3cYE6Fe'
    },

    // Rate Limiting
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        maxRequests: 100,
        contactFormLimit: 5
    },

    // SEO
    seo: {
        siteUrl: process.env.SITE_URL || 'http://localhost:3002',
        siteName: 'Mirai AI',
        siteDescription: 'Kurumsal yapay zeka çözümleri ile işletmenizin dijital dönüşümünü hızlandırıyoruz',
        twitterHandle: '@miraiAI',
        ogImage: '/assets/og-image.jpg'
    },

    // Static file serving configuration - optimized for deployment
    staticFiles: {
        maxAge: '1y', // Always use long cache for production
        etag: true,
        lastModified: true,
        setHeaders: (res, path) => {
            // Set proper MIME types for CSS files
            if (path.endsWith('.css')) {
                res.setHeader('Content-Type', 'text/css');
                res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year cache
            }
        }
    }
};

