/**
 * Distinction Gardens — Main Front-End Controller
 * Handles dynamic config injection, slideshow with Ken Burns zoom,
 * client-side form validation, WhatsApp dispatch, gallery lightbox,
 * and clean stubs for Phase 2 Daraja M-Pesa & backend API integration.
 */

document.addEventListener('DOMContentLoaded', () => {
  initGlobalConfigBinding();
  initFloatingNavbar();
  initSlidingNavIndicator();
  initMobileNavDrawer();
  initHeroSlideshow();
  initBandSlideshows();
  initForms();
  initGalleryLightbox();
  initScrollReveal();
  initFaqAccordion();
});

/* ==========================================================================
   1. Global Config Binding (Ensuring Single Source of Truth Everywhere)
   ========================================================================== */
function initGlobalConfigBinding() {
  if (typeof HOTEL_CONFIG === 'undefined') {
    console.warn('[Distinction Gardens] HOTEL_CONFIG not detected.');
    return;
  }

  // Populate data-config text content
  document.querySelectorAll('[data-config]').forEach(el => {
    const key = el.getAttribute('data-config');
    const val = resolveConfigPath(HOTEL_CONFIG, key);
    if (val !== undefined && val !== null) {
      el.textContent = val;
    }
  });

  // Populate data-config-href (tel:, mailto:, web links)
  document.querySelectorAll('[data-config-href]').forEach(el => {
    const key = el.getAttribute('data-config-href');
    const val = resolveConfigPath(HOTEL_CONFIG, key);
    if (val) {
      if (key.includes('phone') || key.includes('whatsApp')) {
        el.href = `tel:+${HOTEL_CONFIG.contact.phoneClean}`;
      } else if (key.includes('email')) {
        el.href = `mailto:${val}`;
      } else {
        el.href = val;
      }
    }
  });

  // Populate data-config-wa (WhatsApp chat link)
  document.querySelectorAll('[data-config-wa]').forEach(el => {
    const prefill = encodeURIComponent(
      `Hello Distinction Gardens, I would like to inquire about accommodation and availability.`
    );
    el.href = `https://wa.me/${HOTEL_CONFIG.contact.whatsAppClean}?text=${prefill}`;
  });

  // Populate verified M-Pesa Till number
  document.querySelectorAll('[data-config-till]').forEach(el => {
    el.textContent = HOTEL_CONFIG.payment.tillNumber;
  });
}

function resolveConfigPath(obj, path) {
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

/* ==========================================================================
   2. Floating Glass Navbar (Auto-Hide, Reappear, Frosted Morph & Scroll Progress)
   ========================================================================== */
function initFloatingNavbar() {
  const header = document.querySelector('.site-header');
  const progressBar = document.getElementById('nav-scroll-progress-bar');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let isTicking = false;

  const updateNavbar = () => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;

    // 1. Frosted Glass and Shrunk State (> 40px)
    if (currentScrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // 2. Auto-Hide on Scroll Down, Reappear Immediately on Scroll Up
    if (currentScrollY > 120 && scrollDelta > 10) {
      header.classList.add('header-hidden');
    } else if (scrollDelta < -8 || currentScrollY <= 40) {
      header.classList.remove('header-hidden');
    }

    // 3. Smooth GPU Scroll Progress Line
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, currentScrollY / docHeight)) : 0;
      progressBar.style.transform = `scaleX(${progress})`;
    }

    lastScrollY = currentScrollY;
    isTicking = false;
  };

  const onScroll = () => {
    if (!isTicking) {
      window.requestAnimationFrame(updateNavbar);
      isTicking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  updateNavbar();
}

/* ==========================================================================
   3. Sliding Nav Indicator (Smooth Gliding Pill on Hover & Active Rest)
   ========================================================================== */
function initSlidingNavIndicator() {
  const navMenu = document.querySelector('.nav-menu');
  const indicator = document.querySelector('.nav-indicator');
  if (!navMenu || !indicator) return;

  const links = navMenu.querySelectorAll('.nav-link');
  let activeLink = navMenu.querySelector('.nav-link.active') ||
                   navMenu.querySelector('.nav-link[aria-current="page"]');

  const moveIndicator = (target) => {
    if (!target) {
      indicator.style.opacity = '0';
      return;
    }
    const linkRect = target.getBoundingClientRect();
    const menuRect = navMenu.getBoundingClientRect();
    const offsetX = linkRect.left - menuRect.left;

    indicator.style.transform = `translateY(-50%) translateX(${offsetX}px)`;
    indicator.style.width = `${linkRect.width}px`;
    indicator.style.opacity = '1';
  };

  // Set initial position
  if (activeLink) {
    // Delay slightly to ensure font rendering has stabilized geometry
    window.requestAnimationFrame(() => moveIndicator(activeLink));
  }

  links.forEach(link => {
    link.addEventListener('mouseenter', () => moveIndicator(link));
    link.addEventListener('focus', () => moveIndicator(link));
  });

  navMenu.addEventListener('mouseleave', () => {
    moveIndicator(activeLink);
  });

  // Recalibrate on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      activeLink = navMenu.querySelector('.nav-link.active') ||
                   navMenu.querySelector('.nav-link[aria-current="page"]');
      moveIndicator(activeLink);
    }, 100);
  }, { passive: true });

  // Optional: In-page section spy if on home page with anchor sections
  const hashLinks = Array.from(links).filter(link => {
    const href = link.getAttribute('href');
    return href && href.startsWith('#') && href.length > 1;
  });

  if (hashLinks.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          const matchingLink = navMenu.querySelector(`.nav-link[href="#${id}"]`);
          if (matchingLink) {
            links.forEach(l => l.classList.remove('active'));
            matchingLink.classList.add('active');
            activeLink = matchingLink;
            moveIndicator(activeLink);
          }
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    hashLinks.forEach(link => {
      const targetId = link.getAttribute('href').slice(1);
      const section = document.getElementById(targetId);
      if (section) observer.observe(section);
    });
  }
}

