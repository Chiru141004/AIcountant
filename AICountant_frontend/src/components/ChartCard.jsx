import React from 'react';

export default function ChartCard({ title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg border border-slate-200 p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-slate-900 mb-6">{title}</h3>
      {children}
    </div>
  );
}
