/* Philippine-time appearance, initialized before styles to avoid a theme flash. */
(() => {
  'use strict';
  const root = document.documentElement;
  const offset = 8 * 60 * 60 * 1000; // Philippine Standard Time is UTC+8.
  const key = 'portfolio-theme-override';
  let memoryOverride = null;
  let memoryOnly = false;

  const getState = (now = Date.now()) => {
    const local = new Date(now + offset);
    const hour = local.getUTCHours();
    const nextHour = hour < 6 ? 6 : hour < 17 ? 17 : 30;
    return {
      theme: hour >= 6 && hour < 17 ? 'light' : 'dark',
      nextChange: Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate(), nextHour) - offset
    };
  };
  const clearOverride = () => {
    memoryOverride = null;
    memoryOnly = false;
    try { localStorage.removeItem(key); } catch { /* The schedule works without storage. */ }
  };
  const chooseTheme = (now = Date.now()) => {
    const state = getState(now);
    let candidate = memoryOverride;
    if (!memoryOnly) try {
      const raw = localStorage.getItem(key);
      try { candidate = raw ? JSON.parse(raw) : null; } catch { candidate = null; }
    } catch { /* Keep a temporary in-memory override when storage is blocked. */ }
    if (candidate && ['light', 'dark'].includes(candidate.theme) &&
        candidate.expiresAt === state.nextChange && candidate.expiresAt > now) {
      memoryOverride = candidate;
      return candidate.theme;
    }
    clearOverride();
    return state.theme;
  };
  const setOverride = (theme, now = Date.now()) => {
    if (!['light', 'dark'].includes(theme)) return;
    memoryOverride = { theme, expiresAt: getState(now).nextChange };
    memoryOnly = true;
    try { localStorage.setItem(key, JSON.stringify(memoryOverride)); memoryOnly = false; } catch { /* Keep the in-memory choice. */ }
  };

  // Old, indefinite preferences must not override the requested daily schedule.
  try { localStorage.removeItem('portfolio-theme'); } catch { /* Storage is optional. */ }
  window.PortfolioTheme = Object.freeze({ getState, chooseTheme, setOverride, clearOverride });
  root.classList.add('js');
  root.dataset.theme = chooseTheme();
  root.dataset.wallpaper = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'paused' : 'animated';
})();
