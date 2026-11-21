/* Accessible tool clouds: hover to explore, click/tap to keep one open. */
(() => {
  'use strict';

  const grid = document.querySelector('.toolkit-grid');
  if (!grid) return;

  const entries = [...grid.querySelectorAll('.toolkit-item')].map((item) => {
    const button = item.querySelector('.toolkit-card');
    const cloud = item.querySelector('.tool-cloud');
    return button && cloud ? { item, button, cloud } : null;
  }).filter(Boolean);
  if (!entries.length) return;

  let active = null;
  let pinned = false;
  let closeTimer;
  let positionFrame = null;
  let watchingPosition = false;

  const cancelClose = () => window.clearTimeout(closeTimer);
  const positionCloud = (entry) => {
    const card = entry.button.getBoundingClientRect();
    const header = document.querySelector('.top');
    const headerBottom = header ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
    const height = entry.cloud.offsetHeight || 180;
    entry.item.classList.toggle('cloud-below', card.top - height - 18 < headerBottom + 8);
  };
  const requestPosition = () => {
    if (!active || positionFrame !== null) return;
    positionFrame = window.requestAnimationFrame(() => {
      positionFrame = null;
      if (active) positionCloud(active);
    });
  };
  const watchPosition = (watch) => {
    if (watch === watchingPosition) return;
    watchingPosition = watch;
    const method = watch ? 'addEventListener' : 'removeEventListener';
    window[method]('scroll', requestPosition, { passive: true });
    window[method]('resize', requestPosition);
    if (!watch && positionFrame !== null) {
      window.cancelAnimationFrame(positionFrame);
      positionFrame = null;
    }
  };
  const setExpanded = (entry, open) => {
    entry.item.classList.toggle('is-open', open);
    entry.button.setAttribute('aria-expanded', String(open));
    entry.cloud.setAttribute('aria-hidden', String(!open));
  };
  const close = () => {
    cancelClose();
    if (active) setExpanded(active, false);
    active = null;
    pinned = false;
    watchPosition(false);
  };
  const open = (entry) => {
    cancelClose();
    if (active !== entry) {
      if (active) setExpanded(active, false);
      active = entry;
      pinned = false;
    }
    positionCloud(entry);
    setExpanded(entry, true);
    watchPosition(true);
  };
  const hasKeyboardFocus = (entry) => (
    document.activeElement === entry.button &&
    entry.button.matches(':focus-visible')
  );

  entries.forEach((entry) => {
    setExpanded(entry, false);
    entry.item.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'touch') return;
      open(entry);
    });
    entry.item.addEventListener('pointerleave', (event) => {
      if (event.pointerType === 'touch') return;
      cancelClose();
      // The small gap between a card and its cloud remains easy to cross.
      closeTimer = window.setTimeout(() => {
        if (active === entry && !pinned && !hasKeyboardFocus(entry)) close();
      }, 120);
    });
    entry.item.addEventListener('focusin', () => open(entry));
    entry.item.addEventListener('focusout', (event) => {
      if (!entry.item.contains(event.relatedTarget) && active === entry) close();
    });
    entry.button.addEventListener('click', () => {
      cancelClose();
      // A first mouse click pins a cloud that was already opened by hover.
      // Native button activation gives touch, Enter, and Space the same behavior.
      if (active === entry && pinned) {
        close();
      } else {
        open(entry);
        pinned = true;
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && active) {
      close();
      // No focus change or mousemove listener: Escape stays dismissed until
      // a deliberate click, a fresh focus, or leaving and re-entering the card.
      event.preventDefault();
    }
  });
  document.addEventListener('click', (event) => {
    if (active && !active.item.contains(event.target)) close();
  });
  grid.classList.add('toolkit-enhanced');
})();
