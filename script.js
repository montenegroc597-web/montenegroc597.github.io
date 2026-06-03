// Hero mockup auto-rotator
(function () {
  const imgs = document.querySelectorAll('.rotator-img');
  const dots = document.querySelectorAll('.rot-dot');
  if (!imgs.length) return;

  let current = 0;
  let timer;

  function goTo(next) {
    if (next === current) return;
    imgs[current].classList.remove('active');
    imgs[current].classList.add('exit');
    dots[current].classList.remove('active');

    const prev = current;
    current = next;

    imgs[current].classList.add('active');
    dots[current].classList.add('active');

    // Clean up exit class after transition
    setTimeout(() => imgs[prev].classList.remove('exit'), 700);
  }

  function advance() {
    goTo((current + 1) % imgs.length);
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(advance, 3800);
  }

  // Manual dot click pauses then resumes
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      goTo(Number(dot.dataset.idx));
      startTimer();
    });
  });

  startTimer();
})();

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navInner = document.querySelector('.nav-inner');

toggle?.addEventListener('click', () => {
  const open = navInner.classList.toggle('menu-open');
  toggle.setAttribute('aria-expanded', String(open));
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navInner.classList.remove('menu-open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

// How it works tabs
const tabs = document.querySelectorAll('.how-tab');
const panels = document.querySelectorAll('.how-panel');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    tabs.forEach((t) => t.classList.remove('active'));
    panels.forEach((p) => p.classList.remove('active'));

    tab.classList.add('active');
    const panel = document.getElementById(`tab-${target}`);
    if (panel) panel.classList.add('active');
  });
});

// Consumidor — sub-mode switcher (Subir archivo / Catálogo)
(function () {
  const subOpts = document.querySelectorAll('.sub-opt');
  const mainImg = document.getElementById('consumidor-img');
  const switcher = document.getElementById('img-switcher');
  const swBtns = switcher ? switcher.querySelectorAll('.img-sw-btn') : [];
  const dynEls = document.querySelectorAll('.step-dyn');

  const modeData = {
    subir: {
      mainSrc: 'Home subirarchivo.png',
      mainAlt: 'Pantalla de subida de archivo — Consumidor en Dreaming',
      showSwitcher: false,
    },
    catalogo: {
      mainSrc: 'HomeConsumidor.png',
      mainAlt: 'Catálogo de productos — Consumidor en Dreaming',
      showSwitcher: true,
    },
  };

  function swapMainImg(src, alt) {
    if (!mainImg) return;
    mainImg.style.opacity = '0';
    mainImg.style.transform = 'translateY(8px)';
    setTimeout(() => {
      mainImg.src = src;
      mainImg.alt = alt;
      mainImg.style.opacity = '1';
      mainImg.style.transform = 'translateY(0)';
    }, 190);
  }

  function applyMode(mode) {
    const data = modeData[mode];
    if (!data) return;

    // Swap step text
    dynEls.forEach((el) => {
      const next = el.dataset[mode];
      if (!next) return;
      el.style.opacity = '0';
      setTimeout(() => {
        el.textContent = next;
        el.style.opacity = '1';
      }, 160);
    });

    // Swap main image
    swapMainImg(data.mainSrc, data.mainAlt);

    // Show/hide mini-switcher
    if (switcher) {
      if (data.showSwitcher) {
        switcher.classList.remove('hidden');
        // Reset switcher to first screen
        swBtns.forEach((b) => b.classList.remove('active'));
        if (swBtns[0]) swBtns[0].classList.add('active');
      } else {
        switcher.classList.add('hidden');
      }
    }
  }

  // Sub-option click
  subOpts.forEach((btn) => {
    btn.addEventListener('click', () => {
      subOpts.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      applyMode(btn.dataset.sub);
    });
  });

  // Mini-switcher thumbnails (catálogo mode)
  const screenData = {
    home: { src: 'HomeConsumidor.png', alt: 'Catálogo de productos — Consumidor en Dreaming' },
    custom: { src: 'CustomizacionConsumidor.png', alt: 'Pantalla de personalización — Consumidor en Dreaming' },
  };

  swBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      swBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const d = screenData[btn.dataset.screen];
      if (d) swapMainImg(d.src, d.alt);
    });
  });

  // Add opacity transition to step-dyn elements
  dynEls.forEach((el) => {
    el.style.transition = 'opacity 0.16s ease';
  });
})();

// Contact form — basic feedback
const form = document.getElementById('contacto-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Mensaje enviado';
  btn.style.background = '#22C55E';
  btn.disabled = true;
});
