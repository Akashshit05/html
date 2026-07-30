import { useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import QuerySentPage from './pages/QuerySentPage.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import { useContent } from './useContent.js';

import './portfolio.css';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { settings } = useContent();
  const closeMenu = () => setIsMenuOpen(false);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAdminDashboard = location.pathname === '/admin/dashboard';

  return (
    <div className={`app-shell${isAdminDashboard ? ' admin-dashboard-shell' : ''}`}>
      {!isAdminRoute && (
        <header className="site-header">
          <Link className="brand" to="/" aria-label="Backend developer home" onClick={closeMenu}>
            <span className="brand-mark" aria-hidden="true">BE</span>
            <span>Backend</span>Dev
          </Link>

          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label="Show navigation options"
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
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
            <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            <a href="/#about" onClick={closeMenu}>About</a>
            <a href="/#skills" onClick={closeMenu}>Skills</a>
            <a href="/#projects" onClick={closeMenu}>Projects</a>
            <a href="/#services" onClick={closeMenu}>Services</a>
            <a href="/#contact" onClick={closeMenu}>Contact</a>
          </nav>
        </header>
      )}

      {isAdminRoute && !isAdminDashboard && (
        <header className="site-header admin-minimal-header">
          <Link className="brand" to="/" aria-label="Backend developer home">
            <span className="brand-mark" aria-hidden="true">BE</span>
            <span>Backend</span>Dev
          </Link>
          <div className="nav-links">
            <NavLink to="/">← Back to Main Site</NavLink>
            <NavLink to="/admin/dashboard">Admin Dashboard</NavLink>
          </div>
        </header>
      )}

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectPage />} />
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
          <div className="footer-content">
            <div className="footer-brand">
              <Link className="footer-logo" to="/" aria-label="Backend developer home">
                <span className="brand-mark" aria-hidden="true">BE</span>
                <span>BackendDev</span>
              </Link>
              <p>
                Backend engineering for Node.js and NestJS products, scalable APIs,
                database workflows, cloud-ready services, and production systems.
              </p>
            </div>

            <nav className="footer-links" aria-label="Footer navigation">
              <h3>Explore</h3>
              <Link to="/">Home</Link>
              <a href="/#about">About</a>
              <a href="/#skills">Skills</a>
              <a href="/#projects">Projects</a>
              <a href="/#contact">Contact</a>
              <Link to="/admin/login" style={{ color: 'var(--accent-light)', fontWeight: 700 }}>🔐 Admin Panel</Link>
            </nav>

            <div className="footer-contact">
              <h3>Get in touch</h3>
              <a className="footer-contact-link" href={`mailto:${settings?.email || 'hello@fullstack.dev'}`}>
                <span>Email</span>
                {settings?.email || 'hello@fullstack.dev'}
              </a>
              <a className="footer-contact-link" href={`tel:${(settings?.phone || '+1 234 567 890').replace(/\s+/g, '')}`}>
                <span>Call</span>
                {settings?.phone || '+1 234 567 890'}
              </a>

              <div className="footer-social" aria-label="Social links">
                <a
                  href={settings?.github || 'https://github.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  GH
                </a>
                <a
                  href={settings?.linkedin || 'https://linkedin.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  in
                </a>
                <a
                  href={settings?.twitter || 'https://x.com'}
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
              Copyright {new Date().getFullYear()} <strong>BackendDev</strong>. All rights reserved.
            </p>
            <Link to="/contact">Start a project</Link>
          </div>
        </footer>
      )}
    </div>
  );
}
