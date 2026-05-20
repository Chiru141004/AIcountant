import React from 'react';
import useResource from '../hooks/useResource';
import PageHeader from '../components/PageHeader';
import SectionTable from '../components/SectionTable';
import Footer from '../components/Footer';
import { ShieldCheck, ClipboardList, Clock } from 'lucide-react';

export default function CompliancePage() {
  const { data: complianceTasks, loading } = useResource('/compliance', []);
  const totalTasks = complianceTasks.length;
  const pending = complianceTasks.filter((task) => task.status !== 'Completed').length;

  if (loading) {
    return (
      <main className="md:ml-64 pt-24 pb-8 px-6">
        <div className="text-slate-700">Loading compliance tasks...</div>
      </main>
    );
  }

  return (
    <main className="md:ml-64 pt-24 pb-8">
      <div className="px-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Compliance</h1>
            <p className="text-slate-600 mt-1">Track statutory deadlines, risk flags, and audit-ready filing status.</p>
          </div>
        </div>
      </div>

      <div className="px-6 mb-6 grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Tasks</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{totalTasks}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
              <ClipboardChecklist size={24} />
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Pending Reviews</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{pending}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock size={24} />
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Risk Score</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">Low</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ShieldCheck size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">
            Compliance automation helps you reduce manual filing effort, avoid late penalties, and surface issues before they become risks.
          </p>
        </div>

        <SectionTable
          columns={[
            { key: 'name', label: 'Task' },
            { key: 'client', label: 'Client' },
            { key: 'due', label: 'Due' },
            { key: 'status', label: 'Status' },
          ]}
          rows={complianceTasks}
        />
      </div>

      <Footer />
    </main>
  );
}

