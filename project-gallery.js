/* Curved screenshot browsing without a second rendering library or autoplay. */
(() => {
  'use strict';
  const galleries = [...document.querySelectorAll('[data-project-gallery]')];
  if (!galleries.length) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 720px)');
  const cleanups = [];
  let destroyed = false;
  let dialog;
  let opener;

  const closePreview = () => {
    if (!dialog?.open) return;
    dialog.close();
  };
  const openPreview = (link, gallery) => {
    if (typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return false;
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.className = 'project-image-dialog';
      dialog.setAttribute('aria-labelledby', 'project-preview-title');
      dialog.innerHTML = '<header><h2 id="project-preview-title">Project screenshot</h2><button type="button" data-close-preview aria-label="Close screenshot preview">Close</button></header><figure><img alt=""><figcaption></figcaption><a class="original-link" target="_blank" rel="noopener">Open original image</a></figure>';
      document.body.appendChild(dialog);
      const onClose = () => {
        document.documentElement.classList.remove('project-gallery-open');
        if (opener?.isConnected) opener.focus({ preventScroll:true });
        opener = null;
      };
      const onDialogClick = event => {
        if (event.target.closest('[data-close-preview]')) closePreview();
        if (event.target === dialog) {
          const bounds = dialog.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closePreview();
        }
      };
      dialog.addEventListener('close', onClose);
      dialog.addEventListener('click', onDialogClick);
      cleanups.push(() => {
        dialog.removeEventListener('close', onClose);
        dialog.removeEventListener('click', onDialogClick);
        dialog.remove();
      });
    }
    const thumbnail = link.querySelector('img');
    const caption = link.closest('figure')?.querySelector('figcaption')?.textContent || thumbnail.alt;
    const image = dialog.querySelector('img');
    image.alt = thumbnail.alt;
    image.src = link.href;
    dialog.querySelector('h2').textContent = gallery.dataset.galleryTitle || 'Project screenshot';
    dialog.querySelector('figcaption').textContent = caption;
    dialog.querySelector('.original-link').href = link.href;
    opener = link;
    document.documentElement.classList.add('project-gallery-open');
    dialog.showModal();
    dialog.querySelector('button').focus();
    return true;
  };

  galleries.forEach(gallery => {
    const track = gallery.querySelector('.gallery-track');
    const items = [...track.children];
    const previous = gallery.querySelector('[data-gallery-prev]');
    const next = gallery.querySelector('[data-gallery-next]');
    const count = gallery.querySelector('[data-gallery-count]');
    const controls = gallery.querySelector('.gallery-controls');
    let frame = null;
    let index = 0;
    let drag = null;
    let suppressClick = false;
    if (controls) controls.hidden = items.length < 2;
    if (items.length < 2) track.setAttribute('data-single', '');

    const render = () => {
      frame = null;
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = Infinity;
      items.forEach((item, position) => {
        const offset = (item.offsetLeft - track.offsetLeft + item.offsetWidth / 2 - center) / Math.max(1, track.clientWidth);
        if (Math.abs(offset) < closest) { closest = Math.abs(offset); index = position; }
        const curved = !reduce.matches && !mobile.matches && items.length > 1;
        item.style.setProperty('--curve-y', curved ? `${Math.min(26, Math.abs(offset) * 32).toFixed(2)}px` : '0px');
        item.style.setProperty('--curve-rotate', curved ? `${Math.max(-5, Math.min(5, offset * 7)).toFixed(2)}deg` : '0deg');
      });
      if (previous) previous.disabled = index === 0;
      if (next) next.disabled = index >= items.length - 1;
      if (count) count.textContent = `${index + 1} / ${items.length}`;
    };
    const queue = () => { if (!document.hidden && frame === null) frame = requestAnimationFrame(render); };
    const go = position => {
      const target = items[Math.max(0, Math.min(items.length - 1, position))];
      if (!target) return;
      track.scrollTo({ left:target.offsetLeft - track.offsetLeft - (track.clientWidth - target.offsetWidth) / 2, behavior:reduce.matches ? 'auto' : 'smooth' });
      queue();
    };
    const onPrevious = () => go(index - 1);
    const onNext = () => go(index + 1);
    const onKey = event => {
      const destination = { ArrowLeft:index - 1, ArrowRight:index + 1, Home:0, End:items.length - 1 }[event.key];
      if (destination === undefined) return;
      event.preventDefault();
      go(destination);
    };
    const onDown = event => {
      suppressClick = false;
      if (event.pointerType !== 'mouse' || event.button !== 0 || items.length < 2) return;
      drag = { x:event.clientX, left:track.scrollLeft, pointer:event.pointerId, moved:false };
    };
    const onMove = event => {
      if (!drag || event.pointerId !== drag.pointer) return;
      const distance = event.clientX - drag.x;
      if (Math.abs(distance) > 8) {
        drag.moved = true;
        suppressClick = true;
        track.classList.add('is-dragging');
        track.setPointerCapture?.(event.pointerId);
        event.preventDefault();
        track.scrollLeft = drag.left - distance;
        queue();
      }
    };
    const onUp = event => {
      if (!drag || event.pointerId !== drag.pointer) return;
      const moved = drag.moved;
      drag = null;
      track.classList.remove('is-dragging');
      if (track.hasPointerCapture?.(event.pointerId)) track.releasePointerCapture(event.pointerId);
      if (moved) { render(); go(index); }
    };
    const onClick = event => {
      const link = event.target.closest('[data-gallery-image]');
      if (!link) return;
      if (suppressClick) { event.preventDefault(); suppressClick = false; return; }
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      if (openPreview(link, gallery)) event.preventDefault();
    };
    const onDragStart = event => { if (event.target.closest('[data-gallery-image]')) event.preventDefault(); };
    const onVisibility = () => {
      if (document.hidden) {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        drag = null;
        track.classList.remove('is-dragging');
      } else queue();
    };
    previous?.addEventListener('click', onPrevious);
    next?.addEventListener('click', onNext);
    track.addEventListener('scroll', queue, { passive:true });
    track.addEventListener('keydown', onKey);
    track.addEventListener('pointerdown', onDown);
    track.addEventListener('pointermove', onMove);
    track.addEventListener('pointerup', onUp);
    track.addEventListener('pointercancel', onUp);
    track.addEventListener('click', onClick);
    track.addEventListener('dragstart', onDragStart);
    window.addEventListener('resize', queue, { passive:true });
    document.addEventListener('visibilitychange', onVisibility);
    reduce.addEventListener('change', queue);
    mobile.addEventListener('change', queue);
    render();
    cleanups.push(() => {
      if (frame !== null) cancelAnimationFrame(frame);
      previous?.removeEventListener('click', onPrevious);
      next?.removeEventListener('click', onNext);
      track.removeEventListener('scroll', queue);
      track.removeEventListener('keydown', onKey);
      track.removeEventListener('pointerdown', onDown);
      track.removeEventListener('pointermove', onMove);
      track.removeEventListener('pointerup', onUp);
      track.removeEventListener('pointercancel', onUp);
      track.removeEventListener('click', onClick);
      track.removeEventListener('dragstart', onDragStart);
      window.removeEventListener('resize', queue);
      document.removeEventListener('visibilitychange', onVisibility);
      reduce.removeEventListener('change', queue);
      mobile.removeEventListener('change', queue);
    });
  });

  const onHide = event => {
    closePreview();
    if (event.persisted || destroyed) return;
    destroyed = true;
    cleanups.forEach(cleanup => cleanup());
    document.documentElement.classList.remove('project-gallery-open');
    window.removeEventListener('pagehide', onHide);
  };
  window.addEventListener('pagehide', onHide);
})();
