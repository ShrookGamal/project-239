const menuToggle = document.querySelector('.menu-toggle');
const mobileMenuContainer = document.querySelector('.mobile-menu-container');
const bars = document.querySelectorAll('.bar');
const navLinks = document.querySelectorAll('.nav-item');
const mobileLinks = document.querySelectorAll('.mobile-menu a');
const header = document.querySelector('.main-header');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
    mobileMenuContainer.classList.toggle('active-menu');
    if(mobileMenuContainer.classList.contains('active-menu')) {
        bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
        bars[1].style.opacity = "0";
        bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
    } else {
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
    }
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.top = '10px';
        navbar.style.padding = '8px 20px';
        navbar.style.background = "rgba(255, 255, 255, 0.98)";
    } else {
        header.style.top = '25px';
        navbar.style.padding = '10px 25px';
        navbar.style.background = "rgba(255, 255, 255, 0.9)";
    }

    let current = "";
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((a) => {
        a.classList.remove("active");
        if (a.getAttribute("href").includes(current)) {
            a.classList.add("active");
        }
    });
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuContainer.classList.remove('active-menu');
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

const animateNumbers = () => {
    const counters = document.querySelectorAll('.stat h3, .num');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-val');
        const increment = target / 100;
        let current = 0;

        const updateCount = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current) + (counter.classList.contains('num') ? '' : '+');
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + (counter.classList.contains('num') ? '' : '+');
            }
        };
        updateCount();
    });
};

const revealOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll, .about-text-side > *, .feature-item, .image-container, .service-card');
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 50) {
            el.classList.add('active-anim');
        }
    });
};

let started = false;
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
            animateNumbers();
            started = true;
        }
    });
}, { threshold: 0.15 });

const aboutSection = document.querySelector('.about-section');
if(aboutSection) statsObserver.observe(aboutSection);

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

const styleInjection = document.createElement('style');
styleInjection.innerHTML = `
    .about-text-side > *, .feature-item, .animate-on-scroll, .image-container, .service-card {
        opacity: 0;
        transform: translateY(30px);
        transition: 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .active-anim {
        opacity: 1;
        transform: translateY(0) !important;
    }
    .feature-item:nth-child(2) { transition-delay: 0.2s; }
    .feature-item:nth-child(3) { transition-delay: 0.4s; }
    .service-card:nth-child(2) { transition-delay: 0.1s; }
    .service-card:nth-child(3) { transition-delay: 0.2s; }
`;
document.head.appendChild(styleInjection);

const whyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0) scale(1)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feat-card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px) scale(0.9)";
    whyObserver.observe(card);
});

const whatsappForm = document.getElementById('whatsappForm');
if(whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        const whatsappNumber = "966505986457";
        const text = `السلام عليكم مؤسسة أبو إياد للمقاولات%0A%0A*طلب خدمة جديد*%0A------------------%0A*الاسم:* ${name}%0A*الخدمة:* ${service}%0A*التفاصيل:* ${message}`;
        window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
    });
}

const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.contact-info-card, .contact-form-card').forEach(card => {
    card.style.opacity = "0";
    if(card.classList.contains('animate-slide-right')) {
        card.style.transform = "translateX(40px)";
    } else {
        card.style.transform = "translateX(-40px)";
    }
    contactObserver.observe(card);
});