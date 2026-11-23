/* Delegated, passive pointer lighting. Owns no card transform or animation loop. */
(() => {
  'use strict';
  const main = document.querySelector('main');
  if (!main) return;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const selector = '.project-card,.cert-card';
  let active = null;
  let frame = null;
  let point = null;
  let listening = false;
  let attached = false;
  let suspended = false;
  let destroyed = false;

  const clear = () => {
    if (frame !== null) window.cancelAnimationFrame(frame);
    frame = null;
    point = null;
    if (active) {
      active.removeAttribute('data-card-light');
      active.style.removeProperty('--card-light-x');
      active.style.removeProperty('--card-light-y');
      active = null;
    }
  };
  const paint = () => {
    frame = null;
    if (!active?.isConnected || !point) { clear(); return; }
    const box = active.getBoundingClientRect();
    active.style.setProperty('--card-light-x', `${Math.max(0, Math.min(box.width, point.x - box.left)).toFixed(1)}px`);
    active.style.setProperty('--card-light-y', `${Math.max(0, Math.min(box.height, point.y - box.top)).toFixed(1)}px`);
    active.setAttribute('data-card-light', '');
  };
  const onMove = event => {
    if (event.pointerType === 'touch') return;
    const card = event.target.closest?.(selector);
    if (!card || !main.contains(card)) { clear(); return; }
    if (active !== card) { clear(); active = card; }
    point = { x: event.clientX, y: event.clientY };
    if (frame === null) frame = window.requestAnimationFrame(paint);
  };
  const onOut = event => {
    if (active && !active.contains(event.relatedTarget)) clear();
  };
  const sync = () => {
    const enabled = !destroyed && !suspended && !document.hidden && fine.matches && !reduce.matches;
    if (enabled === listening) return;
    listening = enabled;
    if (enabled) {
      main.addEventListener('pointermove', onMove, { passive: true });
      main.addEventListener('pointerout', onOut, { passive: true });
      main.addEventListener('pointerleave', clear, { passive: true });
    } else {
      main.removeEventListener('pointermove', onMove);
      main.removeEventListener('pointerout', onOut);
      main.removeEventListener('pointerleave', clear);
      clear();
    }
  };
  const attach = () => {
    if (attached || destroyed) return;
    attached = true;
    fine.addEventListener('change', sync);
    reduce.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
  };
  const detach = () => {
    if (!attached) return;
    attached = false;
    fine.removeEventListener('change', sync);
    reduce.removeEventListener('change', sync);
    document.removeEventListener('visibilitychange', sync);
  };
  const onHide = event => {
    suspended = true;
    sync();
    detach();
    if (!event.persisted) {
      destroyed = true;
      window.removeEventListener('pagehide', onHide);
      window.removeEventListener('pageshow', onShow);
    }
  };
  const onShow = () => {
    if (destroyed) return;
    suspended = false;
    attach();
    sync();
  };
  window.addEventListener('pagehide', onHide);
  window.addEventListener('pageshow', onShow);
  attach();
  sync();
})();
