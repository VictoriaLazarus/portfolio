/* ── CUSTOM CURSOR ── */
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');
if (cursor && cursorRing) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function animCursor() {
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
    cursorRing.style.left = rx + 'px'; cursorRing.style.top = ry + 'px';
    requestAnimationFrame(animCursor);
  })();
}

/* ── HAMBURGER / MOBILE MENU ── */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileOverlay = document.querySelector('.mobile-overlay');

function toggleMenu(open) {
  hamburger.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
  mobileOverlay.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

hamburger.addEventListener('click', () => toggleMenu(!mobileMenu.classList.contains('open')));
mobileOverlay.addEventListener('click', () => toggleMenu(false));
document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

/* ── TYPING ANIMATION — GREETINGS ── */
const greetings = [
  { text: 'Hi', lang: 'English' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'Hola', lang: 'Spanish' },
  { text: 'Ciao', lang: 'Italian' },
  { text: 'Olá', lang: 'Portuguese' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: 'Hallo', lang: 'German' },
  { text: 'مرحبا', lang: 'Arabic' },
  { text: 'Привет', lang: 'Russian' },
  { text: 'Nǐ hǎo', lang: 'Chinese' },
];
const typingEl = document.querySelector('.typing-text');
const cursorEl = document.querySelector('.cursor-blink');
let gi = 0, ci = 0, deleting = false;

function typeGreeting() {
  const word = greetings[gi].text;
  if (!deleting) {
    typingEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(typeGreeting, 1600); return; }
    setTimeout(typeGreeting, 110);
  } else {
    typingEl.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; gi = (gi + 1) % greetings.length; setTimeout(typeGreeting, 300); return; }
    setTimeout(typeGreeting, 60);
  }
}
if (typingEl) typeGreeting();

/* ── DISCIPLINE ROTATOR ── */
const disciplines = ['Technical Writer', 'Documentation Engineer', 'Content Strategist', 'API Writer', 'Knowledge Architect'];
const disciplineEl = document.querySelector('.discipline-word');
let di = 0;
if (disciplineEl) {
  disciplineEl.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
  setInterval(() => {
    disciplineEl.style.opacity = '0';
    disciplineEl.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      di = (di + 1) % disciplines.length;
      disciplineEl.textContent = disciplines[di];
      disciplineEl.style.opacity = '0';
      disciplineEl.style.transform = 'translateY(10px)';
      setTimeout(() => {
        disciplineEl.style.opacity = '1';
        disciplineEl.style.transform = 'translateY(0)';
      }, 30);
    }, 380);
  }, 2800);
}

/* ── SCROLL FADE-UP ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ── ACTIVE NAV ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
}, { passive: true });
