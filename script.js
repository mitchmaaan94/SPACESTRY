window.onload = () => {
  setTimeout(() => {
    document.getElementById("loader").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("content").classList.remove("hidden");
      // === Scroll Reveal Logic ===
      const heroes = document.querySelectorAll(".hero-image");
      const header = document.querySelector(".header");
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const watermark = entry.target.querySelector(".watermark");
          const overlay = entry.target.querySelector(".project-overlay");

          if (entry.isIntersecting) {
            if (watermark) watermark.style.opacity = "0.3"; // fade in watermark
            if (overlay) overlay.style.opacity = "1";       // fade in project name
          } else {
            if (watermark) watermark.style.opacity = "0";   // fade out watermark
            if (overlay) overlay.style.opacity = "0";       // fade out project name
          }
        });
      }, { threshold: 0.3 });

      heroes.forEach(hero => observer.observe(hero));
      // === End Scroll Reveal Logic ===
       // === Header fade after 25% scroll ===
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
