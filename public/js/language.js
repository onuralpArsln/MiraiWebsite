// Language Switcher (Placeholder for future i18n implementation)
(function() {
    'use strict';

    const langToggle = document.getElementById('lang-toggle');
    const langText = langToggle?.querySelector('.lang-text');
    
    if (!langToggle || !langText) return;

    // Get current language
    function getCurrentLanguage() {
        return localStorage.getItem('language') || 'TR';
    }

    // Set language
    function setLanguage(lang) {
        localStorage.setItem('language', lang);
        langText.textContent = lang;
        
        // Dispatch event for future i18n integration
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: lang } 
        }));
        
        console.log(`🌍 Language set to: ${lang}`);
        
        // Show notification (future: will reload content in selected language)
        showLanguageNotification(lang);
    }

    // Toggle language
    function toggleLanguage() {
        const currentLang = getCurrentLanguage();
        const newLang = currentLang === 'TR' ? 'EN' : 'TR';
        setLanguage(newLang);
    }

    // Show notification
    function showLanguageNotification(lang) {
        const message = lang === 'TR' 
            ? '🇹🇷 Türkçe seçildi (İngilizce desteği yakında!)' 
            : '🇬🇧 English selected (Full support coming soon!)';
        
        // Create notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, var(--primary-blue), var(--accent-purple));
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Initialize
    const initialLang = getCurrentLanguage();
    langText.textContent = initialLang;

    // Event listener
    langToggle.addEventListener('click', toggleLanguage);

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('🌍 Language switcher initialized:', initialLang);
    console.log('💡 Note: Full i18n support can be added by implementing translation files');
})();

