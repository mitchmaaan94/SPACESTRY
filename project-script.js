document.addEventListener('DOMContentLoaded', function () {

   // Header fades out after scrolling 25vh
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.opacity = window.scrollY > window.innerHeight * 0.25 ? '0' : '1';
      header.style.pointerEvents = past ? 'none' : '';
    }, { passive: true });
  }

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
