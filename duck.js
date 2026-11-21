/* Two short, gesture-driven sounds for the existing duck mascot. */
(() => {
  'use strict';

  const buttons = [...document.querySelectorAll('.duck-trigger')];
  if (!buttons.length) return;

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  const sounds = new Map();
  let currentSound = null;
  let playback = 0;
  let lastHover = -Infinity;
  let activeButton = null;
  let calloutTimer;

  const resetSound = (sound) => {
    sound.pause();
    try { sound.currentTime = 0; } catch { /* Media metadata may not be ready yet. */ }
  };
  const stopSounds = () => {
    playback += 1;
    sounds.forEach(resetSound);
    currentSound = null;
  };
  const playSound = (kind) => {
    if (document.hidden) return;
    try {
      let sound = sounds.get(kind);
      if (!sound) {
        sound = new Audio(`assets/audio/duck-${kind}.mp3`);
        sound.preload = 'none';
        sound.volume = kind === 'hover' ? .55 : .7;
        sounds.set(kind, sound);
      }
      stopSounds();
      currentSound = sound;
      const request = playback;
      // Click calls play() synchronously, preserving the browser's user gesture.
      // Hover can be blocked until the visitor has interacted with the page.
      const playing = sound.play();
      if (playing && typeof playing.catch === 'function') {
        playing.catch(() => {
          if (playback === request && currentSound === sound) currentSound = null;
        });
      }
    } catch { currentSound = null; /* An unavailable sound never breaks navigation. */ }
  };
  const hideCallout = () => {
    window.clearTimeout(calloutTimer);
    if (activeButton) activeButton.classList.remove('is-quacking');
    activeButton = null;
  };
  const showCallout = (button) => {
    hideCallout();
    activeButton = button;
    // This layout read happens only on activation, so repeated clicks restart
    // the short CSS animation without a continuous JavaScript render loop.
    void button.offsetWidth;
    button.classList.add('is-quacking');
    calloutTimer = window.setTimeout(hideCallout, 1150);
  };

  buttons.forEach((button) => {
    button.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'touch' || !canHover.matches || document.hidden) return;
      const now = performance.now();
      if (now - lastHover < 1000 || (currentSound && !currentSound.paused && !currentSound.ended)) return;
      lastHover = now;
      playSound('hover');
    });
    // Native buttons provide the same click event for mouse, touch, Enter, and Space.
    button.addEventListener('click', () => {
      lastHover = performance.now();
      playSound('click');
      showCallout(button);
    });
  });
  const suspend = () => { stopSounds(); hideCallout(); };
  document.addEventListener('visibilitychange', () => { if (document.hidden) suspend(); });
  window.addEventListener('pagehide', suspend);
})();
