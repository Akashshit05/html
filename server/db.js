import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import dns from 'node:dns';

// Set public DNS servers to resolve MongoDB SRV records reliably in Linux environments
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) { }

const querySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 120
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000
    },
    status: {
      type: String,
      enum: ['unread', 'read', 'replied'],
      default: 'unread'
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const Query = mongoose.models.Query || mongoose.model('Query', querySchema);

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true, select: false },
    sessionTokenHash: { type: String, select: false },
    sessionExpiresAt: { type: Date, select: false }
  },
  { timestamps: true }
);

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    category: { type: String, trim: true, maxlength: 120 },
    summary: { type: String, trim: true, maxlength: 500 },
    description: { type: String, trim: true, maxlength: 3000 },
    website: { type: String, trim: true },
    playstore: { type: String, trim: true },
    icon: { type: String, trim: true, maxlength: 4 },
    metrics: [{ label: String, value: String }],
    features: [String],
    stack: [String],
    results: [String],
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true, maxlength: 80 },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const settingsSchema = new mongoose.Schema(
  {
    email: { type: String, default: 'hello@fullstack.dev', trim: true },
    phone: { type: String, default: '+1 234 567 890', trim: true },
    github: { type: String, default: 'https://github.com', trim: true },
    linkedin: { type: String, default: 'https://linkedin.com', trim: true },
    twitter: { type: String, default: 'https://x.com', trim: true }
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
const Skill = mongoose.models.Skill || mongoose.model('Skill', skillSchema);
const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);

mongoose.set('bufferCommands', false);

let connectionPromise = null;

const DIRECT_MONGODB_URI = 'mongodb://MyBookUser:MyBookPassword@ac-bbnof6g-shard-00-00.odf3pl1.mongodb.net:27017,ac-bbnof6g-shard-00-01.odf3pl1.mongodb.net:27017,ac-bbnof6g-shard-00-02.odf3pl1.mongodb.net:27017/my_books?ssl=true&replicaSet=atlas-uso7ur-shard-0&authSource=admin&retryWrites=true&w=majority';

export async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required to store queries.');
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (connectionPromise) {
    await connectionPromise;
    return;
  }

  const connectOptions = {
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000,
    family: 4,
    bufferCommands: false
  };

  connectionPromise = (async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, connectOptions);
    } catch (err) {
      if (err && (err.syscall === 'querySrv' || String(err.message).includes('querySrv') || String(err.message).includes('ETIMEOUT'))) {
        console.warn('SRV DNS lookup timed out. Retrying connection using direct MongoDB cluster URI...');
        await mongoose.connect(DIRECT_MONGODB_URI, connectOptions);
      } else {
        throw err;
      }
    }
  })().finally(() => {
    connectionPromise = null;
  });

  await connectionPromise;
}

export async function insertQuery({ name, email, subject, message }) {
  await connectDatabase();
  const query = await Query.create({ name, email, subject, message, status: 'unread' });

  return {
    id: query._id.toString(),
    name: query.name,
    email: query.email,
    subject: query.subject,
    message: query.message,
    status: query.status,
    created_at: query.created_at
  };
}

export async function getQueries() {
  await connectDatabase();
  const queries = await Query.find().sort({ created_at: -1 }).lean();
  return queries.map(q => ({
    id: q._id.toString(),
    name: q.name,
    email: q.email,
    subject: q.subject,
    message: q.message,
    status: q.status || 'unread',
    created_at: q.created_at
  }));
}

export async function updateQueryStatus(id, status) {
  await connectDatabase();
  const validStatuses = ['unread', 'read', 'replied'];
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid status value');
  }
  const query = await Query.findByIdAndUpdate(id, { status }, { new: true });
  if (!query) return null;
  return {
    id: query._id.toString(),
    status: query.status
  };
}

export async function deleteQuery(id) {
  await connectDatabase();
  const result = await Query.findByIdAndDelete(id);
  return Boolean(result);
}

export async function ensureInitialAdmin() {
  await connectDatabase();
}

export async function loginAdmin(usernameInput, passwordInput) {
  await connectDatabase();
  const username = String(usernameInput || '').trim().toLowerCase();
  const rawPassword = String(passwordInput || '');

  if (!username || !rawPassword) return null;

  let admin = await Admin.findOne({ email: username }).select('+passwordHash');


  if (!admin) {
    const passwordHash = await bcrypt.hash(rawPassword, 12);
    admin = await Admin.create({ username, passwordHash });
    console.log(`Admin user "${username}" not found; automatically created user in MongoDB with encrypted password.`);
  } else {
    const isMatch = await bcrypt.compare(rawPassword, admin.passwordHash);
    if (!isMatch) return null;
  }

  const token = crypto.randomBytes(32).toString('hex');
  admin.sessionTokenHash = hashToken(token);
  admin.sessionExpiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);
  await admin.save();
  return { token, user: { username: admin.username } };
}

