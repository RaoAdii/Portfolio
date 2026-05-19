const achievements = [
  {
    title: 'Designathon: Top 5 Solo Finalist',
    school: 'Manipal University Jaipur',
    desc:
      'Designed a concept app blending Instagram, Snapchat, TikTok, and Reddit with social sharing, real-time authenticity, and creative interaction. Progressed from online round to Top 5 finalist by competing solo in the second round. Learned diverse design approaches, exchanged ideas with passionate creators, and built confidence stepping out of comfort zone.',
    year: '2026',
  },
  {
    title: '404 Not Found - 2nd Place',
    school: 'Infinitus 2026 | 404: Treasure Not Found',
    desc:
      'Secured 2nd place in a fast-paced 3-hour scavenger hunt. Solved multi-layered challenges across coding, web analysis, image forensics, and debugging under time pressure.',
    year: '2026',
  },
  {
    title: 'ImmersiveX Ideathon - Visionary Award',
    school: 'Organized by GeeksforGeeks SRMUAP',
    desc:
      'Introduced MindFlow XR, a neuro-adaptive VR classroom concept that uses real-time cognitive state adjustment to personalize learning. Recognized with the Visionary Award for reimagining how education evolves with technology.',
    year: '2026',
  },
];

export default function Education() {
  return (
    <section id="education">
      <div className="reveal">
        <p className="section-label">/ Background</p>
        <h2 className="section-title">Achievements</h2>
      </div>
      <div className="edu-list reveal">
        {achievements.map((item) => (
          <div className="edu-item" key={item.title}>
            <div>
              <div className="edu-degree">{item.title}</div>
              <div className="edu-school">{item.school}</div>
              <div className="edu-desc">{item.desc}</div>
            </div>
            <div className="edu-year">{item.year}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
