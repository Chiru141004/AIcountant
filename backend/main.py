import logging
import os
import time
from datetime import datetime, timedelta
from logging.handlers import RotatingFileHandler
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
import bcrypt
import jwt
from sqlalchemy.orm import Session

from . import models, schemas, ai_utils, seed
from .database import Base, SessionLocal, engine

ROOT_DIR = os.path.dirname(os.path.dirname(__file__))
load_dotenv(os.path.join(ROOT_DIR, '.env'))

SECRET_KEY = os.getenv('SECRET_KEY', 'aicountant-secret-key')
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', str(24 * 60)))
RATE_LIMIT_REQUESTS = int(os.getenv('RATE_LIMIT_REQUESTS', '120'))
RATE_LIMIT_WINDOW = int(os.getenv('RATE_LIMIT_WINDOW', '60'))
LOG_DIR = os.getenv('LOG_DIR', os.path.join(ROOT_DIR, 'logs'))

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/api/auth/login')

allowed_origins = os.getenv('FRONTEND_ORIGINS', '*')
if allowed_origins.strip() == '*':
    cors_origins = ['*']
else:
    cors_origins = [origin.strip() for origin in allowed_origins.split(',') if origin.strip()]

os.makedirs(LOG_DIR, exist_ok=True)
log_file = os.path.join(LOG_DIR, 'backend.log')
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(name)s %(message)s',
    handlers=[
        RotatingFileHandler(log_file, maxBytes=5_242_880, backupCount=5, encoding='utf-8'),
        logging.StreamHandler(),
    ],
)
logger = logging.getLogger('aicountant')

Base.metadata.create_all(bind=engine)

app = FastAPI(title='AICountant Backend')

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

rate_limit_store: dict[str, list[float]] = {}

@app.middleware('http')
async def log_requests(request: Request, call_next):
    start_time = time.monotonic()
    response = await call_next(request)
    elapsed_ms = (time.monotonic() - start_time) * 1000
    logger.info('%s %s %s %.2fms', request.method, request.url.path, response.status_code, elapsed_ms)
    return response

@app.middleware('http')
async def rate_limit_middleware(request: Request, call_next):
    path = request.url.path
    if path.startswith('/api/'):
        client_ip = request.headers.get('x-forwarded-for', request.client.host if request.client else 'unknown')
        if ',' in client_ip:
            client_ip = client_ip.split(',')[0].strip()
        now = time.time()
        window = rate_limit_store.get(client_ip, [])
        window = [timestamp for timestamp in window if timestamp > now - RATE_LIMIT_WINDOW]
        if len(window) >= RATE_LIMIT_REQUESTS:
            logger.warning('Rate limit exceeded for %s on %s', client_ip, request.url.path)
            return JSONResponse({'detail': 'Rate limit exceeded'}, status_code=status.HTTP_429_TOO_MANY_REQUESTS)
        window.append(now)
        rate_limit_store[client_ip] = window
    return await call_next(request)

@app.middleware('http')
async def security_headers_middleware(request: Request, call_next):
    response = await call_next(request)
    security_headers = {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=()',
        'X-XSS-Protection': '0',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    }
    for key, value in security_headers.items():
        response.headers.setdefault(key, value)
    return response

@app.middleware('http')
async def auth_middleware(request: Request, call_next):
    path = request.url.path
    if path.startswith('/api/') and not path.startswith('/api/auth/'):
        if request.method == 'OPTIONS':
            return await call_next(request)

        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return JSONResponse({'detail': 'Not authenticated'}, status_code=status.HTTP_401_UNAUTHORIZED)

        token = auth_header[7:]
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            email = payload.get('sub')
            if email is None:
                raise jwt.PyJWTError()
        except jwt.PyJWTError:
            return JSONResponse({'detail': 'Could not validate credentials'}, status_code=status.HTTP_401_UNAUTHORIZED)

        db = SessionLocal()
        try:
            user = get_user_by_email(db, email)
            if user is None:
                return JSONResponse({'detail': 'User not found'}, status_code=status.HTTP_401_UNAUTHORIZED)
        finally:
            db.close()

    return await call_next(request)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logger.warning('Validation failed for %s: %s', request.url.path, exc.errors())
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={'detail': exc.errors(), 'body': exc.body},
    )

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.exception('Unexpected error for %s', request.url.path)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={'detail': 'Internal server error. Please contact support.'},
    )


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
    except ValueError:
        return False


