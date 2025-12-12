//for-sub-menuposition
function updateSubmenuPosition() {
  const header = document.querySelector('.header');
  const nav = document.querySelector('.navbar-nav');
  const wrappers = document.querySelectorAll('.sub-menu-wrapper');

  if (!header || !nav || !wrappers.length) return;

  const navRect = nav.getBoundingClientRect();
  const headerRect = header.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;

  wrappers.forEach(wrapper => {
    wrapper.style.top = headerRect.bottom + 'px';

    const leftPadding = navRect.left;
    const rightPadding = vw - (navRect.right + 100);

    wrapper.style.paddingLeft = leftPadding + 'px';
    wrapper.style.paddingRight = rightPadding + 'px';
  });
}

// 1) DOM собран
window.addEventListener('DOMContentLoaded', () => {
  updateSubmenuPosition();
  // маленький хак: ещё один проход после отрисовки
  requestAnimationFrame(updateSubmenuPosition);
});

// 2) всё полностью загружено (картинки, шрифты и т.п.)
window.addEventListener('load', updateSubmenuPosition);

// 3) при ресайзе — как у тебя было
window.addEventListener('resize', updateSubmenuPosition);

