import React from 'react';
import useResource from '../hooks/useResource';
import PageHeader from '../components/PageHeader';
import SectionTable from '../components/SectionTable';
import Footer from '../components/Footer';
import { Database, ShieldCheck } from 'lucide-react';

export default function GSTPage() {
  const { data: gstReturns, loading } = useResource('/gst', []);
  const inProgress = gstReturns.filter((item) => item.status === 'In Progress').length;
  const completed = gstReturns.filter((item) => item.status === 'Completed').length;

  if (loading) {
    return (
      <main className="md:ml-64 pt-24 pb-8 px-6">
        <div className="text-slate-700">Loading GST returns...</div>
      </main>
    );
  }

  return (
    <main className="md:ml-64 pt-24 pb-8">
      <div className="px-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">GST</h1>
            <p className="text-slate-600 mt-1">Monitor GSTR filings, validation checks, and compliance status for all clients.</p>
          </div>
        </div>
      </div>

      <div className="px-6 mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Returns in Progress</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{inProgress}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Completed Returns</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{completed}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Risk</p>
              <p className="text-base font-semibold text-slate-900">Low</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Database size={18} />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">GST Intelligence</h2>
              <p className="text-sm text-slate-600 mt-1">
                AI checks missing tax codes, reconciles outward and inward supplies, and highlights GSTR exceptions.
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
          rows={gstReturns}
        />
      </div>

      <Footer />
    </main>
  );
}

