const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const cursorOrb = document.querySelector('.cursor-orb');
const revealItems = document.querySelectorAll('.reveal');

navToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav?.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    siteNav.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

window.addEventListener('pointermove', (event) => {
  if (!cursorOrb || window.matchMedia('(max-width: 560px)').matches) {
    return;
  }

  cursorOrb.style.opacity = '1';
  cursorOrb.style.transform = `translate3d(${event.clientX - 128}px, ${event.clientY - 128}px, 0)`;
});

window.addEventListener('pointerleave', () => {
  if (cursorOrb) {
    cursorOrb.style.opacity = '0';
  }
});