/* ==========================================================================
   4. Accessible Mobile Navigation Overlay Drawer
   - Animated 3-line hamburger to X morph
   - Body scroll lock & focus trap
   - ESC key and outside-backdrop dismissal
   - Focus restoration to toggle button
   ========================================================================== */
function initMobileNavDrawer() {
  const toggleBtn = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const closeBtn = document.getElementById('drawer-close-btn');

  if (!toggleBtn || !drawer) return;

  let lastActiveElement = null;

  const getFocusableElements = () => {
    return drawer.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])');
  };

  const openDrawer = () => {
    lastActiveElement = document.activeElement;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Focus the close button or first interactive element inside drawer
    window.requestAnimationFrame(() => {
      if (closeBtn) {
        closeBtn.focus();
      } else {
        const focusables = getFocusableElements();
        if (focusables.length > 0) focusables[0].focus();
      }
    });
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    // Restore focus to toggle button
    if (toggleBtn) {
      toggleBtn.focus();
    }
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  // Close drawer when any internal link is clicked
  drawer.querySelectorAll('.mobile-nav-link, .mobile-nav-cta').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Keyboard navigation: ESC to close, TAB focus trapping
  document.addEventListener('keydown', (e) => {
    if (!drawer.classList.contains('open')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeDrawer();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = Array.from(getFocusableElements());
      if (focusables.length === 0) return;

      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  });
}

/* ==========================================================================
   4. Live Backgrounds / Slow Crossfading Hero Slideshow
   - 8-10 seconds per slide, 1.5s crossfade
   - Ken Burns smooth zoom (scale 1.0 to 1.08)
   - Pauses on hidden tab
   - Preloads first image, respects prefers-reduced-motion
   ========================================================================== */
function initHeroSlideshow() {
  const container = document.querySelector('.hero-slideshow-container');
  if (!container) return;

  const slides = container.querySelectorAll('.hero-slide');
  const indicatorDots = document.querySelectorAll('.slide-dot');
  if (slides.length <= 1) return;

  let currentIndex = 0;
  let intervalId = null;
  const slideDuration = 8500; // 8.5 seconds per slide

  const showSlide = (nextIndex) => {
    slides[currentIndex].classList.remove('active');
    if (indicatorDots[currentIndex]) {
      indicatorDots[currentIndex].classList.remove('active');
    }

    currentIndex = (nextIndex + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    if (indicatorDots[currentIndex]) {
      indicatorDots[currentIndex].classList.add('active');
    }
  };

  const startAutoSlide = () => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    stopAutoSlide();
    intervalId = setInterval(() => {
      showSlide(currentIndex + 1);
    }, slideDuration);
  };

  const stopAutoSlide = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  // Click on indicators
  indicatorDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAutoSlide();
    });
  });

  // Page visibility API: pause when tab is inactive to conserve battery and CPU
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
  });

  // Initialize
  showSlide(0);
  startAutoSlide();
}

/* Optional full-width background crossfade in band sections */
function initBandSlideshows() {
  document.querySelectorAll('[data-band-slideshow]').forEach(band => {
    const images = band.querySelectorAll('.band-bg-slide');
    if (images.length <= 1) return;

    let idx = 0;
    setInterval(() => {
      images[idx].style.opacity = '0';
      idx = (idx + 1) % images.length;
      images[idx].style.opacity = '1';
    }, 9000);
  });
}

/* ==========================================================================
   5. Client-Side Booking & WhatsApp / Mailto Inquiry Handlers
   ========================================================================== */
