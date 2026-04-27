document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');
  const nav = document.getElementById('secondary-nav');
  const footer = document.querySelector('.site-footer');

// Sync body top-padding to actual header height
function syncHeaderPadding() {
  if (header) document.body.style.paddingTop = header.offsetHeight + 'px';
}
syncHeaderPadding(); // first pass (may be pre-image)

  // Re-measure once the logo image has fully loaded
  const headerLogo = header?.querySelector('.header-logo');
  if (headerLogo && !headerLogo.complete) {
    headerLogo.addEventListener('load', syncHeaderPadding);
  }

  window.addEventListener('resize', syncHeaderPadding);
  
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
