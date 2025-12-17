document.addEventListener('DOMContentLoaded', () => {
  const BP = 1200;
  const isDesktop = () => window.matchMedia(`(min-width:${BP}px)`).matches;

  const panels = Array.from(document.querySelectorAll('.project-card__content'));
  const timers = new WeakMap(); // таймер на закрытие для каждого элемента

  const open = (el) => {
    const t = timers.get(el);
    if (t) clearTimeout(t);
    el.classList.add('is-open');
  };

  const closeLater = (el, delay = 120) => {
    const t = timers.get(el);
    if (t) clearTimeout(t);

    timers.set(el, setTimeout(() => {
      // закрываем только если всё ещё десктоп
      if (isDesktop()) el.classList.remove('is-open');
    }, delay));
  };

  // Desktop hover
  panels.forEach((el) => {
    el.addEventListener('pointerenter', () => {
      if (!isDesktop()) return;
      open(el);
    });

    el.addEventListener('pointerleave', (e) => {
      if (!isDesktop()) return;

      // если "ушли" в дочерний элемент (редко, но бывает) — не закрываем
      if (el.contains(e.relatedTarget)) return;

      // главное: НЕ закрываем мгновенно
      closeLater(el, 120);
    });
  });

  // Mobile click
  panels.forEach((el) => {
    el.addEventListener('click', (e) => {
      if (isDesktop()) return;

      // клики по интерактивным элементам не трогаем
      if (e.target.closest('a, button, input, textarea, select, label')) return;

      el.classList.toggle('is-open');
    });
  });

  // Close on outside click (mobile only)
  document.addEventListener('click', (e) => {
    if (isDesktop()) return;

    panels.forEach((el) => {
      if (!el.classList.contains('is-open')) return;
      if (!el.contains(e.target)) el.classList.remove('is-open');
    });
  }, { passive: true });

  // при переходе в desktop — можно закрыть все (чтобы не залипало)
  window.addEventListener('resize', () => {
    if (isDesktop()) panels.forEach((el) => el.classList.remove('is-open'));
  });
});
