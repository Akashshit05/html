import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="container min-h-screen">
      <motion.div className="glass-panel mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="mb-1 text-primary">About Us</h2>
        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
          At TL Ke Bolo, we believe in the power of communication. Our platform acts as a bridge between users and administrators, ensuring that every query is heard, tracked, and resolved effectively. With a focus on modern design, transparency, and efficiency, we are redefining query management.
        </p>
      </motion.div>
    </div>
  );
};
export default About;
