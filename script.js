const WATERMARK_PARALLAX_OFFSET = 22; // px: subtle 44px total travel to keep watermark movement understated

function hasGsapAndScrollTrigger() {
  return typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
}

function initWatermarkParallax() {
  if (!hasGsapAndScrollTrigger()) return;
  const frames = document.querySelectorAll(".window-frame");

  frames.forEach((frame) => {
    const watermark = frame.querySelector(".floating-watermark");
    if (!watermark) return;
    if (window.getComputedStyle(watermark).position === "sticky") return;

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
  const noHoverQuery = window.matchMedia("(hover: none)");
  const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
  const supportsTouch = noHoverQuery.matches || coarsePointerQuery.matches;
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

function initNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const toggle = navbar.querySelector(".navbar-toggle");
  const menu = navbar.querySelector(".navbar-menu");

  const updateNavbarShadow = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 8);
  };

  updateNavbarShadow();
  window.addEventListener("scroll", updateNavbarShadow);

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!navbar.contains(event.target)) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function initPageFeatures() {
  initWatermarkParallax();
  initTouchOverlays();
  initNavbar();
}

window.onload = () => {
  if (hasGsapAndScrollTrigger()) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const loader = document.getElementById("loader");
  const content = document.getElementById("content");

  if (!loader || !content) {
    initPageFeatures();
    return;
  }

  setTimeout(() => {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
      content.classList.remove("hidden");
      initPageFeatures();
    }, 600);
  }, 2000);
};
