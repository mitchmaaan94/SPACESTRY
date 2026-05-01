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

// ── Section Rule — scroll-driven width ──────────────────────
function initSectionRule() {
  const rule = document.querySelector('.section-rule');
  if (!rule) return;

  // Constrain max width and h1 to the projects grid content area
  const grid = document.querySelector('.projects-grid');
  const titleH1 = document.querySelector('.projects-header h1');

  let current = 0;
  let target  = 0;
  let rafId   = null;

  function maxPx() {
    // Hard-lock to the grid's rendered width; fall back to parent
    return (grid ? grid.offsetWidth : null)
        || rule.parentElement.offsetWidth
        || window.innerWidth * 0.9;
  }

  function calcTarget() {
    const rect = rule.getBoundingClientRect();
    const vh   = window.innerHeight;
    // Full width when rule's top edge reaches 27 % down from viewport top
    // Formula: t = 1 when rect.top = vh * 0.27
    //   → divisor = vh - vh * 0.27 = vh * 0.73
    const t = (vh - rect.top) / (vh * 0.73);
    return Math.max(0, Math.min(1, t));
  }

  function applyWidth() {
    rule.style.width = (maxPx() * current) + 'px';
     // Drive h1 scale in lockstep — lerp scaleX from 0.33 → 1
    if (titleH1) titleH1.style.transform = 'scaleX(' + (0.33 + 0.67 * current) + ')';
  }

  function tick() {
    target  = calcTarget();
    current += (target - current) * 0.065; // silky trailing feel

    if (Math.abs(target - current) < 0.0003) {
      current = target;
      applyWidth();
      rafId = null;
      return;
    }

    applyWidth();
    rafId = requestAnimationFrame(tick);
  }

  function kick() {
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', () => {
    target = current = calcTarget(); // snap on resize
    applyWidth();
  });

  // seed on first paint
  target = current = calcTarget();
  applyWidth();
}
 
// ── Loader ───────────────────────────────────────────────────
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
 
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
       window.scrollTo(0, 0);
      initReveal();
      initSectionRule(); 
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
