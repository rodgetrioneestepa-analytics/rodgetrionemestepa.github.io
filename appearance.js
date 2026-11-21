/* Local appearance preferences and event-driven wallpaper depth. No render loop. */
(() => {
  'use strict';
  const root = document.documentElement;
  const colorPreference = window.matchMedia('(prefers-color-scheme: dark)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const desktop = window.matchMedia('(min-width: 861px)');
  const themeButtons = [...document.querySelectorAll('.theme-toggle')];
  const motionButtons = [...document.querySelectorAll('.wallpaper-toggle')];
  const read = (key) => { try { return localStorage.getItem(key); } catch { return null; } };
  const save = (key, value) => { try { localStorage.setItem(key, value); } catch { /* In-memory controls still work. */ } };
  let savedTheme = read('portfolio-theme');
  if (!['light', 'dark'].includes(savedTheme)) savedTheme = null;
  let pausedByUser = read('portfolio-wallpaper') === 'paused';
  let pointerFrame = null;
  let trackingPointer = false;
  let pointerX = 0;
  let pointerY = 0;

  const applyTheme = () => {
    const theme = savedTheme || (colorPreference.matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    const isDark = theme === 'dark';
    themeButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(isDark));
      button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      const label = button.querySelector('.theme-toggle-label');
      if (label) label.textContent = isDark ? 'Light mode' : 'Dark mode';
    });
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isDark ? '#0B1220' : '#F8FAFC');
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
    const enabled = desktop.matches && finePointer.matches && !reducedMotion.matches && !pausedByUser && !document.hidden;
    if (enabled === trackingPointer) return;
    trackingPointer = enabled;
    const method = enabled ? 'addEventListener' : 'removeEventListener';
    window[method]('pointermove', onPointerMove, { passive: true });
    window[method]('pointerout', onPointerOut, { passive: true });
    window[method]('blur', resetPointer);
    if (!enabled) resetPointer();
  };
  const applyWallpaper = () => {
    const paused = pausedByUser || reducedMotion.matches;
    root.dataset.wallpaper = paused ? 'paused' : 'animated';
    root.classList.toggle('wallpaper-suspended', Boolean(document.hidden));
    motionButtons.forEach((button) => {
      button.disabled = reducedMotion.matches;
      button.setAttribute('aria-pressed', String(paused));
      const label = reducedMotion.matches ? 'Motion reduced' : paused ? 'Play background' : 'Pause background';
      button.setAttribute('aria-label', reducedMotion.matches ? 'Background animation respects your reduced-motion preference' : label);
      const text = button.querySelector('.wallpaper-toggle-label');
      if (text) text.textContent = label;
    });
    updatePointerTracking();
  };
  themeButtons.forEach((button) => button.addEventListener('click', () => {
    savedTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    save('portfolio-theme', savedTheme);
    applyTheme();
  }));
  motionButtons.forEach((button) => button.addEventListener('click', () => {
    if (reducedMotion.matches) return;
    pausedByUser = !pausedByUser;
    save('portfolio-wallpaper', pausedByUser ? 'paused' : 'animated');
    applyWallpaper();
  }));
  colorPreference.addEventListener('change', () => { if (!savedTheme) applyTheme(); });
  reducedMotion.addEventListener('change', applyWallpaper);
  finePointer.addEventListener('change', updatePointerTracking);
  desktop.addEventListener('change', updatePointerTracking);
  document.addEventListener('visibilitychange', applyWallpaper);
  window.addEventListener('storage', (event) => {
    if (event.key === 'portfolio-theme' || event.key === null) {
      savedTheme = read('portfolio-theme');
      if (!['light', 'dark'].includes(savedTheme)) savedTheme = null;
      applyTheme();
    }
    if (event.key === 'portfolio-wallpaper' || event.key === null) {
      pausedByUser = read('portfolio-wallpaper') === 'paused';
      applyWallpaper();
    }
  });
  applyTheme();
  applyWallpaper();
})();
