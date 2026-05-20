import React from 'react';
import useResource from '../hooks/useResource';
import PageHeader from '../components/PageHeader';
import SectionTable from '../components/SectionTable';
import Footer from '../components/Footer';
import { Settings2, ShieldCheck } from 'lucide-react';

export default function SettingsPage() {
  const { data: settings, loading } = useResource('/settings', []);
  if (loading) {
    return (
      <main className="md:ml-64 pt-24 pb-8 px-6">
        <div className="text-slate-700">Loading settings...</div>
      </main>
    );
  }
  return (
    <main className="md:ml-64 pt-24 pb-8">
      <PageHeader
        title="Settings"
        subtitle="Configure practice preferences, notifications, and automation policies."
      />

      <div className="px-6 mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Settings2 size={18} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Configurations</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{settings.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Security</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">Managed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6">
        <SectionTable
          columns={[
            { key: 'name', label: 'Setting' },
            { key: 'description', label: 'Description' },
          ]}
          rows={settings}
        />
      </div>

      <Footer />
    </main>
  );
}