function initForms() {
  // 1. Quick Booking Bar (Home)
  const quickBookingForm = document.getElementById('quick-booking-form');
  if (quickBookingForm) {
    quickBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const checkIn = document.getElementById('book-checkin')?.value || 'Not specified';
      const checkOut = document.getElementById('book-checkout')?.value || 'Not specified';
      const guests = document.getElementById('book-guests')?.value || '1';
      const roomType = document.getElementById('book-room-type')?.value || 'Any Room';

      const msg = `*Distinction Gardens Booking Inquiry*\n\n` +
        `• Check-in: ${checkIn}\n` +
        `• Check-out: ${checkOut}\n` +
        `• Guests: ${guests}\n` +
        `• Room Type: ${roomType}\n\n` +
        `Please confirm availability and current rates. Thank you!`;

      sendInquiryWhatsApp(msg);
    });
  }

  // 2. Room Specific Inquiry Form
  const roomEnquiryForm = document.getElementById('room-enquiry-form');
  if (roomEnquiryForm) {
    roomEnquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('room-guest-name')?.value.trim();
      const phone = document.getElementById('room-guest-phone')?.value.trim();
      const room = document.getElementById('room-selection')?.value;
      const dates = document.getElementById('room-dates')?.value.trim();
      const notes = document.getElementById('room-notes')?.value.trim();

      if (!name || !phone) {
        alert('Please provide your name and phone number so we may contact you.');
        return;
      }

      const msg = `*Distinction Gardens Room Reservation Request*\n\n` +
        `• Guest Name: ${name}\n` +
        `• Phone Number: ${phone}\n` +
        `• Room Requested: ${room}\n` +
        `• Preferred Dates: ${dates || 'Flexible'}\n` +
        `• Notes: ${notes || 'None'}\n\n` +
        `Kindly advise on current rates and reservation procedure.`;

      sendInquiryWhatsApp(msg);
    });
  }

  // 3. Event / Conference Quote Form
  const eventQuoteForm = document.getElementById('event-quote-form');
  if (eventQuoteForm) {
    eventQuoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const eventType = document.getElementById('event-type')?.value;
      const eventDate = document.getElementById('event-date')?.value || 'Not specified';
      const guests = document.getElementById('event-guests')?.value || 'TBD';
      const catering = document.getElementById('event-catering')?.value || 'Full Board';
      const clientName = document.getElementById('event-name')?.value.trim();
      const clientPhone = document.getElementById('event-phone')?.value.trim();

      if (!clientName || !clientPhone) {
        alert('Please provide your name and telephone contact.');
        return;
      }

      const msg = `*Distinction Gardens Event / Conference Quotation*\n\n` +
        `• Organizer: ${clientName}\n` +
        `• Contact: ${clientPhone}\n` +
        `• Event Category: ${eventType}\n` +
        `• Target Date: ${eventDate}\n` +
        `• Expected Delegates / Guests: ${guests}\n` +
        `• Catering Required: ${catering}\n\n` +
        `Please provide package quotation and hall availability.`;

      sendInquiryWhatsApp(msg);
    });
  }

  // 4. Contact General Inquiry Form
  const contactForm = document.getElementById('general-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const phone = document.getElementById('contact-phone')?.value.trim();
      const subject = document.getElementById('contact-subject')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || (!phone && !email)) {
        alert('Please provide your name and at least one contact channel (phone or email).');
        return;
      }

      const msg = `*Distinction Gardens Guest Inquiry*\n\n` +
        `• Name: ${name}\n` +
        `• Phone: ${phone || 'N/A'}\n` +
        `• Email: ${email || 'N/A'}\n` +
        `• Subject: ${subject || 'General Inquiry'}\n` +
        `• Message: ${message}\n`;

      sendInquiryWhatsApp(msg);
    });
  }
}

