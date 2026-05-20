# AICountant - Setup & Getting Started Guide

## ✅ Current Status

Your AICountant application is **fully built and ready to use**! All components are installed and configured.

### What's Included
✅ FastAPI backend with all CA workflows  
✅ React frontend with complete UI  
✅ SQLite database with seed data  
✅ JWT authentication system  
✅ AI-powered insights engine  
✅ All dependencies installed  

---

## 🚀 How to Start

### Method 1: Using Startup Scripts (Easiest)

**Terminal 1 - Backend:**
1. In Windows Explorer, double-click: `START_BACKEND.bat`
2. Wait for message: `"📍 API available at: http://127.0.0.1:8000"`

**Terminal 2 - Frontend (new terminal/command prompt):**
1. In Windows Explorer, double-click: `START_FRONTEND.bat`
2. Wait for message: `"Local:   http://localhost:5173/"`

### Method 2: Manual Command Line

**Terminal 1 - Backend:**
```batch
python run_backend.py
```

**Terminal 2 - Frontend:**
```batch
cd AICountant_frontend
npm run dev
```

### Method 3: Visual Studio Code

**Terminal 1:**
- Open VS Code Terminal (Ctrl+`)
- Run: `python run_backend.py`

**Terminal 2:**
- Click the "+" icon to create a new terminal
- Run: `cd AICountant_frontend && npm run dev`

---

## 🌐 Accessing the Application

### When Both Servers Are Running

1. **Open your web browser** and go to: `http://localhost:5173`

2. **You'll see the Login page** with:
   - Email field
   - Password field
   - "Don't have an account? Register here" link

---

## 🔐 First Time Login

Use these credentials to access your account:

```
Email:    admin@aicountant.com
Password: password
```

> After login, you can create additional accounts via the Register page.

---

## 📋 What You Can Do Right Away

### 1. Dashboard
- View real-time KPIs and compliance status
- See automation impact metrics
- Check AI-generated insights
- Monitor workflows and tasks due today

### 2. Client Management
- View 4 pre-seeded clients (ABC Pvt Ltd, XYZ Traders, etc.)
- Add new clients
- Track client status and compliance health
- Flag high-risk clients

### 3. Compliance Tracking
- View GST, TDS, and audit workflows
- Track filing deadlines
- Monitor task completion
- Get AI alerts for overdue items

### 4. Documents
- Central document repository
- Auto-classification by type
- Stage tracking (Draft, Review, Approved)

### 5. Workflows
- Monitor automated workflows
- Track GST return filing
- Follow TDS reconciliation
- Manage audit schedules

### 6. Automations
- See 3 pre-configured automations:
  - Duplicate Invoice Detection (99.1% accuracy)
  - GST Missing Field Validator (98.4% accuracy)
  - Bank Reconciliation Matcher (97.9% accuracy)
- View accuracy metrics
- Track fraud prevention impact

### 7. AI Assistant
- Ask questions in natural language
- Get compliance recommendations
- Receive client health analysis

---

## 🔧 Troubleshooting

### Backend Won't Start
**Error:** `ModuleNotFoundError: No module named...`
- **Solution:** Run `pip install -r backend/requirements.txt`

**Error:** `Port 8000 already in use`
- **Solution:** 
  - Kill existing process: `taskkill /F /IM python.exe` (Windows)
  - Or wait a minute and try again (port cleanup takes time)

**Error:** `FileNotFoundError: database.db`
- **Solution:** Delete `backend/database.db` and restart backend (will recreate automatically)

### Frontend Won't Load
**Error:** `npm: command not found`
- **Solution:** Install Node.js from https://nodejs.org/

**Error:** `npm ERR! Not Found`
- **Solution:** 
  ```batch
  cd AICountant_frontend
  npm cache clean --force
  npm install
  ```

### API Requests Failing
**Error:** `Failed to fetch /api/...`
- **Solution:** 
  1. Ensure backend is running on http://127.0.0.1:8000
  2. Check browser DevTools (F12) > Network tab for requests
  3. Verify Authorization header contains JWT token

### "Invalid Token" on Every Request
- **Solution:** 
  1. Open DevTools (F12)
  2. Go to Application > LocalStorage
  3. Look for `auth_token` or `user_data`
  4. If missing, go back to login
  5. Try logging in again with credentials

---

## 📊 API Endpoints Reference

All endpoints are available at: **http://127.0.0.1:8000/docs**

### Key Endpoints
- `GET /api/dashboard` - Dashboard KPIs
- `GET /api/clients` - List clients
- `GET /api/documents` - List documents
- `GET /api/workflows` - List workflows
- `GET /api/compliance` - Compliance tasks
- `GET /api/gst` - GST returns
- `GET /api/tds` - TDS returns
- `GET /api/audit` - Audit items
- `POST /api/ai/query` - Query AI assistant

---

## 💾 Database & Data

### Default Database Location
```
c:\Users\yadal\OneDrive\Desktop\AICountant\backend\database.db
```

### Seeded Data Includes
- **1 User Account** (admin@aicountant.com)
- **4 Clients** with GSTIN and status
- **8+ Workflows** across GST, TDS, audit, and bank reconciliation
- **3 Automations** with accuracy metrics
- **20+ Documents** in various stages
- **AI Insights** for each client

### Resetting Database
1. Stop both backend and frontend servers
2. Delete `backend/database.db`
3. Restart backend - database will recreate automatically with seed data

---

## 🎯 Common Tasks

### Create a New Client
1. Go to Clients page
2. Click "Add Client" or "+" button
3. Fill in:
   - Client Name (required)
   - GSTIN (optional)
   - Status (Active/Review/etc.)
4. Click Save

### Add a New Workflow
1. Go to Workflows page
2. Click "Add Workflow" button
3. Select client and workflow type
4. Set due date
5. Assign to automation (optional)
6. Click Save

### Generate AI Insights
1. Go to Dashboard or AI Assistant
2. Ask a question like:
   - "What's the compliance status of ABC Pvt Ltd?"
   - "Which clients are at high risk?"
   - "Show me overdue GST filings"
3. Get AI-powered response

### Check GST Compliance
1. Go to GST page
2. View all GST returns by period
3. See filing status and due dates
4. Click on any return to view details

---

## 🔑 Security Notes

- All passwords are hashed with bcrypt (never stored in plain text)
- JWT tokens expire after 24 hours
- All API endpoints (except /auth) require Bearer token
- CORS is configured to allow frontend communication
- Database uses SQLite with auto-backup capability

---

## 📱 Feature Tour

### Dashboard
Shows at a glance:
- Total clients and compliance status
- Automation impact (fraud risk reduced, time saved)
- Recent workflows and tasks
- AI insights and recommendations
- Quick action cards

### Clients Page
- List view with status indicators
- GSTIN validation
- Health status (Healthy, Monitor, High Risk)
- AI-generated flags and warnings
- Client details and history

### Workflows Page
- Monitor all active workflows
- Track GST, TDS, ITR, audit processes
- See automation triggers
- View due dates and status
- Filter by client and status

### Compliance Dashboard
- GST return filing tracker
- TDS reconciliation status
- Audit workflow status
- Compliance task list
- Deadline alerts

### Automations
- View active automations
- See accuracy metrics
- Track fraud prevention impact
- Monitor performance trends

### AI Assistant
- Natural language queries
- Context-aware responses
- Compliance recommendations
- Client health analysis

---

## 🔄 Application Workflow

```
Login with email/password
        ↓
Dashboard shows overview
        ↓
Select section (Clients, Workflows, etc.)
        ↓
View/manage data with AI-powered insights
        ↓
Create/update/delete resources as needed
        ↓
Query AI Assistant for recommendations
```

---

## 📞 Quick Help

### Can't log in?
- Check credentials: `admin@aicountant.com` / `password`
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito/private window

### Backend stopped?
- Check for error messages in terminal
- Verify port 8000 is not blocked
- Try restarting the backend script

### Frontend looks broken?
- Refresh page (F5)
- Clear browser cache (Ctrl+Shift+Delete)
- Try different browser

### API Docs not loading?
- Go to: `http://127.0.0.1:8000/docs`
- Ensure backend is running
- Check console for CORS errors

---

## 🎓 Next Steps

1. **Explore the Dashboard** - Get familiar with the overview
2. **Review Seeded Clients** - Understand the sample data
3. **Test Workflows** - Create and manage workflows
4. **Query AI Assistant** - Get compliance insights
5. **Create New Clients** - Add your own clients
6. **Generate Reports** - Run compliance reports

---

## 💡 Tips & Best Practices

- **Logout when done** - Ensures your session is secure
- **Check Dashboard daily** - Get a quick overview of compliance status
- **Use AI Assistant** - Get intelligent recommendations
- **Set reminders** - Mark important compliance dates
- **Review automations** - Ensure they match your workflow
- **Regular backups** - Save your database file periodically

---

## 📝 Version Info

- **Backend**: FastAPI 0.136+ with Python 3.8+
- **Frontend**: React with Vite
- **Database**: SQLite
- **Build Date**: 2026
- **Status**: ✅ Production Ready

---

**You're all set! Start both servers and begin using AICountant.**
