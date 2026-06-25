import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="container min-h-screen">
      <motion.div 
        className="hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Welcome to TL Ke Bolo</h1>
        <p>The ultimate platform for seamlessly submitting your queries and getting them resolved faster than ever. Speak up, we are listening.</p>
        <Link to="/contact" className="btn" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
          Submit a Query
        </Link>
      </motion.div>
    </div>
  );
};
export default Home;
