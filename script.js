(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const overlay  = document.getElementById('intro-overlay');
    const line     = document.getElementById('introLine');
    const letters  = document.querySelectorAll('.intro-name span');
    const sub      = document.getElementById('introSub');
    const capTop   = document.getElementById('curtainTop');
    const capBot   = document.getElementById('curtainBottom');
    const main     = document.getElementById('main-content');

    if (!overlay) return;

    // Step 1: draw line quickly
    setTimeout(() => {
      line.classList.add('expand');
    }, 60);

    // Step 2: reveal letters quickly, but smoothly
    setTimeout(() => {
      letters.forEach((l, i) => {
        setTimeout(() => l.classList.add('show'), i * 95);
      });
    }, 220);

    // Step 3: subtitle fades in
    setTimeout(() => {
      sub.classList.add('show');
    }, 1400);

    // Step 4: curtains open with a slower final reveal
    setTimeout(() => {
      capTop.classList.add('open');
      capBot.classList.add('open');
    }, 2500);

    // Step 5: remove overlay and show main (total intro: 4s)
    setTimeout(() => {
      overlay.style.display = 'none';
      main.style.opacity = '1';
      main.style.transition = 'opacity 1.5s ease';
      overlay.classList.add('done');
    }, 4000);
  });
})();

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
  }, { threshold: 0.12 });
  
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

function initGitHubCalendar() {
  const card = document.querySelector('.github-activity-card[data-github-user]');
  if (!card) {
    return;
  }

  const username = card.getAttribute('data-github-user');
  const totalText = document.getElementById('contribTotalText');
  const totalLine = document.getElementById('githubTotalLine');
  const monthRow = document.getElementById('githubMonthRow');
  const grid = document.getElementById('githubGrid');
  if (!username || !totalText || !totalLine || !monthRow || !grid) {
    return;
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const AUTO_REFRESH_MS = 5 * 60 * 1000;
  let renderToken = 0;

  function toDayKey(date) {
    return date.toISOString().slice(0, 10);
  }

  function atUtcMidnight(date) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  }

  function addUtcDays(date, days) {
    const next = new Date(date);
    next.setUTCDate(next.getUTCDate() + days);
    return next;
  }

  function getDayIndexMondayFirst(date) {
    const day = date.getUTCDay();
    return day === 0 ? 6 : day - 1;
  }

  function buildCalendar(contributionsMap) {
    const endDate = atUtcMidnight(new Date());
    const startDate = addUtcDays(endDate, -364);
    const leadingCells = getDayIndexMondayFirst(startDate);
    const totalDays = 365;
    const totalWeeks = Math.ceil((leadingCells + totalDays) / 7);
    const trailingCells = totalWeeks * 7 - (leadingCells + totalDays);

    monthRow.style.setProperty('--gh-weeks', String(totalWeeks));
    grid.style.setProperty('--gh-weeks', String(totalWeeks));
    monthRow.innerHTML = '';
    grid.innerHTML = '';

    const labeledMonths = new Set();
    for (let dayOffset = 0; dayOffset < totalDays; dayOffset += 1) {
      const date = addUtcDays(startDate, dayOffset);
      const monthKey = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
      const isMonthAnchor = dayOffset === 0 || date.getUTCDate() === 1;
      if (isMonthAnchor && !labeledMonths.has(monthKey)) {
        const weekIndex = Math.floor((leadingCells + dayOffset) / 7);
        const marker = document.createElement('span');
        marker.textContent = monthNames[date.getUTCMonth()];
        marker.style.gridColumn = `${weekIndex + 1} / span 4`;
        monthRow.appendChild(marker);
        labeledMonths.add(monthKey);
      }
    }

    for (let i = 0; i < leadingCells; i += 1) {
      const emptyCell = document.createElement('span');
      emptyCell.className = 'gh-day empty';
      grid.appendChild(emptyCell);
    }

    let totalContributions = 0;
    for (let dayOffset = 0; dayOffset < totalDays; dayOffset += 1) {
      const date = addUtcDays(startDate, dayOffset);
      const key = toDayKey(date);
      const entry = contributionsMap.get(key) || { count: 0, level: 0 };
      const level = Number.isFinite(entry.level) ? Math.max(0, Math.min(4, entry.level)) : 0;
      const count = Number.isFinite(entry.count) ? entry.count : 0;

      const dayCell = document.createElement('span');
      dayCell.className = 'gh-day';
      dayCell.setAttribute('data-level', String(level));
      dayCell.title = `${key}: ${count} contribution${count === 1 ? '' : 's'}`;
      grid.appendChild(dayCell);
      totalContributions += count;
    }

    for (let i = 0; i < trailingCells; i += 1) {
      const emptyCell = document.createElement('span');
      emptyCell.className = 'gh-day empty';
      grid.appendChild(emptyCell);
    }

    totalText.textContent = `${totalContributions} contributions in the last year`;
    totalLine.textContent = 'Learn how we count contributions';
  }

  async function renderLastYear() {
    const token = ++renderToken;
    totalText.textContent = 'Loading contributions...';
    totalLine.textContent = 'Total: loading...';

    try {
      const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
      if (!response.ok) {
        throw new Error('contribution data unavailable');
      }

      const data = await response.json();
      if (token !== renderToken) {
        return;
      }
      const list = Array.isArray(data.contributions) ? data.contributions : [];
      const map = new Map();
      list.forEach((item) => {
        if (item && item.date) {
          map.set(item.date, {
            count: Number(item.count) || 0,
            level: Number(item.level) || 0,
          });
        }
      });

      buildCalendar(map);
    } catch (error) {
      monthRow.innerHTML = '';
      grid.innerHTML = '';
      totalText.textContent = 'Unable to load live GitHub contributions right now';
      totalLine.textContent = `Visit github.com/${username} to view activity.`;
    }
  }

  async function refreshLastYear() {
    await renderLastYear();
  }

  function scheduleMidnightRefresh() {
    const now = new Date();
    const next = new Date(now);
    next.setHours(24, 0, 15, 0);
    const waitMs = Math.max(1000, next.getTime() - now.getTime());

    setTimeout(async () => {
      await refreshLastYear();
      scheduleMidnightRefresh();
    }, waitMs);
  }

  refreshLastYear();

  setInterval(() => {
    if (document.visibilityState === 'visible') {
      refreshLastYear();
    }
  }, AUTO_REFRESH_MS);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      refreshLastYear();
    }
  });

  scheduleMidnightRefresh();
}

