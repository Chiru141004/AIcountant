from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, Float, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    firm_name = Column(String, nullable=True)
    gstin = Column(String, nullable=True)
    role = Column(String, default='Partner')
    created_at = Column(DateTime, default=datetime.utcnow)

class Client(Base):
    __tablename__ = 'clients'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    gstin = Column(String, nullable=True)
    status = Column(String, nullable=False)
    last_filed = Column(String, nullable=True)
    health = Column(String, nullable=True)
    ai_flag = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Document(Base):
    __tablename__ = 'documents'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    client_id = Column(Integer, ForeignKey('clients.id'), nullable=False)
    type = Column(String, nullable=False)
    stage = Column(String, nullable=False)
    updated = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    client = relationship('Client')

class Workflow(Base):
    __tablename__ = 'workflows'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    client_id = Column(Integer, ForeignKey('clients.id'), nullable=False)
    due = Column(String, nullable=True)
    status = Column(String, nullable=False)
    automation = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    client = relationship('Client')

class Automation(Base):
    __tablename__ = 'automations'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    trigger = Column(String, nullable=True)
    accuracy = Column(String, nullable=True)
    status = Column(String, nullable=False)
    impact = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class AutomationHighlight(Base):
    __tablename__ = 'automation_highlights'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Transaction(Base):
    __tablename__ = 'transactions'
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    date = Column(String, nullable=True)
    amount = Column(Float, nullable=True)
    category = Column(String, nullable=True)
    status = Column(String, nullable=False)
    client_id = Column(Integer, ForeignKey('clients.id'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    client = relationship('Client')

class ComplianceTask(Base):
    __tablename__ = 'compliance_tasks'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    client_id = Column(Integer, ForeignKey('clients.id'), nullable=False)
    due = Column(String, nullable=True)
    status = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    client = relationship('Client')

class GSTReturn(Base):
    __tablename__ = 'gst_returns'
    id = Column(Integer, primary_key=True, index=True)
    period = Column(String, nullable=False)
    client_id = Column(Integer, ForeignKey('clients.id'), nullable=False)
    status = Column(String, nullable=False)
    due = Column(String, nullable=True)
    type = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    client = relationship('Client')

class TDSReturn(Base):
    __tablename__ = 'tds_returns'
    id = Column(Integer, primary_key=True, index=True)
    period = Column(String, nullable=False)
    client_id = Column(Integer, ForeignKey('clients.id'), nullable=False)
    status = Column(String, nullable=False)
    due = Column(String, nullable=True)
    type = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    client = relationship('Client')

class AuditItem(Base):
    __tablename__ = 'audit_items'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    client_id = Column(Integer, ForeignKey('clients.id'), nullable=False)
    status = Column(String, nullable=False)
    owner = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    client = relationship('Client')

class Report(Base):
    __tablename__ = 'reports'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    report_type = Column(String, nullable=False)
    client_id = Column(Integer, ForeignKey('clients.id'), nullable=True)
    data = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    client = relationship('Client')

class AIInsight(Base):
    __tablename__ = 'ai_insights'
    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text, nullable=False)
    insight = Column(Text, nullable=False)
    client_id = Column(Integer, ForeignKey('clients.id'), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    client = relationship('Client')


class AnalyticsMetric(Base):
    __tablename__ = 'analytics_metrics'
    id = Column(Integer, primary_key=True, index=True)
    metric = Column(String, nullable=False)
    value = Column(String, nullable=False)
    trend = Column(String, nullable=True)

class Template(Base):
    __tablename__ = 'templates'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=True)
    last_updated = Column(String, nullable=True)

class Integration(Base):
    __tablename__ = 'integrations'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    status = Column(String, nullable=False)
    last_sync = Column(String, nullable=True)
    description = Column(Text, nullable=True)

class Setting(Base):
    __tablename__ = 'settings'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)

