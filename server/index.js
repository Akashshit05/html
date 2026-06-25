import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { connectDatabase, insertQuery } from './db.js';
import { sendAdminNotification } from './email.js';

const app = express();
const port = Number(process.env.PORT) || 5185;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

app.use(cors({ origin: true }));
app.use(express.json({ limit: '32kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
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

prepareDatabase()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`TL Ke Bolo server running on http://localhost:${port}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Stop the existing server or set a different PORT in .env.`);
        process.exit(1);
      }

      throw error;
    });
  })
  .catch((error) => {
    console.error('Server startup failed:', error);
    process.exit(1);
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
}
