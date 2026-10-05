/**
 * EMERSONFORT TECHNOLOGIES (OPC) PRIVATE LIMITED
 * Official JavaScript Controller
 * Lightweight Vanilla JS for UX Interactions, Mobile Drawer, Form Validation & Scroll Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initServiceFilters();
  initContactForm();
  initSmoothScroll();
  initScrollReveal();
});

/**
 * 1. STICKY HEADER & SCROLL SHADOW
 */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 2. MOBILE NAVIGATION DRAWER
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navWrapper = document.querySelector('.nav-menu-wrapper');
  if (!toggleBtn || !navWrapper) return;

  const openDrawer = () => {
    navWrapper.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    navWrapper.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = navWrapper.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // Close on backdrop click
  navWrapper.addEventListener('click', (e) => {
    if (e.target === navWrapper) {
      closeDrawer();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navWrapper.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close when clicking a nav link
  const navLinks = navWrapper.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

/**
 * 3. SERVICES PAGE CATEGORY FILTERING
 */
function initServiceFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-detail-card');
  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          card.classList.add('revealed');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Check URL query parameters (e.g. ?sector=education)
  const urlParams = new URLSearchParams(window.location.search);
  const sectorParam = urlParams.get('sector');
  if (sectorParam) {
    const targetBtn = document.querySelector(`.filter-btn[data-filter="${sectorParam}"]`);
    if (targetBtn) {
      targetBtn.click();
    }
  }
}

/**
 * 4. MULTI-SECTOR CONTACT ENQUIRY FORM VALIDATION
 */
function initContactForm() {
  const form = document.getElementById('emerson-contact-form');
  if (!form) return;

  const feedbackBox = document.getElementById('form-feedback-msg');

  // Preselect sector if specified in URL
  const urlParams = new URLSearchParams(window.location.search);
  const sectorParam = urlParams.get('sector');
  if (sectorParam) {
    const sectorSelect = form.querySelector('#form-sector');
    if (sectorSelect) {
      for (let option of sectorSelect.options) {
        if (option.value.toLowerCase().includes(sectorParam.toLowerCase())) {
          option.selected = true;
          break;
        }
      }
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#form-name')?.value.trim();
    const email = form.querySelector('#form-email')?.value.trim();
    const phone = form.querySelector('#form-phone')?.value.trim();
    const sector = form.querySelector('#form-sector')?.value;
    const message = form.querySelector('#form-message')?.value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please provide a valid email address.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting Enquiry...';
    }

    setTimeout(() => {
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Enquiry Submitted Successfully <span class="btn-arrow">✓</span>';
      }

      if (feedbackBox) {
        feedbackBox.className = 'form-feedback success';
        feedbackBox.textContent = `Thank you, ${name}! Your enquiry for ${sector || 'our services'} has been routed to our corporate team in Srinagar, Jammu & Kashmir. We will contact you within 24 hours.`;
        feedbackBox.style.display = 'block';
        feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 800);
  });
}

/**
 * 5. SMOOTH SCROLLING FOR IN-PAGE ANCHORS
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#main-header') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/**
 * 6. SUBTLE BASE-LEVEL SCROLL REVEAL (IntersectionObserver)
 */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const revealElements = document.querySelectorAll(
    '.section-header, .sector-card-item, .value-card, .process-card, .service-detail-card, .contact-info-block, .cta-banner, .reveal-on-scroll'
  );

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  });

  revealElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
}
