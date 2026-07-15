// Tab switching for the Projects page (New projects / Certificates /
// Certifications / Internships / Case studies / Competitions).
// Safe to include on every page — it simply does nothing if no tabs exist.
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  if (!tabButtons.length) return;

  const panels = document.querySelectorAll('.tab-panel');

  const activate = (id) => {
    tabButtons.forEach((btn) => {
      const isMatch = btn.dataset.tabTarget === id;
      btn.setAttribute('aria-selected', String(isMatch));
      btn.tabIndex = isMatch ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.id === id);
    });
  };

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => activate(btn.dataset.tabTarget));
  });

  // Arrow-key navigation between tabs, per standard tab-list behavior.
  const tabList = document.querySelector('.tab-nav');
  if (tabList) {
    tabList.addEventListener('keydown', (e) => {
      const current = Array.from(tabButtons).indexOf(document.activeElement);
      if (current === -1) return;
      let next = null;
      if (e.key === 'ArrowRight') next = (current + 1) % tabButtons.length;
      if (e.key === 'ArrowLeft') next = (current - 1 + tabButtons.length) % tabButtons.length;
      if (next !== null) {
        tabButtons[next].focus();
        activate(tabButtons[next].dataset.tabTarget);
        e.preventDefault();
      }
    });
  }
});
