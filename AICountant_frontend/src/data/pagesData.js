export const clients = [
  { id: 1, name: 'ABC Pvt. Ltd.', gstin: '27AABCU9600R1ZQ', status: 'Active', lastFiled: '2024-04-20', health: 'Healthy', aiFlag: 'GST compliance due' },
  { id: 2, name: 'XYZ Traders', gstin: '27AAECS1234P1ZV', status: 'Active', lastFiled: '2024-04-18', health: 'Monitor', aiFlag: 'Invoice mismatch detected' },
  { id: 3, name: 'PQR Solutions', gstin: '27AABCP7890K1ZU', status: 'Review', lastFiled: '2024-04-10', health: 'High risk', aiFlag: 'Bank reconciliation pending' },
  { id: 4, name: 'Ramesh Kumar', gstin: '27AAGHR4567D1Z3', status: 'Active', lastFiled: '2024-04-22', health: 'Healthy', aiFlag: 'ITR ready for review' },
];

export const workflows = [
  { id: 1, title: 'Bank Reconciliation – April 2024', client: 'ABC Pvt. Ltd.', due: '2024-05-05', status: 'Completed', automation: 'Auto-matched 98%' },
  { id: 2, title: 'GST Return – GSTR-3B', client: 'XYZ Traders', due: '2024-05-10', status: 'In Progress', automation: 'Field validation active' },
  { id: 3, title: 'TDS Return – Q1 FY 24-25', client: 'PQR Solutions', due: '2024-05-15', status: 'Completed', automation: 'Auto-draft generated' },
  { id: 4, title: 'ITR Filing – AY 2024-25', client: 'Ramesh Kumar', due: '2024-05-22', status: 'Pending Review', automation: 'AI review suggested' },
];

export const documents = [
  { id: 1, name: 'GSTIN Verification Report.pdf', client: 'ABC Pvt. Ltd.', updated: '2d ago', type: 'GST', stage: 'Approved' },
  { id: 2, name: 'Bank Statements – March 2024.xlsx', client: 'XYZ Traders', updated: '5d ago', type: 'Bank', stage: 'Reconcile' },
  { id: 3, name: 'TDS Certificates – FY 23-24.pdf', client: 'PQR Solutions', updated: '1d ago', type: 'TDS', stage: 'Review' },
  { id: 4, name: 'Audit Working Papers.docx', client: 'LMN Pvt. Ltd.', updated: '3d ago', type: 'Audit', stage: 'Draft' },
];

export const automations = [
  { id: 1, name: 'Duplicate Invoice Detection', trigger: 'On Invoice Upload', accuracy: '99.1%', status: 'Running', impact: 'Fraud risk reduced' },
  { id: 2, name: 'GST Missing Field Validator', trigger: 'Before Filing', accuracy: '98.4%', status: 'Running', impact: 'Filing errors prevented' },
  { id: 3, name: 'Bank Reconciliation Matcher', trigger: 'Statement Import', accuracy: '97.9%', status: 'Paused', impact: 'Cash mismatch flagged' },
];

export const automationHighlights = [
  { id: 1, title: 'Auto-fill GST returns', description: 'Generate GSTR-3B drafts with AI metadata mapping.', status: 'Enabled' },
  { id: 2, title: 'Smart expenses categorization', description: 'Classify vendor payments automatically based on ledger rules.', status: 'Enabled' },
  { id: 3, title: 'Audit checklist generation', description: 'Create workpaper schedules from client documents.', status: 'Enabled' },
];

export const transactions = [
  { id: 1, description: 'Payment received – Vendor A', date: '2024-05-01', amount: '₹ 48,250', category: 'Payables', status: 'Cleared' },
  { id: 2, description: 'Tax deducted – TDS', date: '2024-04-28', amount: '₹ 12,450', category: 'Taxes', status: 'Pending' },
  { id: 3, description: 'GST paid (advance)', date: '2024-04-20', amount: '₹ 2,18,900', category: 'GST', status: 'Reconciled' },
];

export const complianceTasks = [
  { id: 1, name: 'GSTR-3B Filing', client: 'XYZ Traders', due: '2024-05-10', status: 'In Progress' },
  { id: 2, name: 'TDS Certificate Upload', client: 'PQR Solutions', due: '2024-05-15', status: 'Completed' },
  { id: 3, name: 'Annual Audit Preparation', client: 'LMN Pvt. Ltd.', due: '2024-05-30', status: 'Pending' },
];

export const gstReturns = [
  { id: 1, period: 'GSTR-3B Apr 2024', client: 'XYZ Traders', status: 'In Progress', due: '2024-05-10', type: 'Return' },
  { id: 2, period: 'GSTR-1 Apr 2024', client: 'ABC Pvt. Ltd.', status: 'Completed', due: '2024-05-02', type: 'Return' },
];

export const tdsReturns = [
  { id: 1, period: 'TDS Q1 FY 24-25', client: 'PQR Solutions', status: 'Completed', due: '2024-05-15', type: 'Filing' },
  { id: 2, period: 'TDS Q2 FY 24-25', client: 'Ramesh Kumar', status: 'Pending Review', due: '2024-06-15', type: 'Filing' },
];

export const auditItems = [
  { id: 1, title: 'Vouching – Purchases', client: 'LMN Pvt. Ltd.', status: 'In Progress', owner: 'Team A', due: '2024-05-12' },
  { id: 2, title: 'Receipts Confirmation', client: 'ABC Pvt. Ltd.', status: 'Pending Review', owner: 'Team B', due: '2024-05-18' },
  { id: 3, title: 'Fixed Asset Verification', client: 'XYZ Traders', status: 'Scheduled', owner: 'Team C', due: '2024-05-22' },
];

export const reports = [
  { id: 1, name: 'Monthly Compliance Report', lastGenerated: '1d ago', status: 'Ready', format: 'PDF' },
  { id: 2, name: 'GST Summary (Apr 2024)', lastGenerated: '2d ago', status: 'Ready', format: 'Excel' },
  { id: 3, name: 'TDS Reconciliation Statement', lastGenerated: '5d ago', status: 'Ready', format: 'PDF' },
];

export const analytics = [
  { id: 1, metric: 'Accuracy Improvement', value: '99.2%', trend: '+0.4%' },
  { id: 2, metric: 'Time Saved', value: '215 hrs', trend: '+12%' },
  { id: 3, metric: 'Automation Coverage', value: '73%', trend: '+6%' },
];

export const templates = [
  { id: 1, name: 'GST Filing Checklist', type: 'GST', lastUpdated: '3d ago' },
  { id: 2, name: 'Audit Working Papers – Standard', type: 'Audit', lastUpdated: '6d ago' },
  { id: 3, name: 'Client Onboarding Form', type: 'Clients', lastUpdated: '1w ago' },
];

export const integrations = [
  { id: 1, name: 'Tally', status: 'Connected', lastSync: '10h ago', description: 'Sync ledgers and vouchers automatically.' },
  { id: 2, name: 'Google Drive', status: 'Connected', lastSync: '4h ago', description: 'Store client documents and audit packs.' },
  { id: 3, name: 'Email (SMTP)', status: 'Not Connected', lastSync: '-', description: 'Send automated filing reminders and client alerts.' },
];

export const settings = [
  { id: 1, name: 'Practice Profile', description: 'Tax IDs, firm details, team contacts' },
  { id: 2, name: 'Notification Preferences', description: 'Due dates, workflow alerts, and email reminders' },
  { id: 3, name: 'Automation Rules', description: 'Enable AI validation rules for compliance jobs' },
  { id: 4, name: 'Security Controls', description: 'Access policies, SSO, and session handling' },
];

