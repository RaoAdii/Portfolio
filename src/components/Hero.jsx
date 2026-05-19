export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-grid"></div>
      <div className="blob"></div>
      <div className="hero-content">
        <a href="#contact" className="hero-tag">
          open to work
        </a>
        <h1>Aditya</h1>
        <p className="hero-title">Backend &amp; Full-Stack Developer</p>
        <p className="hero-sub">
          I design and build <span className="hero-keyword">scalable backend systems</span> and end-to-end{' '}
          <span className="hero-keyword">web applications</span> focused on performance, reliability, and clean architecture.
          <br />
          <br />
          Specializing in <span className="hero-keyword">API development</span>, <span className="hero-keyword">database design</span>, and
          modern full-stack technologies, with a strong focus on building production-ready solutions.
          <br />
          <br />
          Currently exploring <span className="hero-keyword">AI integration</span> and scalable system design.
          <br />
          <br /> <span className="hero-keyword">Open to collaborations</span>, internships, and real-world product development
          opportunities.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">
            View Projects
          </a>
          <a href="/resume-Aditya.pdf" className="btn btn-ghost" download="resume-Aditya.pdf">
            Download Resume
          </a>
        </div>
      </div>
      <div className="hero-media">
        <figure className="tilted-card-figure" id="tiltedCard" aria-label="Aditya profile photo card">
          <div className="tilted-card-inner">
            <picture>
              <source srcSet="/images/profile.webp?v=2" type="image/webp" />
              <img
                src="/images/profile.jpg?v=2"
                alt="Aditya profile photo"
                className="tilted-card-img"
                loading="lazy"
                decoding="async"
                width="480"
                height="480"
              />
            </picture>
          </div>
        </figure>
      </div>
    </div>
  );
}
