// Custom cursor functionality
function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });
  
  function animateCursor() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  
  // Cursor interaction with links and buttons
  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform += ' scale(2)';
      ring.style.opacity = '0';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.opacity = '1';
    });
  });
}

// Scroll reveal animation
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  reveals.forEach((el) => io.observe(el));
}

function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
}

// Visitor counter (increments once per day per browser profile)
function initVisitorCounter() {
  const visitorText = document.getElementById('visitorCountText');
  if (!visitorText) {
    return;
  }

  const countKey = 'portfolioVisitorCount';
  const lastVisitKey = 'portfolioLastVisitDate';
  const today = new Date().toISOString().slice(0, 10);
  const lastVisit = localStorage.getItem(lastVisitKey);
  let count = parseInt(localStorage.getItem(countKey) || '0', 10);

  if (lastVisit !== today) {
    count += 1;
    localStorage.setItem(countKey, String(count));
    localStorage.setItem(lastVisitKey, today);
  }

  if (!count || Number.isNaN(count)) {
    count = 1;
    localStorage.setItem(countKey, '1');
    localStorage.setItem(lastVisitKey, today);
  }

  visitorText.textContent = `You are the ${getOrdinal(count)} visitor`;
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

// Navbar-only theme toggle
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) {
    return;
  }

  const key = 'portfolioTheme';
  const saved = localStorage.getItem(key);
  if (saved === 'light') {
    document.body.classList.add('light-mode');
    toggleBtn.setAttribute('aria-pressed', 'true');
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    toggleBtn.setAttribute('aria-pressed', String(isLight));
    localStorage.setItem(key, isLight ? 'light' : 'dark');
  });
}

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initScrollReveal();
  initVisitorCounter();
  initSmoothScroll();
  initThemeToggle();
});
