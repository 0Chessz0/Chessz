function detectPerformance() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const isLowEndDevice = () => {
    const memory = navigator.deviceMemory;
    const cores = navigator.hardwareConcurrency;
    
    if (memory && memory < 4) return true;
    if (cores && cores < 4) return true;
    
    return false;
  };
  
  if (prefersReducedMotion || isLowEndDevice()) {
    redirectToFallback();
    return false;
  }
  
  return true;
}

function redirectToFallback() {
  const currentPath = window.location.pathname;
  
  if (!currentPath.includes('/fallback/')) {
    const fileName = currentPath.split('/').pop() || 'index.html';
    const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    window.location.href = basePath + 'fallback/' + fileName;
  }
}

function initAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(el => observer.observe(el));
}

function createParticles() {
  const particleContainer = document.createElement('div');
  particleContainer.className = 'particle-container';
  document.body.appendChild(particleContainer);
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 3 + 's';
    particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
    particleContainer.appendChild(particle);
  }
}

function addKeyboardNav() {
  const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  
  focusableElements.forEach(el => {
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && el.tagName === 'A') {
        el.click();
      }
    });
  });
}

function addPageLoadAnimations() {
  document.body.classList.add('scanline-effect');
  
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.classList.add('animate-fade-in-up');
  }
  
  const staggerElements = document.querySelectorAll('.favorites-grid, .projects-grid, .social-grid');
  staggerElements.forEach(el => {
    el.classList.add('stagger-animation');
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function init() {
  if (!detectPerformance()) {
    return;
  }
  
  addPageLoadAnimations();
  initAnimations();
  createParticles();
  addKeyboardNav();
  initSmoothScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
  if (e.matches) {
    redirectToFallback();
  }
});
