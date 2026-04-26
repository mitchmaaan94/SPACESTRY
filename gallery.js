/* ═══════════════════════════════════════════════════════════
   SPACESTRY · Premium Gallery System — JS
   Drop into every project page alongside gallery.css
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1 · Auto-detect orientation ────────────────────────── */
  function setOrient(img, item) {
    if (item.dataset.orient) return;           // already set in HTML — skip
    const w = img.naturalWidth, h = img.naturalHeight;
    if (!w || !h) return;
    item.dataset.orient = w >= h ? 'landscape' : 'portrait';
  }

  document.querySelectorAll('.gallery-item img').forEach(img => {
    const item = img.closest('.gallery-item');
    if (img.complete) { setOrient(img, item); }
    else { img.addEventListener('load', () => setOrient(img, item)); }
  });

  /* ── 2 · Scroll-reveal ───────────────────────────────────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-revealed');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.gallery-item').forEach(el => revealObs.observe(el));

  /* ── 3 · Build lightbox DOM (once per page) ──────────────── */
  const items   = Array.from(document.querySelectorAll('.gallery-item'));
  let   current = 0;

  const lb = document.createElement('div');
  lb.className = 'g-lightbox';
  lb.innerHTML = `
    <div class="g-lb-stage">
      <img class="g-lb-img" alt="">
      <div class="g-lb-loader"></div>
    </div>
    <button class="g-lb-close" aria-label="Close">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.4">
        <line x1="1" y1="1" x2="17" y2="17"/><line x1="17" y1="1" x2="1" y2="17"/>
      </svg>
    </button>
    <button class="g-lb-prev" aria-label="Previous">
      <svg width="10" height="18" viewBox="0 0 10 18" fill="none" stroke="currentColor" stroke-width="1.4">
        <polyline points="9,1 1,9 9,17"/>
      </svg>
    </button>
    <button class="g-lb-next" aria-label="Next">
      <svg width="10" height="18" viewBox="0 0 10 18" fill="none" stroke="currentColor" stroke-width="1.4">
        <polyline points="1,1 9,9 1,17"/>
      </svg>
    </button>
    <div class="g-lb-counter"></div>
    <div class="g-lb-title"></div>`;
  document.body.appendChild(lb);

  const lbImg     = lb.querySelector('.g-lb-img');
  const lbLoader  = lb.querySelector('.g-lb-loader');
  const lbCounter = lb.querySelector('.g-lb-counter');
  const lbTitle   = lb.querySelector('.g-lb-title');

  function updateCounter() {
    lbCounter.textContent = `${current + 1}  /  ${items.length}`;
  }

  function showImage(index) {
    current = (index + items.length) % items.length;
    const src = items[current].querySelector('img').src;

    lbImg.classList.remove('is-loaded');
    lbImg.classList.add('is-leaving');
    lbLoader.classList.add('is-active');

    setTimeout(() => {
      lbImg.classList.remove('is-leaving');
      lbImg.src = src;
      lbImg.onload = () => {
        lbLoader.classList.remove('is-active');
        lbImg.classList.add('is-loaded');
      };
    }, 220);

    updateCounter();
  }

  function open(index) {
    // Read project name from the title element already in the page
    lbTitle.textContent = document.querySelector('.tagline')?.textContent?.split('|')[0]?.trim() ?? '';
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    showImage(index);
  }

  function close() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
    lbImg.classList.remove('is-loaded');
    lbImg.src = '';
  }

  /* ── 4 · Wire up clicks ──────────────────────────────────── */
  items.forEach((item, i) => item.addEventListener('click', () => open(i)));

  lb.querySelector('.g-lb-close').addEventListener('click', close);
  lb.querySelector('.g-lb-prev').addEventListener('click', () => showImage(current - 1));
  lb.querySelector('.g-lb-next').addEventListener('click', () => showImage(current + 1));

  // Click backdrop to close
  lb.addEventListener('click', e => { if (e.target === lb) close(); });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   showImage(current - 1);
    if (e.key === 'ArrowRight')  showImage(current + 1);
  });

})();
