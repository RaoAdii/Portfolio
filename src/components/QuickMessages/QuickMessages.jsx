import './QuickMessages.css';

const QUICK_MESSAGES = [
  "Let's build something amazing together",
  "I'm interested in backend collaborations",
  'Can we discuss your tech stack?',
  'Tell me about your latest projects',
  'Open to full-stack opportunities',
  "Let's connect on GitHub/LinkedIn",
];

export default function QuickMessages({ whatsappNumber = '+919876543210' }) {
  function handleMessageClick(message) {
    const sanitizedNumber = String(whatsappNumber).replace(/[^\d]/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${sanitizedNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="quick-messages" aria-label="Quick message suggestions">
      {QUICK_MESSAGES.map((message) => (
        <button
          key={message}
          type="button"
          className="quick-message-btn"
          onClick={() => handleMessageClick(message)}
          aria-label={`Send WhatsApp message: ${message}`}
        >
          {message}
        </button>
      ))}
    </div>
  );
}
