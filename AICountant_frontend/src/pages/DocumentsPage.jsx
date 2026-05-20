import React from 'react';
import useResource from '../hooks/useResource';
import PageHeader from '../components/PageHeader';
import SectionTable from '../components/SectionTable';
import Footer from '../components/Footer';
import { FileText, ShieldCheck, Sparkles } from 'lucide-react';

export default function DocumentsPage() {
  const { data: documents, loading } = useResource('/documents', []);
  const reviewCount = documents.filter((item) => item.stage !== 'Approved').length;
  const draftCount = documents.filter((item) => item.stage === 'Draft').length;

  if (loading) {
    return (
      <main className="md:ml-64 pt-24 pb-8 px-6">
        <div className="text-slate-700">Loading documents...</div>
      </main>
    );
  }

  return (
    <main className="md:ml-64 pt-24 pb-8">
      <PageHeader
        title="Documents"
        subtitle="Central hub for document intelligence, validation, and client records."
      />

      <div className="px-6 mb-6 grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Documents</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{documents.length}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
              <FileText size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Needs Review</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{reviewCount}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
              <ShieldCheck size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Draft Documents</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{draftCount}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Sparkles size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">
            Documents are auto-classified, validated against filing rules, and surfaced for review by the AI engine.
          </p>
        </div>

        <SectionTable
          columns={[
            { key: 'name', label: 'Document' },
            { key: 'client', label: 'Client' },
            { key: 'type', label: 'Type' },
            { key: 'stage', label: 'Stage' },
            { key: 'updated', label: 'Updated' },
          ]}
          rows={documents}
        />
      </div>

      <Footer />
    </main>
  );
}

