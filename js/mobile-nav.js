/**
 * Mobile Navigation Module
 * Handles hamburger menu toggle and animates hamburger span
 */
export function initMobileNav() {
  const hamburger = document.querySelector(".navbar__hamburger");
  const mobileMenu = document.querySelector(".navbar__mobile-menu");

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener("click", () => {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";

    hamburger.setAttribute("aria-expanded", String(!isExpanded));
    mobileMenu.hidden = isExpanded;

    const spans = hamburger.querySelectorAll("span");
    if (!isExpanded) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      spans.forEach((s) => {
        s.style.transform = "";
        s.style.opacity = "";
      });
    }
  });

  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
      hamburger.querySelectorAll("span").forEach((s) => {
        s.style.transform = "";
        s.style.opacity = "";
      });
    }
  });
}
