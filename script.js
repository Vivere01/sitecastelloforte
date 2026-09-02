// Barbearia Castello Forte - Interactive Features

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 3. Smooth Active Section Link Highlighting
    const sections = document.querySelectorAll('section[id], footer[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // 5. Animated Number Counter (Contagem regressiva/progressiva de 0 até o valor final)
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let hasAnimatedCounters = false;

    function runCounters() {
        if (hasAnimatedCounters) return;
        hasAnimatedCounters = true;

        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const prefix = stat.getAttribute('data-prefix') || '';
            const suffix = stat.getAttribute('data-suffix') || '';
            const decimals = parseInt(stat.getAttribute('data-decimals')) || 0;

            const duration = 2200; // 2.2s de animação fluida
            const frameRate = 60;
            const totalFrames = Math.round((duration / 1000) * frameRate);
            let frame = 0;

            const timer = setInterval(() => {
                frame++;
                // Cubic ease-out curve
                const progress = frame / totalFrames;
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentVal = target * easeOut;

                if (frame >= totalFrames) {
                    clearInterval(timer);
                    const finalFormatted = decimals > 0 ? target.toFixed(decimals) : Math.round(target);
                    stat.textContent = `${prefix}${finalFormatted}${suffix}`;
                } else {
                    const currentFormatted = decimals > 0 ? currentVal.toFixed(decimals) : Math.floor(currentVal);
                    stat.textContent = `${prefix}${currentFormatted}${suffix}`;
                }
            }, 1000 / frameRate);
        });
    }

    // Executa a contagem ao carregar a página
    setTimeout(runCounters, 300);

});
