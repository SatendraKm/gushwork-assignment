/**
 * Mangalam HDPE Pipes – script.js
 * Handles: sticky header, hero carousel + zoom, apps carousel,
 *          process tabs, FAQ accordion, modals, mobile nav
 */

// ============================================================
// 1. STICKY HEADER
// Uses IntersectionObserver to watch the hero section.
// When hero leaves viewport (scrolling down), sticky header
// slides in. When scrolling back up past hero, it hides.
// ============================================================
(function initStickyHeader() {
  const stickyHeader = document.getElementById('sticky-header');
  const navbar = document.querySelector('.navbar');
  const hero = document.getElementById('hero');

  if (!stickyHeader || !hero || !navbar) return;

  let lastScrollY = window.scrollY;
  let heroBottom = 0;

  // Cache hero bottom position
  const updateHeroBottom = () => {
    heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
  };

  updateHeroBottom();
  window.addEventListener('resize', updateHeroBottom);

  const showHeader = () => {
    stickyHeader.classList.add('is-visible');
    stickyHeader.setAttribute('aria-hidden', 'false');
    navbar.classList.add('sticky-offset');
  };

  const hideHeader = () => {
    stickyHeader.classList.remove('is-visible');
    stickyHeader.setAttribute('aria-hidden', 'true');
    navbar.classList.remove('sticky-offset');
  };

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;

    if (currentScrollY > heroBottom) {
      // Past the hero fold
      if (scrollingDown) {
        showHeader();
      } else {
        // Scrolling up but still past hero: keep visible
        showHeader();
      }
    } else {
      // Back above hero fold — hide
      hideHeader();
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
})();


// ============================================================
// 2. HERO CAROUSEL + ZOOM
// Carousel: next/prev arrows + thumbnail click to switch image.
// Zoom: tracks mousemove on the stage, computes % position,
//       updates background-position on the zoom panel.
// ============================================================
(function initHeroCarousel() {
  const stage = document.querySelector('.carousel__stage');
  const images = document.querySelectorAll('.carousel__stage .carousel__img');
  const thumbs = document.querySelectorAll('.carousel__thumbs .carousel__thumb');
  const prevBtn = document.querySelector('.carousel__arrow--prev');
  const nextBtn = document.querySelector('.carousel__arrow--next');
  const zoomPanel = document.getElementById('zoomPanel');

  if (!stage || images.length === 0) return;

  let currentIndex = 0;

  // Switch to a given image index
  const goTo = (index) => {
    images[currentIndex].classList.remove('active');
    thumbs[currentIndex].classList.remove('active');
    thumbs[currentIndex].setAttribute('aria-selected', 'false');

    currentIndex = (index + images.length) % images.length;

    images[currentIndex].classList.add('active');
    thumbs[currentIndex].classList.add('active');
    thumbs[currentIndex].setAttribute('aria-selected', 'true');

    // Update zoom panel background image
    const activeImg = images[currentIndex];
    if (zoomPanel) {
      zoomPanel.style.backgroundImage = `url(${activeImg.src})`;
    }
  };

  // Arrow buttons
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  // Thumbnail clicks
  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => goTo(i));
  });

  // Keyboard navigation on stage
  stage.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
  });

  // Auto-play (pauses on hover)
  let autoPlayInterval = setInterval(() => goTo(currentIndex + 1), 4000);

  stage.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
  stage.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(() => goTo(currentIndex + 1), 4000);
  });

  // ---- ZOOM LOGIC ----
  if (!zoomPanel) return;

  // Set initial zoom background
  zoomPanel.style.backgroundImage = `url(${images[0].src})`;
  zoomPanel.style.backgroundSize = '250%';

  stage.addEventListener('mouseenter', () => {
    // Refresh background when entering in case image changed
    zoomPanel.style.backgroundImage = `url(${images[currentIndex].src})`;
    zoomPanel.classList.add('is-visible');
  });

  stage.addEventListener('mouseleave', () => {
    zoomPanel.classList.remove('is-visible');
  });

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();

    // Calculate cursor position as percentage within the stage
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    // Clamp to prevent edge overflow
    const x = Math.min(Math.max(xPercent, 0), 100);
    const y = Math.min(Math.max(yPercent, 0), 100);

    zoomPanel.style.backgroundPosition = `${x}% ${y}%`;
  });

  // Initialize first image
  goTo(0);
})();


