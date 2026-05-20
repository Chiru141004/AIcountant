import React from 'react';
import useResource from '../hooks/useResource';
import PageHeader from '../components/PageHeader';
import SectionTable from '../components/SectionTable';
import Footer from '../components/Footer';
import { FileCheck2, ShieldCheck } from 'lucide-react';

export default function TDSPage() {
  const { data: tdsReturns, loading } = useResource('/tds', []);
  const pending = tdsReturns.filter((item) => item.status !== 'Completed').length;
  const completed = tdsReturns.filter((item) => item.status === 'Completed').length;

  if (loading) {
    return (
      <main className="md:ml-64 pt-24 pb-8 px-6">
        <div className="text-slate-700">Loading TDS filings...</div>
      </main>
    );
  }

  return (
    <main className="md:ml-64 pt-24 pb-8">
      <div className="px-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">TDS</h1>
            <p className="text-slate-600 mt-1">Review TDS compliance, certificates, and quarterly filing readiness.</p>
          </div>
        </div>
      </div>

      <div className="px-6 mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Pending Filings</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{pending}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Completed</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{completed}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Compliance</p>
              <p className="text-base font-semibold text-slate-900">On Track</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <FileCheck2 size={18} />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">TDS Validation</h2>
              <p className="text-sm text-slate-600 mt-1">
                AI reviews deduction details, certificate uploads, and return readiness before the final filing stage.
              </p>
            </div>
          </div>
        </div>

        <SectionTable
          columns={[
            { key: 'period', label: 'Return Period' },
            { key: 'client', label: 'Client' },
            { key: 'status', label: 'Status' },
            { key: 'due', label: 'Due Date' },
            { key: 'type', label: 'Type' },
          ]}
          rows={tdsReturns}
        />
      </div>

      <Footer />
    </main>
  );
}

