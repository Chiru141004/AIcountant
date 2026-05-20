import React from 'react';
import useResource from '../hooks/useResource';
import PageHeader from '../components/PageHeader';
import SectionTable from '../components/SectionTable';
import Footer from '../components/Footer';
import { Link2, Database, ShieldCheck } from 'lucide-react';

export default function IntegrationsPage() {
  const { data: integrations, loading } = useResource('/integrations', []);
  const connected = integrations.filter((integration) => integration.status === 'Connected').length;
  const disconnected = integrations.filter((integration) => integration.status !== 'Connected').length;

  if (loading) {
    return (
      <main className="md:ml-64 pt-24 pb-8 px-6">
        <div className="text-slate-700">Loading integrations...</div>
      </main>
    );
  }

  return (
    <main className="md:ml-64 pt-24 pb-8">
      <div className="px-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Integrations</h1>
            <p className="text-slate-600 mt-1">Connect ledgers, drive storage, and automate client-facing workflows.</p>
          </div>
        </div>
      </div>

      <div className="px-6 mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Link2 size={18} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Connected</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{connected}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Database size={18} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Ready to Sync</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{integrations.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Needs Setup</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{disconnected}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">
            Integrations keep your practice data synchronized, reduce manual imports, and make compliance workflows more efficient.
          </p>
        </div>

        <SectionTable
          columns={[
            { key: 'name', label: 'Integration' },
            { key: 'status', label: 'Status' },
            { key: 'lastSync', label: 'Last Sync' },
            { key: 'description', label: 'Description' },
          ]}
          rows={integrations}
        />
      </div>

      <Footer />
    </main>
  );
}

