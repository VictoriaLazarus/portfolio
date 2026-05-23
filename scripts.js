/* ── CUSTOM CURSOR (desktop only) ── */
const cursorDot = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');
if (cursorDot && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', e => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
  });
}

/* ── HAMBURGER / MOBILE MENU ── */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileOverlay = document.querySelector('.mobile-overlay');

function openMenu() {
  hamburger.classList.add('open');
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
});
mobileOverlay.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', closeMenu));

/* ── TYPING — MULTILINGUAL GREETING ── */
const greetings = ['Hi', 'Bonjour', 'Hola', 'Ciao', 'Olá', 'こんにちは', 'Hallo', 'مرحبا', 'Привет', 'Nǐ hǎo'];
const typingEl = document.querySelector('.typing-text');
let gi = 0, ci = 2, deleting = false;

function type() {
  const word = greetings[gi];
  if (!deleting) {
    ci++;
    typingEl.textContent = word.slice(0, ci);
    if (ci === word.length) {
      deleting = true;
      setTimeout(type, 2000);
      return;
    }
    setTimeout(type, 120);
  } else {
    ci--;
    typingEl.textContent = word.slice(0, ci);
    if (ci === 0) {
      deleting = false;
      gi = (gi + 1) % greetings.length;
      setTimeout(type, 350);
      return;
    }
    setTimeout(type, 70);
  }
}
if (typingEl) setTimeout(type, 2200);

/* ── DISCIPLINE ROTATOR ── */
const disciplines = ['Technical Writer', 'Documentation Engineer', 'Content Strategist', 'API Writer', 'Knowledge Architect'];
const disciplineEl = document.querySelector('.discipline-word');
let di = 0;
if (disciplineEl) {
  setInterval(() => {
    disciplineEl.style.opacity = '0';
    disciplineEl.style.transform = 'translateY(-8px)';
    setTimeout(() => {
      di = (di + 1) % disciplines.length;
      disciplineEl.textContent = disciplines[di];
      disciplineEl.style.transform = 'translateY(8px)';
      disciplineEl.style.opacity = '0';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          disciplineEl.style.opacity = '1';
          disciplineEl.style.transform = 'translateY(0)';
        });
      });
    }, 300);
  }, 2800);
}

/* ── SCROLL FADE-UP ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ── ACTIVE NAV HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
}, { passive: true });
