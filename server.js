const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        pageTitle: 'Mirai - Yapay Zeka Çözümleri ile İşinizi Dönüştürün'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Mirai server is running on http://localhost:${PORT}`);
    console.log(`📁 Serving static files from: ${path.join(__dirname, 'public')}`);
    console.log(`👁️  Views directory: ${path.join(__dirname, 'views')}`);
});

