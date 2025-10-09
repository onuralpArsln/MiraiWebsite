// Particle Animation System
(function() {
    'use strict';

    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };
    let animationId;

    // Configuration
    const config = {
        particleCount: window.innerWidth < 768 ? 30 : 60,
        particleSize: { min: 1, max: 3 },
        speed: { min: 0.1, max: 0.5 },
        connectDistance: 120,
        mouseInteraction: true
    };

    // Resize canvas to fill container
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * (config.particleSize.max - config.particleSize.min) + config.particleSize.min;
            this.speedX = (Math.random() - 0.5) * (config.speed.max - config.speed.min) + config.speed.min;
            this.speedY = (Math.random() - 0.5) * (config.speed.max - config.speed.min) + config.speed.min;
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        update() {
            // Move particle
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off edges
            if (this.x > canvas.width || this.x < 0) {
                this.speedX *= -1;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY *= -1;
            }

            // Mouse interaction
            if (config.mouseInteraction && mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    this.x -= Math.cos(angle) * force * 2;
                    this.y -= Math.sin(angle) * force * 2;
                }
            }
        }

        draw() {
            const theme = document.documentElement.getAttribute('data-theme');
            const color = theme === 'dark' ? '168, 210, 217' : '74, 85, 225'; // turquoise for dark, blue for light
            
            ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize particles
    function initParticles() {
        particles = [];
        for (let i = 0; i < config.particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Connect nearby particles with lines
    function connectParticles() {
        const theme = document.documentElement.getAttribute('data-theme');
        const color = theme === 'dark' ? '168, 210, 217' : '74, 85, 225';

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.connectDistance) {
                    const opacity = (1 - distance / config.connectDistance) * 0.3;
                    ctx.strokeStyle = `rgba(${color}, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Connect particles
        connectParticles();

        animationId = requestAnimationFrame(animate);
    }

    // Mouse move handler
    function handleMouseMove(e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }

    function handleMouseLeave() {
        mouse.x = null;
        mouse.y = null;
    }

    // Touch support for mobile
    function handleTouchMove(e) {
        if (e.touches.length > 0) {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.touches[0].clientX - rect.left;
            mouse.y = e.touches[0].clientY - rect.top;
        }
    }

    function handleTouchEnd() {
        mouse.x = null;
        mouse.y = null;
    }

    // Initialize
    function init() {
        resizeCanvas();
        initParticles();
        animate();

        // Event listeners
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
        canvas.addEventListener('touchend', handleTouchEnd);
        
        window.addEventListener('resize', () => {
            resizeCanvas();
            // Reinitialize with new particle count for mobile/desktop
            const newCount = window.innerWidth < 768 ? 30 : 60;
            if (newCount !== config.particleCount) {
                config.particleCount = newCount;
                initParticles();
            }
        });

        // Listen for theme changes to update colors
        window.addEventListener('themeChanged', () => {
            // Particles will automatically use new theme colors on next draw
        });
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });

    console.log('✨ Particle system initialized');
})();

