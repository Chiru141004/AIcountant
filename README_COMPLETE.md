# AICountant - Chartered Accountant Management Platform

A comprehensive, AI-powered platform designed to help Chartered Accountants manage clients, compliance, workflows, and audit processes efficiently.

## 🎯 Overview

AICountant streamlines CA workflows with:
- **Client Management**: Track client status, GSTIN validation, and compliance health
- **Compliance Tracking**: Monitor GST, TDS, and audit deadlines with AI-powered alerts
- **Workflow Automation**: Automate document processing, bank reconciliation, and tax filings
- **AI Insights**: Get intelligent recommendations on client risk, compliance gaps, and opportunities
- **Real-time Analytics**: Dashboard with automation impact, time saved, and accuracy metrics
- **Bank Reconciliation**: Automated matching with 98%+ accuracy
- **Transaction Management**: Categorize and track all financial transactions

---

## 📋 Prerequisites

- **Python 3.8+** ([Download](https://www.python.org/downloads/))
- **Node.js 18+** ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)

---

## 🚀 Quick Start

### 1. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
cd ..
```

### 2. Install Frontend Dependencies

```bash
cd AICountant_frontend
npm install
cd ..
```

### 3. Start the Backend Server

```bash
python run_backend.py
```

Expected output:
```
🚀 Starting AICountant Backend Server...
📍 API available at: http://127.0.0.1:8000
📚 API Docs: http://127.0.0.1:8000/docs
```

The backend will:
- Create SQLite database at `backend/database.db`
- Seed default data (4 sample clients, workflows, documents, etc.)
- Listen on `http://127.0.0.1:8000`

### 4. Start the Frontend Server (in a new terminal)

```bash
cd AICountant_frontend
npm run dev
```

Expected output:
```
➜  Local:   http://localhost:5173/
```

---

## 🔐 Login Credentials

**Default Account:**
- Email: `admin@aicountant.com`
- Password: `password` (from seeded data with pre-hashed password)

After first login, you can create additional user accounts via the Register page.

---

## 📱 Application Features

### Dashboard
- Real-time KPIs: Active clients, compliance %, high-risk flags
- Automation impact metrics
- Recent workflows and tasks
- AI-generated insights
- Quick action cards

### Clients
- View all clients with status, GSTIN, and compliance health
- Filter by status (Active, Review, etc.)
- AI health indicators and compliance flags
- Add new clients

### Documents
- Central repository for client documents
- Auto-classification by type (GST, Bank, TDS, Audit)
- Stage tracking (Draft, Review, Approved, Reconcile)
- Timestamp and update tracking

### Workflows
- Monitor GST, TDS, ITR, and audit workflows
- Track due dates with status indicators
- Automation trigger information
- Filter by client and status

### Compliance
- GST return filing status and deadlines
- TDS reconciliation tracking
- Compliance task management
- Due date alerts

### GST Management
- GSTR-1, GSTR-2B, GSTR-3B filing status
- Period-wise filing history
- Client-wise tracking
- Due date management

### TDS Returns
- Quarterly and monthly TDS tracking
- Filing status and deadlines
- Client-wise TDS reconciliation
- Validation and error flagging

### Audit Management
- Audit task assignment and tracking
- Vouching and verification schedules
- Workpaper organization
- Client-wise audit status

### Transactions
- Transaction ledger with categorization
- Amount tracking (formatted as ₹)
- Status indicators (Cleared, Pending, Reconciled)
- Category-wise analysis

### Automations
- Enable/disable automation triggers
- Track automation accuracy metrics
- Monitor automation impact (fraud risk reduced, errors prevented)
- Automation highlights and quick wins

### Reports & Analytics
- Monthly compliance reports
- GST summaries
- TDS reconciliation statements
- Audit reports
- Custom report generation

### AI Assistant
- Ask questions about client status, compliance, and recommendations
- Get AI-powered insights (uses OpenAI GPT-3.5-turbo if API key available)
- Falls back to smart pattern matching without API key

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get access token
- `GET /api/auth/profile` - Get current user profile

### Clients
- `GET /api/clients` - List all clients
- `POST /api/clients` - Create new client
- `GET /api/clients/{id}` - Get client details

### Documents
- `GET /api/documents` - List all documents
- `POST /api/documents` - Upload document
- `GET /api/documents/{id}` - Get document details

### Workflows
- `GET /api/workflows` - List all workflows
- `POST /api/workflows` - Create workflow
- `GET /api/workflows/{id}` - Get workflow details

### Compliance & Tax
- `GET /api/compliance` - List compliance tasks
- `GET /api/gst` - List GST returns
- `GET /api/tds` - List TDS returns
- `GET /api/audit` - List audit items

### Transactions
- `GET /api/transactions` - List transactions
- `POST /api/transactions` - Add transaction

### AI & Insights
- `GET /api/ai/insights` - Get AI insights
- `POST /api/ai/query` - Query AI assistant

### Dashboard
- `GET /api/dashboard` - Get dashboard data with KPIs, workflows, and insights

**Full API Documentation**: Visit http://127.0.0.1:8000/docs for interactive Swagger documentation

---

## 📊 Database Structure

SQLite database (`backend/database.db`) contains:

**Users Table**
- User authentication and profile data
- Firm details and GSTIN

**Clients Table**
- Client master data
- Status, health, and AI flags

**Documents Table**
- Document metadata and classification
- Client association and stage tracking

**Workflows Table**
- Task workflows by client
- Due dates and automation status

**Compliance, GST, TDS, Audit Tables**
- Regulatory filing and audit tracking
- Status and deadline management

**Transactions Table**
- Financial transaction ledger
- Amount, category, and status

**Automations Table**
- Automation configuration and metrics
- Accuracy tracking and impact measurement

**AI_Insights Table**
- AI-generated insights and recommendations
- Question-answer pairs

---

## 🎛️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```
SECRET_KEY=your-secret-key-here
OPENAI_API_KEY=sk-your-openai-key-here  # Optional, for AI features
DATABASE_URL=sqlite:///./backend/database.db
```

### Vite Configuration

The frontend is configured to proxy `/api` requests to the backend:
- Frontend runs on: `http://localhost:5173`
- Backend runs on: `http://127.0.0.1:8000`
- Requests to `/api` are proxied to backend automatically

---

## 🛠️ Development

### Backend Structure
```
backend/
├── main.py          # FastAPI app and endpoints
├── models.py        # SQLAlchemy ORM models
├── schemas.py       # Pydantic request/response schemas
├── database.py      # Database configuration
├── ai_utils.py      # AI prompt engineering and fallback
├── seed.py          # Database seeding
└── requirements.txt # Python dependencies
```

### Frontend Structure
```
AICountant_frontend/
├── src/
│   ├── pages/       # Page components (Clients, Workflows, etc.)
│   ├── components/  # Reusable UI components
│   ├── hooks/       # Custom React hooks (useResource)
│   ├── data/        # Static data and constants
│   ├── api.js       # API integration layer
│   └── App.jsx      # Main app router
├── vite.config.js   # Vite configuration with proxy
└── package.json     # npm dependencies
```

---

## 🔄 Workflow

### Client Registration Flow
1. User registers with email, password, firm name, GSTIN
2. Account created with "Partner" role
3. Credentials saved with bcrypt hashing
4. Token generated for session

### Client Management Flow
1. Add clients to the system
2. Track compliance status (Active, Review, etc.)
3. Monitor health (Healthy, Monitor, High risk)
4. View AI-generated alerts and recommendations

### Compliance Workflow
1. Document uploaded for client
2. AI validates against filing rules
3. Workflow created with automation triggers
4. Status tracked through GST/TDS/Audit stages
5. Alerts generated for overdue items

---

## � Deployment Guide

### Backend Deployment
- Configure environment values in `.env`.
- Use `python run_backend.py` for local or container deployment.
- For production, set `RELOAD=false`, `APP_HOST=0.0.0.0`, and `SECRET_KEY` to a strong secret.
- The backend uses request rate limiting, JWT auth, CORS, and security headers.

### Frontend Static Hosting
- Frontend build command: `cd AICountant_frontend && npm run build`
- Use `AICountant_frontend/netlify.toml` for Netlify deployment.
- Static files will publish from `AICountant_frontend/dist`.
- SPA routing is supported via `_redirects`.

### Docker Deployment
- Build backend container with `docker-compose up --build`.
- Backend service is exposed on port `8000`.
- Persist `backend/database.db` and `backend/logs` via volumes.

---

## �🐛 Troubleshooting

### Backend won't start
- Ensure Python 3.8+ is installed: `python --version`
- Check all dependencies installed: `pip install -r backend/requirements.txt`
- Delete `backend/database.db` and restart (will recreate with seed data)

### Frontend won't load
- Ensure Node.js 18+ is installed: `node --version`
- Clear npm cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Ensure backend is running on `127.0.0.1:8000`

### API calls failing
- Verify backend is running: http://127.0.0.1:8000
- Check CORS is enabled (it is by default)
- Verify token in localStorage by opening DevTools > Application > LocalStorage

### Login issues
- Credentials: email=`admin@aicountant.com`, password=`password`
- Check backend logs for authentication errors
- Ensure database has been seeded (check `backend/database.db` exists)

---

## 📈 Seeded Sample Data

The application comes with seed data for immediate testing:

**Clients:**
- ABC Pvt. Ltd. (GSTIN: 27AABCU9600R1ZQ)
- XYZ Traders (GSTIN: 27AAECS1234P1ZV)
- PQR Solutions (GSTIN: 27AABCP7890K1ZU)
- Ramesh Kumar (GSTIN: 27AAGHR4567D1Z3)

**Workflows:**
- Bank Reconciliation (Auto-matched 98%)
- GST Return GSTR-3B (Field validation active)
- TDS Return Q1 (Auto-draft generated)
- ITR Filing (AI review suggested)

**Automations:**
- Duplicate Invoice Detection (99.1% accuracy)
- GST Missing Field Validator (98.4% accuracy)
- Bank Reconciliation Matcher (97.9% accuracy)

---

## 🤖 AI Features

### AI Assistant
- Chat-based interface for compliance questions
- Context-aware recommendations
- Falls back to pattern-matched responses without OpenAI key

### AI Insights
- Client risk analysis
- Compliance opportunity identification
- Audit readiness assessment
- Automation impact projections

### Default Responses (without OpenAI)
- Client dashboard insights
- Compliance monitoring tips
- Audit workflow recommendations
- Transaction analysis patterns

---

## 📝 License

This project is for use by Chartered Accountants to streamline their practice management.

---

## 🎓 Future Enhancements

- Multi-user support with role-based access
- File upload and document OCR
- Email integration for deadline alerts
- SMS notifications
- Tally and QuickBooks integration
- Mobile app
- Advanced reporting and business intelligence
- Workflow templates and best practices

---

## 📞 Support

For issues or feature requests, contact the development team.

**Last Updated**: May 14, 2026
