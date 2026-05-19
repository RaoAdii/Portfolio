function runIntroAnimation() {
  const overlay = document.getElementById('intro-overlay');
  const line = document.getElementById('introLine');
  const letters = document.querySelectorAll('.intro-name span');
  const sub = document.getElementById('introSub');
  const capTop = document.getElementById('curtainTop');
  const capBot = document.getElementById('curtainBottom');
  const main = document.getElementById('main-content');
  if (!overlay || !line || !sub || !capTop || !capBot || !main) {
    return;
  }

  const timers = [];
  timers.push(window.setTimeout(() => line.classList.add('expand'), 60));
  timers.push(
    window.setTimeout(() => {
      letters.forEach((letter, i) => {
        timers.push(window.setTimeout(() => letter.classList.add('show'), i * 95));
      });
    }, 220),
  );
  timers.push(window.setTimeout(() => sub.classList.add('show'), 1400));
  timers.push(
    window.setTimeout(() => {
      capTop.classList.add('open');
      capBot.classList.add('open');
    }, 2500),
  );
  timers.push(
    window.setTimeout(() => {
      overlay.style.display = 'none';
      main.style.opacity = '1';
      main.style.transition = 'opacity 1.5s ease';
      overlay.classList.add('done');
    }, 4000),
  );

  return () => timers.forEach((id) => window.clearTimeout(id));
}

function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (!cursor || !ring) {
    return () => {};
  }

  let mx = 0;
  let my = 0;
  let rx = 0;
  let ry = 0;
  let frame = 0;

  const onMouseMove = (e) => {
    mx = e.clientX;
    my = e.clientY;
  };

  const animateCursor = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    frame = window.requestAnimationFrame(animateCursor);
  };

  const hoverables = Array.from(document.querySelectorAll('a, button'));
  const onEnter = () => {
    cursor.style.transform += ' scale(2)';
    ring.style.opacity = '0';
  };
  const onLeave = () => {
    ring.style.opacity = '1';
  };

  document.addEventListener('mousemove', onMouseMove);
  hoverables.forEach((el) => {
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
  });
  animateCursor();

  return () => {
    document.removeEventListener('mousemove', onMouseMove);
    hoverables.forEach((el) => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    });
    window.cancelAnimationFrame(frame);
  };
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 },
  );
  reveals.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

function getOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
}

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

function initSmoothScroll() {
  const anchors = Array.from(document.querySelectorAll('a[href^="#"]'));
  const handlers = anchors.map((anchor) => {
    const handler = (e) => {
      const href = anchor.getAttribute('href');
      if (href !== '#' && href && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      }
    };
    anchor.addEventListener('click', handler);
    return { anchor, handler };
  });
  return () => handlers.forEach(({ anchor, handler }) => anchor.removeEventListener('click', handler));
}

