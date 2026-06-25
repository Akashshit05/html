import { Link, useLocation } from 'react-router-dom';

export default function QuerySentPage() {
  const location = useLocation();
  const queryId = location.state?.queryId;

  return (
    <section className="sent-section">
      <div className="sent-card">
        <p className="kicker">TL verdict ready</p>
        <h1>Query Sent</h1>
        <p className="subtitle">
          Message saved in MongoDB. Admin notification has been triggered. Your
          production-level dard now has a ticket-shaped destiny.
        </p>
        {queryId ? <p className="query-id">Reference #{queryId}</p> : null}
        <div className="actions">
          <Link className="btn primary" to="/contact">
            Send Another
          </Link>
          <Link className="btn secondary" to="/">
            Back Home
          </Link>
        </div>
      </div>
    </section>
  );
}
