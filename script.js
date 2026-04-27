const WATERMARK_PARALLAX_OFFSET = 22; // px: subtle 44px total travel to keep watermark movement understated

function hasGsapAndScrollTrigger() {
  return typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
}

function initProjectsHeaderReveal() {
  const title = document.querySelector('.projects-section-title');
  if (!title || !hasGsapAndScrollTrigger()) return;

  gsap.from(title, {
    opacity: 0,
    y: 28,
    duration: 1.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: title,
      start: 'top 88%',
      toggleActions: 'play none none none'
    }
  });
}

// Image parallax: the core "SCJ reveal" effect
function initParallaxReveal() {
  if (!hasGsapAndScrollTrigger()) return;
  const frames = document.querySelectorAll(".window-frame");

  frames.forEach((frame) => {
    const img = frame.querySelector(".window-bg");
    if (!img) return;

    // Image starts slightly low (entering from below), travels upward.
    // 130% tall image → ~23% of image height is "extra". We travel ~half that each way.
    gsap.fromTo(
      img,
      { yPercent: -2 },     // start: image shifted down (bottom revealed as frame enters)
      {
        yPercent: -20,       // end: image shifted up (top revealed as frame exits)
        ease: "none",
        scrollTrigger: {
          trigger: frame,
          start: "top bottom",   // when frame bottom hits viewport bottom
          end: "bottom top",     // when frame top hits viewport top
          scrub: true
        }
      }
    );
  });
}

function initWatermarkParallax() {
  if (!hasGsapAndScrollTrigger()) return;
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

window.onload = () => {
  if (hasGsapAndScrollTrigger()) {
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

      // Sync body padding to actual header height (future-proof)
function syncHeaderPadding() {
  const h = document.querySelector('.header');
  if (h) document.body.style.paddingTop = h.offsetHeight + 'px';
}
syncHeaderPadding();
window.addEventListener('resize', syncHeaderPadding);
      
       setTimeout(() => {
        const footer = document.querySelector('.site-footer');
        if (footer) footer.style.opacity = '1';
      }, 400);

      requestAnimationFrame(() => {
    requestAnimationFrame(() => {         // two frames = guaranteed post-reflow
        initParallaxReveal();
        initWatermarkParallax();
        initTouchOverlays();
        initSecondaryNav();
        initProjectsHeaderReveal();
        ScrollTrigger.refresh();
    });
});

      window.addEventListener("scroll", () => {
        if (!header) return;
        const scrollY = window.scrollY;
        const past = scrollY > header.offsetHeight * 0.25;
        header.style.opacity = past ? "0" : "1";
        header.style.pointerEvents = past ? 'none' : '';
      });
    }, 600);
  }, 2000);
};

function initSecondaryNav() {
  const secondaryNav = document.getElementById('secondary-nav');
  if (!secondaryNav) return;

  const mainWrapper = document.querySelector('.main-wrapper');
  const headerEl = document.querySelector('.header');
  let threshold = (headerEl?.offsetHeight ?? window.innerHeight) * 0.25;
  window.addEventListener('resize', () => {
  threshold = (headerEl?.offsetHeight ?? window.innerHeight) * 0.25;
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > threshold) {
      secondaryNav.classList.add('visible');
      if (mainWrapper) mainWrapper.style.paddingTop = secondaryNav.offsetHeight + 'px';
    } else {
      secondaryNav.classList.remove('visible');
      if (mainWrapper) mainWrapper.style.paddingTop = '';
    }
  }, { passive: true });
}
