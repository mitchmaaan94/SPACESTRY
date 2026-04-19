const WATERMARK_PARALLAX_OFFSET = 22;

function hasGsapScrollTrigger() {
  return typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
}

function initWatermarkParallax() {
  if (!hasGsapScrollTrigger()) return;
  const frames = document.querySelectorAll(".window-frame");

  frames.forEach((frame) => {
    const watermark = frame.querySelector(".floating-watermark");
    if (!watermark) return;

    gsap.fromTo(
      watermark,
      { y: WATERMARK_PARALLAX_OFFSET },
      {
        y: -WATERMARK_PARALLAX_OFFSET,
        ease: "none",
        scrollTrigger: {
          trigger: frame,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  });
}

function initTouchOverlays() {
  const supportsTouch =
    window.matchMedia("(hover: none)").matches ||
    window.matchMedia("(pointer: coarse)").matches;
  if (!supportsTouch) return;

  const frames = Array.from(document.querySelectorAll(".window-frame"));
  if (!frames.length) return;

  const clearActive = (exceptFrame) => {
    frames.forEach((frame) => {
      if (frame !== exceptFrame) frame.classList.remove("is-active");
    });
  };

  frames.forEach((frame) => {
    frame.addEventListener("click", (event) => {
      if (!frame.classList.contains("is-active")) {
        event.preventDefault();
        clearActive(frame);
        frame.classList.add("is-active");
      }
    });
  });

  document.addEventListener("click", (event) => {
    const clickedFrame = event.target.closest(".window-frame");
    if (!clickedFrame) clearActive(null);
  });
}

window.onload = () => {
  if (hasGsapScrollTrigger()) {
    gsap.registerPlugin(ScrollTrigger);
  }

  setTimeout(() => {
    const loader = document.getElementById("loader");
    const content = document.getElementById("content");
    const header = document.querySelector(".header");

    if (loader) loader.style.opacity = "0";

    setTimeout(() => {
      if (loader) loader.style.display = "none";
      if (content) content.classList.remove("hidden");

      initWatermarkParallax();
      initTouchOverlays();

      window.addEventListener("scroll", () => {
        if (!header) return;
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        header.style.opacity = scrollY > viewportHeight * 0.25 ? "0" : "1";
      });
    }, 600);
  }, 2000);
};
