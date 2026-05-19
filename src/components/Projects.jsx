const projects = [
  {
    num: '01',
    title: 'LNF',
    description:
      'Lost and Found Hub for residential communities with secure authentication, post lifecycle management, image uploads, and threaded in-app messaging between users.',
    tags: ['MERN', 'React + Vite', 'Node/Express', 'MongoDB'],
    url: 'https://github.com/RaoAdii/LNF',
  },
  {
    num: '02',
    title: 'Terra 3.0',
    description:
      'Gamified environmental education platform with carbon tracking, eco tools, AI-powered features, and leaderboard-driven engagement. Built with a scalable modular Python architecture and real-world API integrations.',
    tags: ['Python', 'Streamlit', 'SQLAlchemy', 'Gemini API'],
    url: 'https://github.com/RaoAdii/Terra-3.0',
  },
  {
    num: '03',
    title: 'Lumis',
    description:
      'Advanced voice-enabled AI assistant with multiple implementations (CLI, Async, GUI, Advanced GUI). Features Gemini API integration, speech recognition, NLU engine, tool-based automation, and modular skill architecture.',
    tags: ['Python', 'Gemini API', 'Speech Recognition', 'Tkinter GUI'],
    url: 'https://github.com/RaoAdii/Lumis',
  },
  {
    num: '04',
    title: 'Treno',
    description:
      'Full-stack railway ticket booking system with C++ REST API backend and responsive HTML/Tailwind frontend. Features train search, seat allocation, user authentication, and Docker containerization.',
    tags: ['C++', 'REST API', 'HTML/Tailwind', 'Docker'],
    url: 'https://github.com/RaoAdii/Treno',
  },
  {
    num: '05',
    title: 'Skybit',
    description:
      'Modern real-time weather app with live data integration. Features responsive design, intuitive UX, and dynamic weather visualization with smooth animations.',
    tags: ['JavaScript', 'API Integration', 'HTML/CSS', 'Responsive Design'],
    url: 'https://github.com/RaoAdii/Skybit',
  },
  {
    num: '06',
    title: 'EcoLearn',
    description:
      'Comprehensive educational platform with gamification, analytics dashboard, and real-time environmental data. Features quiz engine, achievement system, leaderboards, and role-based access control.',
    tags: ['Python', 'Streamlit', 'SQLAlchemy', 'Pandas/Plotly'],
    url: 'https://github.com/RaoAdii/EcoLearn',
  },
];

export default function Projects() {
  return (
    <section id="projects">
      <div className="reveal">
        <p className="section-label">/ Selected work</p>
        <h2 className="section-title">Projects</h2>
      </div>
      <div className="projects-grid reveal">
        {projects.map((project) => (
          <div className="project-card" key={project.title}>
            <div className="project-num">{project.num}</div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span className="tag" key={`${project.title}-${tag}`}>
                  {tag}
                </span>
              ))}
            </div>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
