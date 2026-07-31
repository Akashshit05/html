import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../useContent.js';
import {
  NodeIcon, NestIcon, MongoIcon, PostgresIcon, TSIcon, RedisIcon, DockerIcon, AWSIcon,
  BriefcaseIcon, GraduationCapIcon, CodeGearIcon, QuoteIcon, CheckIcon, ExternalLinkIcon,
  ArrowRightIcon, MessageIcon, PaperPlaneIcon, MailIcon, CalendarIcon,
  GithubIcon, LinkedinIcon, TwitterIcon, EmailIcon
} from '../components/Icons.jsx';

const techStackList = [
  { name: 'Node.js', icon: <NodeIcon size={26} /> },
  { name: 'NestJS', icon: <NestIcon size={26} /> },
  { name: 'MongoDB', icon: <MongoIcon size={26} /> },
  { name: 'PostgreSQL', icon: <PostgresIcon size={26} /> },
  { name: 'TypeScript', icon: <TSIcon size={26} /> },
  { name: 'Redis', icon: <RedisIcon size={26} /> },
  { name: 'Docker', icon: <DockerIcon size={26} /> },
  { name: 'AWS', icon: <AWSIcon size={26} /> },
];

const featuredProjects = [
  {
    title: 'Taarom – Astrologer App',
    summary: 'Astrology platform connecting users with astrologers for chat, call and consultation. Built with real-time features and wallet system.',
    stack: ['NestJS', 'MongoDB', 'Socket.io', 'AWS'],
    image: '/taarom_app.svg',
    fallbackImage: '/taarom_app.png',
    theme: 'purple-card',
    link: 'https://taarom.com'
  },
  {
    title: 'Movement Baby',
    summary: 'Parenting & baby care app with expert guidance, articles, tracking and personalized suggestions.',
    stack: ['Node.js', 'Express', 'MongoDB'],
    image: '/movement_baby.svg',
    fallbackImage: '/movement_baby.png',
    theme: 'green-card',
    link: 'https://movementbaby.com'
  },
  {
    title: 'Bullshift2020 – Admin Panel',
    summary: 'Admin panel for managing MLM operations, users, commissions and reports with advanced analytics.',
    stack: ['NestJS', 'PostgreSQL', 'TypeORM'],
    image: '/bullshift_admin.svg',
    fallbackImage: '/bullshift_admin.png',
    theme: 'blue-card',
    link: 'https://bullshift2020.com'
  }
];

const whatIDoList = [
  'API Development',
  'Database Design',
  'System Integration',
  'Performance Optimization',
  'Clean & Maintainable Code'
];

