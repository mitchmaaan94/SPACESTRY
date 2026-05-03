/* ============================================================
   project-script.js — Spacestry Project Pages
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

// ── Header ↔ Nav coordinated crossfade ───────────────────────
function initScrollHeader() {
  const header = document.querySelector('.header');
  const nav    = document.getElementById('secondary-nav');
  if (!header || !nav) return;

  let hCur = 1, hTgt = 1;   // header opacity
  let nCur = 0, nTgt = 0;   // nav opacity
  let rafId = null;

  function calcTargets() {
    const t = Math.max(0, Math.min(1,
      window.scrollY / (header.offsetHeight * 0.52)
    ));

    hTgt = 1 - t;

    // Nav crossfades in: silent for first 30% of header scroll,
    // then catches up and is fully present by 78%
    nTgt = Math.max(0, Math.min(1, (t - 0.3) / 0.48));
  }

  function tick() {
    calcTargets();

    const LERP = 0.075;               // lower = dreamier trail
    hCur += (hTgt - hCur) * LERP;
    nCur += (nTgt - nCur) * LERP;

    // Header
    header.style.opacity       = hCur;
    header.style.pointerEvents = hCur < 0.04 ? 'none' : '';

    // Nav — opacity + micro-drift
    nav.style.opacity       = nCur;
    nav.style.transform     = `translateY(${(1 - nCur) * -6}px)`;
    nav.style.pointerEvents = nCur > 0.08 ? 'auto' : 'none';

    const done = Math.abs(hTgt - hCur) < 0.001
              && Math.abs(nTgt - nCur) < 0.001;
    if (done) {
      hCur = hTgt; nCur = nTgt; rafId = null;
    } else {
      rafId = requestAnimationFrame(tick);
    }
  }

  function kick() {
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  window.addEventListener('scroll', kick, { passive: true });

  // Seed without animating on first paint
  calcTargets();
  hCur = hTgt; nCur = nTgt;
  header.style.opacity       = hCur;
  nav.style.opacity          = nCur;
  nav.style.transform        = `translateY(${(1 - nCur) * -6}px)`;
  nav.style.pointerEvents    = nCur > 0.08 ? 'auto' : 'none';
}

// ── Nav Dots ─────────────────────────────────────────────────
function initNavDots() {
  const nav   = document.getElementById('secondary-nav');
  const btn   = document.querySelector('.nav-dots-btn');
  const links = document.querySelectorAll('.secondary-nav-links a');
  if (!nav || !btn) return;

  btn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', isOpen);
  });

  links.forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('nav-open');
    btn.setAttribute('aria-expanded', 'false');
  }));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      nav.classList.remove('nav-open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initScrollHeader();
  initActiveNav();
  initNavDots();

  const footer = document.querySelector('.site-footer');
  if (footer) footer.style.opacity = '1';
});
