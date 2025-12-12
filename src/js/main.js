 document.addEventListener('DOMContentLoaded', function () {
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
    window.addEventListener('DOMContentLoaded', () => {
      updateSubmenuPosition();
      requestAnimationFrame(updateSubmenuPosition);
    });

    window.addEventListener('load', updateSubmenuPosition);

    window.addEventListener('resize', updateSubmenuPosition);
    
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
    })

 
});
