(() => {
  const wrappers = document.querySelectorAll('.acordion-wrapper');
  if (!wrappers.length) return;

 
  const ro = new ResizeObserver(entries => {
    for (const { target } of entries) {
      const item = target.closest('.acordion-item');
      if (item && item.classList.contains('acordion-item--active')) {
        target.style.maxHeight = target.scrollHeight + 'px';
      }
    }
  });

  function getBody(item){
  
    return item?.querySelector('.acordion-button + .acordion-body') || null;
  }

  function isButton(target, wrapper){
    const btn = target.closest('.acordion-button');
    return btn && wrapper.contains(btn) ? btn : null;
  }

  function openItem(item){
    const body = getBody(item);
    if (!body) return;
    item.classList.add('acordion-item--active');
    body.style.maxHeight = body.scrollHeight + 'px';
  }

  function closeItem(item){
    const body = getBody(item);
    if (!body) return;
    item.classList.remove('acordion-item--active');
    body.style.maxHeight = '0';
  }

  function initWrapper(wrapper){
   
    wrapper.querySelectorAll('.acordion-body').forEach(b => ro.observe(b));

   
    wrapper.querySelectorAll('.acordion-item.acordion-item--active').forEach(item => {
      const body = getBody(item);
      if (body) body.style.maxHeight = body.scrollHeight + 'px';
    });

 
    wrapper.addEventListener('click', (e) => {
      const btn = isButton(e.target, wrapper);
      if (!btn) return;

      const item = btn.closest('.acordion-item');
      const mode = (wrapper.dataset.mode || 'multiple').toLowerCase();

      const isActive = item.classList.contains('acordion-item--active');

      if (mode === 'single') {
       
        const prev = wrapper.querySelector('.acordion-item--active');
        if (prev && prev !== item) closeItem(prev);

        if (isActive) {
          closeItem(item); 
        } else {
          openItem(item); 
        }
      } else {
       
        isActive ? closeItem(item) : openItem(item);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    wrappers.forEach(initWrapper);
  });


  window.addEventListener('load', () => {
    wrappers.forEach(wrapper => {
      wrapper.querySelectorAll('.acordion-item.acordion-item--active').forEach(item => {
        const body = getBody(item);
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      });
    });
  });
})();