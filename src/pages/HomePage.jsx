import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../projects.js';

export default function HomePage() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotsCount, setDotsCount] = useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      if (scrollWidth <= clientWidth) {
        setDotsCount(0);
      } else {
        const cardWidth = 280 + 24;
        const maxScroll = scrollWidth - clientWidth;
        // Number of possible snap stops
        const count = Math.ceil(maxScroll / cardWidth) + 1;
        setDotsCount(count);
      }
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY * 2.5, behavior: 'auto' });
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = 280 + 24; // Based on min-width 280px + gap 24px
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < dotsCount) {
        setActiveIndex(newIndex);
      }
    }
  };

  const handleDotClick = (index) => {
    if (scrollRef.current) {
      const cardWidth = 280 + 24;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  return (
    <div className="home-container">
      <section className="portfolio-hero">
        <div className="portfolio-hero-copy">
          <p className="portfolio-hero-kicker">NestJS Developer</p>
          <h1>Building Scalable Backend Solutions with <span className="text-red">NestJS</span></h1>
          <p className="portfolio-hero-subtitle">
            Passionate about building robust, maintainable and high-performance backend applications using NestJS, TypeScript and modern technologies.
          </p>
          <div className="portfolio-hero-actions">
            <Link className="portfolio-btn primary" to="/projects">
              View My Work
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
            <a className="portfolio-btn outline" href="/resume.pdf" download>
              Download Resume
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            </a>
          </div>
          <div className="portfolio-hero-stats">
            <div className="stat-item">
              <div className="stat-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div className="stat-text">
                <h4>3+</h4>
                <p>Years Experience</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
              </div>
              <div className="stat-text">
                <h4>10+</h4>
                <p>Projects Completed</p>
              </div>
            </div>
          </div>
        </div>
        <div className="portfolio-hero-image">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="#ef4444">
            <path d="M165.7 6.4c-3.1-2.6-7.5-2.2-10.3.9l-11.5 13.1c-14.9-8.4-32.1-13.1-50.4-13.1-34.9 0-66.2 16.2-86.4 41.5-2.2 2.7-1.8 6.7.9 8.9 2.7 2.2 6.7 1.8 8.9-.9C34.8 35.1 61.6 21 93.5 21c15 0 29.2 3.8 41.6 10.6L129.8 38c-2.3 2.6-2 6.6.6 8.9 2.6 2.3 6.6 2 8.9-.6l18.4-20.9c2-2.3 3.6-5.1 4.5-8.1 1.7-5.5 1-11.4-2.1-16L165.7 6.4z"></path>
            <path d="M192.4 82.2c0-2-1.6-3.6-3.6-3.6h-7.6c1.3-4.1 2-8.3 2-12.7 0-3.3-.4-6.6-1.1-9.7l9.7-17.7c1-1.8.3-4.1-1.5-5.1-1.8-1-4.1-.3-5.1 1.5l-9.8 17.8C162.7 34 141.4 20.3 116.8 16c-.2 0-.4 0-.6 0H116c4.6 27.2 27.2 48.6 54.8 51.5 2 .2 3.6-1.2 3.8-3.2.2-2-1.2-3.6-3.2-3.8-23.7-2.5-42.5-20.3-46.5-43.2-1.5 0-3 .1-4.4.2C101.4 19 83.3 32.8 74.3 50.8L84 62.4c1.3 1.5 1 3.8-.5 5.1-1.5 1.3-3.8 1-5.1-.5l-9.5-11.4c-.6-.7-1.4-1.1-2.2-1.2-6.2 11.2-9.6 24.2-9.6 37.8 0 35.8 24.1 66 57 75.6v-14c0-2 1.6-3.6 3.6-3.6h12.5c2 0 3.6 1.6 3.6 3.6v14.4c31.1-10.4 53.6-40.1 53.6-74.9 0-1.4 0-2.8-.2-4.1h8.6c2 0 3.6-1.6 3.6-3.6z"></path>
          </svg>
        </div>
      </section>

      <section className="portfolio-about">
        <div className="portfolio-about-content">
          <div className="portfolio-about-kicker">About Me</div>
          <h2>Backend Developer with a Passion for <span className="text-red">Clean Code</span></h2>
          <p className="portfolio-about-desc">
            I'm a passionate NestJS developer with 3 years of experience building scalable, secure and efficient backend applications. I love solving complex problems and crafting APIs that power amazing digital experiences.
          </p>
          <ul className="portfolio-about-list">
            <li>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Strong expertise in Node JS, NestJS, TypeScript, and PostgreSQL
            </li>

            <li>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              Focused on clean architecture and best practices
            </li>
            <li>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
              Always learning and building new things
            </li>
          </ul>
          <a className="portfolio-btn outline" style={{ borderColor: '#e5e7eb', color: '#c4c7cb' }} href="/resume.pdf" download>
            Download Resume
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          </a>
        </div>
        <div className="portfolio-about-image">
          <div className="portfolio-about-img-wrapper">
            <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop" alt="Profile" />
          </div>
          <div className="about-floating-card">
            <div className="icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <div className="text">
              <h4>3+</h4>
              <p>Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-skills">
        <div className="portfolio-skills-kicker">Skills</div>
        <h2>Technologies I Work With</h2>
        <div className="skills-grid">
          <div className="skill-card">
            <svg viewBox="0 0 24 24" fill="#E0234E" xmlns="http://www.w3.org/2000/svg"><path d="M12 0L0 6v12l12 6 12-6V6l-12-6zm0 2.3l9.6 4.8-1.5.8L12 3.9 3.9 7.9 2.4 7.1 12 2.3z" /></svg>
            <span>NestJS</span>
          </div>
          <div className="skill-card">
            <svg viewBox="0 0 24 24" fill="#3178C6" xmlns="http://www.w3.org/2000/svg"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM13.298 12.433c2.09-.948 4.298-2.613 4.298-5.32 0-3.328-2.846-4.63-6.264-4.63H5.32v18.73h3.504v-6.953h2.385l3.856 6.953h4.053l-4.475-7.794c-1.345-.316-2.5-1.57-2.5-3.38v-.076z" /></svg>
            <span>TypeScript</span>
          </div>
          <div className="skill-card">
            <svg viewBox="0 0 24 24" fill="#339933" xmlns="http://www.w3.org/2000/svg"><path d="M11.83 0l-9.82 5.67v11.34l9.82 5.67 9.82-5.67V5.67L11.83 0zm4.55 16.48l-8.62-4.98V4.65l8.62 4.98 8.62-4.98v6.85l-8.62 4.98z" /></svg>
            <span>Node.js</span>
          </div>
          <div className="skill-card">
            <svg viewBox="0 0 24 24" fill="#4169E1" xmlns="http://www.w3.org/2000/svg"><path d="M12 0l-12 6v12l12 6V6l-12-6z" /></svg>
            <span>PostgreSQL</span>
          </div>
          <div className="skill-card">
            <svg viewBox="0 0 24 24" fill="#47A248" xmlns="http://www.w3.org/2000/svg"><path d="M12 0l-12 6v12l12 6V6l-12-6z" /></svg>
            <span>MongoDB</span>
          </div>
          <div className="skill-card">
            <svg viewBox="0 0 24 24" fill="#DC382D" xmlns="http://www.w3.org/2000/svg"><path d="M12 0l-12 6v12l12 6V6l-12-6z" /></svg>
            <span>Redis</span>
          </div>

          <div className="skill-card">
            <svg viewBox="0 0 24 24" fill="#F05032" xmlns="http://www.w3.org/2000/svg"><path d="M12 0l-12 6v12l12 6V6l-12-6z" /></svg>
            <span>Git</span>
          </div>
          <div className="skill-card">
            <svg viewBox="0 0 24 24" fill="#85EA2D" xmlns="http://www.w3.org/2000/svg"><path d="M12 0l-12 6v12l12 6V6l-12-6z" /></svg>
            <span>Swagger</span>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-header">
          <h2>Projects Successfully Delivered</h2>
          <p>
            We have successfully developed and launched scalable web and mobile
            applications for clients across multiple industries.
          </p>
        </div>

        <div
          className="feature-grid hide-scrollbar"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {projects.map((item) => (
            <article className="feature-card img-card-design" key={item.slug}>
              <div className="card-text-body">
                <div
                  className="feature-icon project-letter-icon"
                  aria-hidden="true"
                >
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

                <p className="clamped-text" style={{ WebkitLineClamp: 4 }}>
                  {item.summary}
                </p>

                <div className="card-footer-row">
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Live Website
                  </a>

                  <Link
                    to={`/projects#${item.slug}`}
                    className="project-link"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {dotsCount > 0 && (
          <div className="carousel-dots">
            {Array.from({ length: dotsCount }).map((_, index) => (
              <span
                key={index}
                className={`dot ${index === activeIndex ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
