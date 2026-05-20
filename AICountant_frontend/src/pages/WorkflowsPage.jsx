import React from 'react';
import useResource from '../hooks/useResource';
import PageHeader from '../components/PageHeader';
import SectionTable from '../components/SectionTable';
import Footer from '../components/Footer';
import { Zap, Clock, CheckCircle2 } from 'lucide-react';

export default function WorkflowsPage() {
  const { data: workflows, loading } = useResource('/workflows', []);
  const active = workflows.filter((workflow) => workflow.status === 'In Progress').length;
  const completed = workflows.filter((workflow) => workflow.status === 'Completed').length;
  const review = workflows.filter((workflow) => workflow.status !== 'Completed' && workflow.status !== 'In Progress').length;

  if (loading) {
    return (
      <main className="md:ml-64 pt-24 pb-8 px-6">
        <div className="text-slate-700">Loading workflows...</div>
      </main>
    );
  }

  return (
    <main className="md:ml-64 pt-24 pb-8">
      <PageHeader
        title="Workflows"
        subtitle="View automation progress, review triggers, and drive end-to-end CA processes."
      />

      <div className="px-6 mb-6 grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Active Workflows</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{active}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Zap size={24} />
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Completed</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{completed}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Needs Review</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{review}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">AI Workflow Insights</h2>
          <p className="text-sm text-slate-600 mt-2">
            The platform predicts delays, auto-assigns review tasks, and flags compliance gaps for faster turnaround.
          </p>
        </div>

        <SectionTable
          columns={[
            { key: 'title', label: 'Workflow' },
            { key: 'client', label: 'Client' },
            { key: 'due', label: 'Due Date' },
            { key: 'status', label: 'Status' },
            { key: 'automation', label: 'Automation' },
          ]}
          rows={workflows}
        />
      </div>

      <Footer />
    </main>
  );
}

