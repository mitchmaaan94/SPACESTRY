window.onload = () => {
  // 1. Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);

  setTimeout(() => {
    document.getElementById("loader").style.opacity = "0";
    
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("content").classList.remove("hidden");
      
      const header = document.querySelector(".header");
      const heroes = document.querySelectorAll(".hero-image");

      // === NEW: GSAP Parallax Logic ===
      // This handles the smooth movement of the background images
      heroes.forEach((hero) => {
        const img = hero.querySelector("img");
        if (img) {
          gsap.to(img, {
            yPercent: 20, // Moves the image slightly to create parallax
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top bottom", 
              end: "bottom top",
              scrub: true
            }
          });
        }
      });

      // === Your Existing Scroll Reveal (Overlays) ===
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const watermark = entry.target.querySelector(".watermark");
          const overlay = entry.target.querySelector(".project-overlay");

          if (entry.isIntersecting) {
            if (watermark) watermark.style.opacity = "0.3";
            if (overlay) overlay.style.opacity = "1";
          } else {
            if (watermark) watermark.style.opacity = "0";
            if (overlay) overlay.style.opacity = "0";
          }
        });
      }, { threshold: 0.3 });

      heroes.forEach(hero => observer.observe(hero));

      // === Your Existing Header fade logic ===
      window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        if (scrollY > viewportHeight * 0.25) {
          header.style.opacity = "0";
        } else {
          header.style.opacity = "1";
        }
      });

    }, 600);
  }, 2000);
};