function initGitHubCalendar() {
  const card = document.querySelector('.github-activity-card[data-github-user]');
  if (!card) {
    return () => {};
  }

  const username = card.getAttribute('data-github-user');
  const totalText = document.getElementById('contribTotalText');
  const totalLine = document.getElementById('githubTotalLine');
  const monthRow = document.getElementById('githubMonthRow');
  const grid = document.getElementById('githubGrid');
  if (!username || !totalText || !totalLine || !monthRow || !grid) {
    return () => {};
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const AUTO_REFRESH_MS = 5 * 60 * 1000;
  let renderToken = 0;

  const toDayKey = (date) => date.toISOString().slice(0, 10);
  const atUtcMidnight = (date) => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const addUtcDays = (date, days) => {
    const next = new Date(date);
    next.setUTCDate(next.getUTCDate() + days);
    return next;
  };
  const getDayIndexMondayFirst = (date) => {
    const day = date.getUTCDay();
    return day === 0 ? 6 : day - 1;
  };

  const buildCalendar = (contributionsMap) => {
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
  };

  const renderLastYear = async () => {
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
  };

  const refreshLastYear = async () => {
    await renderLastYear();
  };

  let midnightTimer = 0;
  const scheduleMidnightRefresh = () => {
    const now = new Date();
    const next = new Date(now);
    next.setHours(24, 0, 15, 0);
    const waitMs = Math.max(1000, next.getTime() - now.getTime());

    midnightTimer = window.setTimeout(async () => {
      await refreshLastYear();
      scheduleMidnightRefresh();
    }, waitMs);
  };

  const intervalId = window.setInterval(() => {
    if (document.visibilityState === 'visible') {
      refreshLastYear();
    }
  }, AUTO_REFRESH_MS);

  const visibilityHandler = () => {
    if (document.visibilityState === 'visible') {
      refreshLastYear();
    }
  };
  document.addEventListener('visibilitychange', visibilityHandler);

  refreshLastYear();
  scheduleMidnightRefresh();

  return () => {
    window.clearInterval(intervalId);
    window.clearTimeout(midnightTimer);
    document.removeEventListener('visibilitychange', visibilityHandler);
  };
}

function initWhatsAppQuickMessage() {
  const card = document.querySelector('.whatsapp-quick-card');
  if (!card) {
    return () => {};
  }

  const rawNumber = (card.getAttribute('data-wa-number') || '').replace(/\D/g, '');
  if (!rawNumber) {
    return () => {};
  }

  const fullNumber = rawNumber.length === 10 ? `91${rawNumber}` : rawNumber;
  const openWhatsApp = (message) => {
    const text = (message || '').trim();
    if (!text) {
      return;
    }
    const url = `https://wa.me/${fullNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const suggestedButtons = Array.from(card.querySelectorAll('[data-wa-message]'));
  const suggestedHandlers = suggestedButtons.map((btn) => {
    const handler = () => openWhatsApp(btn.getAttribute('data-wa-message') || btn.textContent);
    btn.addEventListener('click', handler);
    return { btn, handler };
  });

  const composeForm = card.querySelector('#waComposeForm');
  const composeInput = card.querySelector('#waCustomMessage');
  let submitHandler = null;
  if (composeForm && composeInput) {
    submitHandler = (e) => {
      e.preventDefault();
      openWhatsApp(composeInput.value);
      composeInput.value = '';
    };
    composeForm.addEventListener('submit', submitHandler);
  }

  return () => {
    suggestedHandlers.forEach(({ btn, handler }) => btn.removeEventListener('click', handler));
    if (composeForm && submitHandler) {
      composeForm.removeEventListener('submit', submitHandler);
    }
  };
}

function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) {
    return () => {};
  }

  const key = 'portfolioTheme';
  if (localStorage.getItem(key) === 'light') {
    document.body.classList.add('light-mode');
    toggleBtn.setAttribute('aria-pressed', 'true');
  }

  const onToggle = () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    toggleBtn.setAttribute('aria-pressed', String(isLight));
    localStorage.setItem(key, isLight ? 'light' : 'dark');
  };

  toggleBtn.addEventListener('click', onToggle);
  return () => toggleBtn.removeEventListener('click', onToggle);
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

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
  const t0 = performance.now() + delay;
  const tick = () => {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) {
      requestAnimationFrame(tick);
    } else if (typeof onEnd === 'function') {
      onEnd();
    }
  };
  window.setTimeout(() => requestAnimationFrame(tick), delay);
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
  const radius = Number.isFinite(options.borderRadius) ? options.borderRadius : parseFloat(computed.borderRadius) || 0;

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

  const getCenterOfElement = (el) => {
    const rect = el.getBoundingClientRect();
    return [rect.width / 2, rect.height / 2];
  };
  const getEdgeProximity = (el, x, y) => {
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
  };
  const getCursorAngle = (el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) {
      return 0;
    }
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) {
      degrees += 360;
    }
    return degrees;
  };

  const handlePointerMove = (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const edge = getEdgeProximity(wrapper, x, y);
    const angle = getCursorAngle(wrapper, x, y);
    wrapper.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
    wrapper.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
  };
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

  return () => wrapper.removeEventListener('pointermove', handlePointerMove);
}

function initBorderGlow() {
  const projectCards = document.querySelectorAll('#projects .project-card');
  const skillCards = document.querySelectorAll('#skills .skill-category-card');
  const cleanups = [];

  projectCards.forEach((card, index) => {
    const cleanup = setupBorderGlowCard(card, {
      edgeSensitivity: 18,
      glowColor: '40 80 80',
      glowRadius: 69,
      glowIntensity: 1.8,
      coneSpread: 25,
      animated: index === 0,
      colors: ['#c084fc', '#f472b6', '#38bdf8'],
      fillOpacity: 0.45,
    });
    if (cleanup) {
      cleanups.push(cleanup);
    }
  });

  skillCards.forEach((card) => {
    const cleanup = setupBorderGlowCard(card, {
      edgeSensitivity: 20,
      glowColor: '95 80 72',
      glowRadius: 46,
      glowIntensity: 1.35,
      coneSpread: 21,
      colors: ['#c8f135', '#3dffd0', '#8be5ff'],
      fillOpacity: 0.34,
    });
    if (cleanup) {
      cleanups.push(cleanup);
    }
  });

  return () => cleanups.forEach((fn) => fn());
}

function initTiltedCard() {
  const card = document.getElementById('tiltedCard');
  if (!card) {
    return () => {};
  }

  const inner = card.querySelector('.tilted-card-inner');
  if (!inner) {
    return () => {};
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsHover = window.matchMedia('(hover: hover)').matches;
  if (prefersReducedMotion || !supportsHover) {
    return () => {};
  }

  const rotateAmplitude = 14;
  const scaleOnHover = 1.06;
  const handleMouseMove = (event) => {
    const rect = card.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;
    inner.style.transform = `rotateX(${rotationX.toFixed(2)}deg) rotateY(${rotationY.toFixed(2)}deg) scale(${scaleOnHover})`;
  };
  const handleMouseEnter = () => {
    inner.style.transition = 'transform 0.15s ease-out';
    inner.style.transform = `scale(${scaleOnHover})`;
  };
  const handleMouseLeave = () => {
    inner.style.transition = 'transform 0.28s cubic-bezier(.23,1,.32,1)';
    inner.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  };

  card.addEventListener('mouseenter', handleMouseEnter);
  card.addEventListener('mousemove', handleMouseMove);
  card.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    card.removeEventListener('mouseenter', handleMouseEnter);
    card.removeEventListener('mousemove', handleMouseMove);
    card.removeEventListener('mouseleave', handleMouseLeave);
  };
}

export function initPortfolioEffects() {
  const cleanups = [
    runIntroAnimation(),
    initCursor(),
    initScrollReveal(),
    initSmoothScroll(),
    initGitHubCalendar(),
    initWhatsAppQuickMessage(),
    initThemeToggle(),
    initBorderGlow(),
    initTiltedCard(),
  ].filter(Boolean);

  initVisitorCounter();

  return () => {
    cleanups.forEach((cleanup) => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    });
  };
}
