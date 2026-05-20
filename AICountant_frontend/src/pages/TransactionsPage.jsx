import React from 'react';
import useResource from '../hooks/useResource';
import PageHeader from '../components/PageHeader';
import SectionTable from '../components/SectionTable';
import Footer from '../components/Footer';
import { TrendingUp, ShieldCheck } from 'lucide-react';

export default function TransactionsPage() {
  const { data: transactions, loading } = useResource('/transactions', []);
  const totalTransactions = transactions.length;
  const pending = transactions.filter((tx) => tx.status === 'Pending').length;
  const reconciled = transactions.filter((tx) => tx.status === 'Reconciled').length;

  if (loading) {
    return (
      <main className="md:ml-64 pt-24 pb-8 px-6">
        <div className="text-slate-700">Loading transactions...</div>
      </main>
    );
  }

  return (
    <main className="md:ml-64 pt-24 pb-8">
      <div className="px-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Transactions</h1>
            <p className="text-slate-600 mt-1">Track cash flow, tax postings, and smart reconciliation trends.</p>
          </div>
        </div>
      </div>

      <div className="px-6 mb-6 grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Entries</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{totalTransactions}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Pending Review</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{pending}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Auto-Reconciled</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{reconciled}</p>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">AI Transaction Insights</p>
            <p className="text-base text-slate-700 mt-2">
              Transactions are tagged, categorized, and scored for audit risk in real time.
            </p>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <TrendingUp size={18} />
            <span className="font-semibold">Auto-classification applied</span>
          </div>
        </div>

        <SectionTable
          columns={[
            { key: 'description', label: 'Description' },
            { key: 'date', label: 'Date' },
            { key: 'category', label: 'Category' },
            { key: 'status', label: 'Status' },
            { key: 'amount', label: 'Amount' },
          ]}
          rows={transactions}
        />
      </div>

      <Footer />
    </main>
  );
}

