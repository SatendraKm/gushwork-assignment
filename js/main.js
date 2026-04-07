/**
 * Main Entry Point
 * Imports and initializes all modules
 */

import { initStickyHeader } from "./sticky-header.js";
import { initHeroCarousel } from "./carousel.js";
import { initAppsCarousel } from "./apps-carousel.js";
import { initProcessTabs } from "./process-tabs.js";
import { initMobileNav } from "./mobile-nav.js";
import { initModals } from "./modals.js";
import { initFAQ } from "./faq.js";
import { initSmoothScroll } from "./smooth-scroll.js";
import { initLazyLoading } from "./lazy-loading.js";

// Initialize all modules when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initHeroCarousel();
  initAppsCarousel();
  initProcessTabs();
  initMobileNav();
  initModals();
  initFAQ();
  initSmoothScroll();
  initLazyLoading();
});
