from typing import List, Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    firm_name: Optional[str] = None
    gstin: Optional[str] = None
    role: Optional[str] = 'Partner'

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class ClientBase(BaseModel):
    name: str
    gstin: Optional[str] = None
    status: str
    last_filed: Optional[str] = None
    health: Optional[str] = None
    ai_flag: Optional[str] = None

class ClientCreate(ClientBase):
    pass

class Client(ClientBase):
    id: int
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class DocumentBase(BaseModel):
    name: str
    client_id: int
    type: str
    stage: str
    updated: Optional[str] = None

class DocumentCreate(DocumentBase):
    pass

class Document(DocumentBase):
    id: int
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class WorkflowBase(BaseModel):
    title: str
    client_id: int
    due: Optional[str] = None
    status: str
    automation: Optional[str] = None

class WorkflowCreate(WorkflowBase):
    pass

class Workflow(WorkflowBase):
    id: int
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class AutomationBase(BaseModel):
    name: str
    trigger: Optional[str] = None
    accuracy: Optional[str] = None
    status: str
    impact: Optional[str] = None

class AutomationCreate(AutomationBase):
    pass

class Automation(AutomationBase):
    id: int
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class AutomationHighlightBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: Optional[str] = None

class AutomationHighlightCreate(AutomationHighlightBase):
    pass

class AutomationHighlight(AutomationHighlightBase):
    id: int
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class TransactionBase(BaseModel):
    description: str
    date: Optional[str] = None
    amount: Optional[float] = None
    category: Optional[str] = None
    status: str
    client_id: int

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class ComplianceTaskBase(BaseModel):
    name: str
    client_id: int
    due: Optional[str] = None
    status: str

class ComplianceTaskCreate(ComplianceTaskBase):
    pass

class ComplianceTask(ComplianceTaskBase):
    id: int
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class GSTReturnBase(BaseModel):
    period: str
    client_id: int
    status: str
    due: Optional[str] = None
    type: Optional[str] = None

class GSTReturnCreate(GSTReturnBase):
    pass

class GSTReturn(GSTReturnBase):
    id: int
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class TDSReturnBase(BaseModel):
    period: str
    client_id: int
    status: str
    due: Optional[str] = None
    type: Optional[str] = None

class TDSReturnCreate(TDSReturnBase):
    pass

class TDSReturn(TDSReturnBase):
    id: int
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class AuditItemBase(BaseModel):
    title: str
    client_id: int
    status: str
    owner: Optional[str] = None

class AuditItemCreate(AuditItemBase):
    pass

class AuditItem(AuditItemBase):
    id: int
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class ReportBase(BaseModel):
    name: str
    report_type: str
    client_id: Optional[int] = None
    data: Optional[str] = None

class ReportCreate(ReportBase):
    pass

class Report(ReportBase):
    id: int
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class AIInsightBase(BaseModel):
    question: str
    insight: str
    client_id: Optional[int] = None

class AIInsightCreate(AIInsightBase):
    pass

class AIInsight(AIInsightBase):
    id: int
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class DashboardResponse(BaseModel):
    dashboard_stats: List[dict]
    work_overview: List[dict]
    automation_impact: List[dict]
    recent_workflows: List[dict]
    notifications: List[dict]
    tasks_due_today: List[dict]
    ai_insights: List[dict]
    quick_actions: List[dict]

