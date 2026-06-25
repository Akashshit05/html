import mongoose from 'mongoose';

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
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const Query = mongoose.models.Query || mongoose.model('Query', querySchema);

export async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required to store queries.');
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 8000
  });
}

export async function insertQuery({ name, email, subject, message }) {
  await connectDatabase();
  const query = await Query.create({ name, email, subject, message });

  return {
    id: query._id.toString(),
    name: query.name,
    email: query.email,
    subject: query.subject,
    message: query.message,
    created_at: query.created_at
  };
}
