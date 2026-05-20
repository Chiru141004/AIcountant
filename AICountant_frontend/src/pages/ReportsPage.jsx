import React from 'react';
import useResource from '../hooks/useResource';
import PageHeader from '../components/PageHeader';
import SectionTable from '../components/SectionTable';
import Footer from '../components/Footer';
import { BarChart3, Sparkles } from 'lucide-react';

export default function ReportsPage() {
  const { data: reports, loading } = useResource('/reports', []);
  if (loading) {
    return (
      <main className="md:ml-64 pt-24 pb-8 px-6">
        <div className="text-slate-700">Loading reports...</div>
      </main>
    );
  }
  return (
    <main className="md:ml-64 pt-24 pb-8">
      <PageHeader
        title="Reports"
        subtitle="Run compliance and performance reports for clients and filing cycles."
      />

      <div className="px-6 mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <FileChart size={18} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Reports Available</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{reports.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Latest Generated</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{reports[0].lastGenerated}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">
            Reports can be exported and shared with clients or used for internal compliance review and audit planning.
          </p>
        </div>

        <SectionTable
          columns={[
            { key: 'name', label: 'Report' },
            { key: 'lastGenerated', label: 'Last Generated' },
            { key: 'status', label: 'Status' },
            { key: 'format', label: 'Format' },
          ]}
          rows={reports}
        />
      </div>

      <Footer />
    </main>
  );
}

