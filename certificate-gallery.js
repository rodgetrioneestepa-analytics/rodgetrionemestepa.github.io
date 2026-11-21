/* Data-driven learning records with one accessible, reusable certificate viewer. */
(() => {
  'use strict';

  const host = document.querySelector('.certificate-gallery');
  if (!host || host.dataset.galleryReady === 'true') return;
  host.dataset.galleryReady = 'true';

  const categories = [
    ['all', 'All'],
    ['course-completions', 'Course Completions'],
    ['trainings', 'Trainings'],
    ['competitions', 'Competitions']
  ];
  const records = [...(window.CERTIFICATES || [])].filter((record) => (
    record && typeof record.id === 'string' && typeof record.title === 'string' &&
    typeof record.image === 'string' && categories.some(([id]) => id !== 'all' && id === record.category)
  )).sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
  const byId = new Map(records.map((record) => [record.id, record]));
  const node = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const safeUrl = (value, verification = false) => {
    if (!value) return '';
    try {
      const url = new URL(value, document.baseURI);
      return (verification ? url.protocol === 'https:' : ['https:', 'http:'].includes(url.protocol)) ? url.href : '';
    } catch { return ''; }
  };
  const metadata = (record) => [record.issuer, record.dateLabel, record.typeLabel].filter(Boolean).join(' · ');

  const heading = node('div', 'cert-section-head');
  const title = node('h2', '', 'Certifications & Trainings');
  title.id = 'certifications-title';
  heading.append(title, node('p', '', 'A collection of my learning experiences, completed courses, and professional development activities.'));
  const filters = node('div', 'cert-filters');
  filters.setAttribute('role', 'group');
  filters.setAttribute('aria-label', 'Filter certifications and trainings');
  categories.forEach(([id, label]) => {
    const count = id === 'all' ? records.length : records.filter((record) => record.category === id).length;
    const button = node('button', '', `${label} (${count})`);
    button.type = 'button';
    button.dataset.filter = id;
    button.setAttribute('aria-pressed', String(id === 'all'));
    filters.append(button);
  });
  const results = node('p', 'cert-results');
  results.setAttribute('role', 'status');
  results.setAttribute('aria-live', 'polite');
  results.setAttribute('aria-atomic', 'true');
  const grid = node('div', 'cert-grid');
  host.replaceChildren(heading, filters, results, grid);

  const render = (category) => {
    const visible = category === 'all' ? records : records.filter((record) => record.category === category);
    filters.querySelectorAll('button').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    const cards = visible.map((record, index) => {
      const card = node('article', 'cert-card');
      card.dataset.certificateId = record.id;
      card.style.setProperty('--cert-delay', `${Math.min(index * 35, 140)}ms`);
      const preview = node('div', 'cert-thumb');
      const image = node('img', '');
      image.src = safeUrl(record.thumbnail || record.image);
      image.alt = record.imageAlt || `${record.typeLabel || 'Certificate'} for ${record.title}, awarded to Rodge Trione Estepa`;
      image.loading = 'lazy';
      image.decoding = 'async';
      if (record.width > 0) image.width = record.width;
      if (record.height > 0) image.height = record.height;
      preview.append(image);
      const body = node('div', 'cert-card-body');
      const cardTitle = node('h3', '', record.title);
      const date = node('time', '', record.dateLabel || record.date || '');
      if (record.date) date.dateTime = record.date;
      body.append(node('p', 'cert-type', record.typeLabel || ''), cardTitle, node('p', 'cert-issuer', record.issuer || ''), date, node('p', 'cert-summary', record.description || ''));
      if (record.note) body.append(node('p', 'cert-note', record.note));
      const view = node('button', 'cert-view', 'View Certificate');
      view.type = 'button';
      view.setAttribute('aria-label', `View certificate: ${record.title}`);
      body.append(view);
      card.append(preview, body);
      return card;
    });
    if (!cards.length) cards.push(node('p', 'cert-empty', 'No learning records have been added to this category yet.'));
    grid.replaceChildren(...cards);
    results.textContent = `${visible.length} learning ${visible.length === 1 ? 'record' : 'records'} shown.`;
  };

  const dialog = node('dialog', 'cert-dialog');
  dialog.setAttribute('aria-labelledby', 'cert-dialog-title');
  dialog.setAttribute('aria-describedby', 'cert-dialog-meta');
  dialog.innerHTML = '<div class="cert-modal-shell"><header class="cert-modal-head"><div><h2 id="cert-dialog-title"></h2><p id="cert-dialog-meta"></p></div><button type="button" class="cert-close" aria-label="Close certificate viewer" autofocus>Close</button></header><div class="cert-modal-toolbar"><div class="cert-zoom-controls"><button type="button" data-zoom="out" aria-label="Zoom out">−</button><button type="button" data-zoom="fit" aria-label="Fit certificate">Fit</button><button type="button" data-zoom="in" aria-label="Zoom in">+</button></div><output class="cert-zoom-status" aria-live="polite" aria-label="Certificate zoom"></output><a class="cert-download" download>Download original</a><a class="cert-verify" target="_blank" rel="noopener noreferrer" hidden>Verify credential</a></div><div class="cert-image-viewport" tabindex="0" aria-label="Certificate image. Use zoom controls and scroll to explore."><p class="cert-viewer-status" role="status"></p><div class="cert-image-stage"><img class="cert-original" alt="" hidden></div></div><div class="cert-modal-caption"><p id="cert-dialog-description"></p><p class="cert-note" hidden></p></div></div>';
  document.body.append(dialog);
  const closeButton = dialog.querySelector('.cert-close');
  const viewport = dialog.querySelector('.cert-image-viewport');
  const stage = dialog.querySelector('.cert-image-stage');
  const original = dialog.querySelector('.cert-original');
  const status = dialog.querySelector('.cert-viewer-status');
  const zoomStatus = dialog.querySelector('.cert-zoom-status');
  const zoomButtons = [...dialog.querySelectorAll('[data-zoom]')];
  const zoomLevels = [1, 1.25, 1.5, 2, 3, 4];
  let zoomIndex = 0;
  let active = null;
  let trigger = null;
  let requestVersion = 0;
  let ready = false;
  let dimensions = { width: 0, height: 0 };
  let layoutFrame = null;
  let sizeObserver = null;
  let pointerStartedOutside = false;
  let returnFocus = true;

  const syncZoomButtons = () => {
    zoomButtons.forEach((button) => {
      button.disabled = !ready || (button.dataset.zoom === 'out' && zoomIndex === 0) || (button.dataset.zoom === 'in' && zoomIndex === zoomLevels.length - 1);
    });
    zoomStatus.textContent = zoomIndex === 0 ? 'Fit · 100%' : `${Math.round(zoomLevels[zoomIndex] * 100)}%`;
  };
  const layoutImage = () => {
    layoutFrame = null;
    if (!dialog.open || !ready || !dimensions.width || !dimensions.height) return;
    const width = viewport.clientWidth;
    const height = viewport.clientHeight;
    if (!width || !height) return;
    // Center the viewport on the same part of the image when the zoom changes.
    const previousWidth = stage.offsetWidth || width;
    const previousHeight = stage.offsetHeight || height;
    const centerX = (viewport.scrollLeft + width / 2) / previousWidth;
    const centerY = (viewport.scrollTop + height / 2) / previousHeight;
    const fit = Math.min(Math.max(1, width - 32) / dimensions.width, Math.max(1, height - 32) / dimensions.height);
    const imageWidth = dimensions.width * fit * zoomLevels[zoomIndex];
    const imageHeight = dimensions.height * fit * zoomLevels[zoomIndex];
    const stageWidth = Math.max(width, imageWidth + 32);
    const stageHeight = Math.max(height, imageHeight + 32);
    stage.style.width = `${stageWidth}px`;
    stage.style.height = `${stageHeight}px`;
    original.style.width = `${imageWidth}px`;
    original.style.height = `${imageHeight}px`;
    viewport.scrollLeft = zoomIndex === 0 ? 0 : Math.max(0, centerX * stageWidth - width / 2);
    viewport.scrollTop = zoomIndex === 0 ? 0 : Math.max(0, centerY * stageHeight - height / 2);
  };
  const requestLayout = () => {
    if (layoutFrame === null) layoutFrame = window.requestAnimationFrame(layoutImage);
  };
  const watchSize = () => {
    if ('ResizeObserver' in window) {
      try {
        sizeObserver = new ResizeObserver(requestLayout);
        sizeObserver.observe(viewport);
        return;
      } catch { sizeObserver = null; }
    }
    window.addEventListener('resize', requestLayout, { passive: true });
  };
  const stopWatchingSize = () => {
    sizeObserver?.disconnect();
    sizeObserver = null;
    window.removeEventListener('resize', requestLayout);
    if (layoutFrame !== null) window.cancelAnimationFrame(layoutFrame);
    layoutFrame = null;
  };
  const closeViewer = () => { if (dialog.open) dialog.close(); };
  const openViewer = (record, source) => {
    const sourceUrl = safeUrl(record.image);
    if (!sourceUrl) return;
    if (typeof dialog.showModal !== 'function') {
      // Older browsers retain a direct, usable route to the original document.
      window.open(sourceUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    stopWatchingSize();
    const version = ++requestVersion;
    active = record;
    trigger = source;
    returnFocus = true;
    ready = false;
    zoomIndex = 0;
    dimensions = { width: Number(record.width) || 0, height: Number(record.height) || 0 };
    original.hidden = true;
    original.alt = record.imageAlt || `${record.typeLabel || 'Certificate'} for ${record.title}, awarded to Rodge Trione Estepa`;
    status.hidden = false;
    status.textContent = 'Loading certificate…';
    viewport.setAttribute('aria-busy', 'true');
    dialog.querySelector('#cert-dialog-title').textContent = record.title;
    dialog.querySelector('#cert-dialog-meta').textContent = metadata(record);
    dialog.querySelector('#cert-dialog-description').textContent = record.description || '';
    const note = dialog.querySelector('.cert-modal-caption .cert-note');
    note.textContent = record.note || '';
    note.hidden = !record.note;
    const download = dialog.querySelector('.cert-download');
    download.href = sourceUrl;
    try { download.download = decodeURIComponent(new URL(sourceUrl).pathname.split('/').pop()); } catch { download.download = ''; }
    const verify = dialog.querySelector('.cert-verify');
    const verificationUrl = safeUrl(record.verificationUrl, true);
    verify.hidden = !verificationUrl;
    if (verificationUrl) verify.href = verificationUrl;
    else verify.removeAttribute('href');
    syncZoomButtons();
    original.onload = () => {
      if (version !== requestVersion || active !== record || !dialog.open || !original.naturalWidth || !original.naturalHeight) return;
      dimensions = { width: original.naturalWidth, height: original.naturalHeight };
      ready = true;
      original.hidden = false;
      status.hidden = true;
      viewport.setAttribute('aria-busy', 'false');
      syncZoomButtons();
      requestLayout();
    };
    original.onerror = () => {
      if (version !== requestVersion || active !== record || !dialog.open) return;
      ready = false;
      original.hidden = true;
      status.hidden = false;
      status.textContent = 'The preview could not load. You can still download the original certificate.';
      viewport.setAttribute('aria-busy', 'false');
      syncZoomButtons();
    };
    original.src = sourceUrl;
    viewport.scrollLeft = 0;
    viewport.scrollTop = 0;
    if (!dialog.open) dialog.showModal();
    document.documentElement.classList.add('cert-modal-open');
    closeButton.focus({ preventScroll: true });
    watchSize();
    if (original.complete && original.naturalWidth > 0) original.onload();
  };

  filters.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (button && filters.contains(button)) render(button.dataset.filter);
  });
  grid.addEventListener('click', (event) => {
    const card = event.target.closest('[data-certificate-id]');
    if (!card || !grid.contains(card)) return;
    const record = byId.get(card.dataset.certificateId);
    if (record) openViewer(record, card.querySelector('.cert-view'));
  });
  closeButton.addEventListener('click', closeViewer);
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); closeViewer(); });
  const outsideDialog = (event) => {
    const rect = dialog.getBoundingClientRect();
    return event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom);
  };
  dialog.addEventListener('pointerdown', (event) => { pointerStartedOutside = outsideDialog(event); });
  dialog.addEventListener('click', (event) => {
    if (pointerStartedOutside && outsideDialog(event)) closeViewer();
    pointerStartedOutside = false;
  });
  zoomButtons.forEach((button) => button.addEventListener('click', () => {
    if (!ready) return;
    if (button.dataset.zoom === 'fit') zoomIndex = 0;
    if (button.dataset.zoom === 'in') zoomIndex = Math.min(zoomLevels.length - 1, zoomIndex + 1);
    if (button.dataset.zoom === 'out') zoomIndex = Math.max(0, zoomIndex - 1);
    syncZoomButtons();
    requestLayout();
  }));
  dialog.addEventListener('close', () => {
    // A queued close event must not tear down a viewer that has already reopened.
    if (dialog.open) return;
    ++requestVersion;
    stopWatchingSize();
    document.documentElement.classList.remove('cert-modal-open');
    active = null;
    ready = false;
    zoomIndex = 0;
    pointerStartedOutside = false;
    original.onload = null;
    original.onerror = null;
    original.hidden = true;
    original.removeAttribute('src');
    stage.style.width = '';
    stage.style.height = '';
    original.style.width = '';
    original.style.height = '';
    if (returnFocus && trigger?.isConnected) trigger.focus({ preventScroll: true });
    trigger = null;
  });
  window.addEventListener('pagehide', () => { returnFocus = false; closeViewer(); stopWatchingSize(); });
  render('all');
})();