export async function authenticateAdmin(token) {
  if (!token) return null;
  await connectDatabase();
  return Admin.findOne({
    sessionTokenHash: hashToken(token),
    sessionExpiresAt: { $gt: new Date() }
  }).select('_id username').lean();
}

export async function logoutAdmin(token) {
  if (!token) return;
  await connectDatabase();
  await Admin.updateOne(
    { sessionTokenHash: hashToken(token) },
    { $unset: { sessionTokenHash: 1, sessionExpiresAt: 1 } }
  );
}

export async function getProjects(includeUnpublished = false) {
  await connectDatabase();
  const filter = includeUnpublished ? {} : { published: true };
  return Project.find(filter).sort({ order: 1, createdAt: 1 }).lean().then(items =>
    items.map(({ _id, __v, ...item }) => ({ id: _id.toString(), ...item }))
  );
}

export async function saveProject(id, data) {
  await connectDatabase();
  const payload = sanitizeProject(data);
  const item = id
    ? await Project.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    : await Project.create(payload);
  return item ? { id: item._id.toString(), ...item.toObject() } : null;
}

export async function deleteProject(id) {
  await connectDatabase();
  return Boolean(await Project.findByIdAndDelete(id));
}

export async function getSkills(includeUnpublished = false) {
  await connectDatabase();
  const filter = includeUnpublished ? {} : { published: true };
  return Skill.find(filter).sort({ order: 1, name: 1 }).lean().then(items =>
    items.map(({ _id, __v, ...item }) => ({ id: _id.toString(), ...item }))
  );
}

export async function saveSkill(id, data) {
  await connectDatabase();
  const payload = {
    name: String(data?.name || '').trim(),
    order: Number(data?.order) || 0,
    published: data?.published !== false
  };
  const item = id
    ? await Skill.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    : await Skill.create(payload);
  return item ? { id: item._id.toString(), ...item.toObject() } : null;
}

export async function deleteSkill(id) {
  await connectDatabase();
  return Boolean(await Skill.findByIdAndDelete(id));
}

export async function getSettings() {
  await connectDatabase();
  let settings = await Settings.findOne().lean();
  if (!settings) {
    settings = await Settings.create({});
    settings = settings.toObject();
  }
  const { _id, __v, ...data } = settings;
  return { id: _id.toString(), ...data };
}

export async function saveSettings(data) {
  await connectDatabase();
  const payload = {
    email: String(data?.email || 'hello@fullstack.dev').trim(),
    phone: String(data?.phone || '+1 234 567 890').trim(),
    github: String(data?.github || 'https://github.com').trim(),
    linkedin: String(data?.linkedin || 'https://linkedin.com').trim(),
    twitter: String(data?.twitter || 'https://x.com').trim()
  };
  let settings = await Settings.findOne();
  if (settings) {
    Object.assign(settings, payload);
    await settings.save();
  } else {
    settings = await Settings.create(payload);
  }
  const { _id, __v, ...result } = settings.toObject();
  return { id: _id.toString(), ...result };
}

export async function changeAdminPassword(username, currentPassword, newPassword) {
  await connectDatabase();
  const admin = await Admin.findOne({ username: String(username || '').trim().toLowerCase() }).select('+passwordHash');
  if (!admin || !(await bcrypt.compare(String(currentPassword || ''), admin.passwordHash))) {
    return { ok: false, message: 'Current password is incorrect.' };
  }
  admin.passwordHash = await bcrypt.hash(String(newPassword || ''), 12);
  await admin.save();
  return { ok: true, message: 'Password updated successfully in MongoDB.' };
}

export async function seedContent(projects, skills) {
  await connectDatabase();
  if (!(await Project.exists({}))) await Project.insertMany(projects.map((p, order) => ({ ...p, order })));
  if (!(await Skill.exists({}))) await Skill.insertMany(skills.map((name, order) => ({ name, order })));
  if (!(await Settings.exists({}))) await Settings.create({});
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function sanitizeProject(data) {
  const arrays = ['features', 'stack', 'results'];
  const title = String(data?.title || '').trim();
  const rawSlug = String(data?.slug || title).trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-');
  const payload = {
    slug: rawSlug || `project-${Date.now()}`,
    title,
    category: String(data?.category || '').trim(),
    summary: String(data?.summary || '').trim(),
    description: String(data?.description || data?.summary || '').trim(),
    website: String(data?.website || '').trim(),
    playstore: String(data?.playstore || '').trim(),
    icon: String(data?.icon || 'BE').trim().toUpperCase().slice(0, 4),
    metrics: Array.isArray(data?.metrics)
      ? data.metrics.filter(m => m && m.label && m.value).map(m => ({ label: String(m.label).trim(), value: String(m.value).trim() }))
      : [],
    order: Number(data?.order) || 0,
    published: data?.published !== false
  };
  for (const key of arrays) {
    if (Array.isArray(data?.[key])) {
      payload[key] = data[key].map(String).map(value => value.trim()).filter(Boolean);
    } else {
      payload[key] = String(data?.[key] || '').split(/\n|,/).map(value => value.trim()).filter(Boolean);
    }
  }
  return payload;
}
