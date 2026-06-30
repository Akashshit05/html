import { Link, NavLink, Route, Routes } from 'react-router-dom';
import logo from './assets/logo.png';

import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import QuerySentPage from './pages/QuerySentPage.jsx';

import './portfolio.css';

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="TL Ke Bolo home">
          <img src={logo} alt="TL Ke Bolo logo" className="brand-logo" />
          <span>Nest</span>Dev
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/query-sent" element={<QuerySentPage />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <Link className="footer-logo" to="/" aria-label="TL Ke Bolo home">
              <img src={logo} alt="" />
              <span>TL Ke Bolo</span>
            </Link>
            <p>
              Building modern, scalable, and high-performance web applications with
              clean architecture and exceptional user experiences.
            </p>
          </div>

          <nav className="footer-links" aria-label="Footer navigation">
            <h3>Explore</h3>
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <div className="footer-contact">
            <h3>Get in touch</h3>
            <a className="footer-contact-link" href="mailto:support@tlkebolo.com">
              <span>Email</span>
              support@tlkebolo.com
            </a>
            <a className="footer-contact-link" href="tel:+1234567890">
              <span>Call</span>
              +1 234 567 890
            </a>

            <div className="footer-social" aria-label="Social links">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                GH
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                X
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            Copyright {new Date().getFullYear()} <strong>TL Ke Bolo</strong>. All rights reserved.
          </p>
          <Link to="/contact">Start a project</Link>
        </div>
      </footer>
    </div>
  );
}
