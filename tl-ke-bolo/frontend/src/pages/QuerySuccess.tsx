import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const QuerySuccess = () => {
  const location = useLocation();
  const queryId = location.state?.queryId || 'UNKNOWN';

  return (
    <div className="container min-h-screen" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <motion.div className="glass-panel text-center" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <h2 style={{ color: 'var(--success)', marginBottom: '1rem', fontSize: '2rem' }}>Success!</h2>
        <p className="mb-1" style={{ color: 'var(--text-secondary)' }}>Your query has been submitted successfully.</p>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Tracking ID: <strong className="text-primary">{queryId}</strong></p>
        <Link to="/" className="btn">Return Home</Link>
      </motion.div>
    </div>
  );
};
export default QuerySuccess;
