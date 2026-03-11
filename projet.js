document.addEventListener('DOMContentLoaded', function() {
    
    const toggleMenu = document.querySelector('.responsive-menu');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');
    
    if (toggleMenu && menu) {
        toggleMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            menu.classList.toggle('responsive');
        });
        
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                toggleMenu.classList.remove('active');
                menu.classList.remove('responsive');
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!toggleMenu.contains(e.target) && !menu.contains(e.target)) {
                toggleMenu.classList.remove('active');
                menu.classList.remove('responsive');
            }
        });
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 820) {
                toggleMenu.classList.remove('active');
                menu.classList.remove('responsive');
            }
        });
    }
    
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                
                if (!bar.dataset.targetWidth) {
                    bar.dataset.targetWidth = bar.style.width || '0%';
                }
                
                bar.style.width = '0';
                bar.style.transition = 'width 1.5s ease-in-out';
                
                setTimeout(() => {
                    bar.style.width = bar.dataset.targetWidth;
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        if (bar.style.width) {
            bar.dataset.targetWidth = bar.style.width;
        }
        bar.style.width = '0';
        observer.observe(bar);
    });
    
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                subject: document.getElementById('subject')?.value || '',
                message: document.getElementById('message')?.value || ''
            };
            
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showNotification('Veuillez remplir tous les champs', 'error');
                return;
            }
            
            if (!isValidEmail(formData.email)) {
                showNotification('Veuillez entrer un email valide', 'error');
                return;
            }
            
            console.log('Formulaire soumis :', formData);
            showNotification('Message envoyé avec succès !', 'success');
            contactForm.reset();
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 5px;
            color: white;
            font-size: 16px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        
        if (type === 'success') {
            notification.style.backgroundColor = '#4CAF50';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#f44336';
        } else {
            notification.style.backgroundColor = '#2196F3';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.hobby-card, .skills-category, .about-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.menu a');
    
    function updateActiveLink() {
        let current = '';
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 60;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href').replace('#', '');
            if (linkHref === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('load', updateActiveLink);
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                if (menu.classList.contains('responsive')) {
                    toggleMenu.classList.remove('active');
                    menu.classList.remove('responsive');
                }
                
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
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
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes slideMenuIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideMenuOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .menu a.active {
            color: aqua !important;
            font-weight: bold;
        }
        
        .hobby-card, .skills-category, .about-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .skill-progress {
            transition: width 1.5s ease-in-out;
        }
        
        @media (max-width: 820px) {
            header .menu.responsive {
                display: flex;
                position: fixed;
                top: 60px;
                right: 0;
                left: auto;
                width: 280px;
                flex-direction: column;
                background-color: #222;
                padding: 20px;
                border-left: 2px solid aqua;
                border-bottom: 2px solid aqua;
                border-radius: 0 0 0 15px;
                box-shadow: -5px 5px 15px rgba(0, 255, 255, 0.3);
                animation: slideMenuIn 0.4s ease forwards;
                z-index: 1000;
            }
            
            header .menu {
                display: none;
            }
            
            header .menu.responsive li {
                margin: 15px 0;
                width: 100%;
                text-align: left;
                padding-left: 15px;
                border-left: 3px solid transparent;
                transition: all 0.3s ease;
            }
            
            header .menu.responsive li:hover {
                border-left-color: aqua;
                background: linear-gradient(90deg, rgba(0,255,255,0.1), transparent);
            }
            
            header .menu.responsive li a {
                display: block;
                padding: 12px 15px;
                font-size: 1.8rem;
                color: #fff;
                transition: all 0.3s ease;
            }
            
            header .menu.responsive li a:hover {
                color: aqua;
                transform: translateX(5px);
            }
            
            header .menu.responsive li a.active {
                color: aqua !important;
                font-weight: bold;
                border-left-color: aqua;
            }
        }
        
        @media (max-width: 480px) {
            header .menu.responsive {
                width: 100%;
                top: 55px;
                border-radius: 0;
                border-left: none;
                animation: slideDown 0.4s ease forwards;
            }
            
            header .menu.responsive li {
                text-align: center;
                padding-left: 0;
                border-left: none;
            }
            
            header .menu.responsive li:hover {
                border-left-color: transparent;
            }
            
            header .menu.responsive li a {
                text-align: center;
            }
        }
    `;
    
    document.head.appendChild(style);
});
