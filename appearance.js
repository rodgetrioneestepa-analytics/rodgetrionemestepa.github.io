/* Philippine-time appearance and event-driven wallpaper depth. No render loop. */
(() => {
  'use strict';
  const root = document.documentElement;
  const schedule = window.PortfolioTheme;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const desktop = window.matchMedia('(min-width: 861px)');
  const themeButtons = [...document.querySelectorAll('.theme-toggle')];
  // The manual background control was removed. Discard its old preference so
  // returning visitors cannot remain paused without a control to resume it.
  try { localStorage.removeItem('portfolio-wallpaper'); } catch { /* Storage can be blocked. */ }
  let pointerFrame = null;
  let trackingPointer = false;
  let pointerX = 0;
  let pointerY = 0;
  let themeTimer = null;
  let pageSuspended = false;

  const applyTheme = () => {
    const theme = schedule.chooseTheme();
    if (root.dataset.theme !== theme) root.dataset.theme = theme;
    const isDark = theme === 'dark';
    themeButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(isDark));
      button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isDark ? '#0B1220' : '#F8FAFC');
  };
  const stopThemeTimer = () => {
    if (themeTimer !== null) window.clearTimeout(themeTimer);
    themeTimer = null;
  };
  const syncTheme = () => {
    stopThemeTimer();
    applyTheme();
    if (document.hidden || pageSuspended) return;
    const now = Date.now();
    themeTimer = window.setTimeout(syncTheme, Math.max(1, schedule.getState(now).nextChange - now));
  };
  const resetPointer = () => {
    if (pointerFrame !== null) window.cancelAnimationFrame(pointerFrame);
    pointerFrame = null;
    root.style.setProperty('--pointer-x', '0px');
    root.style.setProperty('--pointer-y', '0px');
  };
  const renderPointer = () => {
    pointerFrame = null;
    if (!trackingPointer) return;
    const x = Math.max(-12, Math.min(12, (pointerX / Math.max(1, window.innerWidth) - .5) * 24));
    const y = Math.max(-10, Math.min(10, (pointerY / Math.max(1, window.innerHeight) - .5) * 20));
    root.style.setProperty('--pointer-x', x.toFixed(2) + 'px');
    root.style.setProperty('--pointer-y', y.toFixed(2) + 'px');
  };
  const onPointerMove = (event) => {
    if (event.pointerType === 'touch') return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (pointerFrame === null) pointerFrame = window.requestAnimationFrame(renderPointer);
  };
  const onPointerOut = (event) => { if (!event.relatedTarget) resetPointer(); };
  const updatePointerTracking = () => {
    const enabled = desktop.matches && finePointer.matches && !reducedMotion.matches && !document.hidden;
    if (enabled === trackingPointer) return;
    trackingPointer = enabled;
    const method = enabled ? 'addEventListener' : 'removeEventListener';
    window[method]('pointermove', onPointerMove, { passive: true });
    window[method]('pointerout', onPointerOut, { passive: true });
    window[method]('blur', resetPointer);
    if (!enabled) resetPointer();
  };
  const applyWallpaper = () => {
    const paused = reducedMotion.matches;
    root.dataset.wallpaper = paused ? 'paused' : 'animated';
    root.classList.toggle('wallpaper-suspended', Boolean(document.hidden));
    updatePointerTracking();
  };
  themeButtons.forEach((button) => button.addEventListener('click', () => {
    schedule.setOverride(root.dataset.theme === 'dark' ? 'light' : 'dark');
    syncTheme();
  }));
  reducedMotion.addEventListener('change', applyWallpaper);
  finePointer.addEventListener('change', updatePointerTracking);
  desktop.addEventListener('change', updatePointerTracking);
  document.addEventListener('visibilitychange', () => { syncTheme(); applyWallpaper(); });
  window.addEventListener('focus', syncTheme);
  window.addEventListener('pageshow', () => { pageSuspended = false; syncTheme(); });
  window.addEventListener('pagehide', () => { pageSuspended = true; stopThemeTimer(); });
  window.addEventListener('storage', (event) => {
    if (event.key === 'portfolio-theme-override' || event.key === null) syncTheme();
  });
  syncTheme();
  applyWallpaper();
})();
