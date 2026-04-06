# Finance Dashboard Frontend

A modern, production-ready finance dashboard built with React 18, Vite, Tailwind CSS, and Recharts.

## Features

- **Authentication**: Secure login with JWT tokens
- **Dashboard**: Visual summary with income, expenses, and trends charts
- **Records Management**: CRUD operations for financial transactions
- **User Management**: Admin-only user administration
- **Role-Based Access**: Admin, Analyst, and Viewer roles with different permissions
- **Dark Theme**: Modern glassmorphism design
- **Responsive**: Works on desktop, tablet, and mobile

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Recharts** - Charts and graphs
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running at `http://localhost:3000`

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── api/                    # API layer
│   ├── axios.js           # Axios instance with interceptors
│   ├── authApi.js         # Authentication endpoints
│   ├── recordsApi.js      # Records CRUD
│   ├── dashboardApi.js    # Dashboard data
│   └── usersApi.js        # User management
├── components/
│   ├── layout/            # Layout components
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   └── Layout.jsx
│   ├── ui/                # Reusable UI components
│   ├── records/           # Records-related components
│   ├── dashboard/         # Dashboard components
│   └── users/             # User management components
├── context/               # React context providers
├── hooks/                 # Custom hooks
├── pages/                 # Page components
├── utils/                 # Utilities
├── App.jsx                # Main app component
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## API Endpoints

The app expects a backend API at `http://localhost:3000/api`:

### Authentication
- `POST /auth/login` - Login with email/password
- `POST /auth/register` - Register new user

### Records
- `GET /records` - Get all records (with pagination/filters)
- `GET /records/:id` - Get single record
- `POST /records` - Create new record
- `PUT /records/:id` - Update record
- `DELETE /records/:id` - Delete record

### Dashboard
- `GET /dashboard/summary` - Get summary stats
- `GET /dashboard/trends` - Get monthly trends
- `GET /dashboard/by-category` - Get category breakdown
- `GET /dashboard/recent` - Get recent transactions

### Users
- `GET /users` - Get all users
- `POST /users` - Create user
- `PATCH /users/:id/role` - Update user role
- `PATCH /users/:id/status` - Update user status
- `DELETE /users/:id` - Delete user

## Roles & Permissions

| Feature | Admin | Analyst | Viewer |
|---------|-------|---------|--------|
| Dashboard | ✓ | ✓ | ✗ |
| Records (view) | ✓ | ✓ | ✓ |
| Records (create/edit/delete) | ✓ | ✗ | ✗ |
| User Management | ✓ | ✗ | ✗ |

## Design System

### Colors

- **Primary**: Indigo (#6366f1)
- **Success/Income**: Emerald (#10b981)
- **Danger/Expense**: Rose (#f43f5e)
- **Warning**: Amber (#f59e0b)
- **Background**: Slate-950 (#020617)
- **Card Background**: Slate-900 (#0f172a)
- **Border**: Slate-800 (#1e293b)

### Typography

- Font: Inter (Google Fonts)
- Weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
