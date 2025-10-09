// References Carousel
(function() {
    'use strict';

    // Configuration - Add your reference logo filenames here
    const referenceLogos = [
        'download.png',
        'download (1).png',
        'download (2).png',
        'images.png',
        'images (1).png',
        'images (2).png',
        'images (3).png'
    ];

    const track = document.getElementById('references-track');
    if (!track) return;

    // Function to create logo element
    function createLogoElement(filename, altText) {
        const img = document.createElement('img');
        // Encode filename for URLs (handles spaces and special characters)
        img.src = `/assets/references/${encodeURIComponent(filename)}`;
        img.alt = altText || 'Client Logo';
        img.className = 'reference-logo';
        img.loading = 'lazy';
        
        // Handle image load error (show placeholder or hide)
        img.onerror = function() {
            // If image doesn't exist, create a placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'reference-logo reference-placeholder';
            placeholder.style.cssText = `
                height: 80px;
                width: 160px;
                background: linear-gradient(135deg, var(--primary-blue), var(--accent-purple));
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
                font-size: 12px;
                text-align: center;
                padding: 10px;
            `;
            placeholder.textContent = filename.replace(/\.(png|jpg|jpeg|svg)$/i, '');
            this.parentNode.replaceChild(placeholder, this);
        };
        
        return img;
    }

    // Function to initialize carousel
    function initCarousel() {
        // Clear existing content
        track.innerHTML = '';

        // If no logos configured, show message
        if (referenceLogos.length === 0) {
            const message = document.createElement('p');
            message.textContent = 'Referans logoları eklemek için /public/assets/references/ klasörüne logo dosyalarınızı ekleyin';
            message.style.textAlign = 'center';
            message.style.color = 'var(--text-secondary)';
            track.appendChild(message);
            return;
        }

        // Create logos - duplicate 3 times for smooth infinite scroll
        for (let i = 0; i < 3; i++) {
            referenceLogos.forEach((logo, index) => {
                const logoEl = createLogoElement(logo, `Client ${index + 1}`);
                track.appendChild(logoEl);
            });
        }

        // Adjust animation speed based on number of logos
        const totalWidth = referenceLogos.length * 240; // Approximate width per logo
        const duration = Math.max(20, totalWidth / 40); // Slower for more logos
        track.style.animationDuration = `${duration}s`;
    }

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousel);
    } else {
        initCarousel();
    }

    console.log('📷 References carousel initialized with', referenceLogos.length, 'logos');
    console.log('📷 Logo files:', referenceLogos);
    
    // Debug: Log when images load successfully
    setTimeout(() => {
        const loadedImages = track.querySelectorAll('img[src]');
        const placeholders = track.querySelectorAll('.reference-placeholder');
        console.log(`📷 Loaded images: ${loadedImages.length}, Placeholders: ${placeholders.length}`);
    }, 1000);
})();

