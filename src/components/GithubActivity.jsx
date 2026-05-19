export default function GithubActivity() {
  return (
    <section id="achievements">
      <div className="reveal">
        <p className="section-label">/ Open Source</p>
        <h2 className="section-title">GitHub Activity</h2>
      </div>
      <div className="github-activity-card reveal" data-github-user="RaoAdii">
        <div className="github-meta">
          <p className="contrib-total" id="contribTotalText">
            Loading contributions...
          </p>
          <div className="github-controls">
            <p className="github-user">@RaoAdii</p>
          </div>
        </div>
        <div className="github-calendar-shell" id="githubCalendarShell">
          <div className="github-month-row" id="githubMonthRow"></div>
          <div className="github-calendar-main">
            <div className="github-weekdays" aria-hidden="true">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            <div className="github-grid" id="githubGrid" aria-label="GitHub contribution heatmap"></div>
          </div>
          <div className="github-calendar-footer">
            <p className="github-total-line" id="githubTotalLine">
              Total: -- contributions
            </p>
            <div className="github-legend" aria-hidden="true">
              <span>Less</span>
              <i className="gh-legend-box" data-level="0"></i>
              <i className="gh-legend-box" data-level="1"></i>
              <i className="gh-legend-box" data-level="2"></i>
              <i className="gh-legend-box" data-level="3"></i>
              <i className="gh-legend-box" data-level="4"></i>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