function sendInquiryWhatsApp(messageText) {
  const targetNumber = (typeof HOTEL_CONFIG !== 'undefined' && HOTEL_CONFIG.contact?.whatsAppClean)
    ? HOTEL_CONFIG.contact.whatsAppClean
    : '254725111888';

  const waUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(messageText)}`;
  
  // Open WhatsApp in new window/tab
  window.open(waUrl, '_blank', 'noopener,noreferrer');
}

/* ==========================================================================
   6. Filterable Gallery & Accessible Modal Lightbox
   ========================================================================== */
function initGalleryLightbox() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.getElementById('gallery-lightbox');

  if (!galleryItems.length) return;

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterCategory === 'all' || itemCategory === filterCategory) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox functionality
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close-btn');
  const prevBtn = lightbox.querySelector('.lightbox-prev-btn');
  const nextBtn = lightbox.querySelector('.lightbox-next-btn');

  let currentItemIndex = 0;
  let visibleItems = [];

  const updateVisibleItems = () => {
    visibleItems = galleryItems.filter(item => item.style.display !== 'none');
  };

  const openLightbox = (index) => {
    updateVisibleItems();
    if (!visibleItems.length) return;

    currentItemIndex = (index + visibleItems.length) % visibleItems.length;
    const targetItem = visibleItems[currentItemIndex];
    const highResSrc = targetItem.getAttribute('data-full') || targetItem.querySelector('img').src;
    const captionText = targetItem.getAttribute('data-caption') || targetItem.querySelector('img').alt;

    lightboxImg.src = highResSrc;
    lightboxImg.alt = captionText;
    lightboxCaption.textContent = captionText;

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (closeBtn) closeBtn.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const stepLightbox = (delta) => {
    openLightbox(currentItemIndex + delta);
  };

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      updateVisibleItems();
      const idx = visibleItems.indexOf(item);
      openLightbox(idx >= 0 ? idx : 0);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => stepLightbox(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => stepLightbox(1));

  // Lightbox click outside image to dismiss
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrap')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      stepLightbox(-1);
    } else if (e.key === 'ArrowRight') {
      stepLightbox(1);
    }
  });
}

/* ==========================================================================
   7. Scroll Reveal Animations (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.fade-up');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    elements.forEach(el => el.classList.add('in-view'));
  }
}

/* ==========================================================================
   8. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close other items
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open', !isOpen);
    });
  });
}

/* ==========================================================================
   PHASE 2 BACK-END HOOKS (CLEAN EXTENSION POINTS)
   Ready for integration with Node.js / Express + PostgreSQL + Safaricom Daraja STK Push.
   ========================================================================== */

/**
 * Phase 2 Hook: Check live room availability against PostgreSQL database
 * @param {string} checkInDate - ISO Date string
 * @param {string} checkOutDate - ISO Date string
 * @param {string} roomTypeId - 'supreme-suite' | 'deluxe-king' | 'standard-room'
 * @returns {Promise<Object>} Available room count and calculated tariff
 */
async function submitAvailabilityCheck(checkInDate, checkOutDate, roomTypeId) {
  console.log('[Phase 2 Hook] submitAvailabilityCheck called:', { checkInDate, checkOutDate, roomTypeId });
  /*
  // Future implementation:
  try {
    const response = await fetch('/api/v1/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkInDate, checkOutDate, roomTypeId })
    });
    return await response.json();
  } catch (err) {
    console.error('Availability check failed:', err);
    throw err;
  }
  */
  return { available: true, notice: 'Front-end demo mode: please contact reception via WhatsApp.' };
}

/**
 * Phase 2 Hook: Safaricom Daraja M-Pesa STK Push
 * Triggers an instant Lipa Na M-Pesa prompt on guest's handset for deposit payment.
 * @param {string} phoneNumber - Guest phone (format: 2547XXXXXXXX)
 * @param {number} amount - Deposit in KES
 * @param {string} bookingReference - Unique invoice or reservation code
 * @returns {Promise<Object>} Daraja CheckoutRequestID & ResponseCode
 */
async function initiateDarajaStkPush(phoneNumber, amount, bookingReference) {
  console.log('[Phase 2 Hook] initiateDarajaStkPush called:', { phoneNumber, amount, bookingReference });
  /*
  // Future implementation:
  try {
    const response = await fetch('/api/v1/payments/mpesa-stk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phoneNumber,
        amount,
        accountReference: bookingReference,
        transactionDesc: `Deposit for Distinction Gardens booking ${bookingReference}`
      })
    });
    const result = await response.json();
    return result; // contains CheckoutRequestID
  } catch (err) {
    console.error('M-Pesa STK Push dispatch failed:', err);
    throw err;
  }
  */
  return { success: true, simulated: true, till: HOTEL_CONFIG.payment.tillNumber };
}

/**
 * Phase 2 Hook: Poll or listen to Daraja payment status webhook callback
 * @param {string} checkoutRequestId - Daraja transaction ID
 * @returns {Promise<Object>} Payment status (COMPLETED, FAILED, CANCELLED)
 */
async function pollDarajaPaymentStatus(checkoutRequestId) {
  console.log('[Phase 2 Hook] pollDarajaPaymentStatus called:', checkoutRequestId);
  /*
  // Future implementation:
  const pollInterval = setInterval(async () => {
    const res = await fetch(`/api/v1/payments/status/${checkoutRequestId}`);
    const data = await res.json();
    if (data.status === 'SUCCESS') {
      clearInterval(pollInterval);
      renderPaymentConfirmation(data);
    }
  }, 3000);
  */
}
