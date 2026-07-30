import { Link } from 'react-router-dom';
import { useContent } from '../useContent.js';

export default function ProjectPage() {
  const { projects } = useContent();
  return (
    <div className="projects-page">
      <section className="projects-hero">
        <p className="portfolio-hero-kicker">Project Details</p>
        <h1>
          <span className="title-line">Node.js Work</span>
          <span className="title-line">Delivered with</span>
          <span className="title-line">NestJS Thinking</span>
        </h1>
        <p>
          A closer look at backend-focused project work, including API design,
          database workflows, technical stack, key features, and live links.
        </p>
      </section>

      <section
        className="project-detail-list"
        role="region"
        aria-label="All projects"
        tabIndex="0"
      >
        {projects.map((project) => (
          <article className="project-detail-card" id={project.slug} key={project.slug}>
            <div className="project-detail-main">
              <div className="project-avatar" aria-hidden="true">
                {project.icon}
              </div>
              <p className="project-category">{project.category}</p>
              <h2>{project.title}</h2>
              <p className="project-description">{project.description}</p>

              <div className="project-actions">
                <a className="portfolio-btn primary" href={project.website} target="_blank" rel="noopener noreferrer">
                  Live Website
                </a>
                <a className="portfolio-btn outline" href={project.playstore} target="_blank" rel="noopener noreferrer">
                  Play Store
                </a>
              </div>
            </div>

            <div className="project-detail-side">
              <div className="project-metrics">
                {project.metrics.map((metric) => (
                  <div className="project-metric" key={metric.label}>
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </div>
                ))}
              </div>

              <div className="project-info-block">
                <h3>Key Features</h3>
                <ul>
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="project-info-block">
                <h3>Tech Stack</h3>
                <div className="project-stack">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div className="project-info-block">
                <h3>Outcomes</h3>
                <ul>
                  {project.results.map((result) => (
                    <li key={result}>{result}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="projects-bottom-action">
        <Link className="portfolio-btn outline" to="/contact">
          Discuss a Project
        </Link>
      </div>
    </div>
  );
}
