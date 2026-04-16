window.onload = () => {
  setTimeout(() => {
    document.getElementById("loader").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("content").classList.remove("hidden");
      // === Scroll Reveal Logic ===
      const heroes = document.querySelectorAll(".hero-image");

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
    }, 600);
  }, 2000);
};
