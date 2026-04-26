document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');
  const nav = document.getElementById('secondary-nav');
  const footer = document.querySelector('.site-footer');

  // Shared threshold: 25% of header height
  let threshold = header ? header.offsetHeight * 0.25 : 0;
  window.addEventListener('resize', () => {
    threshold = header ? header.offsetHeight * 0.25 : 0;
  });

  // Single scroll listener handles both header + nav together
  window.addEventListener('scroll', () => {
    const past = window.scrollY > threshold;

    if (header) {
      header.style.opacity = past ? '0' : '1';
      header.style.pointerEvents = past ? 'none' : '';
    }

    if (nav) {
      nav.classList.toggle('visible', past);
    }
  }, { passive: true });

  // Footer fade-in on load
  if (footer) footer.style.opacity = '1';
});
