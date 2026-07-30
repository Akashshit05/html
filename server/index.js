import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  connectDatabase, insertQuery, getQueries, updateQueryStatus, deleteQuery,
  ensureInitialAdmin, loginAdmin, authenticateAdmin, logoutAdmin,
  getProjects, saveProject, deleteProject, getSkills, saveSkill, deleteSkill,
  getSettings, saveSettings, changeAdminPassword, seedContent
} from './db.js';
import { sendAdminNotification } from './email.js';
import { projects as initialProjects } from '../src/projects.js';

const app = express();
const port = Number(process.env.PORT) || 5185;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const initialSkills = [
  'Node.js', 'NestJS', 'TypeScript', 'Express.js', 'MongoDB', 'PostgreSQL',
  'REST APIs', 'GraphQL', 'JWT Auth', 'Microservices', 'Docker', 'Redis', 'AWS'
];

app.use(cors({ origin: true }));
app.use(express.json({ limit: '32kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// Admin auth middleware
async function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ ok: false, message: 'Unauthorized: No token provided.' });
  }
  const token = authHeader.slice(7);
  try {
    const admin = await authenticateAdmin(token);
    if (!admin) {
      return res.status(401).json({ ok: false, message: 'Unauthorized: Invalid or expired session.' });
    }
    req.admin = admin;
    req.adminToken = token;
    next();
  } catch (error) {
    console.error('Admin authentication failed:', error);
    return res.status(401).json({ ok: false, message: 'Unauthorized: Invalid token.' });
  }
}

// Admin Login
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body || {};
  try {
    const session = await loginAdmin(username, password);
    if (session) return res.json({ ok: true, ...session });
  } catch (error) {
    console.log('Admin login failed:', error);
    return res.status(500).json({ ok: false, message: 'Login is temporarily unavailable.' });
  }
  return res.status(401).json({ ok: false, message: 'Invalid username or password.' });
});

app.post('/api/admin/logout', requireAdmin, async (req, res) => {
  await logoutAdmin(req.adminToken);
  res.json({ ok: true });
});

app.get('/api/content', async (_req, res) => {
  try {
    const [projects, skills, settings] = await Promise.all([getProjects(), getSkills(), getSettings()]);
    res.json({ ok: true, projects, skills: skills.map(skill => skill.name), settings });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Failed to load site content.' });
  }
});

app.get('/api/settings', async (_req, res) => {
  try {
    const settings = await getSettings();
    res.json({ ok: true, settings });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Failed to load settings.' });
  }
});

app.get('/api/admin/settings', requireAdmin, async (_req, res) => {
  try {
    const settings = await getSettings();
    res.json({ ok: true, settings });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Failed to load admin settings.' });
  }
});

app.put('/api/admin/settings', requireAdmin, async (req, res) => {
  try {
    const settings = await saveSettings(req.body);
    res.json({ ok: true, settings });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Failed to save settings.' });
  }
});

app.post('/api/admin/change-password', requireAdmin, async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ ok: false, message: 'Both current and new passwords are required.' });
  }
  try {
    const result = await changeAdminPassword(req.admin.username, currentPassword, newPassword);
    res.status(result.ok ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error changing password.' });
  }
});

app.get('/api/admin/content', requireAdmin, async (_req, res) => {
  const [projects, skills] = await Promise.all([getProjects(true), getSkills(true)]);
  res.json({ ok: true, projects, skills });
});

app.post('/api/admin/projects', requireAdmin, async (req, res) => {
  try {
    res.status(201).json({ ok: true, project: await saveProject(null, req.body) });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.code === 11000 ? 'Project slug already exists.' : error.message });
  }
});

app.put('/api/admin/projects/:id', requireAdmin, async (req, res) => {
  try {
    const project = await saveProject(req.params.id, req.body);
    res.status(project ? 200 : 404).json(project ? { ok: true, project } : { ok: false, message: 'Project not found.' });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.code === 11000 ? 'Project slug already exists.' : error.message });
  }
});

