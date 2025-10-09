// Theme management
(function() {
    'use strict';

    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Get current theme from localStorage or default to light
    function getTheme() {
        const stored = localStorage.getItem('theme');
        if (stored) {
            return stored;
        }
        // Default to light mode
        return 'light';
    }
    
    // Apply theme
    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update EmailJS theme if it exists
        if (window.emailjs) {
            // EmailJS doesn't need theme updates, but you can add custom logic here
        }
        
        // Dispatch custom event for other scripts to listen to
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
    
    // Toggle theme
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    }
    
    // Initialize theme on page load
    const initialTheme = getTheme();
    applyTheme(initialTheme);
    
    // Add click event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // System theme detection disabled - light mode is default
    // Users must manually toggle to dark mode
    // Uncomment below to enable system preference detection:
    /*
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
    */
    
    // Keyboard shortcut: Ctrl/Cmd + Shift + D
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            toggleTheme();
        }
    });
    
    console.log('🎨 Theme system initialized:', initialTheme);
})();

