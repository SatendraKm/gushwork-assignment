/**
 * FAQ Accordion Module
 * Handles FAQ accordion behavior - ensures only one item open at a time
 */
export function initFAQ() {
  const items = document.querySelectorAll(".faq__item");

  items.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        items.forEach((other) => {
          if (other !== item && other.open) {
            other.open = false;
          }
        });
      }
    });
  });
}
