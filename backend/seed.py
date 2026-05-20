import bcrypt
from sqlalchemy.orm import Session
from . import models


def create_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def seed_default_data(db: Session):
    """Seed database with initial data for Chartered Accountant application."""
    admin_email = 'admin@aicountant.com'
    admin_password = 'password'
    admin_hash = create_password_hash(admin_password)

    # Seed users
    admin_user = db.query(models.User).filter(models.User.email == admin_email).first()
    if not admin_user:
        migrated_user = db.query(models.User).filter(models.User.email == 'admin@aicountant.local').first()
        if migrated_user:
            migrated_user.email = admin_email
            migrated_user.hashed_password = admin_hash
            db.commit()
        else:
            admin = models.User(
                email=admin_email,
                hashed_password=admin_hash,
                first_name='CA',
                last_name='Arjun',
                firm_name='AICountant Firm',
                gstin='27AABCU9600R1ZQ',
                role='Partner',
            )
            db.add(admin)
            db.flush()

    # Seed clients
    if not db.query(models.Client).first():
        clients = [
            models.Client(
                name='ABC Pvt. Ltd.',
                gstin='27AABCU9600R1ZQ',
                status='Active',
                last_filed='2024-04-20',
                health='Healthy',
                ai_flag='GST compliance due'
            ),
            models.Client(
                name='XYZ Traders',
                gstin='27AAECS1234P1ZV',
                status='Active',
                last_filed='2024-04-18',
                health='Monitor',
                ai_flag='Invoice mismatch detected'
            ),
            models.Client(
                name='PQR Solutions',
                gstin='27AABCP7890K1ZU',
                status='Review',
                last_filed='2024-04-10',
                health='High risk',
                ai_flag='Bank reconciliation pending'
            ),
            models.Client(
                name='Ramesh Kumar',
                gstin='27AAGHR4567D1Z3',
                status='Active',
                last_filed='2024-04-22',
                health='Healthy',
                ai_flag='ITR ready for review'
            ),
        ]
        db.add_all(clients)
        db.flush()

    # Seed documents
    if not db.query(models.Document).first():
        # Get client IDs
        clients = db.query(models.Client).all()
        client_map = {c.name: c.id for c in clients}
        
        documents = [
            models.Document(
                name='GSTIN Verification Report.pdf',
                client_id=client_map.get('ABC Pvt. Ltd.', 1),
                type='GST',
                stage='Approved',
                updated='2d ago'
            ),
            models.Document(
                name='Bank Statements – March 2024.xlsx',
                client_id=client_map.get('XYZ Traders', 2),
                type='Bank',
                stage='Reconcile',
                updated='5d ago'
            ),
            models.Document(
                name='TDS Certificates – FY 23-24.pdf',
                client_id=client_map.get('PQR Solutions', 3),
                type='TDS',
                stage='Review',
                updated='1d ago'
            ),
            models.Document(
                name='Audit Working Papers.docx',
                client_id=client_map.get('ABC Pvt. Ltd.', 1),
                type='Audit',
                stage='Draft',
                updated='3d ago'
            ),
        ]
        db.add_all(documents)
        db.flush()

    # Seed workflows
    if not db.query(models.Workflow).first():
        clients = db.query(models.Client).all()
        client_map = {c.name: c.id for c in clients}
        
        workflows = [
            models.Workflow(
                title='Bank Reconciliation – April 2024',
                client_id=client_map.get('ABC Pvt. Ltd.', 1),
                due='2024-05-05',
                status='Completed',
                automation='Auto-matched 98%'
            ),
            models.Workflow(
                title='GST Return – GSTR-3B',
                client_id=client_map.get('XYZ Traders', 2),
                due='2024-05-10',
                status='In Progress',
                automation='Field validation active'
            ),
            models.Workflow(
                title='TDS Return – Q1 FY 24-25',
                client_id=client_map.get('PQR Solutions', 3),
                due='2024-05-15',
                status='Completed',
                automation='Auto-draft generated'
            ),
            models.Workflow(
                title='ITR Filing – AY 2024-25',
                client_id=client_map.get('Ramesh Kumar', 4),
                due='2024-05-22',
                status='Pending Review',
                automation='AI review suggested'
            ),
        ]
        db.add_all(workflows)
        db.flush()

    # Seed automations
    if not db.query(models.Automation).first():
        automations = [
            models.Automation(
                name='Duplicate Invoice Detection',
                trigger='On Invoice Upload',
                accuracy='99.1%',
                status='Running',
                impact='Fraud risk reduced'
            ),
            models.Automation(
                name='GST Missing Field Validator',
                trigger='Before Filing',
                accuracy='98.4%',
                status='Running',
                impact='Filing errors prevented'
            ),
            models.Automation(
                name='Bank Reconciliation Matcher',
                trigger='Statement Import',
                accuracy='97.9%',
                status='Paused',
                impact='Cash mismatch flagged'
            ),
        ]
        db.add_all(automations)
        db.flush()

    # Seed automation highlights
    if not db.query(models.AutomationHighlight).first():
        highlights = [
            models.AutomationHighlight(
                title='Auto-fill GST returns',
                description='Generate GSTR-3B drafts with AI metadata mapping.',
                status='Enabled'
            ),
            models.AutomationHighlight(
                title='Smart expenses categorization',
                description='Classify vendor payments automatically based on ledger rules.',
                status='Enabled'
            ),
            models.AutomationHighlight(
                title='Audit checklist generation',
                description='Create workpaper schedules from client documents.',
                status='Enabled'
            ),
        ]
        db.add_all(highlights)
        db.flush()

    # Seed transactions
    if not db.query(models.Transaction).first():
        clients = db.query(models.Client).all()
        client_map = {c.name: c.id for c in clients}
        
        transactions = [
            models.Transaction(
                description='Payment received – Vendor A',
                date='2024-05-01',
                amount=48250.00,
                category='Payables',
                status='Cleared',
                client_id=client_map.get('ABC Pvt. Ltd.', 1)
            ),
            models.Transaction(
                description='Tax deducted – TDS',
                date='2024-04-28',
                amount=12450.00,
                category='Taxes',
                status='Pending',
                client_id=client_map.get('XYZ Traders', 2)
            ),
            models.Transaction(
                description='GST paid (advance)',
                date='2024-04-20',
                amount=218900.00,
                category='GST',
                status='Reconciled',
                client_id=client_map.get('PQR Solutions', 3)
            ),
        ]
        db.add_all(transactions)
        db.flush()

    # Seed compliance tasks
    if not db.query(models.ComplianceTask).first():
        clients = db.query(models.Client).all()
        client_map = {c.name: c.id for c in clients}
        
        tasks = [
            models.ComplianceTask(
                name='GSTR-3B Filing',
                client_id=client_map.get('XYZ Traders', 2),
                due='2024-05-10',
                status='In Progress'
            ),
            models.ComplianceTask(
                name='TDS Certificate Upload',
                client_id=client_map.get('PQR Solutions', 3),
                due='2024-05-15',
                status='Completed'
            ),
            models.ComplianceTask(
                name='Annual Audit Preparation',
                client_id=client_map.get('ABC Pvt. Ltd.', 1),
                due='2024-05-30',
                status='Pending'
            ),
        ]
        db.add_all(tasks)
        db.flush()

    # Seed GST returns
    if not db.query(models.GSTReturn).first():
        clients = db.query(models.Client).all()
        client_map = {c.name: c.id for c in clients}
        
        gst_returns = [
            models.GSTReturn(
                period='GSTR-3B Apr 2024',
                client_id=client_map.get('XYZ Traders', 2),
                status='In Progress',
                due='2024-05-10',
                type='Return'
            ),
            models.GSTReturn(
                period='GSTR-1 Apr 2024',
                client_id=client_map.get('ABC Pvt. Ltd.', 1),
                status='Completed',
                due='2024-05-02',
                type='Return'
            ),
        ]
        db.add_all(gst_returns)
        db.flush()

    # Seed TDS returns
    if not db.query(models.TDSReturn).first():
        clients = db.query(models.Client).all()
        client_map = {c.name: c.id for c in clients}
        
        tds_returns = [
            models.TDSReturn(
                period='TDS Q1 FY 24-25',
                client_id=client_map.get('PQR Solutions', 3),
                status='Completed',
                due='2024-05-15',
                type='Filing'
            ),
            models.TDSReturn(
                period='TDS Q2 FY 24-25',
                client_id=client_map.get('Ramesh Kumar', 4),
                status='Pending Review',
                due='2024-06-15',
                type='Filing'
            ),
        ]
        db.add_all(tds_returns)
        db.flush()

    # Seed audit items
    if not db.query(models.AuditItem).first():
        clients = db.query(models.Client).all()
        client_map = {c.name: c.id for c in clients}
        
        audit_items = [
            models.AuditItem(
                title='Vouching – Purchases',
                client_id=client_map.get('ABC Pvt. Ltd.', 1),
                status='In Progress',
                owner='Team A'
            ),
            models.AuditItem(
                title='Receipts Confirmation',
                client_id=client_map.get('ABC Pvt. Ltd.', 1),
                status='Pending Review',
                owner='Team B'
            ),
            models.AuditItem(
                title='Fixed Asset Verification',
                client_id=client_map.get('XYZ Traders', 2),
                status='Scheduled',
                owner='Team C'
            ),
        ]
        db.add_all(audit_items)
        db.flush()

    # Seed reports
    if not db.query(models.Report).first():
        clients = db.query(models.Client).all()
        client_ids = [c.id for c in clients]
        
        reports = [
            models.Report(
                name='Monthly Compliance Report',
                report_type='Compliance',
                client_id=client_ids[0] if client_ids else None,
                data='Compliance status across all clients'
            ),
            models.Report(
                name='GST Summary (Apr 2024)',
                report_type='GST',
                client_id=client_ids[1] if len(client_ids) > 1 else None,
                data='GST filing summary for April'
            ),
            models.Report(
                name='TDS Reconciliation Statement',
                report_type='TDS',
                client_id=client_ids[2] if len(client_ids) > 2 else None,
                data='TDS reconciliation details'
            ),
        ]
        db.add_all(reports)
        db.flush()

    # Seed AI insights
    if not db.query(models.AIInsight).first():
        clients = db.query(models.Client).all()
        
        insights = [
            models.AIInsight(
                question='What is the overall compliance status?',
                insight='92% of clients are compliant. 1 client flagged for high risk review. Recommend priority audit.'
            ),
            models.AIInsight(
                question='Which clients need attention?',
                insight='PQR Solutions requires immediate bank reconciliation. XYZ Traders has invoice mismatches.'
            ),
            models.AIInsight(
                question='What automations are saving the most time?',
                insight='Bank reconciliation matcher and GST validator combined save ~40 hours/month with 98% accuracy.'
            ),
        ]
        db.add_all(insights)
        db.flush()

    db.commit()

