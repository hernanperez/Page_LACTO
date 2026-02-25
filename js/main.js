/**
 * LACTOINSUMOS S.A.S. - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHeroSlider();
  initProductFilters();
  initScrollAnimations();
  initMobileMenu();
  handleURLParams();
});

/* ===========================
   HEADER SCROLL EFFECT
   =========================== */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ===========================
   HERO SLIDER
   =========================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.hero-indicator');
  if (slides.length === 0) return;

  const heroTitles = [
    'Materia Prima de Calidad para la Industria Alimentaria',
    'Importadores Directos con Cobertura Nacional',
    'Su Aliado Estratégico en la Industria de Alimentos'
  ];
  const heroSubtitles = [
    'Importamos y comercializamos materias primas con los más altos estándares de calidad, precios competitivos y cobertura nacional.',
    'Desde 2008 importamos directamente para ofrecerle los mejores precios y un abastecimiento oportuno en todo el país.',
    'Más de 18 años de experiencia en productos lácteos, materias primas industriales y proteínas.'
  ];

  let current = 0;
  let interval;

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    indicators.forEach(i => i.classList.remove('active'));
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    const title = document.getElementById('heroTitle');
    const subtitle = document.getElementById('heroSubtitle');
    if (title) {
      title.style.opacity = 0;
      subtitle.style.opacity = 0;
      setTimeout(() => {
        title.textContent = heroTitles[index];
        subtitle.textContent = heroSubtitles[index];
        title.style.opacity = 1;
        subtitle.style.opacity = 1;
      }, 300);
    }
    current = index;
  }

  function nextSlide() {
    goToSlide((current + 1) % slides.length);
  }

  function startAutoplay() {
    interval = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    clearInterval(interval);
  }

  indicators.forEach(ind => {
    ind.addEventListener('click', () => {
      stopAutoplay();
      goToSlide(parseInt(ind.dataset.slide));
      startAutoplay();
    });
  });

  // Add CSS transitions for hero text
  const heroTitle = document.getElementById('heroTitle');
  const heroSubtitle = document.getElementById('heroSubtitle');
  if (heroTitle) heroTitle.style.transition = 'opacity 0.3s ease';
  if (heroSubtitle) heroSubtitle.style.transition = 'opacity 0.3s ease';

  startAutoplay();
}

/* ===========================
   PRODUCT FILTERS
   =========================== */
function initProductFilters() {
  const filters = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card');
  if (filters.length === 0 || cards.length === 0) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category;
      
      // Update active button
      filters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter cards with animation
      cards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = 'block';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ===========================
   URL PARAMS (product category)
   =========================== */
function handleURLParams() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  if (cat) {
    const filterBtn = document.querySelector(`.filter-btn[data-category="${cat}"]`);
    if (filterBtn) {
      setTimeout(() => filterBtn.click(), 100);
    }
  }
}

/* ===========================
   PRODUCT MODAL
   =========================== */
function openModal(cardElement) {
  const modal = document.getElementById('productModal');
  const modalBody = document.getElementById('modalBody');
  if (!modal || !modalBody) return;

  const title = cardElement.querySelector('h3').textContent;
  const img = cardElement.querySelector('.product-card-img img');
  
  let html = '';
  if (img) {
    html += `<img src="${img.src}" alt="${title}" style="width:100\%; max-height:75vh; object-fit:contain; border-radius:12px; display:block; margin:0 auto;">`;
  }

  modalBody.innerHTML = html;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    closeModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ===========================
   MOBILE MENU
   =========================== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });
}

/* ===========================
   SCROLL ANIMATIONS
   =========================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}
