export default function VisitorCounter() {
  return (
    <div className="visitor-counter-wrap">
      <div className="visitor-counter" aria-live="polite">
        <span className="visitor-eye" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 5c5.75 0 10 5.1 11 7-1 1.9-5.25 7-11 7S2 13.9 1 12c1-1.9 5.25-7 11-7Zm0 2C8.2 7 5.02 10.02 3.3 12 5.02 13.98 8.2 17 12 17s6.98-3.02 8.7-5C18.98 10.02 15.8 7 12 7Zm0 2.5A2.5 2.5 0 1 1 12 14.5a2.5 2.5 0 0 1 0-5Z"
            />
          </svg>
        </span>
        <span id="visitorCountText">You are the 1st visitor</span>
      </div>
    </div>
  );
}
