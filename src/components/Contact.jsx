export default function Contact() {
  return (
    <section id="contact">
      <div className="reveal">
        <p className="section-label">/ Get in touch</p>
        <h2 className="section-title">
          Let's build
          <br />
          <span style={{ color: 'var(--accent)' }}>something.</span>
        </h2>
        <p>Open to full-time roles, freelance projects, and interesting collaborations. Drop a message.</p>
      </div>
      <div className="contact-grid reveal">
        <div className="whatsapp-quick-card" data-wa-number="7080804365">
          <div className="wa-head">
            <div className="wa-icon" aria-hidden="true">
              W
            </div>
            <div>
              <div className="wa-title">quick messages</div>
              <div className="wa-subtitle">opens in WhatsApp</div>
            </div>
          </div>

          <div className="wa-suggested-wrap">
            <button type="button" className="wa-suggested" data-wa-message="Let's build something amazing together">
              Let's build something amazing together
            </button>
            <button type="button" className="wa-suggested" data-wa-message="I'm interested in backend collaborations">
              I'm interested in backend collaborations
            </button>
            <button type="button" className="wa-suggested" data-wa-message="Can we discuss your tech stack?">
              Can we discuss your tech stack?
            </button>
            <button type="button" className="wa-suggested" data-wa-message="Tell me about your latest projects">
              Tell me about your latest projects
            </button>
            <button type="button" className="wa-suggested" data-wa-message="Open to full-stack opportunities">
              Open to full-stack opportunities
            </button>
            <button type="button" className="wa-suggested" data-wa-message="Let's connect on GitHub/LinkedIn">
              Let's connect on GitHub/LinkedIn
            </button>
          </div>

          <form className="wa-compose" id="waComposeForm">
            <input
              id="waCustomMessage"
              type="text"
              placeholder="Write your custom message..."
              aria-label="Type your custom WhatsApp message"
            />
            <button type="submit" className="wa-send-btn">
              Send
            </button>
          </form>
        </div>

        <div className="contact-social-card">
          <p className="contact-social-title">Connect</p>
          <div className="contact-social-links">
            <a href="https://linkedin.com/in/aditya950" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/RaoAdii" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://x.com/CeaserAdi0001" target="_blank" rel="noopener noreferrer">
              X
            </a>
            <a href="https://instagram.com/rao_adiii_" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="mailto:ceaser.adi00@gmail.com">ceaser.adi00@gmail.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}
