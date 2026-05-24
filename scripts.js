document.addEventListener('DOMContentLoaded', function() {

  /* ── HAMBURGER MENU ── */
  var btn = document.getElementById('hamburgerBtn');
  var menu = document.getElementById('mobileMenu');
  var overlay = document.getElementById('mobileOverlay');
  var isOpen = false;

  function openMenu() {
    isOpen = true;
    menu.classList.add('open');
    overlay.classList.add('open');
    btn.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    isOpen = false;
    menu.classList.remove('open');
    overlay.classList.remove('open');
    btn.classList.remove('open');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    isOpen ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  document.querySelectorAll('.mobile-link').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  /* ── TYPING — MULTILINGUAL GREETING ── */
  var greetings = ['Hi','Bonjour','Hola','Ciao','Olá','こんにちは','Hallo','مرحبا','Привет','Nǐ hǎo'];
  var typingEl = document.querySelector('.typing-text');

  if (typingEl) {
    typingEl.textContent = 'Hi';
    var gi = 0, ci = 2, deleting = false;

    function type() {
      var word = greetings[gi];
      if (!deleting) {
        ci++;
        typingEl.textContent = word.slice(0, ci);
        if (ci >= word.length) {
          deleting = true;
          setTimeout(type, 2000);
          return;
        }
        setTimeout(type, 130);
      } else {
        ci--;
        typingEl.textContent = word.slice(0, ci);
        if (ci <= 0) {
          deleting = false;
          gi = (gi + 1) % greetings.length;
          setTimeout(type, 380);
          return;
        }
        setTimeout(type, 75);
      }
    }
    setTimeout(type, 2200);
  }

  /* ── DISCIPLINE ROTATOR ── */
  var disciplines = ['Technical Writer','Documentation Engineer','Content Strategist','API Writer','Knowledge Architect'];
  var disciplineEl = document.querySelector('.discipline-word');
  var di = 0;

  if (disciplineEl) {
    disciplineEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    setInterval(function() {
      disciplineEl.style.opacity = '0';
      disciplineEl.style.transform = 'translateY(-8px)';
      setTimeout(function() {
        di = (di + 1) % disciplines.length;
        disciplineEl.textContent = disciplines[di];
        disciplineEl.style.transform = 'translateY(8px)';
        requestAnimationFrame(function() {
          requestAnimationFrame(function() {
            disciplineEl.style.opacity = '1';
            disciplineEl.style.transform = 'translateY(0)';
          });
        });
      }, 320);
    }, 2800);
  }

  /* ── SCROLL FADE-UP ── */
  var fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.08 });
    fadeEls.forEach(function(el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function(el) { el.classList.add('visible'); });
  }

  /* ── CUSTOM CURSOR ── */
  var cursorDot = document.querySelector('.cursor');
  var cursorRing = document.querySelector('.cursor-ring');
  if (cursorDot && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', function(e) {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
      cursorRing.style.left = e.clientX + 'px';
      cursorRing.style.top = e.clientY + 'px';
    });
  }

});
