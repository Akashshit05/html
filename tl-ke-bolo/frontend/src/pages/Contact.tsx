import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/queries', formData);
      if (res.data.success) {
        navigate('/query-sent', { state: { queryId: res.data.queryId } });
      }
    } catch (err) {
      alert('Failed to submit query. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container min-h-screen flex-center" style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <motion.div className="glass-panel" style={{ width: '100%', maxWidth: '600px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-center mb-1 text-primary">Submit a Query</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input name="subject" required value={formData.subject} onChange={handleChange} placeholder="What is this about?" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" required rows={5} value={formData.message} onChange={handleChange} placeholder="Explain your query in detail..."></textarea>
          </div>
          <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Sending...' : 'Submit Query'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
export default Contact;
