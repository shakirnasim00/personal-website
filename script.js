(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Theme toggle: respects system preference until the visitor picks one.
  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.dataset.theme ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // Mobile menu
  var nav = document.querySelector('.nav');
  var menuBtn = document.querySelector('.nav__menu');
  if (nav && menuBtn) {
    var setMenu = function (open) {
      nav.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    menuBtn.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });
    nav.querySelectorAll('.nav__links a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !nav.contains(e.target)) setMenu(false);
    });
    window.matchMedia('(min-width: 641px)').addEventListener('change', function (e) {
      if (e.matches) setMenu(false);
    });
  }

  // Footer year
  var year = document.querySelector('.year');
  if (year) year.textContent = new Date().getFullYear();

  // Live local clock
  var clock = document.querySelector('.clock');
  if (clock) {
    var fmt;
    try {
      fmt = new Intl.DateTimeFormat([], {
        hour: '2-digit', minute: '2-digit', timeZone: clock.dataset.tz || undefined
      });
    } catch (e) {
      fmt = new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit' });
    }
    var tick = function () { clock.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 15000);
  }

  // Reveal-on-scroll, with a small stagger for items revealed together
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      var i = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.setProperty('--delay', (i++ * 0.08) + 's');
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Highlight the nav link for the section in view
  var links = Array.prototype.filter.call(document.querySelectorAll('.nav__links a'), function (a) {
    return a.getAttribute('href').charAt(0) === '#';
  });
  var sections = links.map(function (a) {
    return document.querySelector(a.getAttribute('href'));
  });
  if ('IntersectionObserver' in window) {
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a, idx) {
          a.classList.toggle('is-active', sections[idx] === entry.target);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) navIo.observe(s); });
  }
})();
