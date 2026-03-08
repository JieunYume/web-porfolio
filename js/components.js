(async function () {
  // 1. 컴포넌트 로드
  const placeholders = document.querySelectorAll('[data-component]');
  for (const el of placeholders) {
    const name = el.getAttribute('data-component');
    const res = await fetch(`components/${name}.html`);
    const html = await res.text();
    const temp = document.createElement('div');
    temp.innerHTML = html;
    el.replaceWith(...temp.childNodes);
  }

  // 2. 스크립트 순서대로 로드
  const scripts = [
    'js/jquery.min.js',
    'js/jquery-migrate-3.0.1.min.js',
    'js/popper.min.js',
    'js/bootstrap.min.js',
    'js/jquery.easing.1.3.js',
    'js/jquery.waypoints.min.js',
    'js/jquery.stellar.min.js',
    'js/owl.carousel.min.js',
    'js/jquery.magnific-popup.min.js',
    'js/aos.js',
    'js/jquery.animateNumber.min.js',
    'js/scrollax.min.js',
    'js/main.js',
  ];

  for (const src of scripts) {
    await new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });
  }
})();
