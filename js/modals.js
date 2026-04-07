/**
 * Modals Module
 * Handles modal opening/closing and event listeners
 */
export function initModals() {
  // Global functions for onclick handlers
  window.openModal = function (id) {
    const overlay = document.getElementById(`modal-${id}`);
    if (!overlay) return;

    overlay.hidden = false;
    document.body.style.overflow = "hidden";

    const firstInput = overlay.querySelector("input, button, select, textarea");
    if (firstInput) setTimeout(() => firstInput.focus(), 50);
  };

  window.closeModal = function (id) {
    const overlay = document.getElementById(`modal-${id}`);
    if (!overlay) return;

    overlay.hidden = true;
    document.body.style.overflow = "";
  };

  // Close on overlay backdrop click
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.hidden = true;
        document.body.style.overflow = "";
      }
    });
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document
        .querySelectorAll(".modal-overlay:not([hidden])")
        .forEach((overlay) => {
          overlay.hidden = true;
          document.body.style.overflow = "";
        });
    }
  });

  // Catalogue modal button state management
  const emailInput = document.getElementById("catalogue-email");
  const downloadBtn = document.getElementById("downloadBrochureBtn");

  if (emailInput && downloadBtn) {
    downloadBtn.style.opacity = "0.5";
    downloadBtn.style.pointerEvents = "none";

    emailInput.addEventListener("input", () => {
      const hasValue = emailInput.value.trim().length > 0;
      downloadBtn.style.opacity = hasValue ? "1" : "0.5";
      downloadBtn.style.pointerEvents = hasValue ? "auto" : "none";
    });
  }
}
