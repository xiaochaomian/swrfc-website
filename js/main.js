// SWR FC — Small enhancements
(function () {
  'use strict';

  // Mobile menu toggle
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close mobile menu when a link is clicked
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Highlight active nav item by current path
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav a').forEach(function (a) {
    try {
      var href = new URL(a.href, window.location.origin).pathname.replace(/\/$/, '') || '/';
      if (href === path) a.classList.add('active');
    } catch (e) {}
  });

  // Contact form — opens user's mail client (works without a backend on GoDaddy)
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get('name') || '').toString().trim();
      var email = (data.get('email') || '').toString().trim();
      var phone = (data.get('phone') || '').toString().trim();
      var subject = (data.get('subject') || 'SWRFC Website Inquiry').toString().trim();
      var message = (data.get('message') || '').toString().trim();

      var body = [
        'Name: ' + name,
        'Email: ' + email,
        'Phone: ' + phone,
        '',
        message
      ].join('\n');

      var href = 'mailto:info@swrfc.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
      window.location.href = href;
    });
  }
})();
