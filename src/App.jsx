import { useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';
import QuerySentPage from './pages/QuerySentPage.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import { 
  DownloadIcon, ChevronUpIcon, 
  GithubIcon, LinkedinIcon, TwitterIcon, EmailIcon 
} from './components/Icons.jsx';

import './portfolio.css';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const closeMenu = () => setIsMenuOpen(false);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAdminDashboard = location.pathname === '/admin/dashboard';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`app-shell${isAdminDashboard ? ' admin-dashboard-shell' : ''}`}>
      {!isAdminRoute && (
        <header className="site-header">
          <div className="header-container">
            <Link className="brand" to="/" aria-label="Akash Shit Home" onClick={closeMenu}>
              <div className="brand-logo-container">
                <img 
                  src="/logo.png" 
                  alt="Akash Logo" 
                  className="brand-logo-img"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div className="brand-text">
                <span className="brand-name">Akash</span>
               
              </div>
            </Link>

            <button
              className={`mobile-menu-toggle${isMenuOpen ? ' is-active' : ''}`}
              type="button"
              aria-label="Show navigation options"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>

            <nav
              className={`nav-links${isMenuOpen ? ' is-open' : ''}`}
              id="primary-navigation"
              aria-label="Primary navigation"
            >
              <NavLink to="/" onClick={closeMenu} end>Home</NavLink>
              <NavLink to="/about" onClick={closeMenu}>About</NavLink>
              <NavLink to="/projects" onClick={closeMenu}>Projects</NavLink>
              <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
            </nav>

            <div className="header-actions">
              <a className="download-cv-btn" href="/resume.pdf" download onClick={closeMenu}>
                <span>Download CV</span>
                <DownloadIcon size={16} />
              </a>
            </div>
          </div>
        </header>
      )}

      {isAdminRoute && !isAdminDashboard && (
        <header className="site-header admin-minimal-header">
          <div className="header-container">
            <Link className="brand" to="/" aria-label="Akash Shit Home">
              <div className="brand-logo-container">
                <img 
                  src="/logo.png" 
                  alt="Akash Logo" 
                  className="brand-logo-img"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div className="brand-text">
                <span className="brand-name">Akash</span>
               
              </div>
            </Link>
            <div className="nav-links">
              <NavLink to="/">← Back to Main Site</NavLink>
              <NavLink to="/admin/dashboard">Admin Dashboard</NavLink>
            </div>
          </div>
        </header>
      )}

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/query-sent" element={<QuerySentPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        </Routes>
      </main>

      {!isAdminRoute && (
        <footer className="site-footer">
          <div className="footer-glow-bar" />
          <div className="footer-container">
            <div className="footer-col footer-brand-col">
              <Link className="footer-brand" to="/" onClick={scrollToTop}>
                <div className="brand-logo-container">
                  <img 
                    src="/logo.png" 
                    alt="Akash Logo" 
                    className="brand-logo-img"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <div className="brand-text">
                  <span className="brand-name">Akash</span>
                 
                </div>
              </Link>
              <p className="footer-bio">
                Backend Developer crafting robust APIs, microservices, and database solutions for modern web applications.
              </p>
            </div>

            <div className="footer-col footer-nav-col">
              <h4 className="footer-col-title">Navigation</h4>
              <nav className="footer-nav" aria-label="Footer navigation">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/contact">Contact</Link>
              </nav>
            </div>

            <div className="footer-col footer-social-col">
              <h4 className="footer-col-title">Social Links</h4>
              <div className="footer-social-icons">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer-social-btn">
                  <GithubIcon size={18} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social-btn">
                  <LinkedinIcon size={18} />
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="footer-social-btn">
                  <TwitterIcon size={18} />
                </a>
                <a href="mailto:akash@example.com" aria-label="Email" className="footer-social-btn">
                  <EmailIcon size={18} />
                </a>
              </div>
              <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Scroll to top" title="Scroll to top">
                <ChevronUpIcon size={18} />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright-text">
              © {new Date().getFullYear()} Akash Shit. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}

