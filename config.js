// Configuration file - replace with .env in production
module.exports = {
    port: process.env.PORT || 3002,
    nodeEnv: process.env.NODE_ENV || 'development',

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
        siteUrl: process.env.SITE_URL || 'http://localhost:3000',
        siteName: 'Mirai AI',
        siteDescription: 'Kurumsal yapay zeka çözümleri ile işletmenizin dijital dönüşümünü hızlandırıyoruz',
        twitterHandle: '@miraiAI',
        ogImage: '/assets/og-image.jpg'
    }
};

