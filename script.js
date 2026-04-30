/* ============================================================
   script.js — Spacestry Homepage
   ============================================================ */
 
// ── Page Veil ────────────────────────────────────────────────
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel')) return;
  link.addEventListener('click', e => {
    e.preventDefault();
    const veil = document.getElementById('page-veil');
    if (veil) veil.classList.add('entering');
    setTimeout(() => { window.location.href = href; }, 560);
  });
});
 
window.addEventListener('pageshow', () => {
  const veil = document.getElementById('page-veil');
  if (!veil) return;
  veil.classList.remove('entering');
  veil.classList.add('leaving');
  setTimeout(() => veil.classList.remove('leaving'), 560);
});
 
 
// ── Scroll Reveal ────────────────────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}
 
 
// ── Active Nav Link ──────────────────────────────────────────
function initActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('#secondary-nav .secondary-nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.includes('#')) return;
    const linkPage = href.split('/').pop();
    const currentPage = path.split('/').pop() || 'index.html';
    if (linkPage === currentPage) link.classList.add('active');
  });
}
 
 
// ── Secondary Nav (scroll-triggered) ────────────────────────
function initSecondaryNav() {
  const nav = document.getElementById('secondary-nav');
  if (!nav) return;
 
  window.addEventListener('scroll', () => {
    nav.classList.toggle('visible', window.scrollY > 40);
  }, { passive: true });
}
 
 
// ── Header Fade on Scroll ────────────────────────────────────
function initHeaderFade() {
  const header = document.querySelector('.header');
  if (!header) return;
 
  window.addEventListener('scroll', () => {
    const past = window.scrollY > header.offsetHeight * 0.25;
    header.style.opacity = past ? '0' : '1';
    header.style.pointerEvents = past ? 'none' : '';
  }, { passive: true });
}
 
 
// ── Loader ───────────────────────────────────────────────────
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
 
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
      initReveal();
      initSecondaryNav();
      initHeaderFade();
      initActiveNav();
    }, 600);
  }, 2000);
}
 
 
// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
});
