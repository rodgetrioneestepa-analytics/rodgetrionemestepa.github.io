/* First-entry overlay and a single, finite homepage entrance. */
(() => {
  'use strict';
  const api = window.PortfolioIntro;
  const gsap = window.gsap;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let wobble = null;
  let exit = null;
  let homeTimeline = null;
  let quackEntrance = null;
  let finishRequested = false;
  let homeStarted = false;
  let destroyed = false;
  let homeSaved = [];
  let homeBound = false;

  const remember = elements => elements.map(element => ({ element, styles: ['opacity', 'transform', 'transition'].map(name => [name, element.style.getPropertyValue(name), element.style.getPropertyPriority(name)]) }));
  const restoreHome = () => {
    homeTimeline?.kill();
    homeTimeline = null;
    for (const { element, styles } of homeSaved) {
      try { gsap?.set(element, { clearProps: 'opacity,transform' }); } catch { /* Restore direct inline properties below. */ }
      for (const [name, value, priority] of styles) {
        if (value) element.style.setProperty(name, value, priority);
        else element.style.removeProperty(name);
      }
    }
    homeSaved = [];
  };
  const unbindHome = () => {
    if (!homeBound) return;
    homeBound = false;
    document.removeEventListener('focusin', onFocus);
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('scroll', onInteraction);
    window.removeEventListener('pointerdown', onInteraction);
  };
  const stopHome = () => { restoreHome(); unbindHome(); };
  const onInteraction = () => stopHome();
  const onFocus = event => {
    if (api?.active && !event.target.closest('.intro-overlay')) cancel('focus');
    stopHome();
  };
  const startHome = () => {
    if (homeStarted || destroyed) return;
    homeStarted = true;
    if (!document.body.classList.contains('page-home') || reduce.matches || document.hidden || !gsap?.timeline || window.scrollY > 100 || (location.hash && location.hash !== '#main')) return;
    const copy = document.querySelector('.hero-copy');
    if (!copy) return;
    const heading = [...copy.querySelectorAll('h1 > span')];
    const subtitle = copy.querySelector('.hi');
    const description = copy.querySelector('.lead');
    const actions = [...copy.querySelectorAll('.row > a')];
    const note = copy.querySelector('.hero-note');
    const portrait = document.querySelector('.page-home .profile-card');
    const targets = [...heading, subtitle, description, ...actions, note, portrait].filter(Boolean);
    homeSaved = remember(targets);
    try {
      // Existing line spans provide a split-text effect without rewriting the heading.
      const text = [...heading, subtitle, description, ...actions, note].filter(Boolean);
      gsap.set(text, { opacity: 0, y: 14 });
      if (portrait) gsap.set(portrait, { opacity: 0 });
      homeTimeline = gsap.timeline({ defaults: { duration: .52, ease: 'power2.out' }, onComplete: stopHome });
      if (heading.length) homeTimeline.to(heading, { opacity: 1, y: 0, stagger: .09 }, 0);
      if (subtitle) homeTimeline.to(subtitle, { opacity: 1, y: 0 }, .2);
      if (description) homeTimeline.to(description, { opacity: 1, y: 0 }, .34);
      if (actions.length) homeTimeline.to(actions, { opacity: 1, y: 0, stagger: .07 }, .48);
      if (note) homeTimeline.to(note, { opacity: 1, y: 0 }, .6);
      if (portrait) homeTimeline.to(portrait, { opacity: 1, duration: .7 }, .48);
      homeBound = true;
      document.addEventListener('focusin', onFocus);
      document.addEventListener('visibilitychange', onVisibility);
      window.addEventListener('scroll', onInteraction, { passive: true });
      window.addEventListener('pointerdown', onInteraction, { passive: true });
    } catch { stopHome(); }
  };
  const release = reason => {
    wobble?.kill();
    exit?.kill();
    quackEntrance?.kill();
    wobble = null;
    exit = null;
    quackEntrance = null;
    document.removeEventListener('focusin', onFocus);
    document.removeEventListener('visibilitychange', onVisibility);
    api?.complete(reason);
  };
  const cancel = reason => {
    release(reason);
    if (reason !== 'pagehide' && reason !== 'hidden') startHome();
  };
  const finish = () => {
    if (!api?.active || destroyed || exit) return;
    const overlay = api.mount();
    wobble?.kill();
    wobble = null;
    if (!overlay || reduce.matches || document.hidden || !gsap?.timeline) {
      release('ready');
      return;
    }
    const duck = overlay.querySelector('.intro-duck');
    try {
      exit = gsap.timeline({ onComplete: () => release('ready') });
      // At a repeat boundary the illustration is centered; one small final nod.
      exit.to(duck, { rotation: 3, duration: .11, ease: 'sine.out' })
        .to(duck, { rotation: 0, duration: .15, ease: 'sine.inOut' })
        .to(overlay, { opacity: 0, duration: .22, ease: 'power1.out' }, '-=.04');
    } catch { release('ready'); }
  };
  const requestFinish = () => {
    if (!api?.active) return;
    finishRequested = true;
    if (!wobble || reduce.matches || document.hidden) finish();
  };
  const onVisibility = () => {
    if (document.hidden) { cancel('hidden'); stopHome(); }
  };
  const onReduce = () => {
    if (reduce.matches) { cancel('reduced-motion'); stopHome(); }
  };
  const onHide = () => {
    destroyed = true;
    release('pagehide');
    stopHome();
    reduce.removeEventListener('change', onReduce);
    window.removeEventListener('pagehide', onHide);
  };
  reduce.addEventListener('change', onReduce);
  window.addEventListener('pagehide', onHide);
  if (!api?.active) { startHome(); return; }
  api.cancel = cancel;
  api.onReady = requestFinish;
  api.onComplete = reason => {
    if (reason !== 'pagehide' && reason !== 'hidden') startHome();
  };
  const overlay = api.mount();
  document.addEventListener('focusin', onFocus);
  document.addEventListener('visibilitychange', onVisibility);
  if (!overlay || reduce.matches || !gsap?.timeline || document.hidden) {
    if (api.ready) finish();
    return;
  }
  try {
    const duck = overlay.querySelector('.intro-duck');
    const quack = overlay.querySelector('.intro-quack');
    quackEntrance = gsap.fromTo(quack, { opacity: .2, y: 8 }, { opacity: 1, y: 0, duration: .42, ease: 'back.out(1.25)' });
    wobble = gsap.timeline({ repeat: -1, onRepeat: () => { if (finishRequested) finish(); } });
    wobble.to(duck, { rotation: -8, duration: .16, ease: 'sine.inOut' })
      .to(duck, { rotation: 8, duration: .25, ease: 'sine.inOut' })
      .to(duck, { rotation: 0, duration: .18, ease: 'sine.inOut' });
    if (api.ready) requestFinish();
  } catch { release('animation-error'); }
})();
