import React from 'react';
import * as LucideIcons from 'lucide-react';
import { TrendingUp } from 'lucide-react';

export default function DashboardCard({ stat }) {
  const Icon = LucideIcons[stat.icon] || LucideIcons.TrendingUp;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-slate-600 text-sm font-medium mb-2">{stat.label}</p>
          <p className="text-3xl font-bold text-slate-900 mb-3">{stat.value}</p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-emerald-600 text-sm font-semibold">
              <TrendingUp size={14} />
              {stat.change}
            </span>
            <span className="text-slate-500 text-xs">{stat.period}</span>
          </div>
        </div>
        <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
          <Icon className={`${stat.textColor}`} size={24} />
        </div>
      </div>
    </div>
  );
}
