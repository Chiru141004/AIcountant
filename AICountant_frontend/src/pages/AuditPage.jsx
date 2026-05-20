import React from 'react';
import useResource from '../hooks/useResource';
import PageHeader from '../components/PageHeader';
import SectionTable from '../components/SectionTable';
import Footer from '../components/Footer';
import { ClipboardList, ShieldCheck } from 'lucide-react';

export default function AuditPage() {
  const { data: auditItems, loading } = useResource('/audit', []);
  const inProgress = auditItems.filter((item) => item.status === 'In Progress').length;
  const review = auditItems.filter((item) => item.status === 'Pending Review').length;

  if (loading) {
    return (
      <main className="md:ml-64 pt-24 pb-8 px-6">
        <div className="text-slate-700">Loading audit items...</div>
      </main>
    );
  }

  return (
    <main className="md:ml-64 pt-24 pb-8">
      <div className="px-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Audit</h1>
            <p className="text-slate-600 mt-1">Oversight on audit programs, working papers, and issue resolution.</p>
          </div>
        </div>
      </div>

      <div className="px-6 mb-6 grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Programs In Progress</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{inProgress}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Pending Reviews</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{review}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Quality</p>
              <p className="text-base font-semibold text-slate-900">High</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <ClipboardList size={18} />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">Audit workflow intelligence</h2>
              <p className="text-sm text-slate-600 mt-1">
                Automate documentation checks, flag high-risk ledgers, and keep audit schedules aligned with filing windows.
              </p>
            </div>
          </div>
        </div>

        <SectionTable
          columns={[
            { key: 'title', label: 'Working Paper' },
            { key: 'client', label: 'Client' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Owner' },
            { key: 'due', label: 'Due Date' },
          ]}
          rows={auditItems}
        />
      </div>

      <Footer />
    </main>
  );
}

