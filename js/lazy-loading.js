/**
 * Lazy Image Loading Module
 * Provides fallback for browsers without native lazy loading support
 */
export function initLazyLoading() {
  if ("IntersectionObserver" in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          }
          imageObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach((img) => imageObserver.observe(img));
  }
}