function initWhatsAppQuickMessage() {
  const card = document.querySelector('.whatsapp-quick-card');
  if (!card) {
    return;
  }

  const rawNumber = (card.getAttribute('data-wa-number') || '').replace(/\D/g, '');
  if (!rawNumber) {
    return;
  }

  const fullNumber = rawNumber.length === 10 ? `91${rawNumber}` : rawNumber;

  function openWhatsApp(message) {
    const text = (message || '').trim();
    if (!text) {
      return;
    }
    const url = `https://wa.me/${fullNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  card.querySelectorAll('[data-wa-message]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openWhatsApp(btn.getAttribute('data-wa-message') || btn.textContent);
    });
  });

  const composeForm = card.querySelector('#waComposeForm');
  const composeInput = card.querySelector('#waCustomMessage');

  if (composeForm && composeInput) {
    composeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      openWhatsApp(composeInput.value);
      composeInput.value = '';
    });
  }
}

// Navbar-only theme toggle
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn || toggleBtn.dataset.themeManaged === 'true') {
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

function parseHSL(hslStr) {
  const match = String(hslStr || '').match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) {
    return { h: 40, s: 80, l: 80 };
  }
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
  const vars = {};
  for (let i = 0; i < opacities.length; i += 1) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }
  return vars;
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors) {
  const palette = Array.isArray(colors) && colors.length > 0 ? colors : ['#c084fc', '#f472b6', '#38bdf8'];
  const vars = {};
  for (let i = 0; i < 7; i += 1) {
    const color = palette[Math.min(COLOR_MAP[i], palette.length - 1)];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${color} 0px, transparent 50%)`;
  }
  vars['--gradient-base'] = `linear-gradient(${palette[0]} 0 100%)`;
  return vars;
}

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

function easeInCubic(x) {
  return x * x * x;
}

function animateValue({
  start = 0,
  end = 100,
  duration = 1000,
  delay = 0,
  ease = easeOutCubic,
  onUpdate,
  onEnd,
}) {
  const t0 = performance.now() + delay;
  function tick() {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) {
      requestAnimationFrame(tick);
    } else if (typeof onEnd === 'function') {
      onEnd();
    }
  }
  setTimeout(() => requestAnimationFrame(tick), delay);
}

function applyStyles(el, styleVars) {
  Object.entries(styleVars).forEach(([key, value]) => {
    el.style.setProperty(key, String(value));
  });
}

