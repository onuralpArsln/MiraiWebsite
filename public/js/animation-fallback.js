
// CSS Animation Detection and Fallback
(function() {
    'use strict';
    
    // Check if CSS animations are supported
    function supportsCSSAnimations() {
        var element = document.createElement('div');
        var animation = false;
        var keyframePrefix = false;
        
        if (element.style.animationName !== undefined) {
            animation = true;
        }
        
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'];
        for (var i = 0; i < prefixes.length; i++) {
            if (element.style[prefixes[i] + 'AnimationName'] !== undefined) {
                animation = true;
                keyframePrefix = '-' + prefixes[i].toLowerCase() + '-';
                break;
            }
        }
        
        return animation;
    }
    
    // Check if CSS transforms are supported
    function supportsCSSTransforms() {
        var element = document.createElement('div');
        var transform = false;
        var transformPrefix = false;
        
        if (element.style.transform !== undefined) {
            transform = true;
        }
        
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'];
        for (var i = 0; i < prefixes.length; i++) {
            if (element.style[prefixes[i] + 'Transform'] !== undefined) {
                transform = true;
                transformPrefix = '-' + prefixes[i].toLowerCase() + '-';
                break;
            }
        }
        
        return transform;
    }
    
    // Add classes to document based on support
    function addSupportClasses() {
        var html = document.documentElement;
        
        if (!supportsCSSAnimations()) {
            html.classList.add('no-cssanimations');
            console.warn('CSS Animations not supported, using fallbacks');
        }
        
        if (!supportsCSSTransforms()) {
            html.classList.add('no-csstransforms');
            console.warn('CSS Transforms not supported, animations may not work');
        }
        
        // Add hardware acceleration class if supported
        if (supportsCSSTransforms()) {
            html.classList.add('hardware-accelerated');
        }
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addSupportClasses);
    } else {
        addSupportClasses();
    }
    
    // Force hardware acceleration on Windows
    if (navigator.platform.indexOf('Win') !== -1) {
        document.documentElement.classList.add('windows-platform');
        
        // Add specific Windows CSS
        var style = document.createElement('style');
        style.textContent = `
            .windows-platform .course-icon,
            .windows-platform .eye-pupil,
            .windows-platform .bubble,
            .windows-platform .chart-curve-1,
            .windows-platform .chart-curve-2,
            .windows-platform .chart-curve-3 {
                transform: translateZ(0) !important;
                -webkit-transform: translateZ(0) !important;
                -ms-transform: translateZ(0) !important;
                will-change: transform, opacity !important;
                -webkit-backface-visibility: hidden !important;
                backface-visibility: hidden !important;
            }
        `;
        document.head.appendChild(style);
    }
})();
