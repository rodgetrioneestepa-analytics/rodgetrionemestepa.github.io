/* Progressive visual enhancements. Navigation and project data live in main.js. */
(() => {
  'use strict';

  const root = document.documentElement;
  const header = document.querySelector('.top');
  const decoration = [...document.querySelectorAll('.page-decor .decor-orb')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 861px)');
  const candidates = [...document.querySelectorAll([
    '.hero-copy', '.hero > div:first-child', '.about-intro-copy',
    'main h1', '.profile-card', '.sec-head', 'section > .wrap > h2',
    '.card', '.cols > div', '.steps li', '.links > a', '.prose > p'
  ].join(','))];
  // Reveal only the outermost selected container; nested transitions feel heavy.
  const targets = candidates.filter((element) =>
    !candidates.some((other) => other !== element && other.contains(element))
  );
  let observer;
  let framePending = false;

  const reveal = (element) => {
    element.classList.add('is-visible');
    observer?.unobserve(element);
  };

  const setupReveals = () => {
    // Keep all content readable until the complete observer setup succeeds.
    root.classList.remove('reveal-ready');
    observer?.disconnect();
    observer = undefined;
    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      targets.forEach(reveal);
      return;
    }

    try {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target);
        });
      }, { rootMargin: '0px 0px -24px 0px', threshold: 0.06 });

      const viewportHeight = window.innerHeight;
      targets.forEach((element) => {
        const siblings = [...element.parentElement.children];
        const delay = Math.min(siblings.indexOf(element) * 65, 180);
        const rect = element.getBoundingClientRect();
        element.classList.add('reveal');
        element.style.setProperty('--reveal-delay', delay + 'ms');
        // Never animate the initial view or an element containing keyboard focus.
        const inView = rect.height > 0 && rect.top < viewportHeight && rect.bottom > 0;
        if (inView || element.contains(document.activeElement)) {
          reveal(element);
        } else {
          element.classList.remove('is-visible');
          observer.observe(element);
        }
      });
      root.classList.add('reveal-ready');
    } catch {
      observer?.disconnect();
      observer = undefined;
      targets.forEach(reveal);
      root.classList.remove('reveal-ready');
    }
  };

  const renderScrollState = () => {
    framePending = false;
    // Collect layout reads before writing styles; only one frame per scroll tick.
    const scrollY = Math.max(0, window.scrollY);
    const available = root.scrollHeight - window.innerHeight;
    const progress = available > 0 ? Math.min(1, scrollY / available) : 0;
    const parallaxEnabled = desktop.matches && !reduceMotion.matches;
    header?.classList.toggle('is-scrolled', scrollY > 12);
    root.style.setProperty('--scroll-progress', String(progress));
    decoration.forEach((element, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      const distance = parallaxEnabled ? Math.min(24, scrollY * (0.008 + index * 0.002)) : 0;
      element.style.setProperty('--parallax-y', (distance * direction).toFixed(2) + 'px');
    });
  };
  const requestScrollState = () => {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(renderScrollState);
  };

  // Focus and anchor navigation must never land inside invisible content.
  const revealAncestors = (element) => {
    for (let current = element; current; current = current.parentElement) {
      if (current.classList?.contains('reveal')) {
        current.style.setProperty('--reveal-delay', '0ms');
        reveal(current);
      }
    }
  };
  document.addEventListener('focusin', (event) => revealAncestors(event.target));
  window.addEventListener('hashchange', () => {
    try {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) revealAncestors(target);
    } catch { /* A malformed URL fragment should not affect the page. */ }
    requestScrollState();
  });
  window.addEventListener('scroll', requestScrollState, { passive: true });
  window.addEventListener('resize', requestScrollState, { passive: true });
  window.addEventListener('pageshow', requestScrollState);
  // Switching category panels can change page height without a resize or scroll.
  if ('ResizeObserver' in window) {
    try {
      const contentSize = new ResizeObserver(requestScrollState);
      contentSize.observe(document.body);
    } catch { /* Progress still updates on normal scroll and resize events. */ }
  }
  reduceMotion.addEventListener('change', () => {
    setupReveals();
    requestScrollState();
  });
  desktop.addEventListener('change', requestScrollState);

  setupReveals();
  renderScrollState();
})();
