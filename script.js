// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(13,17,23,0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
  } else {
    navbar.style.background = 'rgba(13,17,23,0.9)';
    navbar.style.boxShadow = 'none';
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
function setActiveNav() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navItems.forEach(link => {
    link.style.color = '';
    link.style.background = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = '#58a6ff';
      link.style.background = 'rgba(88,166,255,0.1)';
    }
  });
}
window.addEventListener('scroll', setActiveNav);
setActiveNav();

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add animation classes to elements
const animatables = document.querySelectorAll(
  '.project-card, .skill-category, .stat-card, .edu-card, .timeline-item, .contact-card'
);
animatables.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
  observer.observe(el);
});

const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// ===== TYPING EFFECT FOR HERO TITLE =====
const titles = [
  'Data Scientist',
  'ML Engineer',
  'NLP Specialist',
  'Data Analyst'
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.querySelector('.hero-title');
const baseText = ' | NLP & Machine Learning | MSc Data Science';

function typeEffect() {
  const currentTitle = titles[titleIndex];
  if (isDeleting) {
    typingEl.innerHTML = currentTitle.substring(0, charIndex - 1) + '<span class="cursor">|</span>' + baseText;
    charIndex--;
    if (charIndex === 0) { isDeleting = false; titleIndex = (titleIndex + 1) % titles.length; setTimeout(typeEffect, 500); return; }
    setTimeout(typeEffect, 60);
  } else {
    typingEl.innerHTML = currentTitle.substring(0, charIndex + 1) + '<span class="cursor">|</span>' + baseText;
    charIndex++;
    if (charIndex === currentTitle.length) { isDeleting = true; setTimeout(typeEffect, 2000); return; }
    setTimeout(typeEffect, 100);
  }
}

const cursorStyle = document.createElement('style');
cursorStyle.textContent = '.cursor { animation: blink 0.8s infinite; color: #58a6ff; } @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }';
document.head.appendChild(cursorStyle);
setTimeout(typeEffect, 1500);

// ===== BACK TO TOP =====
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.setAttribute('aria-label', 'Back to top');
backToTopBtn.style.cssText = `
  position: fixed; bottom: 2rem; right: 2rem; z-index: 999;
  width: 44px; height: 44px; border-radius: 50%; border: none; cursor: pointer;
  background: linear-gradient(135deg, #1f6feb, #58a6ff);
  color: white; font-size: 1rem; opacity: 0; transition: opacity 0.3s, transform 0.3s;
  box-shadow: 0 4px 16px rgba(88,166,255,0.4); transform: translateY(10px);
`;
document.body.appendChild(backToTopBtn);
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.style.opacity = '1';
    backToTopBtn.style.transform = 'translateY(0)';
  } else {
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.transform = 'translateY(10px)';
  }
});
backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
