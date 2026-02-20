
(() => {
  const nav = document.querySelector('[data-nav]');
  const burger = document.querySelector('[data-burger]');
  const menu = document.querySelector('[data-menu]');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open');
    });
  }

  const langToggle = document.querySelector('[data-lang-toggle]');
  const langMenu = document.querySelector('[data-lang-menu]');
  if (langToggle && langMenu) {
    langToggle.addEventListener('click', () => {
      const isOpen = langMenu.classList.toggle('open');
      langToggle.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', (e) => {
      if (!langMenu.contains(e.target) && !langToggle.contains(e.target)) {
        langMenu.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const modal = document.querySelector('[data-modal]');
  const openBtn = document.querySelector('[data-open-modal]');
  const closeBtns = document.querySelectorAll('[data-close-modal]');
  let previousFocus = null;

  const focusable = () => modal?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

  function openModal() {
    if (!modal) return;
    previousFocus = document.activeElement;
    modal.classList.add('open');
    modal.removeAttribute('aria-hidden');
    const first = focusable()?.[0];
    first?.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    previousFocus?.focus();
  }

  openBtn?.addEventListener('click', openModal);
  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key !== 'Tab') return;
    const nodes = Array.from(focusable() || []);
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
})();
