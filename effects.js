/* Progressive content motion. The duck, profile photos and CSS sky keep their own owners. */
(() => {
  'use strict';

  const root = document.documentElement;
  const header = document.querySelector('.top');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 861px)');
  const candidateSelector = [
    'main .hero-copy', 'main .about-intro-copy', 'main h1',
    'main .sec-head', 'main section > .wrap > h2',
    'main .card', 'main .cert-card', 'main .toolkit-item',
    'main .cols > div', 'main .steps li', 'main .prose > p',
    'main .contact-core'
  ].join(',');
  const protectedSelector = [
    '.top', '.bar', '.brand', 'footer', '.duck-trigger',
    '.profile-card', '.themed-profile', '.profile-frame', '.profile-visual', '.profile-decor',
    '.contact-orbits', '.contact-planets', '.contact-track', '.contact-carrier', '.contact-planet'
  ].join(',');
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  let gsapAvailable = Boolean(gsap && ScrollTrigger);
  if (gsapAvailable) {
    try { gsap.registerPlugin(ScrollTrigger); } catch { gsapAvailable = false; }
  }

  const records = new Map();
  const seen = new WeakSet();
  let engine = 'none';
  let running = false;
  let progressFrame = null;
  let scanFrame = null;
  let intersection = null;
  let contentSize = null;
  let panelChanges = null;

  const layoutVisible = element => {
    if (!element.isConnected || element.closest('[hidden]')) return false;
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  };
  // intro.js is the sole entrance owner for Home's copy and portrait.
  const allowed = element => !element.closest(protectedSelector) && !element.querySelector('.duck-trigger') &&
    !(document.body.classList.contains('page-home') && element.closest('.hero-copy'));
  const rememberStyle = element => {
    const saved = {};
    ['opacity', 'transform', 'transition'].forEach(name => {
      saved[name] = [element.style.getPropertyValue(name), element.style.getPropertyPriority(name)];
    });
    return saved;
  };
  const restoreStyle = record => {
    if (!record.saved) return;
    // Clear GSAP's transform cache before restoring only the inline values we owned.
    try { gsap.set(record.element, { clearProps: 'opacity,transform' }); } catch { /* Restore below still reveals the content. */ }
    Object.entries(record.saved).forEach(([name, saved]) => {
      if (saved[0]) record.element.style.setProperty(name, saved[0], saved[1]);
      else record.element.style.removeProperty(name);
    });
    record.saved = null;
  };
  const finish = (record, markSeen = true) => {
    record.trigger?.kill();
    record.trigger = null;
    record.tween?.kill();
    record.tween = null;
    intersection?.unobserve(record.element);
    restoreStyle(record);
    if (record.mode === 'io') {
      record.element.classList.add('is-visible');
    }
    if (markSeen) seen.add(record.element);
    records.delete(record.element);
  };
  const startReveal = record => {
    if (!running || record.state !== 'pending' || document.hidden) return;
    if (!layoutVisible(record.element)) return;
    record.state = 'active';
    record.trigger?.kill();
    record.trigger = null;
    try {
      record.tween = gsap.to(record.element, {
        opacity: 1, y: 0, duration: desktop.matches ? .58 : .44,
        delay: record.delay, ease: 'power2.out',
        onComplete: () => finish(record)
      });
    } catch { finish(record); }
  };
  const register = (element, delay) => {
    if (seen.has(element) || records.has(element) || !layoutVisible(element)) return;
    const rect = element.getBoundingClientRect();
    const initialView = rect.top < window.innerHeight && rect.bottom > 0;
    if (engine === 'none' || initialView || element.contains(document.activeElement)) {
      seen.add(element);
      return;
    }
    const record = { element, delay, mode: engine, state: 'pending', trigger: null, tween: null, saved: null };
    records.set(element, record);
    if (engine === 'gsap') {
      record.saved = rememberStyle(element);
      element.style.setProperty('transition', 'none', 'important');
      try {
        gsap.set(element, { opacity: 0, y: desktop.matches ? 16 : 12 });
        record.trigger = ScrollTrigger.create({
          trigger: element, start: 'top 92%', once: true,
          onEnter: () => startReveal(record)
        });
        // create() may enter immediately if layout changed between the two reads.
        if (record.state !== 'pending') {
          record.trigger?.kill();
          record.trigger = null;
        }
        if (document.hidden) record.trigger?.disable(false);
      } catch { finish(record); }
    } else {
      element.classList.add('reveal');
      element.classList.remove('is-visible');
      element.style.setProperty('--reveal-delay', Math.round(delay * 1000) + 'ms');
      intersection.observe(element);
    }
  };
  const scan = () => {
    scanFrame = null;
    if (!running || document.hidden) return;
    records.forEach(record => {
      if (!layoutVisible(record.element)) finish(record, record.state === 'active');
    });
    const candidates = [...document.querySelectorAll(candidateSelector)].filter(allowed);
    // Avoid animating both a parent and its nested heading or card.
    const targets = candidates.filter(element =>
      !candidates.some(other => other !== element && other.contains(element))
    );
    const groupIndexes = new Map();
    targets.forEach(element => {
      const parent = element.parentElement;
      const index = groupIndexes.get(parent) || 0;
      groupIndexes.set(parent, index + 1);
      register(element, Math.min(index * .055, .165));
    });
    if (engine === 'gsap' && records.size) {
      try { ScrollTrigger.refresh(); } catch { records.forEach(record => finish(record)); }
    }
    if (engine === 'io') records.forEach(record => intersection.observe(record.element));
  };
  const requestScan = () => {
    if (!running || document.hidden || scanFrame !== null) return;
    scanFrame = window.requestAnimationFrame(scan);
  };
  const renderScrollState = () => {
    progressFrame = null;
    if (!running || document.hidden) return;
    const scrollY = Math.max(0, window.scrollY);
    const available = root.scrollHeight - window.innerHeight;
    const progress = available > 0 ? Math.min(1, scrollY / available) : 0;
    header?.classList.toggle('is-scrolled', scrollY > 12);
    root.style.setProperty('--scroll-progress', String(progress));
    // The active sky already uses --scroll-progress; don't update its hidden legacy fallback.
    if (!root.classList.contains('sky-ready')) {
      const enabled = desktop.matches && !reduceMotion.matches;
      [...document.querySelectorAll('.page-decor > .decor-orb')].forEach((element, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        const distance = enabled ? Math.min(24, scrollY * (.008 + index * .002)) : 0;
        element.style.setProperty('--parallax-y', (distance * direction).toFixed(2) + 'px');
      });
    }
  };
  const requestProgress = () => {
    if (!running || document.hidden || progressFrame !== null) return;
    progressFrame = window.requestAnimationFrame(renderScrollState);
  };
  const revealAncestors = element => {
    for (let current = element; current; current = current.parentElement) {
      const record = records.get(current);
      if (record) {
        if (record.mode === 'io') current.style.setProperty('--reveal-delay', '0ms');
        finish(record);
      }
    }
  };
  const onFocus = event => revealAncestors(event.target);
  const onHash = () => {
    try {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) revealAncestors(target);
    } catch { /* A malformed fragment never hides the content. */ }
    requestScan();
    requestProgress();
  };
  const onLayout = () => { requestScan(); requestProgress(); };
  const resetEngine = () => {
    records.forEach(record => finish(record));
    intersection?.disconnect();
    intersection = null;
    root.classList.remove('reveal-ready', 'gsap-enhanced', 'portfolio-motion-ready');
    engine = reduceMotion.matches ? 'none' : gsapAvailable ? 'gsap' : 'IntersectionObserver' in window ? 'io' : 'none';
    if (engine === 'io') {
      try {
        intersection = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting || document.hidden) return;
            const record = records.get(entry.target);
            if (record) finish(record);
          });
        }, { rootMargin: '0px 0px -24px 0px', threshold: .06 });
      } catch { engine = 'none'; }
    }
    root.classList.toggle('gsap-enhanced', engine === 'gsap');
    root.classList.toggle('reveal-ready', engine === 'io');
    root.classList.toggle('portfolio-motion-ready', engine !== 'none');
    requestScan();
    requestProgress();
  };
  const onVisibility = () => {
    if (document.hidden) {
      records.forEach(record => {
        record.tween?.pause();
        record.trigger?.disable(false);
      });
      intersection?.disconnect();
      if (scanFrame !== null) window.cancelAnimationFrame(scanFrame);
      if (progressFrame !== null) window.cancelAnimationFrame(progressFrame);
      scanFrame = null;
      progressFrame = null;
    } else {
      records.forEach(record => {
        record.trigger?.enable(false, false);
        record.tween?.resume();
      });
      onLayout();
    }
  };
  const attach = () => {
    if (running) return;
    running = true;
    window.addEventListener('scroll', requestProgress, { passive: true });
    window.addEventListener('resize', onLayout, { passive: true });
    window.addEventListener('hashchange', onHash);
    document.addEventListener('focusin', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
    reduceMotion.addEventListener('change', resetEngine);
    desktop.addEventListener('change', onLayout);
    if ('ResizeObserver' in window) {
      try { contentSize = new ResizeObserver(onLayout); contentSize.observe(document.body); } catch { contentSize = null; }
    }
    const panels = document.querySelector('#panels');
    if (panels && 'MutationObserver' in window) {
      try {
        panelChanges = new MutationObserver(onLayout);
        panelChanges.observe(panels, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] });
      } catch { panelChanges = null; }
    }
    resetEngine();
    renderScrollState();
  };
  const detach = () => {
    if (!running) return;
    running = false;
    window.removeEventListener('scroll', requestProgress);
    window.removeEventListener('resize', onLayout);
    window.removeEventListener('hashchange', onHash);
    document.removeEventListener('focusin', onFocus);
    document.removeEventListener('visibilitychange', onVisibility);
    reduceMotion.removeEventListener('change', resetEngine);
    desktop.removeEventListener('change', onLayout);
    contentSize?.disconnect();
    panelChanges?.disconnect();
    contentSize = null;
    panelChanges = null;
    intersection?.disconnect();
    records.forEach(record => finish(record, false));
    intersection = null;
    if (scanFrame !== null) window.cancelAnimationFrame(scanFrame);
    if (progressFrame !== null) window.cancelAnimationFrame(progressFrame);
    scanFrame = null;
    progressFrame = null;
    root.classList.remove('reveal-ready', 'gsap-enhanced', 'portfolio-motion-ready');
  };
  const onPageShow = () => { attach(); onLayout(); };
  const onPageHide = event => {
    detach();
    if (!event.persisted) {
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('pageshow', onPageShow);
    }
  };
  window.addEventListener('pagehide', onPageHide);
  window.addEventListener('pageshow', onPageShow);
  attach();
})();
