import React from 'react';
import * as LucideIcons from 'lucide-react';

export default function QuickActionCard({ action }) {
  const Icon = LucideIcons[action.icon] || LucideIcons.Plus;

  return (
    <button className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border border-slate-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 group">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center mb-3 group-hover:from-primary-100 group-hover:to-purple-100 transition-colors">
        <Icon className="text-primary-600 group-hover:text-primary-700" size={24} />
      </div>
      <p className="text-sm font-semibold text-slate-900 text-center">{action.label}</p>
    </button>
  );
}
