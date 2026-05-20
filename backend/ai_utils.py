import os
from datetime import datetime, timedelta
from typing import List, Dict, Optional

try:
    import openai
except ImportError:
    openai = None


def default_response(question: str) -> str:
    text = question.lower()
    if 'clients' in text or 'gstin' in text:
        return (
            'The client dashboard is ready. Clients are tracked by status, GSTIN validation, and AI risk flags for quick review.'
        )
    if 'compliance' in text or 'filing' in text or 'deadline' in text:
        return (
            'Compliance workflows are monitored by due date, and the system will flag late filings or missing documents before the due date.'
        )
    if 'audit' in text:
        return (
            'Audit workpapers are organized by client and owner, with AI-enabled issue detection for higher quality review.'
        )
    if 'report' in text or 'analytics' in text:
        return (
            'Reports and analytics summarize filings, risk, and automation impact so Chartered Accountants can prioritize action items.'
        )
    if 'transaction' in text or 'expense' in text or 'income' in text:
        return (
            'Transaction analysis identifies spending patterns and revenue trends. Categorization helps with tax planning and compliance.'
        )
    if 'gst' in text or 'tax' in text:
        return (
            'GST compliance is monitored with automated field validation. TDS reconciliation flags mismatches automatically.'
        )
    return (
        'AICountant can assist with client management, compliance deadlines, audit workflows, and reporting. Ask about client status, filings, or AI recommendations.'
    )


def ai_response(question: str) -> str:
    """Get AI response using OpenAI if available, else fallback to default."""
    api_key = os.getenv('OPENAI_API_KEY')
    if openai is not None and api_key:
        try:
            openai.api_key = api_key
            response = openai.ChatCompletion.create(
                model='gpt-3.5-turbo',
                messages=[
                    {
                        'role': 'system',
                        'content': 'You are an AI assistant supporting a Chartered Accountant dashboard application. Provide concise, actionable accounting insights.'
                    },
                    {
                        'role': 'user',
                        'content': question,
                    },
                ],
                max_tokens=250,
                temperature=0.7,
            )
            return response.choices[0].message.content.strip()
        except Exception as exc:
            return default_response(question)
    return default_response(question)


def generate_client_insights(client_data: Dict) -> str:
    """Generate AI insights from client data."""
    insights = []
    
    if client_data.get('health') == 'High risk':
        insights.append('⚠️ High-risk client flagged. Recommend priority audit review.')
    elif client_data.get('health') == 'Monitor':
        insights.append('📊 Monitor client status. Review recent filing history.')
    elif client_data.get('health') == 'Healthy':
        insights.append('✅ Client status is healthy. Compliance on track.')
    
    if client_data.get('ai_flag'):
        insights.append(f'🤖 AI Alert: {client_data["ai_flag"]}')
    
    last_filed = client_data.get('last_filed')
    if last_filed:
        days_ago = (datetime.now() - datetime.strptime(last_filed, '%Y-%m-%d')).days
        if days_ago > 90:
            insights.append(f'📅 Last filing was {days_ago} days ago. Schedule next review.')
    
    return ' | '.join(insights) if insights else 'Client data updated and monitored.'


def generate_compliance_insights(compliance_data: List[Dict]) -> str:
    """Generate insights from compliance tasks."""
    total = len(compliance_data)
    pending = len([c for c in compliance_data if c.get('status') == 'Pending'])
    completed = len([c for c in compliance_data if c.get('status') == 'Completed'])
    
    due_soon = 0
    for item in compliance_data:
        if item.get('due'):
            try:
                due_date = datetime.strptime(item['due'], '%Y-%m-%d')
                days_left = (due_date - datetime.now()).days
                if 0 <= days_left <= 7:
                    due_soon += 1
            except:
                pass
    
    insights = f'📋 Compliance Status: {completed}/{total} completed.'
    if due_soon > 0:
        insights += f' {due_soon} tasks due within 7 days.'
    if pending > 0:
        insights += f' {pending} pending tasks.'
    
    return insights


def generate_automation_insights(automation_data: List[Dict]) -> str:
    """Generate insights from automation metrics."""
    if not automation_data:
        return 'Enable automations to streamline workflows and reduce manual effort.'
    
    running = len([a for a in automation_data if a.get('status') == 'Running'])
    avg_accuracy = sum(float(a.get('accuracy', '0').replace('%', '')) for a in automation_data if a.get('accuracy')) / max(len(automation_data), 1)
    
    return f'🚀 Automations: {running} running with avg {avg_accuracy:.1f}% accuracy. Automations reduce manual errors and save time.'


def generate_transaction_insights(transactions: List[Dict]) -> str:
    """Generate insights from transaction data."""
    if not transactions:
        return 'Import transactions to analyze spending and revenue patterns.'
    
    total_amount = sum(float(t.get('amount', 0)) for t in transactions if t.get('amount'))
    by_category = {}
    for t in transactions:
        cat = t.get('category', 'Uncategorized')
        by_category[cat] = by_category.get(cat, 0) + float(t.get('amount', 0))
    
    top_category = max(by_category.items(), key=lambda x: x[1])[0] if by_category else 'Unknown'
    
    return f'💰 Transactions: ₹{total_amount:,.0f} total. Top category: {top_category}. Review categorization for tax planning.'


def generate_report_summary(report_type: str, data: Optional[Dict] = None) -> str:
    """Generate AI summary for reports."""
    summaries = {
        'GST': '📊 GST Returns: All filings tracked with GSTR-1, GSTR-2B, and GSTR-3B compliance monitoring.',
        'TDS': '📑 TDS Returns: Reconciliation status monitored. Mismatches flagged automatically.',
        'ITR': '📝 ITR Filing: Personal and business tax returns processed. Status tracked by client.',
        'Audit': '🔍 Audit Report: Workpapers organized and issues flagged for review.',
        'Bank': '🏦 Bank Reconciliation: Automated matching reduces manual effort by ~98%.',
    }
    return summaries.get(report_type, f'📄 {report_type} report generated. Review for completeness.')

