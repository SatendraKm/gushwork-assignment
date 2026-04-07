/**
 * Applications Carousel Module
 * Handles horizontal scrolling carousel with touch/swipe support
 */
export function initAppsCarousel() {
  const track = document.getElementById("appsTrack");
  const prevBtn = document.getElementById("appsCarouselPrev");
  const nextBtn = document.getElementById("appsCarouselNext");

  if (!track) return;

  let currentOffset = 0;

  const cardWidth = () => {
    const card = track.querySelector(".app-card");
    if (!card) return 280;
    return card.offsetWidth + 16;
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

  if (prevBtn) prevBtn.addEventListener("click", () => slide(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => slide(1));

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true },
  );

  track.addEventListener(
    "touchend",
    (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) slide(diff > 0 ? 1 : -1);
    },
    { passive: true },
  );
}
