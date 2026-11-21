'use strict';

// Small enhancements only. Project overviews use native details elements.
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');
const setMenu = (open) => {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
};
menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
navigation?.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuToggle.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) setMenu(false);
});
window.matchMedia('(min-width: 681px)').addEventListener('change', () => setMenu(false));

const tabList = document.querySelector('.tab-nav');
const tabs = Array.from(document.querySelectorAll('.tab-btn'));
const panels = Array.from(document.querySelectorAll('.tab-panel'));
const activateTab = (id, updateHash = false) => {
  if (!panels.some((panel) => panel.id === id)) return;
  tabs.forEach((tab) => {
    const selected = tab.dataset.tabTarget === id;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  panels.forEach((panel) => {
    const selected = panel.id === id;
    panel.hidden = !selected;
    panel.classList.toggle('is-active', selected);
  });
  if (updateHash) {
    try { history.replaceState(null, '', '#' + id); } catch { /* Tabs still work without history access. */ }
  }
};
tabs.forEach((tab) => tab.addEventListener('click', () => activateTab(tab.dataset.tabTarget, true)));
tabList?.addEventListener('keydown', (event) => {
  const index = tabs.indexOf(document.activeElement);
  if (index < 0) return;
  let next;
  if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
  if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
  if (event.key === 'Home') next = 0;
  if (event.key === 'End') next = tabs.length - 1;
  if (next === undefined) return;
  event.preventDefault();
  activateTab(tabs[next].dataset.tabTarget, true);
  tabs[next].focus();
});
const followPortfolioHash = () => {
  if (!tabs.length) return;
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  const target = document.getElementById(id);
  if (!target) return;
  const panel = target.classList.contains('tab-panel') ? target : target.closest('.tab-panel');
  if (!panel) return;
  activateTab(panel.id);
  if (target.classList.contains('project-card')) {
    const detail = target.querySelector('details');
    if (detail) detail.open = true;
    requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  }
};
followPortfolioHash();
window.addEventListener('hashchange', followPortfolioHash);

document.querySelectorAll('[data-copy-email]').forEach((button) => {
  button.addEventListener('click', async () => {
    const status = button.parentElement.querySelector('.copy-status');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(button.dataset.copyEmail);
      if (status) status.textContent = 'Email address copied.';
    } catch {
      if (status) status.textContent = 'Copy this address: ' + button.dataset.copyEmail;
    }
  });
});
document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});


