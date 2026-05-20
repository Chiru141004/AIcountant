import React from 'react';
import useResource from '../hooks/useResource';
import PageHeader from '../components/PageHeader';
import SectionTable from '../components/SectionTable';
import Footer from '../components/Footer';
import { Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AutomationsPage() {
  const { data: automations, loading: loadingAutomations } = useResource('/automations', []);
  const { data: automationHighlights, loading: loadingHighlights } = useResource('/automation-highlights', []);
  const running = automations.filter((item) => item.status === 'Running').length;
  const paused = automations.filter((item) => item.status === 'Paused').length;

  if (loadingAutomations || loadingHighlights) {
    return (
      <main className="md:ml-64 pt-24 pb-8 px-6">
        <div className="text-slate-700">Loading automation data...</div>
      </main>
    );
  }

  return (
    <main className="md:ml-64 pt-24 pb-8">
      <div className="px-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Automations</h1>
            <p className="text-slate-600 mt-1">AI-powered automation engine for CA workflows and validations.</p>
          </div>
        </div>
      </div>

      <div className="px-6 mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Live Automations</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{running}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Cpu size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Paused Rules</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{paused}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">AI Assist</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{automationHighlights.length}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Sparkles size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Automation Intelligence</h2>
          <p className="text-sm text-slate-600 mt-2">
            Automate repetitive accounting tasks, validate filings in real time, and let the AI surface exceptions for CA review.
          </p>
        </div>

        <SectionTable
          columns={[
            { key: 'name', label: 'Automation' },
            { key: 'trigger', label: 'Trigger' },
            { key: 'accuracy', label: 'Accuracy' },
            { key: 'status', label: 'Status' },
            { key: 'impact', label: 'Impact' },
          ]}
          rows={automations}
        />

        <div className="grid gap-4 md:grid-cols-3">
          {automationHighlights.map((item) => (
            <div key={item.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{item.status}</p>
                  <h3 className="mt-2 font-semibold text-slate-900">{item.title}</h3>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-4">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}

