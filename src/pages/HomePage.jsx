import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../projects.js';

const skills = [
  'Node.js',
  'NestJS',
  'TypeScript',
  'Express.js',
  'MongoDB',
  'PostgreSQL',
  'REST APIs',
  'GraphQL',
  'JWT Auth',
  'Microservices',
  'Docker',
  'Redis',
  'AWS'
];

const services = [
  {
    title: 'Node.js Backend Engineering',
    text: 'Clean, maintainable server-side applications with modular architecture, validation, auth, queues, and integrations.'
  },
  {
    title: 'NestJS API Development',
    text: 'Secure REST and GraphQL APIs with guards, interceptors, DTOs, services, repositories, and production-ready patterns.'
  },
  {
    title: 'Database & Cloud Systems',
    text: 'MongoDB and SQL data models, Redis caching, AWS-ready deployments, observability, and performance tuning.'
  }
];

const experience = [
  {
    period: '2024 - Present',
    role: 'Backend Engineer',
    company: 'Node.js & NestJS Platforms',
    text: 'Building scalable APIs, service modules, authentication flows, database models, and cloud-ready backend systems.'
  },
  {
    period: '2022 - 2024',
    role: 'Node.js Developer',
    company: 'API Platforms',
    text: 'Designed reliable Node.js services, payment-ready APIs, admin workflows, integration layers, and production data models.'
  },
  {
    period: '2021 - 2022',
    role: 'Full Stack Developer',
    company: 'Modern Web Apps',
    text: 'Delivered complete web applications while growing a stronger focus on backend architecture, APIs, and deployment workflows.'
  }
];

const testimonials = [
  {
    quote:
      'A backend engineer who can turn messy product requirements into clean, reliable Node.js services.',
    name: 'Aarav Mehta',
    title: 'Founder, SaaS Studio'
  },
  {
    quote:
      'The APIs were fast, well-structured, and easy for the frontend and mobile teams to consume.',
    name: 'Priya Nair',
    title: 'Product Lead'
  },
  {
    quote:
      'Clean NestJS modules, clear communication, and a strong instinct for performance under real traffic.',
    name: 'Daniel Foster',
    title: 'CTO, Growth Platform'
  }
];

export default function HomePage() {
  const featuredProjects = projects.slice(0, 3);

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
      { threshold: 0.14 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-container premium-home">
      <section className="premium-hero reveal" id="home">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Backend Engineer / Node.js / NestJS / APIs</p>
            <h1>
              Building scalable backend systems with Node.js and NestJS.
            </h1>
            <p className="hero-lede">
              I design and develop production-ready APIs, authentication,
              database models, integrations, and cloud-ready services using
              Node.js, NestJS, TypeScript, MongoDB, PostgreSQL, Redis, and AWS.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <Link className="portfolio-btn primary" to="/projects">
                View Projects
                <span aria-hidden="true">{'->'}</span>
              </Link>
              <a className="portfolio-btn ghost" href="/resume.pdf" download>
                Download Resume
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-label="Developer capability preview">
            <div className="orbital-card main-card">
              <div className="window-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <pre>{`const backendEngineer = {
  stack: ['Node.js', 'NestJS', 'TypeScript'],
  focus: 'scalable APIs + services',
  data: ['MongoDB', 'PostgreSQL', 'Redis'],
  deploy: 'AWS + Docker + CI/CD'
};`}</pre>
            </div>
            <div className="floating-metric metric-one">
              <strong>API</strong>
              <span>REST, GraphQL, auth, queues</span>
            </div>
            <div className="floating-metric metric-two">
              <strong>10+</strong>
              <span>Backend modules shipped</span>
            </div>
          </div>
        </div>

        <div className="hero-proof" aria-label="Portfolio highlights">
          <div>
            <strong>3+</strong>
            <span>Years experience</span>
          </div>
          <div>
            <strong>Backend first</strong>
            <span>Node.js, NestJS, APIs</span>
          </div>
          <div>
            <strong>Production focus</strong>
            <span>Secure, fast, observable</span>
          </div>
        </div>
      </section>

      <section className="portfolio-section about-section reveal" id="about">
        <div className="section-heading">
          <p className="eyebrow">About</p>
          <h2>Backend developer, API architect, and product-minded engineer.</h2>
        </div>
        <div className="about-layout">
          <p>
            I help teams build dependable backend foundations for web and mobile
            products. My sweet spot is Node.js and NestJS development: clean API
            contracts, secure auth, database design, integrations, and systems
            that stay steady under real users.
          </p>
          <div className="about-panel glass-panel">
            <span>Currently focused on</span>
            <strong>Node.js, NestJS, TypeScript, MongoDB, PostgreSQL, Redis, AWS</strong>
          </div>
        </div>
      </section>

      <section className="portfolio-section reveal" id="skills">
        <div className="section-heading centered">
          <p className="eyebrow">Skills</p>
          <h2>Backend technologies for scalable product systems.</h2>
        </div>
        <div className="skills-marquee">
          {skills.map((skill) => (
            <span className="skill-pill" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="portfolio-section reveal" id="projects">
        <div className="section-heading split">
          <div>
            <p className="eyebrow">Featured Projects</p>
            <h2>Selected builds with API depth and backend reliability.</h2>
          </div>
          <Link className="text-link" to="/projects">
            See all projects
          </Link>
        </div>
        <div className="project-showcase">
          {featuredProjects.map((project, index) => (
            <article className="project-card glass-panel" key={`${project.slug}-${index}`}>
              <div className="project-card-top">
                <span className="project-letter-icon">{project.icon}</span>
                <span>{project.category}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="project-stack">
                {project.stack.slice(0, 4).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="card-footer-row">
                <a href={project.website} target="_blank" rel="noopener noreferrer">
                  Live Website
                </a>
                <Link to={`/projects#${project.slug}`}>Details</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section reveal" id="experience">
        <div className="section-heading">
          <p className="eyebrow">Experience</p>
          <h2>Practical delivery across APIs, databases, integrations, and cloud.</h2>
        </div>
        <div className="timeline">
          {experience.map((item) => (
            <article className="timeline-item" key={`${item.period}-${item.role}`}>
              <span>{item.period}</span>
              <div>
                <h3>{item.role}</h3>
                <p className="timeline-company">{item.company}</p>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section reveal" id="services">
        <div className="section-heading centered">
          <p className="eyebrow">Services</p>
          <h2>From API design to production-grade backend infrastructure.</h2>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <article className="service-card glass-panel" key={service.title}>
              <span aria-hidden="true">0{index + 1}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section reveal" id="testimonials">
        <div className="section-heading split">
          <div>
            <p className="eyebrow">Testimonials</p>
            <h2>Trusted for backend structure, engineering quality, and momentum.</h2>
          </div>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <figure className="testimonial-card glass-panel" key={item.name}>
              <blockquote>“{item.quote}”</blockquote>
              <figcaption>
                <strong>{item.name}</strong>
                <span>{item.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="contact-cta reveal" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Need a backend engineer for your Node.js or NestJS product?</h2>
          <p>
            Let’s build secure APIs, clean data models, integrations, and
            scalable services that are ready for real users.
          </p>
        </div>
        <Link className="portfolio-btn primary" to="/contact">
          Start a Project
          <span aria-hidden="true">{'->'}</span>
        </Link>
      </section>
    </div>
  );
}
