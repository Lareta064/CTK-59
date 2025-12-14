
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
        document.querySelectorAll('.menu-item-has-submenu').forEach(item => {
          item.classList.remove('menu-item-has-submenu--open');
        });

        document.querySelectorAll('.sub-menu-wrapper').forEach(wrapper => {
          wrapper.classList.remove('is-open');
          wrapper.style.height = ''; // очищаем inline-height, десктопу это важно
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

      function toggleSubmenu(item, wrapper) {
        const vw = document.documentElement.clientWidth;
        if (vw >= BREAKPOINT) return; // на десктопе управляем hover'ом

        const isOpen = wrapper.classList.contains('is-open');

        if (isOpen) {
          // закрываем только этот
          closeSubmenu(wrapper);
          item.classList.remove('menu-item-has-submenu--open');
        } else {
          // сначала закрываем остальные
          closeAllMobileSubmenus();
          // открываем текущий
          openSubmenu(wrapper);
          item.classList.add('menu-item-has-submenu--open');
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

            toggleSubmenu(item, wrapper); // ← передаём item
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
        bodyEl.classList.remove('lock');
        if (document.documentElement.clientWidth >= BREAKPOINT) {
          closeAllMobileSubmenus();
        }
      });
    
    //swipers
    let promoSwiper = new Swiper('.promo-swiper',{
      spaceBetween:16,
      speed:1000,
       loop:true,
       navigation: {
        nextEl: ".promo-swiper-next",
        prevEl: ".promo-swiper-prev",
      },
      //  autoplay: {
      //   delay: 3500,
      //   disableOnInteraction: false,
      // },
    });
     let singleSwiper = new Swiper('.single-swiper',{
      spaceBetween:16,
      speed:700,
       loop:true,
       navigation: {
        nextEl: ".single-swiper-next",
        prevEl: ".single-swiper-prev",
      },
       autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
    });
    let apartmentSwiper = new Swiper('.apartment-layouts-swiper',{
      spaceBetween:20,
      slidesPerView: 'auto',
      speed:700,
       loop:true,
       navigation: {
        nextEl: ".apartment-swiper-next",
        prevEl: ".apartment-swiper-prev",
      },
      breakpoints: {
        1365: {
          
          spaceBetween: 30,
        },
        1920: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });
    let gallerySwiper = new Swiper('.gallery-swiper',{
      spaceBetween:20,
      slidesPerView: 'auto',
      speed:700,
       loop:true,
       navigation: {
        nextEl: ".gallery-swiper-next",
        prevEl: ".gallery-swiper-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
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
  //Fancybox
  Fancybox.bind("[data-fancybox]", {
    Thumbs: false,

    Carousel: {
      Toolbar: {
        display: {
          left: [],
          middle: [],      // важно: пустой массив
          right: ["close"],
        },
      },
    },

    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ["close"],
      },
    },
  });
  	//MASK PHONE
		const PREFIX = "+7(";
		function formatPhoneFromDigits(digits) {
		digits = digits.replace(/\D/g, "").slice(0, 11); // максимум 11 цифр (включая 7)
		let out = "+7(";
		if (digits.length > 1) out += digits.slice(1, 4);
		if (digits.length >= 4) out += ")" + digits.slice(4, 7);
		if (digits.length >= 7) out += "-" + digits.slice(7, 9);
		if (digits.length >= 9) out += "-" + digits.slice(9, 11);
		return out;
		}

		function getDigitsFromMasked(v) {
		return v.replace(/\D/g, "");
		}

		function setCaret(el, pos) {
		requestAnimationFrame(() => el.setSelectionRange(pos, pos));
		}

		document.querySelectorAll("input.phone").forEach(input => {
		// Автовставка префикса
		input.addEventListener("focus", () => {
			if (!input.value) {
			input.value = PREFIX;
			setCaret(input, PREFIX.length);
			}
		});

		// Блокируем перемещение курсора левее префикса
		input.addEventListener("click", () => {
			if (input.selectionStart < PREFIX.length) setCaret(input, PREFIX.length);
		});

		// На мобилках лучше перехватывать ввод до применения
		input.addEventListener("beforeinput", (e) => {
			// Разрешаем только цифры/удаление/вставку
			const allowed = ["insertText", "deleteContentBackward", "deleteContentForward", "insertFromPaste"];
			if (!allowed.includes(e.inputType)) return;

			const selStart = input.selectionStart ?? input.value.length;
			const selEnd = input.selectionEnd ?? selStart;

			// Не даём ломать фиксированный префикс
			if (selStart < PREFIX.length && e.inputType.startsWith("delete")) {
			e.preventDefault();
			return;
			}

			const currentDigits = getDigitsFromMasked(input.value);
			// Позицию в «чистых» цифрах вычислим грубо по количеству цифр слева от курсора
			const digitsLeft = getDigitsFromMasked(input.value.slice(0, selStart)).length;
			const digitsRight = getDigitsFromMasked(input.value.slice(selEnd)).length;

			let newDigitsLeft = currentDigits.slice(0, digitsLeft);
			let newDigitsRight = currentDigits.slice(currentDigits.length - digitsRight);

			if (e.inputType === "insertText") {
			// Разрешаем только цифры
			if (!/^\d$/.test(e.data)) { e.preventDefault(); return; }
			// Лимит 11 цифр
			if ((newDigitsLeft + e.data + newDigitsRight).length > 11) { e.preventDefault(); return; }
			newDigitsLeft += e.data;
			e.preventDefault();
			} else if (e.inputType === "insertFromPaste") {
			const pasted = (e.dataTransfer?.getData("text") ?? "").replace(/\D/g, "");
			if (!pasted) { e.preventDefault(); return; }
			const room = 11 - (newDigitsLeft + newDigitsRight).length;
			newDigitsLeft += pasted.slice(0, Math.max(0, room));
			e.preventDefault();
			} else if (e.inputType === "deleteContentBackward") {
			if (newDigitsLeft.length > 0) newDigitsLeft = newDigitsLeft.slice(0, -1);
			e.preventDefault();
			} else if (e.inputType === "deleteContentForward") {
			if (newDigitsRight.length > 0) newDigitsRight = newDigitsRight.slice(1);
			e.preventDefault();
			}

			const allDigits = newDigitsLeft + newDigitsRight;
			const masked = formatPhoneFromDigits(allDigits);
			input.value = masked;

			// Ставим каретку после той цифры, которую только что вводили/удаляли
			// Находим целевую позицию по количеству цифр слева
			const targetDigitsLeft = newDigitsLeft.length;
			// Пробегаем по маске, пока не наберём targetDigitsLeft цифр
			let caret = 0, count = 0;
			while (caret < masked.length && count < targetDigitsLeft) {
			if (/\d/.test(masked[caret])) count++;
			caret++;
			}
			// Не даём залезть в префикс
			if (caret < PREFIX.length) caret = PREFIX.length;
			setCaret(input, caret);
		});

		// На всякий случай — финальный форматтер (если что-то проскочит)
		input.addEventListener("input", () => {
			const masked = formatPhoneFromDigits(getDigitsFromMasked(input.value));
			if (masked !== input.value) input.value = masked;
		});
		});
});

    