import { useParams, Link } from 'react-router-dom';
import { useProject } from '../useContent.js';
import { 
  ArrowRightIcon, ExternalLinkIcon, CheckIcon, CodeGearIcon, 
  BriefcaseIcon, ChevronUpIcon 
} from '../components/Icons.jsx';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { project, loading } = useProject(slug);

  if (loading && !project) {
    return (
      <div className="project-detail-container loading-state">
        <div className="loading-spinner"></div>
        <p>Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-detail-container not-found-state">
        <h2>Project Not Found</h2>
        <p>We couldn't find the project you're looking for.</p>
        <Link to="/projects" className="btn btn-primary">
          View All Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="project-detail-wrapper">
      {/* TOP NAVIGATION / BREADCRUMB */}
      <div className="detail-top-bar">
        <Link to="/projects" className="back-link">
          ← Back to All Projects
        </Link>
        <span className="project-category-badge">{project.category || 'Backend Engineering'}</span>
      </div>

      {/* HERO SECTION */}
      <header className="project-detail-hero">
        <div className="project-hero-content">
          <h1 className="project-detail-title">{project.title}</h1>
          <p className="project-detail-summary">{project.summary || project.description}</p>
          
          <div className="project-hero-actions">
            {project.website && (
              <a 
                href={project.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
              >
                Visit Live Platform <ExternalLinkIcon size={16} />
              </a>
            )}
            {project.playstore && (
              <a 
                href={project.playstore} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
              >
                Play Store App <ExternalLinkIcon size={16} />
              </a>
            )}
            <Link to="/contact" className="btn btn-secondary">
              Discuss Similar Project
            </Link>
          </div>
        </div>

        {/* METRICS & OVERVIEW CARDS */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="project-metrics-grid">
            {project.metrics.map((m, idx) => (
              <div className="metric-card" key={idx}>
                <span className="metric-label">{m.label}</span>
                <span className="metric-value">{m.value}</span>
              </div>
            ))}
          </div>
        )}
      </header>

      {/* MAIN CONTENT GRID */}
      <div className="project-detail-grid">
        {/* LEFT COLUMN - DESCRIPTION & FEATURES */}
        <div className="detail-main-col">
          {project.description && (
            <section className="detail-section-card">
              <h3><BriefcaseIcon size={20} /> Project Overview</h3>
              <p className="description-text">{project.description}</p>
            </section>
          )}

          {project.features && project.features.length > 0 && (
            <section className="detail-section-card">
              <h3><CodeGearIcon size={20} /> Key Architectural Features</h3>
              <ul className="features-checklist">
                {project.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="check-icon-badge"><CheckIcon size={14} /></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.results && project.results.length > 0 && (
            <section className="detail-section-card">
              <h3>Results & Performance Impact</h3>
              <div className="results-list">
                {project.results.map((result, idx) => (
                  <div className="result-item-box" key={idx}>
                    <span className="result-bullet">⚡</span>
                    <p>{result}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT SIDEBAR - TECH STACK & QUICK INFO */}
        <div className="detail-sidebar-col">
          <div className="sidebar-card">
            <h4>Technologies Used</h4>
            <div className="tech-stack-pills">
              {project.stack && project.stack.map((tech) => (
                <span className="stack-pill" key={tech}>{tech}</span>
              ))}
            </div>
          </div>

          <div className="sidebar-card highlight-sidebar">
            <h4>Architectural Highlights</h4>
            <p className="sidebar-desc">
              Engineered with clean separation of concerns, high uptime, optimized database queries, and robust API endpoints.
            </p>
            <Link to="/contact" className="sidebar-cta-btn">
              Get in Touch with Developer <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
