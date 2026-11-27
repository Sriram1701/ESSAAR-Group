/**
 * ESSAAR GROUP OF COMPANIES — OFFICIAL JAVASCRIPT
 * Handles navigation, mobile drawer, sticky header, gallery lightbox, 
 * contact form handling & WhatsApp integration.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- Sticky Header & Back-to-Top ---
  const header = document.querySelector('.site-header');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;

    if (header) {
      if (scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Mobile Drawer Menu ---
  const mobileToggle = document.querySelector('.mobile-nav-toggle, .mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');
  const drawerClose = document.querySelector('.drawer-close');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  // Close drawer on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close drawer on link click
  const drawerLinks = document.querySelectorAll('.mobile-drawer a');
  drawerLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeDrawer();
    });
  });

  // --- Gallery Filters & Lightbox ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox-modal');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(function (item) {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue || (filterValue && category && category.includes(filterValue))) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Lightbox click
  if (galleryItems.length > 0 && lightbox) {
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption') ? item.querySelector('.gallery-caption').textContent : '';

        if (img && lightboxImg) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || 'ESSAAR Group Project';
        }
        if (lightboxCaption) {
          lightboxCaption.textContent = caption;
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', function () {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Contact Form Handling & WhatsApp Inquiry Generation ---
  const contactForms = document.querySelectorAll('.essaar-contact-form');

  contactForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = form.querySelector('[name="name"]');
      const emailInput = form.querySelector('[name="email"]');
      const phoneInput = form.querySelector('[name="phone"]');
      const companySelect = form.querySelector('[name="company"]');
      const serviceSelect = form.querySelector('[name="service"]');
      const messageInput = form.querySelector('[name="message"]');
      const feedback = form.querySelector('.form-feedback');

      if (!nameInput || !nameInput.value.trim()) {
        showFeedback(feedback, 'Please enter your full name.', 'error');
        return;
      }

      if (!phoneInput || !phoneInput.value.trim()) {
        showFeedback(feedback, 'Please provide a valid phone or mobile number.', 'error');
        return;
      }

      const senderName = nameInput.value.trim();
      const senderPhone = phoneInput.value.trim();
      const senderEmail = emailInput ? emailInput.value.trim() : 'Not provided';
      const selectedCompany = companySelect ? companySelect.options[companySelect.selectedIndex].text : 'ESSAAR Group';
      const selectedService = serviceSelect ? serviceSelect.value : 'General Enquiry';
      const userMessage = messageInput ? messageInput.value.trim() : 'Enquiry regarding services';

      // Build WhatsApp message
      const textMessage = `*New Corporate Enquiry - ESSAAR Group*%0A%0A` +
        `*Name:* ${encodeURIComponent(senderName)}%0A` +
        `*Phone:* ${encodeURIComponent(senderPhone)}%0A` +
        `*Email:* ${encodeURIComponent(senderEmail)}%0A` +
        `*Company Unit:* ${encodeURIComponent(selectedCompany)}%0A` +
        `*Interest/Service:* ${encodeURIComponent(selectedService)}%0A` +
        `*Requirement:* ${encodeURIComponent(userMessage)}`;

      // WhatsApp number verified from Prateesh Engineering / Group operations
      const whatsappNumber = '919597000189';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${textMessage}`;

      showFeedback(
        feedback,
        `Thank you, ${senderName}! Redirecting your enquiry directly to the ESSAAR Group representative via WhatsApp...`,
        'success'
      );

      // Open WhatsApp in new window after brief delay
      setTimeout(function () {
        window.open(whatsappUrl, '_blank');
      }, 1200);
    });
  });

  function showFeedback(element, text, type) {
    if (!element) return;
    element.className = `form-feedback ${type}`;
    element.textContent = text;
    element.style.display = 'block';
  }

  // --- FAQ Accordion Logic ---
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(function (item, index) {
      const questionBtn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      if (questionBtn && answer) {
        questionBtn.addEventListener('click', function () {
          const isActive = item.classList.contains('active');

          // Smoothly close any sibling open FAQ item
          faqItems.forEach(function (otherItem) {
            if (otherItem !== item && otherItem.classList.contains('active')) {
              otherItem.classList.remove('active');
              const otherAnswer = otherItem.querySelector('.faq-answer');
              const otherBtn = otherItem.querySelector('.faq-question');
              if (otherAnswer) otherAnswer.style.maxHeight = null;
              if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            }
          });

          if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            questionBtn.setAttribute('aria-expanded', 'true');
          } else {
            item.classList.remove('active');
            answer.style.maxHeight = null;
            questionBtn.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1 && document.querySelector(targetId)) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Reusable Milestone & Stats Counter Animation Effect ---
  function initCounterAnimation(containerSelector, itemSelector) {
    const containers = document.querySelectorAll(containerSelector);
    if (!containers.length) return;

    containers.forEach(function (container) {
      const counters = container.querySelectorAll(itemSelector);
      if (!counters.length) return;

      let animated = false;

      function runAnimation() {
        if (animated) return;
        animated = true;
        container.classList.add('animated');

        counters.forEach(function (el) {
          const rawTarget = el.getAttribute('data-target') || el.textContent.trim();
          const target = parseInt(rawTarget, 10);
          if (isNaN(target)) return;

          const start = parseInt(el.getAttribute('data-start') || '0', 10);
          const hasLeadingZero = el.textContent.trim().startsWith('0') && el.textContent.trim().length > 1;
          const duration = 1800;
          let startTime = null;

          function update(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Smooth cubic ease-out: starts fast, lands gently
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + easeOut * (target - start));

            if (hasLeadingZero) {
              el.textContent = String(current).padStart(2, '0');
            } else {
              el.textContent = current;
            }

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              el.textContent = hasLeadingZero ? String(target).padStart(2, '0') : target;
            }
          }

          el.textContent = hasLeadingZero ? '00' : String(start);
          requestAnimationFrame(update);
        });
      }

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              runAnimation();
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });

        observer.observe(container);
      } else {
        runAnimation();
      }
    });
  }

  // Initialize Homepage Stats and About Milestone Counters
  initCounterAnimation('.hero-stats-editorial', '.stat-num-val');
  initCounterAnimation('.about-milestone-box', '.milestone-counter');

  // --- Hero Background Image Slideshow (3 Rotating Photos) ---
  (function initHeroBgSlider() {
    const slides = document.querySelectorAll('.hero-bg-slide');
    if (!slides || slides.length <= 1) return;

    let currentIndex = 0;
    const intervalTime = 5000; // 5 seconds per slide

    function nextSlide() {
      slides[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].classList.add('active');
    }

    let sliderTimer = setInterval(nextSlide, intervalTime);

    // Pause on tab visibility change to avoid stacking transitions
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        clearInterval(sliderTimer);
      } else {
        clearInterval(sliderTimer);
        sliderTimer = setInterval(nextSlide, intervalTime);
      }
    });
  })();

  // --- Professional Scroll Reveal Animations (IntersectionObserver) ---
  (function initScrollReveal() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const targetSelectors = [
      '.section-header',
      '.company-card',
      '.service-card',
      '.company-service-5card',
      '.industry-feature-row',
      '.why-card',
      '.ecosystem-card',
      '.about-company-card',
      '.capability-card',
      '.contact-info-card',
      '.contact-form-card',
      '.gallery-item',
      '.about-milestone-box',
      '.about-card-box'
    ];

    const elementsToReveal = document.querySelectorAll(targetSelectors.join(', '));
    if (!elementsToReveal.length) return;

    if (!('IntersectionObserver' in window)) {
      elementsToReveal.forEach(function (el) {
        el.classList.add('is-revealed');
      });
      return;
    }

    elementsToReveal.forEach(function (el) {
      el.classList.add('reveal-on-scroll');
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-revealed');
      }
    });

    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    elementsToReveal.forEach(function (el) {
      if (!el.classList.contains('is-revealed')) {
        revealObserver.observe(el);
      }
    });
  })();

});
