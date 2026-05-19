const skillGroups = [
  {
    title: 'Languages',
    skills: [
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', 'Python'],
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', 'C++'],
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 'JavaScript'],
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', 'TypeScript'],
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', 'Java'],
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', 'C'],
    ],
  },
  {
    title: 'Frontend',
    skills: [
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', 'HTML5'],
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', 'CSS3'],
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 'React'],
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', 'Tailwind CSS'],
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg', 'Vite'],
      ['https://cdn.simpleicons.org/framer/0055FF', 'Framer Motion'],
    ],
  },
  {
    title: 'Backend',
    skills: [
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', 'Node.js'],
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', 'Express'],
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', 'Flask'],
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', 'PostgreSQL'],
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', 'MongoDB'],
      ['https://cdn.simpleicons.org/streamlit/FF4B4B', 'Streamlit'],
      ['https://cdn.simpleicons.org/sqlalchemy/D71F00', 'SQLAlchemy'],
      ['https://cdn.simpleicons.org/postman/FF6C37', 'REST APIs'],
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', 'Git'],
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', 'GitHub'],
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', 'Docker'],
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', 'Linux'],
      ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', 'MySQL'],
      ['https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg', 'AWS'],
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="reveal">
        <p className="section-label">/ Toolbox</p>
        <h2 className="section-title">Skills &amp; Tools</h2>
      </div>
      <div className="skills-grid reveal">
        {skillGroups.map((group) => (
          <div className="skill-category-card" key={group.title}>
            <h4>{group.title}</h4>
            <div className="skill-list">
              {group.skills.map(([src, name]) => (
                <div className="skill-chip" key={`${group.title}-${name}`}>
                  <img src={src} alt={`${name} logo`} loading="lazy" />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
