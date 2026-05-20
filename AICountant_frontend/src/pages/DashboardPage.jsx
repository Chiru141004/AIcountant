import React, { useState, useEffect } from 'react';
import { getJson, getStoredUser } from '../api';
import PageHeader from '../components/PageHeader';
import DashboardCard from '../components/DashboardCard';
import ChartCard from '../components/ChartCard';
import WorkflowItem from '../components/WorkflowItem';
import NotificationItem from '../components/NotificationItem';
import TaskItem from '../components/TaskItem';
import AIInsightCard from '../components/AIInsightCard';
import QuickActionCard from '../components/QuickActionCard';
import WorkOverviewChart from '../components/PieChart';
import LineCharts from '../components/LineCharts';
import Footer from '../components/Footer';

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(getStoredUser());

  useEffect(() => {
    getJson('/dashboard')
      .then((data) => setDashboard(data))
      .catch(() => setDashboard(null))
      .finally(() => setLoading(false));
  }, []);

  const getGreetingName = () => {
    if (userData) {
      return `${userData.firstName} ${userData.lastName}`;
    }
    return 'CA Arjun';
  };

  if (loading) {
    return (
      <main className="md:ml-64 pt-24 pb-8 px-6">
        <div className="text-slate-700">Loading dashboard data...</div>
      </main>
    );
  }

  const dashboardStats = dashboard?.dashboard_stats || [];
  const workOverviewChart = dashboard?.work_overview || [];
  const automationImpactData = dashboard?.automation_impact || [];
  const recentWorkflows = dashboard?.recent_workflows || [];
  const notifications = dashboard?.notifications || [];
  const tasksDueToday = dashboard?.tasks_due_today || [];
  const aiInsights = dashboard?.ai_insights || [];
  const quickActions = dashboard?.quick_actions || [];

  return (
    <main className="md:ml-64 pt-24 pb-8">
      <div className="px-6 mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Good Morning, {getGreetingName()}! 👋</h1>
        <p className="text-slate-600">Here's what's happening with your practice today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 mb-8">
        {dashboardStats.map((stat) => (
          <DashboardCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 mb-8">
        <ChartCard title="Work Overview" className="lg:col-span-1">
          <div className="space-y-4">
            <WorkOverviewChart data={workOverviewChart} />
            <div className="space-y-2 mt-4">
              {workOverviewChart.map((item) => (
                <div key={item.metric} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600">{item.metric}</span>
                  </div>
                  <span className="font-semibold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Automation Impact" className="lg:col-span-2">
          <div className="space-y-6">
            <div>
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-slate-600 text-sm">Time Saved</span>
                <span className="text-2xl font-bold text-slate-900">{automationImpactData[0]?.value || 'N/A'}</span>
              </div>
              <LineCharts
                data={automationImpactData}
                dataKey1="value"
                label1="Value"
                color1="#10b981"
              />
            </div>

            <div className="border-t border-slate-200 pt-6">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-slate-600 text-sm">Cost Saved</span>
                <span className="text-2xl font-bold text-slate-900">{automationImpactData[1]?.value || 'N/A'}</span>
              </div>
              <LineCharts
                data={automationImpactData}
                dataKey1="value"
                label1="Value"
                color1="#f59e0b"
              />
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <p className="text-sm text-emerald-900 font-semibold">
                <span className="text-lg">{automationImpactData[2]?.value || 'N/A'}</span> Accuracy Improvement
              </p>
            </div>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 mb-8">
        <ChartCard title="Recent Workflows" className="lg:col-span-2">
          <button className="float-right text-sm text-primary-600 hover:text-primary-700 font-semibold mb-4">
            View All
          </button>
          <div className="divide-y divide-slate-200">
            {recentWorkflows.map((workflow) => (
              <WorkflowItem key={workflow.id} workflow={workflow} />
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Notifications">
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
          <button className="w-full mt-4 text-center text-sm text-primary-600 hover:text-primary-700 font-semibold py-2">
            View All Notifications
          </button>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 mb-8">
        <ChartCard title="Tasks Due Today">
          <div className="space-y-3">
            {tasksDueToday.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
          <button className="w-full mt-4 text-center text-sm text-primary-600 hover:text-primary-700 font-semibold py-2">
            View All Tasks
          </button>
        </ChartCard>

        <ChartCard title="AI Insights">
          <div className="space-y-3">
            {aiInsights.map((insight) => (
              <AIInsightCard key={insight.id} insight={insight} />
            ))}
          </div>
          <button className="w-full mt-4 text-center text-sm text-primary-600 hover:text-primary-700 font-semibold py-2">
            Ask AI Assistant
          </button>
        </ChartCard>
      </div>

      <div className="px-6 mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => (
            <QuickActionCard key={action.id} action={action} />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