def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({'exp': expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Could not validate credentials',
        headers={'WWW-Authenticate': 'Bearer'},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get('sub')
        if email is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    user = get_user_by_email(db, email)
    if user is None:
        raise credentials_exception
    return user


@app.on_event('startup')
def startup_event():
    db = SessionLocal()
    try:
        seed.seed_default_data(db)
    finally:
        db.close()


@app.get('/')
def root():
    return {'message': 'AICountant backend is running.'}


# ============ AUTH ENDPOINTS ============

@app.post('/api/auth/register', response_model=schemas.Token)
def register(user_create: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = get_user_by_email(db, user_create.email)
    if existing:
        raise HTTPException(status_code=400, detail='Email already registered')
    hashed_password = get_password_hash(user_create.password)
    user = models.User(
        email=user_create.email,
        hashed_password=hashed_password,
        first_name=user_create.first_name,
        last_name=user_create.last_name,
        firm_name=user_create.firm_name,
        gstin=user_create.gstin,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    access_token = create_access_token(data={'sub': user.email})
    user_response = schemas.UserResponse.from_orm(user)
    return {
        'access_token': access_token,
        'token_type': 'bearer',
        'user': user_response.model_dump(),
    }


@app.post('/api/auth/login', response_model=schemas.Token)
def login(form_data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.email, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail='Incorrect email or password')
    access_token = create_access_token(data={'sub': user.email})
    user_response = schemas.UserResponse.from_orm(user)
    return {
        'access_token': access_token,
        'token_type': 'bearer',
        'user': user_response.model_dump(),
    }


@app.get('/api/auth/profile', response_model=schemas.UserResponse)
def profile(current_user: models.User = Depends(get_current_user)):
    return current_user


# ============ CLIENT ENDPOINTS ============

@app.get('/api/clients', response_model=List[schemas.Client])
def get_clients(db: Session = Depends(get_db)):
    return db.query(models.Client).all()


@app.post('/api/clients', response_model=schemas.Client)
def create_client(client: schemas.ClientCreate, db: Session = Depends(get_db)):
    db_client = models.Client(**client.dict())
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client


@app.get('/api/clients/{client_id}', response_model=schemas.Client)
def get_client(client_id: int, db: Session = Depends(get_db)):
    client = db.query(models.Client).filter(models.Client.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail='Client not found')
    return client


@app.put('/api/clients/{client_id}', response_model=schemas.Client)
def update_client(client_id: int, client_update: schemas.ClientCreate, db: Session = Depends(get_db)):
    client = db.query(models.Client).filter(models.Client.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail='Client not found')
    for key, value in client_update.dict().items():
        setattr(client, key, value)
    db.commit()
    db.refresh(client)
    return client


# ============ DOCUMENT ENDPOINTS ============

@app.get('/api/documents', response_model=List[dict])
def get_documents(db: Session = Depends(get_db)):
    docs = db.query(models.Document).all()
    result = []
    for doc in docs:
        client_name = doc.client.name if doc.client else 'Unknown'
        result.append({
            'id': doc.id,
            'name': doc.name,
            'client': client_name,
            'client_id': doc.client_id,
            'type': doc.type,
            'stage': doc.stage,
            'updated': doc.updated,
            'created_at': doc.created_at,
        })
    return result


@app.post('/api/documents', response_model=schemas.Document)
def create_document(doc: schemas.DocumentCreate, db: Session = Depends(get_db)):
    db_doc = models.Document(**doc.dict())
    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)
    return db_doc


@app.get('/api/documents/{doc_id}', response_model=schemas.Document)
def get_document(doc_id: int, db: Session = Depends(get_db)):
    doc = db.query(models.Document).filter(models.Document.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail='Document not found')
    return doc


# ============ WORKFLOW ENDPOINTS ============

@app.get('/api/workflows', response_model=List[dict])
def get_workflows(db: Session = Depends(get_db)):
    workflows = db.query(models.Workflow).order_by(models.Workflow.id.desc()).all()
    result = []
    for w in workflows:
        client_name = w.client.name if w.client else 'Unknown'
        result.append({
            'id': w.id,
            'title': w.title,
            'client': client_name,
            'client_id': w.client_id,
            'due': w.due,
            'status': w.status,
            'automation': w.automation,
            'created_at': w.created_at,
        })
    return result


@app.post('/api/workflows', response_model=schemas.Workflow)
def create_workflow(workflow: schemas.WorkflowCreate, db: Session = Depends(get_db)):
    db_workflow = models.Workflow(**workflow.dict())
    db.add(db_workflow)
    db.commit()
    db.refresh(db_workflow)
    return db_workflow


@app.get('/api/workflows/{workflow_id}', response_model=schemas.Workflow)
def get_workflow(workflow_id: int, db: Session = Depends(get_db)):
    workflow = db.query(models.Workflow).filter(models.Workflow.id == workflow_id).first()
    if not workflow:
        raise HTTPException(status_code=404, detail='Workflow not found')
    return workflow


# ============ AUTOMATION ENDPOINTS ============

@app.get('/api/automations', response_model=List[schemas.Automation])
def get_automations(db: Session = Depends(get_db)):
    return db.query(models.Automation).all()


@app.post('/api/automations', response_model=schemas.Automation)
def create_automation(auto: schemas.AutomationCreate, db: Session = Depends(get_db)):
    db_auto = models.Automation(**auto.dict())
    db.add(db_auto)
    db.commit()
    db.refresh(db_auto)
    return db_auto


@app.get('/api/automation-highlights', response_model=List[schemas.AutomationHighlight])
def get_automation_highlights(db: Session = Depends(get_db)):
    return db.query(models.AutomationHighlight).all()


# ============ TRANSACTION ENDPOINTS ============

@app.get('/api/transactions', response_model=List[dict])
def get_transactions(db: Session = Depends(get_db)):
    txns = db.query(models.Transaction).all()
    result = []
    for t in txns:
        client_name = t.client.name if t.client else 'Unknown'
        result.append({
            'id': t.id,
            'description': t.description,
            'date': t.date,
            'amount': f'₹ {t.amount:,.0f}' if t.amount else 'N/A',
            'category': t.category,
            'status': t.status,
            'client': client_name,
            'client_id': t.client_id,
            'created_at': t.created_at,
        })
    return result


@app.post('/api/transactions', response_model=schemas.Transaction)
def create_transaction(txn: schemas.TransactionCreate, db: Session = Depends(get_db)):
    db_txn = models.Transaction(**txn.dict())
    db.add(db_txn)
    db.commit()
    db.refresh(db_txn)
    return db_txn


# ============ COMPLIANCE ENDPOINTS ============

@app.get('/api/compliance', response_model=List[dict])
def get_compliance_tasks(db: Session = Depends(get_db)):
    tasks = db.query(models.ComplianceTask).all()
    result = []
    for t in tasks:
        client_name = t.client.name if t.client else 'Unknown'
        result.append({
            'id': t.id,
            'name': t.name,
            'client': client_name,
            'client_id': t.client_id,
            'due': t.due,
            'status': t.status,
            'created_at': t.created_at,
        })
    return result


@app.post('/api/compliance', response_model=schemas.ComplianceTask)
def create_compliance_task(task: schemas.ComplianceTaskCreate, db: Session = Depends(get_db)):
    db_task = models.ComplianceTask(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


# ============ GST ENDPOINTS ============

@app.get('/api/gst', response_model=List[dict])
def get_gst_returns(db: Session = Depends(get_db)):
    gst = db.query(models.GSTReturn).all()
    result = []
    for g in gst:
        client_name = g.client.name if g.client else 'Unknown'
        result.append({
            'id': g.id,
            'period': g.period,
            'client': client_name,
            'client_id': g.client_id,
            'status': g.status,
            'due': g.due,
            'type': g.type,
            'created_at': g.created_at,
        })
    return result


@app.post('/api/gst', response_model=schemas.GSTReturn)
def create_gst_return(gst: schemas.GSTReturnCreate, db: Session = Depends(get_db)):
    db_gst = models.GSTReturn(**gst.dict())
    db.add(db_gst)
    db.commit()
    db.refresh(db_gst)
    return db_gst


# ============ TDS ENDPOINTS ============

@app.get('/api/tds', response_model=List[dict])
def get_tds_returns(db: Session = Depends(get_db)):
    tds = db.query(models.TDSReturn).all()
    result = []
    for t in tds:
        client_name = t.client.name if t.client else 'Unknown'
        result.append({
            'id': t.id,
            'period': t.period,
            'client': client_name,
            'client_id': t.client_id,
            'status': t.status,
            'due': t.due,
            'type': t.type,
            'created_at': t.created_at,
        })
    return result


@app.post('/api/tds', response_model=schemas.TDSReturn)
def create_tds_return(tds: schemas.TDSReturnCreate, db: Session = Depends(get_db)):
    db_tds = models.TDSReturn(**tds.dict())
    db.add(db_tds)
    db.commit()
    db.refresh(db_tds)
    return db_tds


# ============ AUDIT ENDPOINTS ============

@app.get('/api/audit', response_model=List[dict])
def get_audit_items(db: Session = Depends(get_db)):
    items = db.query(models.AuditItem).all()
    result = []
    for item in items:
        client_name = item.client.name if item.client else 'Unknown'
        result.append({
            'id': item.id,
            'title': item.title,
            'client': client_name,
            'client_id': item.client_id,
            'status': item.status,
            'owner': item.owner,
            'created_at': item.created_at,
        })
    return result


@app.post('/api/audit', response_model=schemas.AuditItem)
def create_audit_item(item: schemas.AuditItemCreate, db: Session = Depends(get_db)):
    db_item = models.AuditItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


# ============ REPORT ENDPOINTS ============

@app.get('/api/reports', response_model=List[schemas.Report])
def get_reports(db: Session = Depends(get_db)):
    return db.query(models.Report).all()


@app.post('/api/reports', response_model=schemas.Report)
def create_report(report: schemas.ReportCreate, db: Session = Depends(get_db)):
    db_report = models.Report(**report.dict())
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report


# ============ AI ENDPOINTS ============

@app.get('/api/ai/insights', response_model=List[schemas.AIInsight])
def get_ai_insights(db: Session = Depends(get_db)):
    return db.query(models.AIInsight).order_by(models.AIInsight.id.desc()).limit(10).all()


@app.post('/api/ai/insights', response_model=schemas.AIInsight)
def create_ai_insight(insight: schemas.AIInsightCreate, db: Session = Depends(get_db)):
    db_insight = models.AIInsight(**insight.dict())
    db.add(db_insight)
    db.commit()
    db.refresh(db_insight)
    return db_insight


@app.post('/api/ai/query')
def query_ai(payload: dict):
    question = payload.get('question', '')
    answer = ai_utils.ai_response(question)
    return {'answer': answer, 'question': question}


# ============ DASHBOARD ENDPOINTS ============

@app.get('/api/dashboard', response_model=schemas.DashboardResponse)
def get_dashboard(db: Session = Depends(get_db)):
    # Dashboard stats
    total_clients = db.query(models.Client).count()
    active_clients = db.query(models.Client).filter(models.Client.status == 'Active').count()
    high_risk = db.query(models.Client).filter(models.Client.health == 'High risk').count()
    
    dashboard_stats = [
        {'id': 1, 'title': 'Active Clients', 'value': str(active_clients), 'trend': '+2', 'status': 'positive'},
        {'id': 2, 'title': 'Total Clients', 'value': str(total_clients), 'trend': '+1', 'status': 'positive'},
        {'id': 3, 'title': 'High Risk', 'value': str(high_risk), 'trend': '-1', 'status': 'negative'},
        {'id': 4, 'title': 'Compliance %', 'value': '92%', 'trend': '+3%', 'status': 'positive'},
    ]
    
    # Work overview
    work_overview = [
        {'metric': 'Reconciliations', 'value': '78%', 'trend': '+4%'},
        {'metric': 'Filings Completed', 'value': '92%', 'trend': '+2%'},
        {'metric': 'AI Error Rate', 'value': '0.8%', 'trend': '-0.1%'},
    ]
    
    # Automation impact
    automation_impact = [
        {'metric': 'Hours Saved', 'value': '215', 'trend': '+12%'},
        {'metric': 'Cost Saved', 'value': '172500', 'trend': '+9%'},
        {'metric': 'Accuracy', 'value': '99.2', 'trend': '+0.4%'},
    ]
    
    recent_workflows = db.query(models.Workflow).order_by(models.Workflow.id.desc()).limit(4).all()
    recent_workflows_dict = [
        {'id': w.id, 'title': w.title, 'status': w.status, 'due': w.due, 'client_id': w.client_id}
        for w in recent_workflows
    ]
    
    notifications = [
        {'id': 1, 'title': 'GST Return Due', 'message': 'ABC Pvt. Ltd. - Due in 3 days', 'status': 'warning'},
        {'id': 2, 'title': 'Document Uploaded', 'message': 'Bank statements received for XYZ Traders', 'status': 'info'},
        {'id': 3, 'title': 'Compliance Completed', 'message': 'TDS filing completed for Ramesh Kumar', 'status': 'success'},
        {'id': 4, 'title': 'AI Alert', 'message': 'Invoice mismatch detected in PQR Solutions', 'status': 'warning'},
    ]
    
    tasks_due_today = db.query(models.ComplianceTask).limit(5).all()
    tasks_dict = [
        {'id': t.id, 'name': t.name, 'status': t.status, 'due': t.due, 'client_id': t.client_id}
        for t in tasks_due_today
    ]
    
    ai_insights = db.query(models.AIInsight).order_by(models.AIInsight.id.desc()).limit(4).all()
    if not ai_insights:
        # Generate default insights if none exist
        ai_insights = [
            {'question': 'What is the compliance status?', 'insight': '4 tasks due within 7 days. 1 pending tasks.', 'client_id': None},
            {'question': 'Client health overview?', 'insight': '92% of clients are active. 1 high-risk flags detected.', 'client_id': None},
        ]
    else:
        ai_insights = [
            {'id': i.id, 'question': i.question, 'insight': i.insight, 'client_id': i.client_id}
            for i in ai_insights
        ]
    
    quick_actions = db.query(models.AutomationHighlight).limit(4).all()
    quick_actions_dict = [
        {'id': q.id, 'title': q.title, 'description': q.description, 'status': q.status}
        for q in quick_actions
    ]
    
    return {
        'dashboard_stats': dashboard_stats,
        'work_overview': work_overview,
        'automation_impact': automation_impact,
        'recent_workflows': recent_workflows_dict,
        'notifications': notifications,
        'tasks_due_today': tasks_dict,
        'ai_insights': ai_insights,
        'quick_actions': quick_actions_dict,
    }

