import React from 'react';
import useResource from '../hooks/useResource';
import PageHeader from '../components/PageHeader';
import SectionTable from '../components/SectionTable';
import Footer from '../components/Footer';
import { Users, ShieldCheck, Sparkles } from 'lucide-react';

export default function ClientsPage() {
  const { data: clients, loading } = useResource('/clients', []);
  const activeClients = clients.filter((client) => client.status === 'Active').length;
  const reviewClients = clients.filter((client) => client.status !== 'Active').length;

  if (loading) {
    return (
      <main className="md:ml-64 pt-24 pb-8 px-6">
        <div className="text-slate-700">Loading clients...</div>
      </main>
    );
  }

  return (
    <main className="md:ml-64 pt-24 pb-8">
      <PageHeader
        title="Clients"
        subtitle="Manage client profiles, compliance alerts, and AI onboarding insights."
        action={
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-all">
            Add Client
          </button>
        }
      />

      <div className="px-6 mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Clients</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{clients.length}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary-600">
              <Users size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Active Clients</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{activeClients}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ShieldCheck size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Needs Attention</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{reviewClients}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Sparkles size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6">
        <SectionTable
          columns={[
            { key: 'name', label: 'Client' },
            { key: 'gstin', label: 'GSTIN' },
            { key: 'status', label: 'Status' },
            { key: 'aiFlag', label: 'AI Alert' },
            { key: 'lastFiled', label: 'Last Filed' },
          ]}
          rows={clients}
        />
      </div>

      <Footer />
    </main>
  );
}

