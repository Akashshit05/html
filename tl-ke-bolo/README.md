# TL Ke Bolo

TL Ke Bolo is a full-stack query management application built with **NestJS** (Backend) and **React Vite** (Frontend).
The platform offers a modern UI with glassmorphism design and a dedicated admin panel to manage, track, and resolve user queries.

## 🚀 Features
- **Modern UI**: Dark theme, glassmorphism, responsive layout, animations using framer-motion.
- **Query Submission**: Users can submit queries easily.
- **Admin Panel**: Secure JWT-based admin authentication to track, search, and manage queries.
- **Email Notifications**: Automatic email sent to admin upon a new query submission.
- **Single Deployment**: Frontend is built and served natively from the NestJS backend for a unified Render deployment.

## 📁 Project Structure
```
tl-ke-bolo/
├── package.json           # Root package.json (Handles Render build & start commands)
├── backend/               # NestJS application (Serves frontend and API)
│   ├── src/
│   │   ├── admin/         # Admin API (Login, JWT Auth)
│   │   ├── query/         # Query API (CRUD for queries)
│   │   ├── schemas/       # Mongoose Schemas (MongoDB)
│   │   ├── main.ts        # Entry point (Configures static file serving)
│   │   └── app.module.ts  # Main Module
│   └── package.json       # Backend Dependencies
├── frontend/              # React Vite Application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Application Views (Home, Contact, Admin, etc.)
│   │   ├── App.tsx        # Router configuration
│   │   ├── main.tsx       # Entry point
│   │   └── index.css      # Core styles & Glassmorphism UI
│   ├── package.json       # Frontend Dependencies
│   └── vite.config.ts     # Vite configuration
└── README.md
```

## 🛠️ Setup & Local Development

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or Local MongoDB)

### 1. Install Dependencies
In the root `tl-ke-bolo` directory, install all required packages:
```bash
npm install
```
*(This triggers the `postinstall` script which installs both frontend and backend dependencies.)*

### 2. Environment Variables
Create a `.env` file in `tl-ke-bolo/backend/.env` with the following:
```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/tl_ke_bolo

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# JWT Secret for Admin Panel
JWT_SECRET=super_secret_jwt_key

# Email Notification Setup (Using Gmail or similar)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin_receive_email@gmail.com
```

### 3. Run Locally

**Option A (Simultaneously - Recommended for Dev):**
Terminal 1 (Frontend):
```bash
cd frontend
npm run dev
```
Terminal 2 (Backend):
```bash
cd backend
npm run start:dev
```

**Option B (Production Build & Serve):**
From the root directory:
```bash
npm run build
npm run start
```
*The app will be accessible at `http://localhost:3000`*

## 🌐 Deploying to Render

This project is configured to run on a **single Web Service** on Render.

1. **Create a new Web Service** on Render connected to your GitHub repository.
2. Select **Node** as the Environment.
3. Configure the commands:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
4. Add the **Environment Variables** in Render:
   - `MONGODB_URI`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `JWT_SECRET`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `ADMIN_EMAIL`
5. Click **Deploy**. Render will build the frontend, build the backend, and then serve the frontend through the NestJS static file module from port 3000.

## 🎨 Theme & Styling
The application enforces strict design aesthetics matching high-level requirements without Tailwind CSS. It purely relies on handcrafted Vanilla CSS inside `index.css` leveraging modern layouts, blur-filtering, and dynamic colors.
