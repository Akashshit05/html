import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const highlights = [
  {
    title: 'Drop the Scene',
    text: 'Bug, blocker, deadline drama, or just one emotional production deploy. We got you covered with a seamless workflow.'
  },
  {
    title: 'Admin Gets Pinged',
    text: 'Your query shoots straight into our secure MongoDB Atlas cluster, instantly pinging the admin with full situational context.'
  },
  {
    title: 'Zero Lost Messages',
    text: 'The confirmation arrives strictly after the database validates your carefully curated chaos. Reliability at its peak.'
  },
  {
    title: 'Real-time Sync',
    text: 'Updates propagate instantly so your entire team knows the exact status of your deploy tickets without refreshing.'
  },
  {
    title: 'Rich Analytics',
    text: 'Visualize your most frequent bottlenecks with out-of-the-box analytical dashboards built right into the platform.'
  },
  {
    title: 'Extensible APIs',
    text: 'Integrate directly with Slack, Jira, and GitHub without breaking a sweat through our unified API endpoints.'
  }
];

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
      <section className="hero-section">
        <div className="hero-copy">
          <p className="kicker">HELPDESK PORTAL</p>

          <h1>
            Streamline Support. Resolve Issues Faster.
          </h1>

          <p className="subtitle">
            A modern helpdesk platform designed to simplify communication between
            users, support teams, and administrators. Submit queries, track progress,
            and receive timely resolutions from one centralized dashboard.
          </p>

          <div className="actions">
            <Link className="btn primary" to="/contact">
              Submit a Ticket
            </Link>
          </div>
        </div>

      </section>

      <section className="features-section">
        <div className="section-header">
          <h2>Engineered for Performance</h2>
          <p>We packed the simplest workflow with the most powerful underlying logic.</p>
        </div>

        <div
          className="feature-grid hide-scrollbar"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {highlights.map((item, i) => (
            <article className="feature-card img-card-design" key={item.title}>
              <div className="card-text-body">
                <div className="feature-icon" style={{ color: '#D4AF37' }}>✨</div>
                <h3>{item.title}</h3>
                <p className="clamped-text" style={{ WebkitLineClamp: 4 }}>{item.text}</p>
                <div className="card-footer-row">
                  <span className="source-label">System feature</span>
                  <div className="see-more-link">SEE MORE</div>
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
                className={`dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
