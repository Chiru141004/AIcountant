export const dashboardStats = [
  {
    id: 1,
    label: 'Active Clients',
    value: '128',
    change: '+12%',
    period: 'vs last month',
    icon: 'Users',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
  },
  {
    id: 2,
    label: 'Workflows Automated',
    value: '346',
    change: '+28%',
    period: 'vs last month',
    icon: 'Zap',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-600',
  },
  {
    id: 3,
    label: 'Hours Saved',
    value: '215',
    change: '+31%',
    period: 'vs last month',
    icon: 'Clock',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
  },
  {
    id: 4,
    label: 'Tasks Completed',
    value: '93%',
    change: '+8%',
    period: 'vs last month',
    icon: 'CheckCircle',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-600',
  },
];

export const workOverviewChart = [
  { name: 'Compliance', value: 281, color: '#4263e4' },
  { name: 'Bookkeeping', value: 183, color: '#3b82f6' },
  { name: 'Taxation', value: 130, color: '#8b5cf6' },
  { name: 'Audit & Assurance', value: 65, color: '#ec4899' },
  { name: 'Other Services', value: 33, color: '#94a3b8' },
];

export const automationImpactData = [
  { month: 'Jan', timeSaved: 180, costSaved: 1200000 },
  { month: 'Feb', timeSaved: 195, costSaved: 1300000 },
  { month: 'Mar', timeSaved: 210, costSaved: 1400000 },
  { month: 'Apr', timeSaved: 205, costSaved: 1380000 },
  { month: 'May', timeSaved: 225, costSaved: 1500000 },
  { month: 'Jun', timeSaved: 245, costSaved: 1650000 },
];

export const recentWorkflows = [
  {
    id: 1,
    name: 'Bank Reconciliation – April 2024',
    client: 'ABC Pvt. Ltd.',
    status: 'Completed',
    statusColor: 'bg-emerald-100 text-emerald-800',
    timeAgo: '2h ago',
  },
  {
    id: 2,
    name: 'GST Return – GSTR-3B',
    client: 'XYZ Traders',
    status: 'In Progress',
    statusColor: 'bg-blue-100 text-blue-800',
    timeAgo: '4h ago',
  },
  {
    id: 3,
    name: 'TDS Return – Q1 FY 24-25',
    client: 'PQR Solutions',
    status: 'Completed',
    statusColor: 'bg-emerald-100 text-emerald-800',
    timeAgo: '1d ago',
  },
  {
    id: 4,
    name: 'ITR Filing – AY 2024-25',
    client: 'Ramesh Kumar',
    status: 'Pending Review',
    statusColor: 'bg-amber-100 text-amber-800',
    timeAgo: '5d ago',
  },
  {
    id: 5,
    name: 'Audit Working Papers',
    client: 'LMN Pvt. Ltd.',
    status: 'In Progress',
    statusColor: 'bg-blue-100 text-blue-800',
    timeAgo: '2d ago',
  },
];

export const notifications = [
  {
    id: 1,
    title: 'ITR filing due for 7 clients',
    message: 'Due date approaching',
    type: 'alert',
    timeAgo: '2h ago',
    icon: 'AlertCircle',
  },
  {
    id: 2,
    title: 'GST returns due for 15 clients',
    message: 'Due in 3 days',
    type: 'warning',
    timeAgo: '3h ago',
    icon: 'Clock',
  },
  {
    id: 3,
    title: 'Bank statement matched',
    message: 'ABC Pvt. Ltd. - Aug 2024',
    type: 'success',
    timeAgo: '5h ago',
    icon: 'CheckCircle',
  },
  {
    id: 4,
    title: 'TDS return filed successfully',
    message: 'Petition 281 for May 2024',
    type: 'success',
    timeAgo: '1d ago',
    icon: 'CheckCircle',
  },
];

export const tasksDueToday = [
  {
    id: 1,
    title: 'Review GST returns',
    clientCount: 5,
    priority: 'High',
    priorityColor: 'text-red-600',
  },
  {
    id: 2,
    title: 'Approve bank reconciliations',
    clientCount: 3,
    priority: 'Medium',
    priorityColor: 'text-amber-600',
  },
  {
    id: 3,
    title: 'Review P&L reports',
    clientCount: 2,
    priority: 'Medium',
    priorityColor: 'text-amber-600',
  },
  {
    id: 4,
    title: 'Upload TDS certificates',
    clientCount: 4,
    priority: 'Low',
    priorityColor: 'text-blue-600',
  },
];

export const aiInsights = [
  {
    id: 1,
    title: '3 duplicate payments',
    description: 'Detected in invoices within last 7 days',
    action: 'Potential savings: ₹12,450',
    icon: 'AlertTriangle',
  },
  {
    id: 2,
    title: '5 vendor invoices',
    description: 'are missing GSTIN details',
    action: 'Action recommended',
    icon: 'AlertCircle',
  },
  {
    id: 3,
    title: 'Cash balance unusually high',
    description: 'in Bank of Baroda A/C',
    action: 'Review suggested',
    icon: 'TrendingUp',
  },
];

export const quickActions = [
  { id: 1, label: 'Upload Document', icon: 'Upload' },
  { id: 2, label: 'Reconcile Bank', icon: 'CreditCard' },
  { id: 3, label: 'Run Report', icon: 'BarChart3' },
  { id: 4, label: 'New Client', icon: 'Plus' },
  { id: 5, label: 'Create Invoice', icon: 'FileText' },
  { id: 6, label: 'Compliance Calendar', icon: 'Calendar' },
];

export const sidebarMenuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/' },
  { id: 'clients', label: 'Clients', icon: 'Users', href: '/clients' },
  { id: 'workflows', label: 'Workflows', icon: 'Workflow', href: '/workflows' },
  { id: 'documents', label: 'Documents', icon: 'FileText', href: '/documents' },
  { id: 'automations', label: 'Automations', icon: 'Zap', href: '/automations' },
  { id: 'transactions', label: 'Transactions', icon: 'TrendingUp', href: '/transactions' },
  { id: 'compliance', label: 'Compliance', icon: 'CheckCircle', href: '/compliance', hasSubmenu: true },
  { id: 'gst', label: 'GST', icon: 'FileCheck', href: '/gst', submenu: true },
  { id: 'tds', label: 'TDS', icon: 'DollarSign', href: '/tds', submenu: true },
  { id: 'audit', label: 'Audit', icon: 'Shield', href: '/audit', submenu: true },
  { id: 'reports', label: 'Reports', icon: 'BarChart3', href: '/reports' },
  { id: 'analytics', label: 'Analytics', icon: 'LineChart', href: '/analytics' },
  { id: 'templates', label: 'Templates', icon: 'Layout', href: '/templates' },
  { id: 'integrations', label: 'Integrations', icon: 'Plug', href: '/integrations' },
  { id: 'settings', label: 'Settings', icon: 'Settings', href: '/settings' },
];
