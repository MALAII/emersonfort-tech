/**
 * EMERSONFORT TECHNOLOGIES (OPC) PRIVATE LIMITED
 * Official JavaScript Controller
 * Lightweight Vanilla JS for UX Interactions, Mobile Drawer, Form Validation & Scroll Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initHeroConsole();
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
 * 2B. HERO INTERACTIVE MULTI-SECTOR CONSOLE CONTROLLER
 */
function initHeroConsole() {
  const tabs = document.querySelectorAll('.console-tab-btn');
  const stage = document.getElementById('hero-preview-stage');
  if (!tabs.length || !stage) return;

  const data = [
    {
      tag: 'SEC-03 & 04 // ENGINEERING & IT',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="7" width="20" height="14" rx="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
      title: 'Civil Engineering & IT Management',
      desc: 'Structural execution, terrain-specific construction, enterprise cloud systems, and secure IT infrastructure across Jammu & Kashmir.',
      caps: [
        'Mountain Terrain Civil Works & Structural QA',
        'Secure Enterprise IT & Cloud Networks',
        'Single-Point SLA Delivery & Compliance'
      ],
      link: 'services.html?sector=construction'
    },
    {
      tag: 'SEC-01 & 02 // ACADEMIC & SKILLS',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
      title: 'Education Services & Skill Development',
      desc: 'Smart classroom infrastructure, vocational apprenticeship programs, technical certifications, and employability workshops.',
      caps: [
        'Institutional Academic Curriculum & Advisory',
        'Vocational Technical Training & Certifications',
        'Youth Livelihood & Capacity-Building Camps'
      ],
      link: 'services.html?sector=education'
    },
    {
      tag: 'SEC-05, 06 & 07 // TOURISM, HEALTH & AGRO',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>',
      title: 'Tourism, Healthcare & Agro-Forestry',
      desc: 'Responsible Himalayan eco-tourism circuits, regional healthcare facility logistics, and afforestation watershed programs.',
      caps: [
        'Eco-Tourism Circuits & Heritage Logistics',
        'Clinical Support & Medical Logistics Support',
        'Afforestation & Himalayan Agro-Forestry'
      ],
      link: 'services.html?sector=tourism'
    },
    {
      tag: 'SEC-08 & 09 // EMPOWERMENT & WORKFORCE',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path></svg>',
      title: 'Women Empowerment & HR Staffing',
      desc: 'Socio-economic self-help group incubations, artisanal market linkages, technical talent deployment, and labor compliance.',
      caps: [
        'Women Entrepreneurship & SHG Market Linkage',
        'Technical Staffing & Project Deployment Teams',
        'Statutory Labor Compliance & Human Capital'
      ],
      link: 'services.html?sector=women'
    }
  ];

  const tagEl = document.getElementById('hero-preview-tag');
  const iconEl = document.getElementById('hero-preview-icon');
  const titleEl = document.getElementById('hero-preview-title');
  const descEl = document.getElementById('hero-preview-desc');
  const capsEl = document.getElementById('hero-preview-caps');
  const linkEl = document.getElementById('hero-preview-link');

  let currentIdx = 0;
  let autoTimer = null;

  const updateTab = (idx) => {
    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tabs[idx].classList.add('active');
    tabs[idx].setAttribute('aria-selected', 'true');

    stage.style.opacity = '0.3';
    stage.style.transform = 'translateY(4px)';

    setTimeout(() => {
      const item = data[idx];
      if (tagEl) tagEl.textContent = item.tag;
      if (iconEl) iconEl.innerHTML = item.icon;
      if (titleEl) titleEl.textContent = item.title;
      if (descEl) descEl.textContent = item.desc;
      if (linkEl) linkEl.href = item.link;

      if (capsEl) {
        capsEl.innerHTML = item.caps.map(cap => `
          <li class="preview-cap-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>${cap}</span>
          </li>
        `).join('');
      }

      stage.style.opacity = '1';
      stage.style.transform = 'translateY(0)';
    }, 150);
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      currentIdx = index;
      updateTab(currentIdx);
      resetAuto();
    });
  });

  const startAuto = () => {
    autoTimer = setInterval(() => {
      currentIdx = (currentIdx + 1) % data.length;
      updateTab(currentIdx);
    }, 4500);
  };

  const resetAuto = () => {
    if (autoTimer) clearInterval(autoTimer);
    startAuto();
  };

  const consoleCard = document.querySelector('.hero-console-card');
  if (consoleCard) {
    consoleCard.addEventListener('mouseenter', () => {
      if (autoTimer) clearInterval(autoTimer);
    });
    consoleCard.addEventListener('mouseleave', () => {
      resetAuto();
    });
  }

  startAuto();
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
