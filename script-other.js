/* ============================================================
   script-other.js — Spacestry · About & Contact pages
   Handles pages that have NO loader screen and NO hero header.
   Works alongside script.js (page veil + nav dots run from there).
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // Only run on pages without a loader element
  if (document.getElementById('loader')) return;

  // ── Scroll Reveal ──────────────────────────────────────────
  // initReveal() is defined globally in script.js.
  // Call it directly here since the loader never fires.
  if (typeof initReveal === 'function') initReveal();

    // ── Nav: fixed, always visible ─────────────────────────────
  // initNavDots() is defined in script.js. Call it here since
  // initLoader() (which normally calls it) never runs on these pages.
  if (typeof initNavDots === 'function') initNavDots();

});
