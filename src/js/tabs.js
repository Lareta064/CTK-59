function initTabsSliders(selector = '[data-tabs]') {
  document.querySelectorAll(selector).forEach((root) => {
    const btns = [...root.querySelectorAll('.tabs-nav-btn[data-tbtn]')];
    const panels = [...root.querySelectorAll('.tabs-content[data-tcontent]')];

    const swipers = new Map();

    // init swipers per panel
    panels.forEach((panel) => {
      const swiperEl = panel.querySelector('.swiper.tab-swiper');
      if (!swiperEl) return;

      const swiper = new Swiper(swiperEl, {
        slidesPerView: 'auto',
        spaceBetween: 20,
        navigation: {
          prevEl: panel.querySelector('.tab-swiper-prev'),
          nextEl: panel.querySelector('.tab-swiper-next'),
        },
		breakpoints: {
        768: { spaceBetween: 30, slidesPerView: 2, },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
        watchOverflow: true,
      });

      swipers.set(panel, swiper);
    });

    // function setActive(tabId) {
    //   btns.forEach((btn) => {
    //     btn.classList.toggle('is-active', btn.dataset.tbtn === tabId);
    //   });

    //   panels.forEach((panel) => {
    //     const isActive = panel.dataset.tcontent === tabId;
    //     panel.hidden = !isActive;
    //     panel.classList.toggle('is-active', isActive);

    //     if (isActive) {
    //       const swiper = swipers.get(panel);
    //       if (swiper) swiper.update();
    //     }
    //   });
    // }
	function setActive(tabId) {
	btns.forEach((btn) => {
		btn.classList.toggle('is-active', btn.dataset.tbtn === tabId);
	});

	panels.forEach((panel) => {
		const isActive = panel.dataset.tcontent === tabId;

		if (isActive) {
		panel.hidden = false;                 // сначала показать
		requestAnimationFrame(() => {
			panel.classList.add('is-active');   // потом запустить fade-in
		});

		const swiper = swipers.get(panel);
		if (swiper) swiper.update();
		} else {
		panel.classList.remove('is-active');  // fade-out
		panel.hidden = true;                  // сразу скрываем (без анимации выхода)
		}
	});
	}
    // click on tabs
    root.querySelector('.tabs-nav')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.tabs-nav-btn[data-tbtn]');
      if (!btn) return;
      setActive(btn.dataset.tbtn);
    });

    // init: первый таб
    if (btns[0]) {
      setActive(btns[0].dataset.tbtn);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTabsSliders();
});