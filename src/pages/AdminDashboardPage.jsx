import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'projects', 'skills', 'queries', 'settings'
  const [queries, setQueries] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [settings, setSettings] = useState({
    email: 'hello@fullstack.dev',
    phone: '+1 234 567 890',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://x.com'
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  // Modals & Form states
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [newSkillName, setNewSkillName] = useState('');

  // Password Change state
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [passLoading, setPassLoading] = useState(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [queryFilterStatus, setQueryFilterStatus] = useState('all');
  const projectsSliderRef = useRef(null);
  const [projectSlide, setProjectSlide] = useState(0);
  const [projectsPerSlide, setProjectsPerSlide] = useState(3);

  const token = localStorage.getItem('adminToken');
  const adminUser = localStorage.getItem('adminUser') || 'Admin';

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    loadAllData();
  }, [token, navigate]);

  useEffect(() => {
    const slider = projectsSliderRef.current;
    if (!slider) return undefined;

    const updateProjectsPerSlide = () => {
      const nextValue = slider.clientWidth < 560 ? 1 : slider.clientWidth < 900 ? 2 : 3;
      setProjectsPerSlide(nextValue);
      setProjectSlide(0);
      slider.scrollTo({ left: 0 });
    };

    updateProjectsPerSlide();
    const observer = new ResizeObserver(updateProjectsPerSlide);
    observer.observe(slider);
    return () => observer.disconnect();
  }, [projects.length, activeTab]);

  const projectSlideCount = Math.max(1, Math.ceil(projects.length / projectsPerSlide));

  function goToProjectSlide(index) {
    const slider = projectsSliderRef.current;
    if (!slider) return;
    const target = Math.min(index, projectSlideCount - 1);
    setProjectSlide(target);
    slider.scrollTo({ left: target * slider.clientWidth, behavior: 'smooth' });
  }

  function handleProjectSliderScroll() {
    const slider = projectsSliderRef.current;
    if (!slider || projectSlideCount <= 1) return;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const nextSlide = maxScroll > 0
      ? Math.round((slider.scrollLeft / maxScroll) * (projectSlideCount - 1))
      : 0;
    setProjectSlide(nextSlide);
  }

  async function loadAllData() {
    setLoading(true);
    setError('');
    try {
      const [resQueries, resContent, resSettings] = await Promise.all([
        fetch('/api/admin/queries', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/content', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/settings', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (resQueries.status === 401 || resContent.status === 401 || resSettings.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        return;
      }

      const dataQueries = await resQueries.json();
      const dataContent = await resContent.json();
      const dataSettings = await resSettings.json();

      if (dataQueries.ok) setQueries(dataQueries.queries || []);
      if (dataContent.ok) {
        setProjects(dataContent.projects || []);
        setSkills(dataContent.skills || []);
      }
      if (dataSettings.ok && dataSettings.settings) {
        setSettings(dataSettings.settings);
      }
    } catch (err) {
      setError('Error fetching data from MongoDB backend.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (e) { }
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  }

  function showNotification(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  }

  // --- PROJECT HELPERS ---
  function openNewProject() {
    setEditingProject({
      title: '',
      slug: '',
      category: 'BUSINESS WORKFLOW BACKEND',
      icon: 'BE',
      summary: '',
      description: '',
      website: '',
      playstore: '',
      metrics: [
        { label: 'WORKFLOW', value: '' },
        { label: 'ROLE', value: '' },
        { label: 'FOCUS', value: '' }
      ],
      features: '',
      stack: 'Node.js, NestJS, TypeScript, MongoDB',
      results: '',
      published: true
    });
  }

  function openEditProject(proj) {
    setEditingProject({
      ...proj,
      metrics: Array.isArray(proj.metrics) && proj.metrics.length > 0
        ? proj.metrics.map(m => ({ label: m.label || '', value: m.value || '' }))
        : [
            { label: 'WORKFLOW', value: '' },
            { label: 'ROLE', value: '' },
            { label: 'FOCUS', value: '' }
          ],
      features: Array.isArray(proj.features) ? proj.features.join('\n') : (proj.features || ''),
      stack: Array.isArray(proj.stack) ? proj.stack.join(', ') : (proj.stack || ''),
      results: Array.isArray(proj.results) ? proj.results.join('\n') : (proj.results || '')
    });
  }

  function handleMetricChange(index, field, val) {
    if (!editingProject) return;
    const updatedMetrics = [...(editingProject.metrics || [])];
    updatedMetrics[index] = { ...updatedMetrics[index], [field]: val };
    setEditingProject({ ...editingProject, metrics: updatedMetrics });
  }

  function addMetricField() {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      metrics: [...(editingProject.metrics || []), { label: '', value: '' }]
    });
  }

  function removeMetricField(index) {
    if (!editingProject) return;
    const updatedMetrics = editingProject.metrics.filter((_, idx) => idx !== index);
    setEditingProject({ ...editingProject, metrics: updatedMetrics });
  }

  // --- QUERY ACTIONS ---
  async function handleQueryStatusChange(id, newStatus) {
    try {
      const res = await fetch(`/api/admin/queries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.ok) {
        setQueries((prev) => prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q)));
        if (selectedQuery && selectedQuery.id === id) setSelectedQuery((prev) => ({ ...prev, status: newStatus }));
        showNotification(`Query status changed to '${newStatus}'`);
      }
    } catch (err) {
      showNotification('Failed to update query status.');
    }
  }

  async function handleDeleteQuery(id) {
    if (!window.confirm('Are you sure you want to delete this query?')) return;
    try {
      const res = await fetch(`/api/admin/queries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.ok) {
        setQueries((prev) => prev.filter((q) => q.id !== id));
        if (selectedQuery && selectedQuery.id === id) setSelectedQuery(null);
        showNotification('Query deleted from database.');
      }
    } catch (err) {
      showNotification('Failed to delete query.');
    }
  }

  // --- PROJECT CRUD ---
  async function handleSaveProject(e) {
    e.preventDefault();
    const isEdit = Boolean(editingProject.id);
    const url = isEdit ? `/api/admin/projects/${editingProject.id}` : '/api/admin/projects';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editingProject)
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        showNotification(data.message || 'Error saving project.');
        return;
      }
      showNotification(isEdit ? 'Project updated in DB!' : 'New project added to DB!');
      setEditingProject(null);
      loadAllData();
    } catch (err) {
      showNotification('Failed to save project.');
    }
  }

  async function handleDeleteProject(id) {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        showNotification('Project deleted from DB.');
      }
    } catch (err) {
      showNotification('Failed to delete project.');
    }
  }

  async function handleProjectVisibility(proj) {
    const published = proj.published === false;

    try {
      const res = await fetch(`/api/admin/projects/${proj.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...proj, published })
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        showNotification(data.message || 'Failed to change project visibility.');
        return;
      }

      setProjects((current) =>
        current.map((item) => (item.id === proj.id ? data.project : item))
      );
      showNotification(published ? 'Project is now visible.' : 'Project is now hidden.');
    } catch (err) {
      showNotification('Failed to change project visibility.');
    }
  }

  // --- SKILL CRUD ---
  async function handleAddSkill(e) {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    try {
      const res = await fetch('/api/admin/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: newSkillName.trim() })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        showNotification(data.message || 'Error adding skill.');
        return;
      }
      showNotification(`Skill '${newSkillName}' saved to DB!`);
      setNewSkillName('');
      loadAllData();
    } catch (err) {
      showNotification('Failed to add skill.');
    }
  }

  async function handleDeleteSkill(id) {
    if (!window.confirm('Delete this skill from MongoDB?')) return;
    try {
      const res = await fetch(`/api/admin/skills/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.ok) {
        setSkills((prev) => prev.filter((s) => s.id !== id));
        showNotification('Skill deleted from DB.');
      }
    } catch (err) {
      showNotification('Failed to delete skill.');
    }
  }

  // --- SETTINGS CONTROLS ---
  async function handleSaveSettings(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.ok) {
        setSettings(data.settings);
        showNotification('Contact & Social settings updated in MongoDB!');
      } else {
        showNotification(data.message || 'Failed to update settings.');
      }
    } catch (err) {
      showNotification('Failed to update settings.');
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    if (!passwords.currentPassword || !passwords.newPassword) return;
    setPassLoading(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(passwords)
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        showNotification('Admin password updated in MongoDB!');
        setPasswords({ currentPassword: '', newPassword: '' });
      } else {
        showNotification(data.message || 'Failed to change password.');
      }
    } catch (err) {
      showNotification('Failed to change password.');
    } finally {
      setPassLoading(false);
    }
  }

  // Filter queries
  const filteredQueries = queries.filter((q) => {
    const matchesSearch =
      q.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = queryFilterStatus === 'all' ? true : q.status === queryFilterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="admin-app-layout">
      {/* LEFT SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">⚡</div>
          <span className="sidebar-title">Dashboard</span>
        </div>

        <nav className="sidebar-menu">
          <button
            className={`sidebar-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="icon">📊</span>
            <span>Dashboard</span>
          </button>
          <button
            className={`sidebar-link ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <span className="icon">📁</span>
            <span>Projects</span>
          </button>
          <button
            className={`sidebar-link ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <span className="icon">⚡</span>
            <span>Skills</span>
          </button>
          <button
            className={`sidebar-link ${activeTab === 'queries' ? 'active' : ''}`}
            onClick={() => setActiveTab('queries')}
          >
            <span className="icon">📩</span>
            <span>Queries ({queries.filter((q) => q.status === 'unread').length})</span>
          </button>
          <button
            className={`sidebar-link ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="icon">⚙️</span>
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-link logout" onClick={handleLogout}>
            <span className="icon">🚪</span>
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="admin-main-viewport">
        {/* TOP BAR */}
        <header className="admin-dashboard-topbar">
          <div className="topbar-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="topbar-right">
            <button className="icon-btn" onClick={loadAllData} title="Refresh data from DB">
              🔄
            </button>
            <div className="user-profile-badge">
              <span className="avatar">A</span>
              <span className="username">{adminUser}</span>
            </div>
          </div>
        </header>

        {toast && <div className="admin-toast">{toast}</div>}

        {loading ? (
          <div className="admin-loading-card">
            <div className="spinner"></div>
            <p>Fetching real-time data from database...</p>
          </div>
        ) : error ? (
          <div className="admin-error-box">{error}</div>
        ) : (
          <>
            {/* 1. DASHBOARD TAB OVERVIEW */}
            {activeTab === 'dashboard' && (
              <div className="dashboard-content-view">
                <div className="ui-stats-row">
                  <div className="ui-stat-card">
                    <div className="stat-icon-wrapper blue">🚀</div>
                    <div className="stat-text-group">
                      <span className="value">3+ years</span>
                      <span className="label">Experiance</span>
                    </div>
                  </div>

                  <div className="ui-stat-card">
                    <div className="stat-icon-wrapper purple">🛒</div>
                    <div className="stat-text-group">
                      <span className="value">{skills.length}</span>
                      <span className="label">Skills</span>
                    </div>
                  </div>

                  <div className="ui-stat-card">
                    <div className="stat-icon-wrapper cyan">
                      <code>&lt;/&gt;</code>
                    </div>
                    <div className="stat-text-group">
                      <span className="value">{projects.length}</span>
                      <span className="label">Projects Created</span>
                    </div>
                  </div>
                </div>

                <div className="ui-middle-grid">
                  <div className="ui-card chart-card">
                    <div className="card-header">
                      <h3>Traffic Overview</h3>
                      <div className="pill-toggle">
                        <button className="pill-btn active">This Month</button>
                        <button className="pill-btn">This Year</button>
                      </div>
                    </div>
                    <div className="chart-wrapper">
                      <svg viewBox="0 0 500 150" className="traffic-chart-svg">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 10 110 Q 70 40, 130 90 T 250 60 T 370 100 T 490 30 L 490 140 L 10 140 Z"
                          fill="url(#chartGradient)"
                        />
                        <path
                          d="M 10 110 Q 70 40, 130 90 T 250 60 T 370 100 T 490 30"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="3"
                        />
                      </svg>
                      <div className="chart-x-axis">
                        <span>M</span>
                        <span>T</span>
                        <span>W</span>
                        <span>T</span>
                        <span>F</span>
                        <span>S</span>
                        <span>S</span>
                      </div>
                    </div>
                  </div>

                  <div className="ui-card activity-card">
                    <div className="card-header">
                      <h3>Activity</h3>
                      <button className="text-btn">View all</button>
                    </div>
                    <div className="activity-list">
                      <div className="activity-item">
                        <div className="act-icon blue">🚀</div>
                        <div className="act-info">
                          <strong>New sign-up</strong>
                          <span>Admin session connected</span>
                        </div>
                        <span className="act-time">2h ago</span>
                      </div>

                      <div className="activity-item">
                        <div className="act-icon purple">💎</div>
                        <div className="act-info">
                          <strong>Project Launched</strong>
                          <span>{projects[0]?.title || 'TL Ke Bolo'} updated</span>
                        </div>
                        <span className="act-time">6h ago</span>
                      </div>

                      <div className="activity-item">
                        <div className="act-icon cyan">⚡</div>
                        <div className="act-info">
                          <strong>Task Completed</strong>
                          <span>{queries.length} incoming contact queries managed</span>
                        </div>
                        <span className="act-time">1d ago</span>
                      </div>
                    </div>
                  </div>
                </div>

           <div className="ui-bottom-grid">
          <div className="ui-card projects-summary-card">
            <h3>My Projects ({projects.length})</h3>

            <div
              className="my-projects-slider"
              role="region"
              aria-label="Dashboard projects"
              tabIndex="0"
              ref={projectsSliderRef}
              onScroll={handleProjectSliderScroll}
            >
              {projects.map((p, idx) => (
                <div className="p-mini-card" key={p.id || idx}>
                  <strong>{p.title}</strong>

                  <div className="progress-bar">
                   {p.category}
                  </div>
                   <p>{p.summary}</p>
                      <div className="stack-tags">
                        {Array.isArray(p.stack) &&
                          p.stack.map((s) => <span key={s}>{s}</span>)}
                      </div>

                  <span className="pct">
                    {Math.min((idx + 1) * 20 + 20, 100)}%
                  </span>
                </div>
              ))}
            </div>
            {projectSlideCount > 1 && (
              <div className="project-slider-dots" aria-label="Project pages">
                {Array.from({ length: projectSlideCount }, (_, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`project-slider-dot ${projectSlide === index ? 'active' : ''}`}
                    onClick={() => goToProjectSlide(index)}
                    aria-label={`Show project page ${index + 1}`}
                    aria-current={projectSlide === index ? 'true' : undefined}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
              </div>
            )}

            {/* 2. PROJECTS MANAGEMENT TAB */}
            {activeTab === 'projects' && (
              <div className="tab-pane">
                <div className="pane-header">
                  <div>
                    <h2>Projects Management</h2>
                    <p>Add, edit, and organize portfolio projects directly in database</p>
                  </div>
                  <button className="btn primary" onClick={openNewProject}>
                    + Add New Project
                  </button>
                </div>

                <div
                  className="projects-grid-admin"
                  role="region"
                  aria-label="Projects management list"
                  tabIndex="0"
                >
                  {projects.map((proj) => (
                    <div className="admin-proj-card" key={proj.id}>
                      <div className="proj-card-top">
                        <span className="icon-badge">{proj.icon || 'BE'}</span>
                        <span className="category-tag">{proj.category}</span>
                      </div>
                      <h3>{proj.title}</h3>
                      <p>{proj.summary}</p>
                      <div className="stack-tags">
                        {Array.isArray(proj.stack) &&
                          proj.stack.map((s) => <span key={s}>{s}</span>)}
                      </div>
                      <div className="proj-actions">
                        <button
                          className={`action-btn visibility-btn ${proj.published === false ? 'hidden' : 'visible'}`}
                          onClick={() => handleProjectVisibility(proj)}
                          aria-pressed={proj.published !== false}
                          title={proj.published === false ? 'Show this project publicly' : 'Hide this project publicly'}
                        >
                          {proj.published === false ? '🙈 Hidden' : '👁 Visible'}
                        </button>
                        <button className="action-btn edit-btn" onClick={() => openEditProject(proj)}>
                          ✏️ Edit
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteProject(proj.id)}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. SKILLS MANAGEMENT TAB */}
            {activeTab === 'skills' && (
              <div className="tab-pane">
                <div className="pane-header">
                  <div>
                    <h2>Skills Management</h2>
                    <p>All skills are fetched live from database for homepage marquee</p>
                  </div>
                </div>

                <form className="add-skill-form" onSubmit={handleAddSkill}>
                  <input
                    type="text"
                    placeholder="Enter new skill (e.g. Docker, GraphQL, Redis)"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                  />
                  <button className="btn primary" type="submit">
                    + Add Skill
                  </button>
                </form>

                <div className="skills-admin-tags">
                  {skills.map((skill) => (
                    <div className="skill-admin-pill" key={skill.id}>
                      <span>{skill.name}</span>
                      <button
                        className="remove-skill"
                        onClick={() => handleDeleteSkill(skill.id)}
                      >
                        ✖
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. QUERIES / MESSAGES TAB */}
            {activeTab === 'queries' && (
              <div className="tab-pane">
                <div className="pane-header">
                  <div>
                    <h2>Contact Queries</h2>
                    <p>Review customer submissions and update status</p>
                  </div>

                  <div className="status-filter-tabs">
                    <button
                      className={`filter-tab ${queryFilterStatus === 'all' ? 'active' : ''}`}
                      onClick={() => setQueryFilterStatus('all')}
                    >
                      All ({queries.length})
                    </button>
                    <button
                      className={`filter-tab unread ${queryFilterStatus === 'unread' ? 'active' : ''}`}
                      onClick={() => setQueryFilterStatus('unread')}
                    >
                      Unread ({queries.filter((q) => q.status === 'unread').length})
                    </button>
                    <button
                      className={`filter-tab read ${queryFilterStatus === 'read' ? 'active' : ''}`}
                      onClick={() => setQueryFilterStatus('read')}
                    >
                      Read ({queries.filter((q) => q.status === 'read').length})
                    </button>
                    <button
                      className={`filter-tab replied ${queryFilterStatus === 'replied' ? 'active' : ''}`}
                      onClick={() => setQueryFilterStatus('replied')}
                    >
                      Replied ({queries.filter((q) => q.status === 'replied').length})
                    </button>
                  </div>
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Sender</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredQueries.map((q) => (
                        <tr key={q.id} className={`query-row ${q.status}`}>
                          <td className="date-cell">
                            {new Date(q.created_at).toLocaleDateString()}
                          </td>
                          <td className="sender-cell">
                            <div className="sender-name">{q.name}</div>
                            <div className="sender-email">{q.email}</div>
                          </td>
                          <td className="subject-cell">
                            <strong>{q.subject}</strong>
                            <p>{q.message.slice(0, 60)}...</p>
                          </td>
                          <td>
                            <span className={`status-badge ${q.status}`}>
                              {q.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="actions-cell">
                            <button
                              className="action-btn view-btn"
                              onClick={() => {
                                setSelectedQuery(q);
                                if (q.status === 'unread') handleQueryStatusChange(q.id, 'read');
                              }}
                            >
                              👁 View
                            </button>
                            <select
                              className="status-select"
                              value={q.status}
                              onChange={(e) => handleQueryStatusChange(q.id, e.target.value)}
                            >
                              <option value="unread">Unread</option>
                              <option value="read">Read</option>
                              <option value="replied">Replied</option>
                            </select>
                            <button
                              className="action-btn delete-btn"
                              onClick={() => handleDeleteQuery(q.id)}
                            >
                              🗑
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 5. SETTINGS CONTROL TAB */}
            {activeTab === 'settings' && (
              <div className="tab-pane">
                <div className="pane-header">
                  <div>
                    <h2>Site &amp; Contact Settings</h2>
                    <p>Control the GET IN TOUCH box content and admin account security</p>
                  </div>
                </div>

                {/* GET IN TOUCH CONTENT CONTROL FORM */}
                <form onSubmit={handleSaveSettings} className="settings-section-form">
                  <h3>Get In Touch Contact Content</h3>
                  <div className="admin-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      required
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    />
                  </div>

                  <div className="admin-field">
                    <label>Phone / Call Number</label>
                    <input
                      type="text"
                      required
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    />
                  </div>

                  <div className="admin-field">
                    <label>GitHub URL (GH)</label>
                    <input
                      type="url"
                      value={settings.github}
                      onChange={(e) => setSettings({ ...settings, github: e.target.value })}
                    />
                  </div>

                  <div className="admin-field">
                    <label>LinkedIn URL (in)</label>
                    <input
                      type="url"
                      value={settings.linkedin}
                      onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                    />
                  </div>

                  <div className="admin-field">
                    <label>Twitter / X URL (X)</label>
                    <input
                      type="url"
                      value={settings.twitter}
                      onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
                    />
                  </div>

                  <button className="btn primary" type="submit">
                    💾 Save Contact Settings
                  </button>
                </form>

                {/* PASSWORD CHANGE FORM */}
                <form onSubmit={handleChangePassword} className="settings-section-form border-top">
                  <h3>Change Admin Password</h3>
                  <div className="admin-field">
                    <label>Current Password</label>
                    <input
                      type="password"
                      required
                      value={passwords.currentPassword}
                      onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                    />
                  </div>

                  <div className="admin-field">
                    <label>New Password</label>
                    <input
                      type="password"
                      required
                      value={passwords.newPassword}
                      onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    />
                  </div>

                  <button className="btn primary" type="submit" disabled={passLoading}>
                    {passLoading ? 'Updating Password...' : '🔒 Update Password'}
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </main>

      {/* EXPANDED HIGH-END ADD / EDIT PROJECT MODAL */}
      {editingProject && (
        <div className="modal-backdrop" onClick={() => setEditingProject(null)}>
          <div className="modal-content project-modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>{editingProject.id ? 'Edit Project Details' : 'Add New Project'}</h3>
                <p className="modal-subtitle">Configure title, details, tech stack, metrics, and live URLs</p>
              </div>
              <button className="modal-close" onClick={() => setEditingProject(null)}>
                ✖
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="modal-body project-modal-grid">
              {/* SECTION 1: BASIC INFORMATION */}
              <div className="form-section-head">
                <span className="section-badge">1</span>
                <h4>Basic Information</h4>
              </div>

              <div className="admin-field full-width">
                <label>Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Coupon & Subscription API"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                />
              </div>

              <div className="form-row-2col">
                <div className="admin-field">
                  <label>Category Subtitle</label>
                  <input
                    type="text"
                    placeholder="e.g. BUSINESS WORKFLOW BACKEND"
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                  />
                </div>

                <div className="admin-field">
                  <label>Icon / Badge Code (Max 4 chars)</label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="e.g. CS, BE, TL"
                    value={editingProject.icon}
                    onChange={(e) => setEditingProject({ ...editingProject, icon: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-field full-width">
                <label>URL Slug (Unique ID)</label>
                <input
                  type="text"
                  placeholder="e.g. coupon-subscription-api"
                  value={editingProject.slug}
                  onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                />
              </div>

              <div className="admin-field full-width">
                <label>Short Summary (Card Preview)</label>
                <input
                  type="text"
                  placeholder="Short 1-2 sentence overview for project cards"
                  value={editingProject.summary}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                />
              </div>

              <div className="admin-field full-width">
                <label>Full Description (Detailed Overview)</label>
                <textarea
                  rows={4}
                  placeholder="Comprehensive description of backend features, architecture, and business logic..."
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                />
              </div>

              {/* SECTION 2: LIVE LINKS */}
              <div className="form-section-head">
                <span className="section-badge">2</span>
                <h4>Live Links &amp; Demo URLs</h4>
              </div>

              <div className="form-row-2col">
                <div className="admin-field">
                  <label>Live Website URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={editingProject.website}
                    onChange={(e) => setEditingProject({ ...editingProject, website: e.target.value })}
                  />
                </div>

                <div className="admin-field">
                  <label>Play Store / App URL</label>
                  <input
                    type="url"
                    placeholder="https://play.google.com/store/apps/..."
                    value={editingProject.playstore}
                    onChange={(e) => setEditingProject({ ...editingProject, playstore: e.target.value })}
                  />
                </div>
              </div>

              {/* SECTION 3: PROJECT METRICS (Workflow, Role, Focus) */}
              <div className="form-section-head flex-between">
                <div>
                  <span className="section-badge">3</span>
                  <h4>Project Highlight Metrics (Workflow, Role, Focus)</h4>
                </div>
                <button type="button" className="btn-small outline" onClick={addMetricField}>
                  + Add Metric Box
                </button>
              </div>

              <div className="metrics-fields-wrapper">
                {(editingProject.metrics || []).map((metric, idx) => (
                  <div key={idx} className="metric-row-item">
                    <div className="admin-field">
                      <label>Label #{idx + 1}</label>
                      <input
                        type="text"
                        placeholder="e.g. WORKFLOW, ROLE, FOCUS"
                        value={metric.label}
                        onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                      />
                    </div>
                    <div className="admin-field flex-grow">
                      <label>Value #{idx + 1}</label>
                      <input
                        type="text"
                        placeholder="e.g. Coupons, API Dev, Data Rules"
                        value={metric.value}
                        onChange={(e) => handleMetricChange(idx, 'value', e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn-remove-metric"
                      onClick={() => removeMetricField(idx)}
                      title="Remove Metric"
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>

              {/* SECTION 4: FEATURES, TECH STACK & OUTCOMES */}
              <div className="form-section-head">
                <span className="section-badge">4</span>
                <h4>Technical Specifications &amp; Features</h4>
              </div>

              <div className="admin-field full-width">
                <label>Tech Stack Tags (Comma separated)</label>
                <input
                  type="text"
                  placeholder="NestJS, Node.js, MongoDB, TypeScript, REST APIs, Docker"
                  value={editingProject.stack}
                  onChange={(e) => setEditingProject({ ...editingProject, stack: e.target.value })}
                />
              </div>

              <div className="admin-field full-width">
                <label>Key Features (One feature per line)</label>
                <textarea
                  rows={4}
                  placeholder="Coupon creation and redemption workflows&#10;Membership-aware offer availability&#10;Admin APIs for managing promotions"
                  value={editingProject.features}
                  onChange={(e) => setEditingProject({ ...editingProject, features: e.target.value })}
                />
              </div>

              <div className="admin-field full-width">
                <label>Outcomes / Results (One outcome per line)</label>
                <textarea
                  rows={3}
                  placeholder="Made promotional workflows easier to manage&#10;Improved consistency in coupon and subscription state"
                  value={editingProject.results}
                  onChange={(e) => setEditingProject({ ...editingProject, results: e.target.value })}
                />
              </div>

              {/* SECTION 5: PUBLISHED STATUS */}
              <div className="admin-field-checkbox">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={editingProject.published !== false}
                    onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                  />
                  <span className="checkmark"></span>
                  <strong>Publish Project</strong> (Visible on main site and projects page)
                </label>
              </div>

              <div className="modal-footer sticky-footer">
                <button className="btn secondary" type="button" onClick={() => setEditingProject(null)}>
                  Cancel
                </button>
                <button className="btn primary" type="submit">
                  💾 Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUERY DETAIL MODAL */}
      {selectedQuery && (
        <div className="modal-backdrop" onClick={() => setSelectedQuery(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Query Details</h3>
              <button className="modal-close" onClick={() => setSelectedQuery(null)}>
                ✖
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-group">
                <label>From:</label>
                <p>
                  <strong>{selectedQuery.name}</strong> (&lt;{selectedQuery.email}&gt;)
                </p>
              </div>
              <div className="detail-group">
                <label>Subject:</label>
                <p className="detail-subject">{selectedQuery.subject}</p>
              </div>
              <div className="detail-group">
                <label>Message:</label>
                <div className="detail-message">{selectedQuery.message}</div>
              </div>
            </div>
            <div className="modal-footer">
              <a
                className="btn primary"
                href={`mailto:${selectedQuery.email}?subject=Re: ${encodeURIComponent(selectedQuery.subject)}`}
                onClick={() => handleQueryStatusChange(selectedQuery.id, 'replied')}
              >
                ✉ Reply via Email
              </a>
              <button className="btn secondary" onClick={() => setSelectedQuery(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