app.delete('/api/admin/projects/:id', requireAdmin, async (req, res) => {
  res.json({ ok: await deleteProject(req.params.id) });
});

app.post('/api/admin/skills', requireAdmin, async (req, res) => {
  try {
    res.status(201).json({ ok: true, skill: await saveSkill(null, req.body) });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.code === 11000 ? 'Skill already exists.' : error.message });
  }
});

app.put('/api/admin/skills/:id', requireAdmin, async (req, res) => {
  try {
    const skill = await saveSkill(req.params.id, req.body);
    res.status(skill ? 200 : 404).json(skill ? { ok: true, skill } : { ok: false, message: 'Skill not found.' });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
});

app.delete('/api/admin/skills/:id', requireAdmin, async (req, res) => {
  res.json({ ok: await deleteSkill(req.params.id) });
});

// Get all queries (Admin)
app.get('/api/admin/queries', requireAdmin, async (_req, res) => {
  try {
    const queries = await getQueries();
    return res.json({ ok: true, queries });
  } catch (error) {
    console.error('Error fetching queries:', error);
    return res.status(500).json({ ok: false, message: 'Failed to retrieve queries.' });
  }
});

// Update query status (Admin)
app.patch('/api/admin/queries/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await updateQueryStatus(id, status);
    if (!updated) {
      return res.status(404).json({ ok: false, message: 'Query not found.' });
    }
    return res.json({ ok: true, query: updated });
  } catch (error) {
    console.error('Error updating query status:', error);
    return res.status(500).json({ ok: false, message: 'Failed to update query status.' });
  }
});

// Delete query (Admin)
app.delete('/api/admin/queries/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteQuery(id);
    if (!deleted) {
      return res.status(404).json({ ok: false, message: 'Query not found.' });
    }
    return res.json({ ok: true, message: 'Query deleted successfully.' });
  } catch (error) {
    console.error('Error deleting query:', error);
    return res.status(500).json({ ok: false, message: 'Failed to delete query.' });
  }
});

app.post('/api/queries', async (req, res) => {
  const validation = validateQuery(req.body);

  if (!validation.ok) {
    return res.status(400).json({
      ok: false,
      errors: validation.errors
    });
  }

  try {
    const query = await insertQuery(validation.data);

    try {
      await sendAdminNotification(query);
    } catch (error) {
      console.error('Query saved, but admin email failed:', error);
    }

    return res.status(201).json({
      ok: true,
      queryId: query.id
    });
  } catch (error) {
    console.error('Failed to save query:', error);

    return res.status(500).json({
      ok: false,
      message: 'Could not submit your query right now. Please try again.'
    });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distDir));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`TL Ke Bolo server running on http://localhost:${port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Stop the existing server or set a different PORT in .env.`);
    process.exit(1);
  }
  throw error;
});

prepareDatabase().catch((error) => {
  console.error('Database connection/initialization error:', error);
});

function validateQuery(body) {
  const data = {
    name: clean(body?.name),
    email: clean(body?.email),
    subject: clean(body?.subject),
    message: clean(body?.message)
  };
  const errors = {};

  if (!data.name) errors.name = 'Name is required.';
  if (!data.email) errors.email = 'Email is required.';
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!data.subject) errors.subject = 'Subject is required.';
  if (!data.message) errors.message = 'Message is required.';

  if (data.name.length > 80) errors.name = 'Name must be 80 characters or less.';
  if (data.email.length > 120) errors.email = 'Email must be 120 characters or less.';
  if (data.subject.length > 120) errors.subject = 'Subject must be 120 characters or less.';
  if (data.message.length > 1000) errors.message = 'Message must be 1000 characters or less.';

  return {
    ok: Object.keys(errors).length === 0,
    data,
    errors
  };
}

function clean(value) {
  return String(value ?? '').trim();
}

async function prepareDatabase() {
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI is not set. The server will run, but query submissions will fail until MongoDB is configured.');
    return;
  }

  await connectDatabase();
  await ensureInitialAdmin();
  await seedContent(initialProjects, initialSkills);
}
