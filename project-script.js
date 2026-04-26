document.addEventListener('DOMContentLoaded', function () {

  // Secondary nav appears after scrolling 25vh
  const nav = document.getElementById('secondary-nav');
  if (nav) {
    let threshold = window.innerHeight * 0.25;
    window.addEventListener('resize', () => {
      threshold = window.innerHeight * 0.25;
    });
    window.addEventListener('scroll', () => {
      nav.classList.toggle('visible', window.scrollY > threshold);
    }, { passive: true });
  }

  // Footer fade-in
  const footer = document.querySelector('.site-footer');
  if (footer) footer.style.opacity = '1';

});