export default function HomePage() {
  const { settings, projects } = useContent();
  const displayProjects = (projects && projects.length > 0) ? projects.slice(0, 3) : featuredProjects;

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero-section reveal" id="home">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hand-wave">🖐️</span> Hello, I'm
          </div>
          <h1 className="hero-title">Akash Shit</h1>
          <h2 className="hero-subtitle">Backend Developer</h2>
          <p className="hero-description">
            I build scalable, high-performance backend systems and APIs using Node.js, NestJS and modern technologies. Passionate about clean code, problem solving and delivering real-world solutions.
          </p>

          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">
              View My Work <ArrowRightIcon size={16} />
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Contact Me <MessageIcon size={16} />
            </Link>
          </div>

          <div className="social-connect">
            <span className="social-label">Connect with me</span>
            <div className="social-icons">
              <a href={settings?.github || 'https://github.com'} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GithubIcon size={18} />
              </a>
              <a href={settings?.linkedin || 'https://linkedin.com'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedinIcon size={18} />
              </a>
              <a href={settings?.twitter || 'https://x.com'} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <TwitterIcon size={18} />
              </a>
              <a href={`mailto:${settings?.email || 'akash@example.com'}`} aria-label="Email">
                <EmailIcon size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="profile-card">
            {/* CARD STATUS HEADER */}
            <div className="profile-card-header">
              <span className="status-dot"></span>
              <span className="status-text">Available for Opportunities</span>
            </div>

            {/* AVATAR & NAME */}
            <div className="profile-avatar-block">
              <div className="avatar-ring">
                <img 
                  src="/akash_profile.svg" 
                  alt="Akash Shit - Backend Developer" 
                  className="profile-img-avatar"
                  onError={(e) => {
                    if (e.target.src.endsWith('/akash_profile.svg')) {
                      e.target.src = '/akash_profile.png';
                    } else {
                      e.target.src = '/main.jpeg';
                    }
                  }}
                />
              </div>
              <div className="avatar-text">
                <h3 className="profile-name">Akash Shit</h3>
                <p className="profile-role">Backend Developer & System Architect</p>
              </div>
            </div>

            {/* STATS GRID */}
            <div className="profile-stats-grid">
              <div className="profile-stat-item">
                <span className="stat-num">3+</span>
                <span className="stat-lbl">Years Experience</span>
              </div>
              <div className="profile-stat-item">
                <span className="stat-num">15+</span>
                <span className="stat-lbl">Production APIs</span>
              </div>
              <div className="profile-stat-item">
                <span className="stat-num">99.9%</span>
                <span className="stat-lbl">Uptime Target</span>
              </div>
              <div className="profile-stat-item">
                <span className="stat-num">100%</span>
                <span className="stat-lbl">Clean Code</span>
              </div>
            </div>

            {/* CORE SKILL BADGES */}
            <div className="profile-skill-pills">
              <span className="profile-pill">Node.js</span>
              <span className="profile-pill">NestJS</span>
              <span className="profile-pill">MongoDB</span>
              <span className="profile-pill">PostgreSQL</span>
              <span className="profile-pill">Microservices</span>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK BAR */}
      <section className="tech-stack-section reveal" id="skills">
        <div className="tech-stack-bar">
          <h3 className="tech-stack-title">Tech Stack</h3>
          <div className="tech-stack-grid">
            {techStackList.map((tech) => (
              <div className="tech-item" key={tech.name}>
                <div className="tech-icon">{tech.icon}</div>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section className="featured-projects-section reveal" id="projects">
        <div className="section-header">
          <div className="section-header-left">
            <h2 className="section-title">Featured Projects</h2>
          </div>
          <Link to="/projects" className="view-all-link">
            View all projects <ArrowRightIcon size={16} />
          </Link>
        </div>

        <div className="projects-grid">
          {displayProjects.map((project, idx) => {
            const projectSlug = project.slug || project.id || `project-${idx}`;
            const slugLower = String(projectSlug).toLowerCase();
            const projectImage = project.image || (
              slugLower.includes('taarom') ? '/taarom_app.svg' : 
              slugLower.includes('movement') ? '/movement_baby.svg' : 
              slugLower.includes('bullshift') ? '/bullshift_admin.svg' : 
              (idx % 3 === 0 ? '/taarom_app.svg' : idx % 3 === 1 ? '/movement_baby.svg' : '/bullshift_admin.svg')
            );
            const fallbackImg = project.fallbackImage || (
              slugLower.includes('taarom') ? '/taarom_app.png' : 
              slugLower.includes('movement') ? '/movement_baby.png' : 
              slugLower.includes('bullshift') ? '/bullshift_admin.png' : 
              (idx % 3 === 0 ? '/taarom_app.png' : idx % 3 === 1 ? '/movement_baby.png' : '/bullshift_admin.png')
            );
            const themeClass = project.theme || (idx % 3 === 0 ? 'purple-card' : idx % 3 === 1 ? 'green-card' : 'blue-card');

            return (
              <div className={`project-card ${themeClass}`} key={project.slug || project.title || idx}>
                <div className="project-banner">
                  <Link to={`/projects/${projectSlug}`}>
                    <img 
                      src={projectImage} 
                      alt={project.title} 
                      className="project-banner-img"
                      onError={(e) => {
                        if (e.target.src.endsWith('.svg')) {
                          e.target.src = fallbackImg;
                        } else {
                          e.target.style.display = 'none';
                        }
                      }}
                    />
                  </Link>
                  {project.website && (
                    <a href={project.website} target="_blank" rel="noopener noreferrer" className="external-link-btn" aria-label="Open Live Site">
                      <ExternalLinkIcon size={18} />
                    </a>
                  )}
                </div>
                <div className="project-body">
                  <h3 className="project-title">
                    <Link to={`/projects/${projectSlug}`}>{project.title}</Link>
                  </h3>
                  <p className="project-summary">{project.summary || project.description}</p>
                  <div className="project-tags">
                    {project.stack && project.stack.map((tag) => (
                      <span className="tag-pill" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <Link to={`/projects/${projectSlug}`} className="project-detail-link-btn">
                    View Details <ArrowRightIcon size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>



      {/* CALL TO ACTION BANNER */}
      <section className="cta-section reveal" id="contact">
        <div className="cta-card">
          <div className="cta-left">
            <div className="cta-icon">
              <MailIcon size={24} />
            </div>
            <div className="cta-text">
              <h2>Let's work together on your next project</h2>
              <p>I'm currently available for freelance and full-time opportunities.</p>
            </div>
          </div>
          <Link to="/contact" className="btn btn-primary cta-btn">
            Get In Touch <PaperPlaneIcon size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
