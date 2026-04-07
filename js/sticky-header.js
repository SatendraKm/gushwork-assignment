/**
 * Sticky Header Module
 * Uses IntersectionObserver to show/hide sticky header on scroll
 */
export function initStickyHeader() {
  const stickyHeader = document.getElementById("sticky-header");
  const navbar = document.querySelector(".navbar");
  const hero = document.getElementById("hero");

  if (!stickyHeader || !hero || !navbar) return;

  let lastScrollY = window.scrollY;
  let heroBottom = 0;

  const updateHeroBottom = () => {
    heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
  };

  updateHeroBottom();
  window.addEventListener("resize", updateHeroBottom);

  const showHeader = () => {
    stickyHeader.classList.add("is-visible");
    stickyHeader.setAttribute("aria-hidden", "false");
    navbar.classList.add("sticky-offset");
  };

  const hideHeader = () => {
    stickyHeader.classList.remove("is-visible");
    stickyHeader.setAttribute("aria-hidden", "true");
    navbar.classList.remove("sticky-offset");
  };

  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;

      if (currentScrollY > heroBottom) {
        if (scrollingDown) {
          showHeader();
        } else {
          showHeader();
        }
      } else {
        hideHeader();
      }

      lastScrollY = currentScrollY;
    },
    { passive: true },
  );
}
