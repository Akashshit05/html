import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.message || 'Login failed. Check your credentials.');
        setLoading(false);
        return;
      }

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', data.user?.username || 'Admin');
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Network error. Please make sure backend server is running.');
      setLoading(false);
    }
  }


  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-badge">⚡ Admin Portal</div>
        <h2>Admin Authentication</h2>
        <p className="admin-login-subtitle">Sign in to manage queries, projects, and skills</p>

        {error && <div className="admin-error-box">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-field">
            <label htmlFor="admin-username">Username</label>
            <input
              id="admin-username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn primary span-all admin-submit-btn" type="submit" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
