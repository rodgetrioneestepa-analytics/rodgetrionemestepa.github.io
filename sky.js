/* Theme-aware decorative skies. CSS paints and animates; one timer launches rockets. */
(() => {
  'use strict';

  const root = document.documentElement;
  const host = document.querySelector('.page-decor');
  if (!host || host.querySelector('.sky-scenes')) return;

  const make = (tag, className, parent) => {
    const element = document.createElement(tag);
    element.className = className;
    if (parent) parent.appendChild(element);
    return element;
  };
  const scene = make('div', 'sky-scenes');
  scene.setAttribute('aria-hidden', 'true');
  const day = make('div', 'sky-layer sky-day', scene);
  make('span', 'sky-sun', day);
  ['one', 'two', 'three'].forEach((name) => make('span', `sky-cloud cloud-${name}`, day));
  const plane = make('span', 'sky-plane', day);
  plane.innerHTML = '<svg viewBox="0 0 64 40" width="56" height="32" aria-hidden="true"><path fill="currentColor" d="M59 17H39L28 3h-7l6 14H12l-5-7H3l3 10-3 10h4l5-7h15l-6 14h7l11-14h20c5 0 5-6 0-6Z"/></svg>';
  ['one', 'two'].forEach((name) => {
    const flock = make('span', `sky-flock flock-${name}`, day);
    for (let index = 0; index < 3; index += 1) make('span', 'sky-bird', flock);
  });

  const night = make('div', 'sky-layer sky-night', scene);
  const stars = make('div', 'sky-stars', night);
  // A stable seed gives a natural spread without changing positions on each theme switch.
  let seed = 428534;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let index = 0; index < 42; index += 1) {
    const star = make('span', `sky-star${index % 3 === 0 ? ' is-twinkling' : ''}`, stars);
    star.style.setProperty('--star-x', `${(2 + random() * 96).toFixed(2)}%`);
    star.style.setProperty('--star-y', `${(3 + random() * 94).toFixed(2)}%`);
    star.style.setProperty('--star-size', `${(1.2 + random() * 1.8).toFixed(2)}px`);
    star.style.setProperty('--star-opacity', (.32 + random() * .6).toFixed(2));
    star.style.setProperty('--twinkle-time', `${(3.8 + random() * 4.4).toFixed(2)}s`);
    star.style.setProperty('--twinkle-delay', `${(-random() * 8).toFixed(2)}s`);
  }
  ['blue', 'purple', 'ringed'].forEach((name) => make('span', `sky-planet planet-${name}`, night));
  const rocket = make('span', 'sky-rocket', night);
  make('span', 'rocket-exhaust', rocket);
  const hull = make('span', 'rocket-hull', rocket);
  hull.innerHTML = '<svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true"><g transform="rotate(45 32 32)"><path fill="#EA4335" d="M23 31 13 45l2 12 13-11Zm18 0 10 14-2 12-13-11Z"/><path fill="#F6F9FF" stroke="#7891B4" stroke-width="1.4" d="M32 5c-9 8-14 22-10 39l3 7h14l3-7C46 27 41 13 32 5Z"/><path fill="#4285F4" d="M25 45h14v7H25Z"/><circle cx="32" cy="28" r="6" fill="#4285F4"/><circle cx="32" cy="28" r="3.4" fill="#C9E6FF"/><path fill="#FBBC05" d="m27 53 5 9 5-9Z"/><path fill="#FFF4BD" d="m30 53 2 6 2-6Z"/></g></svg>';

  host.appendChild(scene);
  root.classList.add('sky-ready');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const interval = 60000;
  let remaining = interval;
  let timer = null;
  let dueAt = null;
  let suspended = false;
  let destroyed = false;
  let listening = false;

  const setSuspended = (value) => {
    if (root.classList.contains('sky-suspended') !== value) root.classList.toggle('sky-suspended', value);
  };
  const stopTimer = () => {
    if (timer === null) return;
    window.clearTimeout(timer);
    remaining = Math.max(0, dueAt - performance.now());
    timer = null;
    dueAt = null;
  };
  const resetFlight = () => rocket.classList.remove('is-flying');
  const eligible = () => !destroyed && !suspended && !document.hidden &&
    !root.classList.contains('wallpaper-suspended') && !reducedMotion.matches &&
    root.dataset.theme === 'dark' && root.dataset.wallpaper === 'animated';
  const schedule = () => {
    if (timer !== null || !eligible()) return;
    dueAt = performance.now() + remaining;
    timer = window.setTimeout(() => {
      timer = null;
      dueAt = null;
      if (!eligible()) { syncState(); return; }
      resetFlight();
      // A single layout read once a minute also restarts a flight if CSS end events are unavailable.
      void rocket.offsetWidth;
      rocket.classList.add('is-flying');
      remaining = interval;
      schedule();
    }, remaining);
  };
  const syncState = () => {
    if (destroyed) return;
    setSuspended(suspended || document.hidden);
    if (root.dataset.theme !== 'dark' || reducedMotion.matches) {
      stopTimer();
      remaining = interval;
      resetFlight();
      return;
    }
    if (eligible()) schedule();
    else stopTimer();
  };
  const onFlightEnd = (event) => {
    if (event.target === rocket && event.animationName === 'sky-rocket-flight') resetFlight();
  };
  const observer = new MutationObserver(syncState);
  const attach = () => {
    if (listening || destroyed) return;
    listening = true;
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme', 'data-wallpaper', 'class'] });
    document.addEventListener('visibilitychange', syncState);
    reducedMotion.addEventListener('change', syncState);
  };
  const detach = () => {
    if (!listening) return;
    listening = false;
    observer.disconnect();
    document.removeEventListener('visibilitychange', syncState);
    reducedMotion.removeEventListener('change', syncState);
  };
  const onPageShow = () => {
    if (destroyed) return;
    suspended = false;
    attach();
    syncState();
  };
  const onPageHide = (event) => {
    suspended = true;
    stopTimer();
    setSuspended(true);
    detach();
    if (!event.persisted) {
      destroyed = true;
      resetFlight();
      rocket.removeEventListener('animationend', onFlightEnd);
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('pageshow', onPageShow);
    }
  };
  rocket.addEventListener('animationend', onFlightEnd);
  window.addEventListener('pagehide', onPageHide);
  window.addEventListener('pageshow', onPageShow);
  attach();
  syncState();
})();
