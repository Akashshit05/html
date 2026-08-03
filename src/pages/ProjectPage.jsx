import { Link } from 'react-router-dom';
import { useContent } from '../useContent.js';
import { ArrowRightIcon, ExternalLinkIcon, CheckIcon } from '../components/Icons.jsx';

export default function ProjectPage() {
  const { projects } = useContent();

  return (
    <div className="projects-page-container">
      {/* HERO HEADER */}
      <section className="projects-hero">
        <h1>Backend Systems & API Engineering</h1>
        <p>
          A detailed look at production-grade backend projects, microservices, database architectures, and real-time platforms.
        </p>
      </section>

      {/* PROJECTS LIST */}
      <section className="projects-full-grid">
        {projects.map((project) => (
          <div className="project-card-full" key={project.slug || project.id}>
            <div className="project-card-banner">
              <div className="project-category-badge">{project.category || 'Backend Architecture'}</div>
              <h3>{project.title}</h3>
              <p className="project-summary">{project.summary || project.description}</p>
              
              <div className="project-stack-row">
                {project.stack && project.stack.map((tech) => (
                  <span className="tag-pill" key={tech}>{tech}</span>
                ))}
              </div>

              <div className="project-card-actions">
                <Link to={`/projects/${project.slug}`} className="btn btn-primary">
                  View Project Details <ArrowRightIcon size={16} />
                </Link>
                {project.website && (
                  <a href={project.website} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    Live Demo <ExternalLinkIcon size={14} />
                  </a>
                )}
              </div>
            </div>

            {project.metrics && project.metrics.length > 0 && (
              <div className="project-card-sidebar">
                <h4>Key Metrics</h4>
                <div className="metrics-list">
                  {project.metrics.map((metric) => (
                    <div className="metric-row" key={metric.label}>
                      <span>{metric.label}:</span>
                      <strong>{metric.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      <div className="projects-bottom-cta">
        <h3>Have a project requirement?</h3>
        <p>Let's build reliable, fast backend APIs and microservices together.</p>
        <Link to="/contact" className="btn btn-primary">
          Contact Developer <ArrowRightIcon size={16} />
        </Link>
      </div>
    </div>
  );
}
