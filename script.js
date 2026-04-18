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

function initGitHubCalendar() {
  const card = document.querySelector('.github-activity-card[data-github-user]');
  if (!card) {
    return;
  }

  const username = card.getAttribute('data-github-user');
  const totalText = document.getElementById('contribTotalText');
  const totalLine = document.getElementById('githubTotalLine');
  const yearSelect = document.getElementById('githubYearSelect');
  const monthRow = document.getElementById('githubMonthRow');
  const grid = document.getElementById('githubGrid');
  if (!username || !totalText || !totalLine || !yearSelect || !monthRow || !grid) {
    return;
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const AUTO_REFRESH_MS = 5 * 60 * 1000;
  let renderToken = 0;

  function toDayKey(date) {
    return date.toISOString().slice(0, 10);
  }

  function getDayIndexMondayFirst(date) {
    const day = date.getUTCDay();
    return day === 0 ? 6 : day - 1;
  }

  function getDayOfYear(date) {
    const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.floor((date - start) / 86400000) + 1;
  }

  function buildCalendar(contributionsMap, year) {
    const yearStart = new Date(Date.UTC(year, 0, 1));
    const yearEnd = new Date(Date.UTC(year, 11, 31));
    const leadingCells = getDayIndexMondayFirst(yearStart);
    const totalDays = Math.floor((yearEnd - yearStart) / 86400000) + 1;
    const totalWeeks = Math.ceil((leadingCells + totalDays) / 7);
    const trailingCells = totalWeeks * 7 - (leadingCells + totalDays);

    monthRow.style.setProperty('--gh-weeks', String(totalWeeks));
    grid.style.setProperty('--gh-weeks', String(totalWeeks));
    monthRow.innerHTML = '';
    grid.innerHTML = '';

    monthNames.forEach((month, monthIndex) => {
      const monthStart = new Date(Date.UTC(year, monthIndex, 1));
      const dayOffset = getDayOfYear(monthStart) - 1;
      const weekIndex = Math.floor((leadingCells + dayOffset) / 7);
      const marker = document.createElement('span');
      marker.textContent = month;
      marker.style.gridColumn = `${weekIndex + 1} / span 4`;
      monthRow.appendChild(marker);
    });

    for (let i = 0; i < leadingCells; i += 1) {
      const emptyCell = document.createElement('span');
      emptyCell.className = 'gh-day empty';
      grid.appendChild(emptyCell);
    }

    let totalContributions = 0;
    for (let dayOffset = 0; dayOffset < totalDays; dayOffset += 1) {
      const date = new Date(Date.UTC(year, 0, 1 + dayOffset));
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

    totalText.textContent = `${totalContributions} contributions in ${year}`;
    totalLine.textContent = `Total: ${totalContributions} contributions in ${year}`;
  }

  async function fetchYears() {
    try {
      const response = await fetch(`https://github-contributions.vercel.app/api/v1/${username}`);
      if (!response.ok) {
        throw new Error('year data unavailable');
      }
      const data = await response.json();
      const years = Array.isArray(data.years)
        ? data.years
          .map((item) => Number.parseInt(item.year, 10))
          .filter((value) => Number.isInteger(value))
        : [];
      if (years.length) {
        return [...new Set(years)].sort((a, b) => b - a);
      }
    } catch (error) {
      // Falls back to a rolling list if year metadata API is unavailable.
    }

    const nowYear = new Date().getFullYear();
    return [nowYear, nowYear - 1, nowYear - 2];
  }

  async function renderYear(year) {
    const token = ++renderToken;
    totalText.textContent = `Loading contributions for ${year}...`;
    totalLine.textContent = 'Total: loading...';

    try {
      const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`);
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

      buildCalendar(map, year);
    } catch (error) {
      monthRow.innerHTML = '';
      grid.innerHTML = '';
      totalText.textContent = 'Unable to load live GitHub contributions right now';
      totalLine.textContent = `Visit github.com/${username} to view activity.`;
    }
  }

  async function refreshSelectedYear(options = {}) {
    const selectedYear = Number.parseInt(yearSelect.value, 10);
    if (!Number.isInteger(selectedYear)) {
      return;
    }

    const currentYear = new Date().getFullYear();
    if (options.force || selectedYear === currentYear) {
      await renderYear(selectedYear);
    }
  }

  function scheduleMidnightRefresh() {
    const now = new Date();
    const next = new Date(now);
    next.setHours(24, 0, 15, 0);
    const waitMs = Math.max(1000, next.getTime() - now.getTime());

    setTimeout(async () => {
      const previousValue = yearSelect.value;
      const years = await fetchYears();
      yearSelect.innerHTML = '';
      years.forEach((year) => {
        const option = document.createElement('option');
        option.value = String(year);
        option.textContent = String(year);
        yearSelect.appendChild(option);
      });

      const fallback = String(years[0]);
      const nextValue = years.includes(Number.parseInt(previousValue, 10))
        ? previousValue
        : fallback;
      yearSelect.value = nextValue;

      await refreshSelectedYear({ force: true });
      scheduleMidnightRefresh();
    }, waitMs);
  }

  fetchYears().then((years) => {
    yearSelect.innerHTML = '';
    years.forEach((year) => {
      const option = document.createElement('option');
      option.value = String(year);
      option.textContent = String(year);
      yearSelect.appendChild(option);
    });

    const currentYear = new Date().getFullYear();
    const selected = years.includes(currentYear) ? currentYear : years[0];
    yearSelect.value = String(selected);
    renderYear(selected);

    yearSelect.addEventListener('change', () => {
      renderYear(Number.parseInt(yearSelect.value, 10));
    });

    setInterval(() => {
      if (document.visibilityState === 'visible') {
        refreshSelectedYear();
      }
    }, AUTO_REFRESH_MS);

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        refreshSelectedYear();
      }
    });

    scheduleMidnightRefresh();
  });
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

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initScrollReveal();
  initVisitorCounter();
  initSmoothScroll();
  initGitHubCalendar();
  initWhatsAppQuickMessage();
  initThemeToggle();
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