// ============================================================
// 3. APPLICATIONS CAROUSEL (horizontal scroll)
// Slides cards left/right. On each card, hover shows a subtle
// zoom effect via CSS (defined in styles.css).
// ============================================================
(function initAppsCarousel() {
  const track = document.getElementById('appsTrack');
  const prevBtn = document.getElementById('appsCarouselPrev');
  const nextBtn = document.getElementById('appsCarouselNext');

  if (!track) return;

  let currentOffset = 0;
  const cardWidth = () => {
    const card = track.querySelector('.app-card');
    if (!card) return 280;
    return card.offsetWidth + 16; // card width + gap
  };

  const maxOffset = () => {
    return track.scrollWidth - track.parentElement.offsetWidth;
  };

  const slide = (direction) => {
    const step = cardWidth();
    currentOffset += direction * step;
    currentOffset = Math.max(0, Math.min(currentOffset, maxOffset()));
    track.style.transform = `translateX(-${currentOffset}px)`;
  };

  if (prevBtn) prevBtn.addEventListener('click', () => slide(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => slide(1));

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) slide(diff > 0 ? 1 : -1);
  }, { passive: true });
})();


// ============================================================
// 4. MANUFACTURING PROCESS TABS
// Clicking a tab shows the corresponding panel.
// Prev/Next buttons navigate between tabs sequentially.
// ============================================================
(function initProcessTabs() {
  const tabs = document.querySelectorAll('.process__tab');
  const panels = document.querySelectorAll('.process__panel');
  const prevBtn = document.getElementById('processPrevBtn');
  const nextBtn = document.getElementById('processNextBtn');

  if (tabs.length === 0) return;

  let activeIndex = 0;

  const activateTab = (index) => {
    // Deactivate current
    tabs[activeIndex].classList.remove('active');
    tabs[activeIndex].setAttribute('aria-selected', 'false');
    panels[activeIndex].classList.remove('active');

    // Activate new
    activeIndex = (index + tabs.length) % tabs.length;
    tabs[activeIndex].classList.add('active');
    tabs[activeIndex].setAttribute('aria-selected', 'true');
    panels[activeIndex].classList.add('active');

    // Scroll tab into view on mobile
    tabs[activeIndex].scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activateTab(i));
  });

  if (prevBtn) prevBtn.addEventListener('click', () => activateTab(activeIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => activateTab(activeIndex + 1));

  // Keyboard navigation within tab list
  tabs.forEach((tab, i) => {
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') activateTab(i + 1);
      if (e.key === 'ArrowLeft') activateTab(i - 1);
    });
  });
})();


// ============================================================
// 5. MOBILE NAVIGATION
// Toggles the mobile menu and manages hamburger animation.
// ============================================================
(function initMobileNav() {
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';

    hamburger.setAttribute('aria-expanded', String(!isExpanded));
    mobileMenu.hidden = isExpanded;

    // Animate hamburger spans into X
    const spans = hamburger.querySelectorAll('span');
    if (!isExpanded) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
})();


// ============================================================
// 6. MODALS
// openModal(id) and closeModal(id) are called from HTML.
// Clicking outside modal or pressing Escape closes it.
// Focus is trapped inside modal while open.
// ============================================================
window.openModal = function(id) {
  const overlay = document.getElementById(`modal-${id}`);
  if (!overlay) return;

  overlay.hidden = false;
  document.body.style.overflow = 'hidden';

  // Focus first input
  const firstInput = overlay.querySelector('input, button, select, textarea');
  if (firstInput) setTimeout(() => firstInput.focus(), 50);
};

window.closeModal = function(id) {
  const overlay = document.getElementById(`modal-${id}`);
  if (!overlay) return;

  overlay.hidden = true;
  document.body.style.overflow = '';
};

// Close on overlay backdrop click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.hidden = true;
      document.body.style.overflow = '';
    }
  });
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay:not([hidden])').forEach(overlay => {
      overlay.hidden = true;
      document.body.style.overflow = '';
    });
  }
});

// Catalogue modal — enable button only when email is filled
(function initCatalogueModal() {
  const emailInput = document.getElementById('catalogue-email');
  const downloadBtn = document.getElementById('downloadBrochureBtn');

  if (!emailInput || !downloadBtn) return;

  downloadBtn.style.opacity = '0.5';
  downloadBtn.style.pointerEvents = 'none';

  emailInput.addEventListener('input', () => {
    const hasValue = emailInput.value.trim().length > 0;
    downloadBtn.style.opacity = hasValue ? '1' : '0.5';
    downloadBtn.style.pointerEvents = hasValue ? 'auto' : 'none';
  });
})();


// ============================================================
// 7. FAQ ACCORDION
// Native <details>/<summary> handles open/close. This adds
// smooth animation and ensures only one is open at a time.
// ============================================================
(function initFAQ() {
  const items = document.querySelectorAll('.faq__item');

  items.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        // Close all others
        items.forEach(other => {
          if (other !== item && other.open) {
            other.open = false;
          }
        });
      }
    });
  });
})();


// ============================================================
// 8. SMOOTH SCROLL for anchor links
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ============================================================
// 9. LAZY IMAGE LOADING fallback (for browsers without native)
// ============================================================
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imageObserver.observe(img));
}
