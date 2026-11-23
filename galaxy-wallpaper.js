import { installGalaxyWallpaper } from './components/galaxy/controller.js';

installGalaxyWallpaper({
  document,
  window,
  load: () => import('./assets/galaxy/galaxy.js?v=galaxy-20261122')
});
