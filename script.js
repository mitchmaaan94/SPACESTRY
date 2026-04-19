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
  const links = navbar.querySelectorAll(".navbar-link");

  const updateScrolledState = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  updateScrolledState();
  window.addEventListener("scroll", updateScrolledState, { passive: true });

  if (!toggle || !menu) return;

  const closeMenu = () => {
    navbar.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const shouldOpen = !navbar.classList.contains("is-open");
    navbar.classList.toggle("is-open", shouldOpen);
    toggle.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
  });

  links.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!navbar.classList.contains("is-open")) return;
    if (!navbar.contains(event.target)) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

window.addEventListener("load", () => {
  if (hasGsapAndScrollTrigger()) {
    gsap.registerPlugin(ScrollTrigger);
  }

  initNavbar();

  const initializeContent = () => {
    initWatermarkParallax();
    initTouchOverlays();
  };

  const loader = document.getElementById("loader");
  const content = document.getElementById("content");

  if (!loader || !content) {
    initializeContent();
    return;
  }

  setTimeout(() => {
    if (loader) loader.style.opacity = "0";

    setTimeout(() => {
      if (loader) loader.style.display = "none";
      if (content) content.classList.remove("hidden");

      initializeContent();
    }, 600);
  }, 2000);
});
