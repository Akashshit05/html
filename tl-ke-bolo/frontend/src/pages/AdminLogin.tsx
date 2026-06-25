import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/login', { username, password });
      if (res.data.access_token) {
        localStorage.setItem('token', res.data.access_token);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container auth-container">
      <motion.div className="glass-panel" style={{ width: '100%', maxWidth: '400px' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-center mb-1 text-primary">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>Login</button>
        </form>
      </motion.div>
    </div>
  );
};
export default AdminLogin;
