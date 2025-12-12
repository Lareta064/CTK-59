
document.addEventListener('DOMContentLoaded', function () {
      const bodyEl = document.body;
      const BREAKPOINT = 1280;

      /* === Десктоп: позиционируем сабменю под хедер === */
      function updateSubmenuPosition() {
        const header = document.querySelector('.header');
        const nav = document.querySelector('.navbar-nav');
        const wrappers = document.querySelectorAll('.sub-menu-wrapper');

        if (!header || !nav || !wrappers.length) return;

        const vw = document.documentElement.clientWidth;

        // Мобилкам ничего не позиционируем, только очищаем десктопные стили
        if (vw < BREAKPOINT) {
          wrappers.forEach(wrapper => {
            wrapper.style.top = '';
            wrapper.style.paddingLeft = '';
            wrapper.style.paddingRight = '';
          });
          return;
        }

        const navRect = nav.getBoundingClientRect();
        const headerRect = header.getBoundingClientRect();

        wrappers.forEach(wrapper => {
          wrapper.style.top = headerRect.bottom + 'px';

          const leftPadding = navRect.left;
          const rightPadding = vw - (navRect.right + 100); // твой доп. отступ справа

          wrapper.style.paddingLeft = leftPadding + 'px';
          wrapper.style.paddingRight = rightPadding + 'px';
        });
      }
      function closeAllMobileSubmenus() {
        document.querySelectorAll('.sub-menu-wrapper').forEach(wrapper => {
          wrapper.classList.remove('is-open');
          wrapper.style.height = ''; // вместо '0px'
        });
      }
      /* === Мобилка: аккордеон для подменю === */

      function openSubmenu(wrapper) {
        // сначала сбрасываем height, чтобы scrollHeight был честный
        wrapper.style.height = 'auto';
        const fullHeight = wrapper.scrollHeight;

        wrapper.style.height = '0px'; // откат назад
        wrapper.offsetHeight; // форсим reflow

        wrapper.classList.add('is-open');
        wrapper.style.height = fullHeight + 'px';

        // после анимации зафиксируем auto
        const onTransitionEnd = (e) => {
          if (e.propertyName !== 'height') return;
          wrapper.style.height = 'auto';
          wrapper.removeEventListener('transitionend', onTransitionEnd);
        };
        wrapper.addEventListener('transitionend', onTransitionEnd);
      }

      function closeSubmenu(wrapper) {
        // если height был auto, временно фиксируем его в пикселях
        if (!wrapper.style.height || wrapper.style.height === 'auto') {
          wrapper.style.height = wrapper.scrollHeight + 'px';
          wrapper.offsetHeight; // reflow
        }

        wrapper.classList.remove('is-open');
        wrapper.style.height = '0px';
      }

      function toggleSubmenu(wrapper) {
        const vw = document.documentElement.clientWidth;
        if (vw >= BREAKPOINT) return; // на десктопе управляем hover'ом

        const isOpen = wrapper.classList.contains('is-open');
        if (isOpen) {
          closeSubmenu(wrapper);
        } else {
          openSubmenu(wrapper);
        }
      }

      function initMobileSubmenus() {
        const items = document.querySelectorAll('.menu-item-has-submenu');

        items.forEach(item => {
          item.addEventListener('click', function (e) {
            const vw = document.documentElement.clientWidth;
            if (vw >= BREAKPOINT) return; // десктоп — выходим

            const link = e.target.closest('a');
            const isInsideThisItem = link && link.closest('.menu-item-has-submenu') === item;

            if (isInsideThisItem) {
              // Клик по <a> (и по .sub-menu-link тоже) — даём ссылке работать
              return;
            }

            // Клик по правой части li — раскрываем/закрываем
            e.preventDefault();

            const wrapper = item.querySelector('.sub-menu-wrapper');
            if (!wrapper) return;

            toggleSubmenu(wrapper);
          });
        });
      }

      // Инициализация
      updateSubmenuPosition();
      initMobileSubmenus();
      requestAnimationFrame(updateSubmenuPosition);
      window.addEventListener('load', updateSubmenuPosition);
      window.addEventListener('resize', updateSubmenuPosition);
      window.addEventListener('resize', () => {
        updateSubmenuPosition();

        if (document.documentElement.clientWidth >= BREAKPOINT) {
          closeAllMobileSubmenus();
        }
      });



    
    //swipers
    let promoSwiper = new Swiper('.promo-swiper',{
      spaceBetween:16,
      speed:1300,
       loop:true,
       navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
       autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });

    /**HEADER MENU MOBILE */
    const menuButtons = document.querySelectorAll('.menu-toggle');
    const mobileMenu = document.querySelector('#header-menu');
    if(mobileMenu){
      function closeMobileMenu(){
        menuButton.classList.remove('active');
        mobileMenu.classList.remove('active');
        bodyEl.classList.remove('lock');
      }
      menuButtons.forEach((menuButton)=>{
        menuButton.addEventListener('click', ()=> {
      
          if( menuButton.classList.contains('active')){
              menuButton.classList.remove('active');
              mobileMenu.classList.remove('active');
              bodyEl.classList.remove('lock');
            
          }else{
            menuButton.classList.add('active');
            mobileMenu.classList.add('active');
            bodyEl.classList.add('lock');
          }
      });
    });
  }
});