function setupBorderGlowCard(target, options = {}) {
  if (!target || target.closest('.border-glow-card')) {
    return;
  }

  const computed = window.getComputedStyle(target);
  const backgroundColor = options.backgroundColor || computed.backgroundColor || '#120F17';
  const radius = Number.isFinite(options.borderRadius)
    ? options.borderRadius
    : (parseFloat(computed.borderRadius) || 0);

  const wrapper = document.createElement('div');
  wrapper.className = `border-glow-card ${options.className || ''}`.trim();

  const edgeLight = document.createElement('span');
  edgeLight.className = 'edge-light';

  const inner = document.createElement('div');
  inner.className = 'border-glow-inner';

  target.parentNode.insertBefore(wrapper, target);
  inner.appendChild(target);
  wrapper.append(edgeLight, inner);

  const baseVars = {
    '--card-bg': backgroundColor,
    '--edge-sensitivity': options.edgeSensitivity ?? 30,
    '--border-radius': `${radius}px`,
    '--glow-padding': `${options.glowRadius ?? 40}px`,
    '--cone-spread': options.coneSpread ?? 25,
    '--fill-opacity': options.fillOpacity ?? 0.5,
  };
  applyStyles(wrapper, baseVars);
  applyStyles(wrapper, buildGlowVars(options.glowColor || '40 80 80', options.glowIntensity ?? 1.0));
  applyStyles(wrapper, buildGradientVars(options.colors || ['#c084fc', '#f472b6', '#38bdf8']));

  function getCenterOfElement(el) {
    const rect = el.getBoundingClientRect();
    return [rect.width / 2, rect.height / 2];
  }

  function getEdgeProximity(el, x, y) {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) {
      kx = cx / Math.abs(dx);
    }
    if (dy !== 0) {
      ky = cy / Math.abs(dy);
    }
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }

  function getCursorAngle(el, x, y) {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) {
      return 0;
    }
    const radians = Math.atan2(dy, dx);
    let degrees = (radians * (180 / Math.PI)) + 90;
    if (degrees < 0) {
      degrees += 360;
    }
    return degrees;
  }

  function handlePointerMove(e) {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const edge = getEdgeProximity(wrapper, x, y);
    const angle = getCursorAngle(wrapper, x, y);
    wrapper.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
    wrapper.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
  }

  wrapper.addEventListener('pointermove', handlePointerMove);

  if (options.animated) {
    const angleStart = 110;
    const angleEnd = 465;
    wrapper.classList.add('sweep-active');
    wrapper.style.setProperty('--cursor-angle', `${angleStart}deg`);

    animateValue({
      duration: 500,
      onUpdate: (value) => wrapper.style.setProperty('--edge-proximity', value),
    });
    animateValue({
      ease: easeInCubic,
      duration: 1500,
      end: 50,
      onUpdate: (value) => {
        wrapper.style.setProperty('--cursor-angle', `${((angleEnd - angleStart) * (value / 100)) + angleStart}deg`);
      },
    });
    animateValue({
      ease: easeOutCubic,
      delay: 1500,
      duration: 2250,
      start: 50,
      end: 100,
      onUpdate: (value) => {
        wrapper.style.setProperty('--cursor-angle', `${((angleEnd - angleStart) * (value / 100)) + angleStart}deg`);
      },
    });
    animateValue({
      ease: easeInCubic,
      delay: 2500,
      duration: 1500,
      start: 100,
      end: 0,
      onUpdate: (value) => wrapper.style.setProperty('--edge-proximity', value),
      onEnd: () => wrapper.classList.remove('sweep-active'),
    });
  }
}

function initBorderGlow() {
  const projectCards = document.querySelectorAll('#projects .project-card');
  const skillCards = document.querySelectorAll('#skills .skill-category-card');

  projectCards.forEach((card, index) => {
    setupBorderGlowCard(card, {
      edgeSensitivity: 18,
      glowColor: '40 80 80',
      glowRadius: 69,
      glowIntensity: 1.8,
      coneSpread: 25,
      animated: index === 0,
      colors: ['#c084fc', '#f472b6', '#38bdf8'],
      fillOpacity: 0.45,
    });
  });

  skillCards.forEach((card) => {
    setupBorderGlowCard(card, {
      edgeSensitivity: 20,
      glowColor: '95 80 72',
      glowRadius: 46,
      glowIntensity: 1.35,
      coneSpread: 21,
      colors: ['#c8f135', '#3dffd0', '#8be5ff'],
      fillOpacity: 0.34,
    });
  });
}

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initScrollReveal();
  initVisitorCounter();
  initSmoothScroll();
  initGitHubCalendar();
  initWhatsAppQuickMessage();
  initThemeToggle();
  initBorderGlow();
});

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.dataset.themeManaged = 'true';
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
  }
}
