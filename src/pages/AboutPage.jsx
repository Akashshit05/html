import { Link } from 'react-router-dom';
import { useContent } from '../useContent.js';
import { 
  NodeIcon, NestIcon, PostgresIcon, MongoIcon, TSIcon, DockerIcon,
  BriefcaseIcon, GraduationCapIcon, ArrowRightIcon, CheckIcon 
} from '../components/Icons.jsx';

export default function AboutPage() {
  const { settings, skills } = useContent();

  return (
    <div className="about-page-container">
      {/* HERO BANNER */}
      <section className="about-hero-card">
        <div className="about-hero-content">
          <span className="hero-kicker">• About Akash Shit</span>
          <h1 className="about-title">
            Backend Developer & Systems Architect
          </h1>
          <p className="about-lead">
            With 3+ years of experience designing and scaling backend infrastructures, I specialize in building robust REST APIs, real-time microservices, and database systems using Node.js, NestJS, MongoDB, and PostgreSQL.
          </p>
          
          <div className="about-hero-buttons">
            <Link to="/contact" className="btn btn-primary">
              Work Together <ArrowRightIcon size={16} />
            </Link>
            <a href="/resume.pdf" download className="btn btn-secondary">
              Download CV
            </a>
          </div>
        </div>

        <div className="about-hero-image">
          <img 
            src="/akash_profile.svg" 
            alt="Akash Shit - Backend Developer" 
            className="about-profile-img"
            onError={(e) => { e.target.src = '/main.jpeg'; }}
          />
          <div className="about-experience-tag">
            <strong>3+ Years</strong>
            <span>Backend Experience</span>
          </div>
        </div>
      </section>

      {/* CORE SKILLS & CAPABILITIES */}
      <section className="about-skills-section">
        <div className="section-header">
          <span className="sub-tag">• Technical Stack</span>
          <h2>Technologies & Core Expertise</h2>
        </div>
        <div className="skills-badge-grid">
          {skills && skills.map((skill) => (
            <div className="skill-badge-item" key={skill}>
              <span className="skill-badge-dot"></span>
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CAREER & EDUCATION TIMELINE */}
      <section className="about-timeline-section">
        <div className="timeline-col">
          <div className="col-header">
            <span className="col-icon"><BriefcaseIcon size={22} /></span>
            <h2>Work Experience</h2>
          </div>
          <div className="timeline-cards">
            <div className="timeline-card-item">
              <span className="time-period">2023 – Present</span>
              <h3>Backend Developer</h3>
              <span className="company-name">Webskitters Private Limited</span>
              <p>
                Leading backend architecture for client and enterprise products. Building scalable microservices, WebSockets real-time systems, and payment gateway integrations using NestJS & MongoDB.
              </p>
            </div>
            <div className="timeline-card-item">
              <span className="time-period">2021 – 2023</span>
              <h3>Junior Backend Developer</h3>
              <span className="company-name">Webskitters Private Limited</span>
              <p>
                Developed RESTful API endpoints, integrated relational PostgreSQL databases using TypeORM, and optimized database queries for performance.
              </p>
            </div>
          </div>
        </div>

        <div className="timeline-col">
          <div className="col-header">
            <span className="col-icon"><GraduationCapIcon size={22} /></span>
            <h2>Education & Focus</h2>
          </div>
          <div className="timeline-cards">
            <div className="timeline-card-item">
              <span className="time-period">2018 – 2021</span>
              <h3>Bachelor of Computer Applications (BCA)</h3>
              <span className="company-name">Abs Academy College</span>
              <p>
                Specialized in Computer Science fundamentals, Software Engineering, Object Oriented Programming, Data Structures, and Database Management Systems.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
