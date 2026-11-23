// The static site remains the owner of themes, scenery, navigation and mascot.
export function installGalaxyWallpaper({ document, window, load }) {
  const root = document.documentElement;
  const night = document.querySelector('.sky-night');
  if (!night || night.querySelector('.galaxy-wallpaper')) return () => {};
  const host = document.createElement('div');
  host.className = 'galaxy-wallpaper';
  host.setAttribute('aria-hidden', 'true');
  host.setAttribute('inert', '');
  night.prepend(host);

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const supported = Boolean(window.WebGL2RenderingContext && window.ResizeObserver && window.IntersectionObserver);
  let generation = 0;
  let dispose = null;
  let loading = false;
  let failed = !supported;
  let suspended = false;
  let destroyed = false;
  let listening = false;
  let modulePromise;

  const status = value => {
    if (root.dataset.galaxy !== value) root.dataset.galaxy = value;
    root.classList.toggle('galaxy-ready', value === 'ready');
  };
  const eligible = () => !destroyed && !suspended && !failed && !document.hidden &&
    !reduce.matches && root.dataset.theme === 'dark' && root.dataset.wallpaper === 'animated' &&
    !root.classList.contains('wallpaper-suspended');
  const stop = () => {
    generation += 1;
    loading = false;
    const cleanup = dispose;
    dispose = null;
    cleanup?.();
    status(failed ? 'fallback' : 'idle');
  };
  const sync = () => {
    if (!eligible()) {
      if (dispose || loading) stop();
      else status(failed ? 'fallback' : 'idle');
      return;
    }
    if (dispose || loading) return;
    loading = true;
    status('loading');
    const token = ++generation;
    modulePromise ??= Promise.resolve().then(load);
    modulePromise.then(module => {
      if (token !== generation || !eligible()) return;
      const onError = () => {
        if (token !== generation || destroyed) return;
        failed = true;
        // React may report an error during its effect commit. Defer its unmount.
        window.queueMicrotask(() => { if (!destroyed) stop(); });
      };
      const cleanup = module.mountGalaxy(host, {
        onReady: () => { if (token === generation && eligible()) status('ready'); },
        onError
      });
      loading = false;
      if (token !== generation || !eligible()) cleanup();
      else dispose = cleanup;
    }).catch(() => {
      if (token !== generation || destroyed) return;
      failed = true;
      stop();
    });
  };
  const observer = new window.MutationObserver(sync);
  const attach = () => {
    if (listening || destroyed) return;
    listening = true;
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme', 'data-wallpaper', 'class'] });
    document.addEventListener('visibilitychange', sync);
    reduce.addEventListener('change', sync);
  };
  const detach = () => {
    if (!listening) return;
    listening = false;
    observer.disconnect();
    document.removeEventListener('visibilitychange', sync);
    reduce.removeEventListener('change', sync);
  };
  const destroy = () => {
    if (destroyed) return;
    destroyed = true;
    detach();
    stop();
    host.remove();
    window.removeEventListener('pagehide', onHide);
    window.removeEventListener('pageshow', onShow);
    delete root.dataset.galaxy;
  };
  const onHide = event => {
    suspended = true;
    detach();
    stop();
    if (!event.persisted) destroy();
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
  return destroy;
}
