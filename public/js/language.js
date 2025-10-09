// Language Switcher with i18n Support
(function() {
    'use strict';

    const langToggle = document.getElementById('lang-toggle');
    const langText = langToggle?.querySelector('.lang-text');
    
    if (!langToggle || !langText) return;

    let translations = { TR: null, EN: null };
    let currentLang = localStorage.getItem('language') || 'TR';

    // Load translation file
    async function loadTranslation(lang) {
        if (translations[lang]) return translations[lang];
        
        try {
            const response = await fetch(`/locales/${lang.toLowerCase()}.json`);
            const data = await response.json();
            translations[lang] = data;
            return data;
        } catch (error) {
            console.error(`Failed to load ${lang} translations:`, error);
            return null;
        }
    }

    // Apply translations to page
    function applyTranslations(t) {
        if (!t) return;

        // Navigation
        const navItems = {
            'home': document.querySelector('a[href="#home"]'),
            'features': document.querySelector('a[href="#features"]'),
            'solutions': document.querySelector('a[href="#solutions"]'),
            'contact': document.querySelector('a[href="#contact"]')
        };
        
        Object.keys(navItems).forEach(key => {
            if (navItems[key] && t.nav[key]) {
                navItems[key].textContent = t.nav[key];
            }
        });

        // Demo button in nav
        const demoBtn = document.querySelector('.btn-signup');
        if (demoBtn && t.nav.demo) {
            demoBtn.textContent = t.nav.demo;
        }

        // Hero section
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && t.hero) {
            const highlight = heroTitle.querySelector('.highlight');
            if (highlight) {
                heroTitle.innerHTML = `${t.hero.title} <span class="highlight">${t.hero.titleHighlight}</span>`;
            }
        }

        const heroDesc = document.querySelector('.hero-description');
        if (heroDesc && t.hero.description) {
            heroDesc.textContent = t.hero.description;
        }

        const heroBtns = document.querySelectorAll('.hero-buttons a');
        if (heroBtns.length >= 2 && t.hero) {
            heroBtns[0].textContent = t.hero.demoBtn;
            heroBtns[1].textContent = t.hero.learnBtn;
        }

        // Hero stats
        const statLabels = document.querySelectorAll('.stat-item p');
        if (statLabels.length >= 3 && t.hero.stats) {
            statLabels[0].textContent = t.hero.stats.clients;
            statLabels[1].textContent = t.hero.stats.requests;
            statLabels[2].textContent = t.hero.stats.uptime;
        }

        // Features section
        const featureTitle = document.querySelector('.features .section-title');
        if (featureTitle && t.features.title) {
            featureTitle.textContent = t.features.title;
        }

        const featureDesc = document.querySelector('.features .section-description');
        if (featureDesc && t.features.description) {
            featureDesc.textContent = t.features.description;
        }

        const featureCards = document.querySelectorAll('.feature-card');
        const featureKeys = ['integration', 'learning', 'custom', 'security', 'scalable', 'support'];
        featureCards.forEach((card, i) => {
            if (t.features[featureKeys[i]]) {
                const title = card.querySelector('h3');
                const desc = card.querySelector('p');
                if (title) title.textContent = t.features[featureKeys[i]].title;
                if (desc) desc.textContent = t.features[featureKeys[i]].desc;
            }
        });

        // References section
        const refTitle = document.querySelector('.references .section-title');
        if (refTitle && t.references.title) {
            refTitle.textContent = t.references.title;
        }

        const refDesc = document.querySelector('.references .section-description');
        if (refDesc && t.references.description) {
            refDesc.textContent = t.references.description;
        }

        // Solutions section
        const solTitle = document.querySelector('.courses .section-title');
        if (solTitle && t.solutions.title) {
            solTitle.textContent = t.solutions.title;
        }

        const solDesc = document.querySelector('.courses .section-description');
        if (solDesc && t.solutions.description) {
            solDesc.textContent = t.solutions.description;
        }

        const viewAllBtn = document.querySelector('.btn-secondary-large');
        if (viewAllBtn && t.solutions.viewAll) {
            viewAllBtn.textContent = t.solutions.viewAll;
        }

        // CTA section
        const ctaTitle = document.querySelector('.cta-title');
        if (ctaTitle && t.cta.title) {
            ctaTitle.textContent = t.cta.title;
        }

        const ctaDesc = document.querySelector('.cta-description');
        if (ctaDesc && t.cta.description) {
            ctaDesc.textContent = t.cta.description;
        }

        const ctaBtn = document.querySelector('.btn-cta');
        if (ctaBtn && t.cta.button) {
            ctaBtn.textContent = t.cta.button;
        }

        // Demo section
        const demoTitle = document.querySelector('.demo-section .section-title');
        if (demoTitle && t.demo.title) {
            demoTitle.textContent = t.demo.title;
        }

        const demoDesc = document.querySelector('.demo-section .section-description');
        if (demoDesc && t.demo.description) {
            demoDesc.textContent = t.demo.description;
        }

        const demoStatus = document.querySelector('.demo-status span:last-child');
        if (demoStatus && t.demo.status) {
            demoStatus.textContent = t.demo.status;
        }

        const demoInput = document.getElementById('demo-input');
        if (demoInput && t.demo.placeholder) {
            demoInput.placeholder = t.demo.placeholder;
        }

        const demoSendBtn = document.querySelector('.demo-send-btn span:first-child');
        if (demoSendBtn && t.demo.send) {
            demoSendBtn.textContent = t.demo.send;
        }

        // Contact section
        const contactTitle = document.querySelector('.contact .section-title');
        if (contactTitle && t.contact.title) {
            contactTitle.textContent = t.contact.title;
        }

        const contactDesc = document.querySelector('.contact .section-description');
        if (contactDesc && t.contact.description) {
            contactDesc.textContent = t.contact.description;
        }

        // Contact form labels
        const labels = {
            'user_name': t.contact.name,
            'user_email': t.contact.email,
            'company_name': t.contact.company,
            'phone': t.contact.phone,
            'message': t.contact.message
        };

        Object.keys(labels).forEach(id => {
            const label = document.querySelector(`label[for="${id}"]`);
            if (label) {
                label.textContent = labels[id] + (id === 'user_name' || id === 'user_email' || id === 'message' ? ' *' : '');
            }
        });

        const submitBtn = document.querySelector('.btn-submit .btn-text');
        if (submitBtn && t.contact.submit) {
            submitBtn.textContent = t.contact.submit;
        }

        // Contact info cards
        const infoCards = document.querySelectorAll('.info-card');
        if (infoCards.length >= 3 && t.contact.info) {
            const cardTitles = infoCards[0].querySelectorAll('h4');
            const cardTexts = infoCards[0].querySelectorAll('p');
            if (cardTitles[0]) cardTitles[0].textContent = t.contact.info.address;
            if (cardTexts[0]) cardTexts[0].textContent = t.contact.info.addressText;
            
            if (infoCards[1].querySelector('h4')) 
                infoCards[1].querySelector('h4').textContent = t.contact.info.emailTitle;
            
            if (infoCards[2].querySelector('h4')) 
                infoCards[2].querySelector('h4').textContent = t.contact.info.hours;
            if (infoCards[2].querySelector('p')) 
                infoCards[2].querySelector('p').textContent = t.contact.info.hoursText;
        }

        // Footer
        const footerDesc = document.querySelector('.footer-description');
        if (footerDesc && t.footer.description) {
            footerDesc.textContent = t.footer.description;
        }

        const footerTitles = document.querySelectorAll('.footer-title');
        if (footerTitles.length >= 3 && t.footer) {
            footerTitles[0].textContent = t.footer.solutions;
            footerTitles[1].textContent = t.footer.company;
            footerTitles[2].textContent = t.footer.support;
        }

        const copyright = document.querySelector('.footer-bottom p');
        if (copyright && t.footer.copyright) {
            copyright.textContent = t.footer.copyright;
        }
    }

    // Change language
    async function changeLanguage(lang) {
        const t = await loadTranslation(lang);
        if (t) {
            applyTranslations(t);
            currentLang = lang;
            localStorage.setItem('language', lang);
            langText.textContent = lang;
            
            // Update page lang attribute
            document.documentElement.lang = lang === 'TR' ? 'tr' : 'en';
            
            // Dispatch event
            window.dispatchEvent(new CustomEvent('languageChanged', { 
                detail: { language: lang } 
            }));
            
            console.log(`🌍 Language changed to: ${lang}`);
            showNotification(lang);
        }
    }

    // Toggle language
    function toggleLanguage() {
        const newLang = currentLang === 'TR' ? 'EN' : 'TR';
        changeLanguage(newLang);
    }

    // Show notification
    function showNotification(lang) {
        const message = lang === 'TR' 
            ? '🇹🇷 Türkçe' 
            : '🇬🇧 English';
        
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
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // Initialize
    langText.textContent = currentLang;
    
    // Load and apply initial language
    loadTranslation(currentLang).then(t => {
        if (t) applyTranslations(t);
    });

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

    console.log('🌍 Language system initialized:', currentLang);
})();

