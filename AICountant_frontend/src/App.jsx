import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import DashboardPage from './pages/DashboardPage';
import ClientsPage from './pages/ClientsPage';
import WorkflowsPage from './pages/WorkflowsPage';
import DocumentsPage from './pages/DocumentsPage';
import AutomationsPage from './pages/AutomationsPage';
import TransactionsPage from './pages/TransactionsPage';
import CompliancePage from './pages/CompliancePage';
import GSTPage from './pages/GSTPage';
import TDSPage from './pages/TDSPage';
import AuditPage from './pages/AuditPage';
import ReportsPage from './pages/ReportsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import TemplatesPage from './pages/TemplatesPage';
import IntegrationsPage from './pages/IntegrationsPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isAuthenticated = !!localStorage.getItem('accessToken');
  const showLayout = !isAuthPage && isAuthenticated;
  const defaultRedirect = isAuthenticated ? '/' : '/login';

  if (isAuthPage && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {showLayout && <Sidebar />}
      {showLayout && <Navbar />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<PrivateRoute element={<DashboardPage />} />} />
        <Route path="/clients" element={<PrivateRoute element={<ClientsPage />} />} />
        <Route path="/workflows" element={<PrivateRoute element={<WorkflowsPage />} />} />
        <Route path="/documents" element={<PrivateRoute element={<DocumentsPage />} />} />
        <Route path="/automations" element={<PrivateRoute element={<AutomationsPage />} />} />
        <Route path="/transactions" element={<PrivateRoute element={<TransactionsPage />} />} />

        <Route path="/compliance" element={<PrivateRoute element={<CompliancePage />} />} />
        <Route path="/gst" element={<PrivateRoute element={<GSTPage />} />} />
        <Route path="/tds" element={<PrivateRoute element={<TDSPage />} />} />
        <Route path="/audit" element={<PrivateRoute element={<AuditPage />} />} />

        <Route path="/reports" element={<PrivateRoute element={<ReportsPage />} />} />
        <Route path="/analytics" element={<PrivateRoute element={<AnalyticsPage />} />} />
        <Route path="/templates" element={<PrivateRoute element={<TemplatesPage />} />} />
        <Route path="/integrations" element={<PrivateRoute element={<IntegrationsPage />} />} />
        <Route path="/settings" element={<PrivateRoute element={<SettingsPage />} />} />

        <Route path="*" element={<Navigate to={defaultRedirect} replace />} />
      </Routes>
    </div>
  );
}

export default App;



