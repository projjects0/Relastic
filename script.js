// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Language Switching
const langButtons = document.querySelectorAll('.lang-btn');
const translations = {
    en: {
        home: 'Home',
        services: 'Services',
        gallery: 'Gallery',
        testimonials: 'Testimonials',
        contact: 'Contact',
        heroTitle: 'Expert Maintenance for American Control Systems',
        heroSubtitle: 'Trust Hamada Control for all your control system needs',
        ctaButton: 'Get a Quote',
        servicesTitle: 'Our Services',
        diagnostics: 'Control System Diagnostics',
        diagnosticsDesc: 'Fast and accurate problem-solving for your control systems',
        repairs: 'Electrical Repairs',
        repairsDesc: 'Reliable fixes for all American systems',
        maintenance: 'Preventive Maintenance',
        maintenanceDesc: 'Keep your controls running smoothly',
        galleryTitle: 'Our Work',
        testimonialsTitle: 'What Our Clients Say',
        contactTitle: 'Contact Us',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        sendMessage: 'Send Message',
        followUs: 'Follow Us',
        location: 'Location',
        address: '123 Main Street, Cairo, Egypt',
        copyright: '© 2025 Mostafa Elsayed. All rights reserved.'
    },
    ar: {
        home: 'الرئيسية',
        services: 'خدماتنا',
        gallery: 'معرض الأعمال',
        testimonials: 'آراء العملاء',
        contact: 'اتصل بنا',
        heroTitle: 'صيانة متخصصة لأنظمة التحكم الأمريكية',
        heroSubtitle: 'ثق في حماده كنترول لجميع احتياجات نظام التحكم الخاصة بك',
        ctaButton: 'احصل على عرض سعر',
        servicesTitle: 'خدماتنا',
        diagnostics: 'تشخيص أنظمة التحكم',
        diagnosticsDesc: 'حلول سريعة ودقيقة لمشاكل أنظمة التحكم',
        repairs: 'إصلاحات كهربائية',
        repairsDesc: 'إصلاحات موثوقة لجميع الأنظمة الأمريكية',
        maintenance: 'صيانة وقائية',
        maintenanceDesc: 'حافظ على تشغيل أنظمة التحكم بسلاسة',
        galleryTitle: 'أعمالنا',
        testimonialsTitle: 'ماذا يقول عملاؤنا',
        contactTitle: 'اتصل بنا',
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        message: 'الرسالة',
        sendMessage: 'إرسال الرسالة',
        copyright: '© 2023 هامادا كنترول. جميع الحقوق محفوظة.'
    }
};

function switchLanguage(lang) {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Update navigation
    document.querySelectorAll('.nav-links a').forEach((link, index) => {
        const keys = ['home', 'services', 'gallery', 'testimonials', 'contact'];
        link.textContent = translations[lang][keys[index]];
    });

    // Update hero section
    document.querySelector('.hero h1').textContent = translations[lang].heroTitle;
    document.querySelector('.hero p').textContent = translations[lang].heroSubtitle;
    document.querySelector('.cta-button').textContent = translations[lang].ctaButton;

    // Update services section
    document.querySelector('.services h2').textContent = translations[lang].servicesTitle;
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceKeys = ['diagnostics', 'repairs', 'maintenance'];
    serviceCards.forEach((card, index) => {
        card.querySelector('h3').textContent = translations[lang][serviceKeys[index]];
        card.querySelector('p').textContent = translations[lang][`${serviceKeys[index]}Desc`];
    });

    // Update gallery section
    document.querySelector('.gallery h2').textContent = translations[lang].galleryTitle;

    // Update testimonials section
    document.querySelector('.testimonials h2').textContent = translations[lang].testimonialsTitle;

    // Update contact section
    document.querySelector('.contact h2').textContent = translations[lang].contactTitle;
    document.querySelector('label[for="name"]').textContent = translations[lang].name;
    document.querySelector('label[for="email"]').textContent = translations[lang].email;
    document.querySelector('label[for="message"]').textContent = translations[lang].message;
    document.querySelector('.submit-btn').textContent = translations[lang].sendMessage;

    // Update footer
    document.querySelector('.footer-info p').textContent = translations[lang].copyright;

    // Update active language button
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        switchLanguage(btn.dataset.lang);
    });
});

// Form Validation
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Gallery Lightbox Functionality
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const desc = item.querySelector('p').textContent;
        openLightbox({ src: img.src, alt: title, desc: desc });
    });
});

function openLightbox(image) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    
    const caption = document.createElement('div');
    caption.className = 'lightbox-caption';
    caption.innerHTML = `<h3>${image.alt}</h3><p>${image.desc}</p>`;
    
    lightbox.appendChild(img);
    lightbox.appendChild(caption);
    
    lightbox.addEventListener('click', () => {
        lightbox.remove();
    });
    
    document.body.appendChild(lightbox);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .gallery-item, .testimonial-card').forEach(el => {
    observer.observe(el);
}); 