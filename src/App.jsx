import { Link, NavLink, Route, Routes } from 'react-router-dom';
import logo from './assets/logo.png';

import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import HomePage from './pages/HomePage.jsx';
import QuerySentPage from './pages/QuerySentPage.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="TL Ke Bolo home">
          <img src={logo} alt="TL Ke Bolo logo" className="brand-logo" />
          <span>TL</span> Ke Bolo
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/query-sent" element={<QuerySentPage />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <p className="contact-info">
            Email: <a href="mailto:support@tlkebolo.com">support@tlkebolo.com</a> | 
            Phone: <a href="tel:+1234567890">+1 234 567 890</a>
          </p>
          <p className="copyright">&copy; {new Date().getFullYear()} TL Ke Bolo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
