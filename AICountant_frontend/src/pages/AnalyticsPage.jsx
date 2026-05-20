import React from 'react';
import useResource from '../hooks/useResource';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import { BarChart3, TrendingUp, Sparkles } from 'lucide-react';

export default function AnalyticsPage() {
  const { data: analytics, loading } = useResource('/analytics', []);
  if (loading) {
    return (
      <main className="md:ml-64 pt-24 pb-8 px-6">
        <div className="text-slate-700">Loading analytics...</div>
      </main>
    );
  }
  return (
    <main className="md:ml-64 pt-24 pb-8">
      <PageHeader
        title="Analytics"
        subtitle="Track operational impact and AI performance across accounting workflows."
      />

      <div className="px-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {analytics.map((item) => (
            <div key={item.id} className="rounded-3xl border border-slate-200 bg-white shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{item.metric}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{item.value}</p>
                </div>
                <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                  <BarChart3 size={18} />
                </div>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                <TrendingUp size={14} />
                {item.trend}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-purple-50 p-3 text-purple-600">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">AI forecasting</h2>
              <p className="text-sm text-slate-600 mt-1">
                Forecast future capacity and compliance risk so CA teams can prioritize high-impact reviews before due dates.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

