import { useEffect, useRef, useState } from 'react';
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

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  const headerRef = useRef(null);
  const location = useLocation();
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    const handlePointerDown = (event) => {
      if (isMenuOpen && headerRef.current && !headerRef.current.contains(event.target)) closeMenu();
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAdminDashboard = location.pathname === '/admin/dashboard';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`app-shell${isAdminDashboard ? ' admin-dashboard-shell' : ''}`}>
      {!isAdminRoute && (
        <header ref={headerRef} className={`site-header${isScrolled ? ' is-scrolled' : ''}${isMenuOpen ? ' menu-open' : ''}`}>
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
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
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
              <NavLink to="/" onClick={closeMenu} end>Home</NavLink>
              <NavLink to="/about" onClick={closeMenu}>About</NavLink>
              <NavLink to="/projects" onClick={closeMenu}>Projects</NavLink>
              <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
            </nav>

            <div className="header-actions">
              <button
                className="theme-toggle"
                type="button"
                onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              >
                <svg className="theme-icon theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="3.5" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
                </svg>
                <svg className="theme-icon theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.2 15.2A8.7 8.7 0 0 1 8.8 3.8a8.7 8.7 0 1 0 11.4 11.4Z" />
                </svg>
              </button>
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
