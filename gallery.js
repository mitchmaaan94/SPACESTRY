/* ═══════════════════════════════════════════════════════════
   SPACESTRY · Gallery System — JS
   Drop into every project page alongside gallery.css
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1 · Scroll-reveal ───────────────────────────────────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-revealed');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.06 });

  document.querySelectorAll('.gallery-item').forEach(el => revealObs.observe(el));


  /* ── 2 · Build lightbox DOM (once per page) ──────────────── */
  const items   = Array.from(document.querySelectorAll('.gallery-item'));
  let   current = 0;

  const lb = document.createElement('div');
  lb.className = 'g-lightbox';
   lb.innerHTML = `
    <!-- Gradient defs — project pages don't load index.html's defs block -->
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"
         style="position:absolute;width:0;height:0;overflow:hidden;">
      <defs>
        <linearGradient id="arrowMetalGradH" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stop-color="#e8dfa0"/>
          <stop offset="50%"  stop-color="#C8BC88"/>
          <stop offset="100%" stop-color="#8a7d52"/>
        </linearGradient>
      </defs>
    </svg>
    <div class="g-lb-stage">
      <img class="g-lb-img" alt="">
      <div class="g-lb-loader"></div>
    </div>
    <button class="g-lb-close" aria-label="Close">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.4">
        <line x1="1" y1="1" x2="17" y2="17"/><line x1="17" y1="1" x2="1" y2="17"/>
      </svg>
    </button>
    <button class="arrowhead-nav--lg is-left g-lb-prev" aria-label="Previous">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 290 320"
           aria-hidden="true" focusable="false"
           style="--icon-fill:url(#arrowMetalGradH);--icon-stroke:none;--icon-sw:1.8;">
        <path fill-rule="evenodd"
          d="M 0.794,168.728 c 0,0 -1.723,79.759 72.813,125.882 0,0 27.648,20.735 67.193,23.647 0,0 29.154,-1.21 46.497,-23.947 l 101.244,-112.85 -147.168,-180.335 c -140.81,119.512 -134.877,132.101 -140.579,167.603 z m 138.844,-153.101 l 136.86,164.666 -71.523,81.16 c 0,0 -31.545,5.859 -76.908,-18.631 -60.172,-32.485 -75.2,-69.291 -75.2,-69.291 -23.109,-52.602 5.087,-85.762 5.087,-85.762 z"
          fill="var(--icon-fill, none)"
          stroke="var(--icon-stroke, #C8BC88)"
          stroke-width="var(--icon-sw, 1.8)"
        />
      </svg>
    </button>
    <button class="arrowhead-nav--lg is-right g-lb-next" aria-label="Next">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 290 320"
           aria-hidden="true" focusable="false"
           style="--icon-fill:url(#arrowMetalGradH);--icon-stroke:none;--icon-sw:1.8;">
        <path fill-rule="evenodd"
          d="M 0.794,168.728 c 0,0 -1.723,79.759 72.813,125.882 0,0 27.648,20.735 67.193,23.647 0,0 29.154,-1.21 46.497,-23.947 l 101.244,-112.85 -147.168,-180.335 c -140.81,119.512 -134.877,132.101 -140.579,167.603 z m 138.844,-153.101 l 136.86,164.666 -71.523,81.16 c 0,0 -31.545,5.859 -76.908,-18.631 -60.172,-32.485 -75.2,-69.291 -75.2,-69.291 -23.109,-52.602 5.087,-85.762 5.087,-85.762 z"
          fill="var(--icon-fill, none)"
          stroke="var(--icon-stroke, #C8BC88)"
          stroke-width="var(--icon-sw, 1.8)"
        />
      </svg>
    </button>
    <div class="g-lb-counter"></div>
    <div class="g-lb-title"></div>`;
  document.body.appendChild(lb);

  const lbImg     = lb.querySelector('.g-lb-img');
  const lbLoader  = lb.querySelector('.g-lb-loader');
  const lbCounter = lb.querySelector('.g-lb-counter');
  const lbTitle   = lb.querySelector('.g-lb-title');

  /* ── Helpers ─────────────────────────────────────────────── */
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
    // Read project name from the .tagline element on the page
    lbTitle.textContent =
      document.querySelector('.hero-title')?.textContent?.trim() ?? '';
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

  /* ── 3 · Wire up clicks ──────────────────────────────────── */
  items.forEach((item, i) => item.addEventListener('click', () => open(i)));

  lb.querySelector('.g-lb-close').addEventListener('click', close);
  lb.querySelector('.g-lb-prev').addEventListener('click', () => showImage(current - 1));
  lb.querySelector('.g-lb-next').addEventListener('click', () => showImage(current + 1));

  // Click backdrop to close
  lb.addEventListener('click', e => { if (e.target === lb) close(); });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  showImage(current - 1);
    if (e.key === 'ArrowRight') showImage(current + 1);
  });

})();
