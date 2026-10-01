(function () {
  // --- menu ---
  var body = document.getElementById('menuBody');
  var tabs = document.querySelectorAll('.tab');
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function fmt(p) { return p.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽'; }
  function render(key) {
    body.innerHTML = window.PLOV_MENU[key].map(function (g) {
      return '<section class="mgroup"><h3>' + esc(g.title) + '</h3><ul>' +
        g.items.map(function (it) {
          return '<li><div class="mrow"><span>' + esc(it[0]) + '</span><i aria-hidden="true"></i><b>' + fmt(it[1]) + '</b></div>' +
            (it[2] ? '<small>' + esc(it[2]) + '</small>' : '') + '</li>';
        }).join('') + '</ul></section>';
    }).join('');
  }
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.classList.remove('is-active'); x.setAttribute('aria-selected', 'false'); });
      t.classList.add('is-active'); t.setAttribute('aria-selected', 'true');
      render(t.dataset.tab);
    });
  });
  render('hot');

  // --- header ---
  var top = document.querySelector('.top');
  var onScroll = function () { top.classList.toggle('is-solid', window.scrollY > 20); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  var burger = document.getElementById('burger'), nav = document.getElementById('nav');
  burger.addEventListener('click', function () {
    var o = document.body.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', o);
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { document.body.classList.remove('nav-open'); burger.setAttribute('aria-expanded', 'false'); }
  });

  // --- reveal ---
  document.documentElement.classList.add('js');
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('is-in'); io.unobserve(x.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('is-in'); });
  }
})();
