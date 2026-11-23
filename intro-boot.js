/* First-entry preparation. It never hides the document or owns the real mascot. */
(() => {
  'use strict';
  if (window.PortfolioIntro) return;
  const root = document.documentElement;
  const key = 'portfolio-intro-seen-v1';
  const assetBase = document.currentScript?.src || document.baseURI;
  const preview = new URL(document.URL || document.baseURI).searchParams.get('intro') === 'preview';
  let active = false;
  try {
    active = (preview || sessionStorage.getItem(key) !== 'seen') && !document.hidden;
    if (active) sessionStorage.setItem(key, 'seen');
  } catch { /* Without session storage, omit the intro rather than replaying it. */ }
  let overlay = null;
  let timeout = null;
  let ended = !active;
  const complete = reason => {
    if (ended) return;
    ended = true;
    api.active = false;
    if (timeout !== null) window.clearTimeout(timeout);
    timeout = null;
    root.classList.remove('intro-pending');
    root.dataset.intro = 'complete';
    overlay?.remove();
    overlay = null;
    document.removeEventListener('DOMContentLoaded', onReady);
    window.removeEventListener('pagehide', onHide);
    api.onComplete?.(reason);
  };
  const mount = () => {
    if (!api.active || overlay || !document.body) return overlay;
    overlay = document.createElement('div');
    overlay.className = 'intro-overlay';
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-label', 'Loading portfolio');
    const content = document.createElement('div');
    content.className = 'intro-content';
    const duck = document.createElement('img');
    duck.className = 'intro-duck';
    duck.src = new URL('assets/duck-mascot.webp', assetBase).href;
    duck.width = 148;
    duck.height = 148;
    duck.alt = '';
    duck.setAttribute('aria-hidden', 'true');
    const quack = document.createElement('p');
    quack.className = 'intro-quack';
    quack.textContent = 'QUACK!';
    quack.setAttribute('aria-hidden', 'true');
    const label = document.createElement('p');
    label.className = 'intro-label';
    label.textContent = 'A little curiosity goes a long way.';
    label.setAttribute('aria-hidden', 'true');
    const skip = document.createElement('button');
    skip.className = 'intro-skip';
    skip.type = 'button';
    skip.textContent = 'Skip introduction';
    skip.addEventListener('click', () => api.cancel ? api.cancel('skip') : complete('skip'));
    content.append(duck, quack, label);
    overlay.append(content, skip);
    document.body.prepend(overlay);
    return overlay;
  };
  const onReady = () => {
    api.ready = true;
    mount();
    api.onReady?.();
  };
  const onHide = () => api.cancel ? api.cancel('pagehide') : complete('pagehide');
  const api = window.PortfolioIntro = {
    active,
    ready: document.readyState !== 'loading',
    mount,
    complete,
    onReady: null,
    onComplete: null,
    cancel: null
  };
  if (!active) return;
  root.classList.add('intro-pending');
  root.dataset.intro = 'pending';
  // Also works when the later animation script or its vendor library cannot load.
  timeout = window.setTimeout(() => api.cancel ? api.cancel('timeout') : complete('timeout'), 4500);
  window.addEventListener('pagehide', onHide);
  if (api.ready) mount();
  else document.addEventListener('DOMContentLoaded', onReady, { once: true });
})();
