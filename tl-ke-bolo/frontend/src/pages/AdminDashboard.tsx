import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [queries, setQueries] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchQueries = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/admin/owner');
      const res = await axios.get(`/api/queries?search=${search}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQueries(res.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/admin/owner');
      }
    }
  };

  useEffect(() => {
    fetchQueries();
  }, [search]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/queries/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchQueries();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="container min-h-screen">
      <motion.div className="glass-panel mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex-between mb-1">
          <h2 className="text-primary">Admin Dashboard</h2>
          <input 
            type="text" 
            placeholder="Search queries..." 
            className="search-bar" 
            style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((q) => (
                <tr key={q._id}>
                  <td style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>{q.queryId}</td>
                  <td>
                    <div>{q.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{q.email}</div>
                  </td>
                  <td>{q.subject}</td>
                  <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{q.message}</td>
                  <td>{new Date(q.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge status-${q.status.replace(' ', '')}`}>
                      {q.status}
                    </span>
                  </td>
                  <td>
                    <select 
                      value={q.status} 
                      onChange={(e) => updateStatus(q._id, e.target.value)}
                      style={{ padding: '0.25rem', borderRadius: '4px', background: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid var(--primary)' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {queries.length === 0 && (
             <p style={{textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)'}}>No queries found.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};
export default AdminDashboard;
