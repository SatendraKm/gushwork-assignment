/**
 * Manufacturing Process Tabs Module
 * Handles tab switching and keyboard navigation
 */
export function initProcessTabs() {
  const tabs = document.querySelectorAll(".process__tab");
  const panels = document.querySelectorAll(".process__panel");
  const prevBtn = document.getElementById("processPrevBtn");
  const nextBtn = document.getElementById("processNextBtn");

  if (tabs.length === 0) return;

  let activeIndex = 0;

  const activateTab = (index) => {
    tabs[activeIndex].classList.remove("active");
    tabs[activeIndex].setAttribute("aria-selected", "false");
    panels[activeIndex].classList.remove("active");

    activeIndex = (index + tabs.length) % tabs.length;
    tabs[activeIndex].classList.add("active");
    tabs[activeIndex].setAttribute("aria-selected", "true");
    panels[activeIndex].classList.add("active");

    tabs[activeIndex].scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: "smooth",
    });
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => activateTab(i));
  });

  if (prevBtn)
    prevBtn.addEventListener("click", () => activateTab(activeIndex - 1));
  if (nextBtn)
    nextBtn.addEventListener("click", () => activateTab(activeIndex + 1));

  tabs.forEach((tab, i) => {
    tab.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") activateTab(i + 1);
      if (e.key === "ArrowLeft") activateTab(i - 1);
    });
  });
}
