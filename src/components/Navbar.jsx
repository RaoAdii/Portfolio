export default function Navbar() {
  return (
    <nav>
      <div className="nav-logo">Adi</div>
      <div className="nav-right">
        <div className="nav-center">
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-actions">
          <a href="https://github.com/RaoAdii" target="_blank" rel="noopener noreferrer" className="nav-icon-btn" aria-label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.38.6.12.82-.26.82-.58v-2.05c-3.34.72-4.04-1.42-4.04-1.42-.54-1.4-1.34-1.76-1.34-1.76-1.1-.76.08-.74.08-.74 1.22.08 1.86 1.24 1.86 1.24 1.08 1.86 2.82 1.32 3.5 1 .1-.8.42-1.32.76-1.62-2.66-.3-5.46-1.34-5.46-5.96 0-1.32.46-2.4 1.24-3.26-.14-.3-.54-1.52.12-3.16 0 0 1-.32 3.3 1.24a11.5 11.5 0 0 1 6 0c2.28-1.56 3.28-1.24 3.28-1.24.66 1.64.26 2.86.14 3.16.78.86 1.24 1.94 1.24 3.26 0 4.64-2.82 5.66-5.5 5.96.44.38.82 1.1.82 2.24v3.3c0 .32.22.7.84.58A12.03 12.03 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z"/></svg>
          </a>
          <a href="https://linkedin.com/in/aditya950" target="_blank" rel="noopener noreferrer" className="nav-icon-btn" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V24h-4V8Zm7 0h3.84v2.16h.06c.54-1 1.86-2.16 3.84-2.16 4.1 0 4.86 2.7 4.86 6.22V24h-4v-7.06c0-1.68-.02-3.84-2.34-3.84-2.34 0-2.7 1.82-2.7 3.72V24h-4V8Z"/></svg>
          </a>
          <a href="https://instagram.com/rao_adiii_" target="_blank" rel="noopener noreferrer" className="nav-icon-btn" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm9.2 1.4a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z"/></svg>
          </a>
          <a href="https://x.com/CeaserAdi0001" target="_blank" rel="noopener noreferrer" className="nav-icon-btn" aria-label="X">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2h3.68l-8.05 9.2L24 22h-7.4l-5.8-7.08L4.6 22H.9l8.6-9.84L0 2h7.6l5.24 6.42L18.9 2Zm-1.3 17.74h2.04L6.5 4.16H4.3L17.6 19.74Z"/></svg>
          </a>
          <button className="nav-icon-btn theme-toggle" id="themeToggle" aria-label="Toggle theme">
            <svg className="sun-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
