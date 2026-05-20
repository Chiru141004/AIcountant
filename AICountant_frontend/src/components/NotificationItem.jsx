import React from 'react';
import * as LucideIcons from 'lucide-react';
import { X } from 'lucide-react';

export default function NotificationItem({ notification }) {
  const Icon = LucideIcons[notification.icon] || LucideIcons.Bell;

  const iconColorClass = {
    alert: 'text-red-600',
    warning: 'text-amber-600',
    success: 'text-emerald-600',
    info: 'text-blue-600',
  };

  return (
    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-all">
      <div className={`flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center ${iconColorClass[notification.type] || 'text-slate-600'}`}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
        <p className="text-xs text-slate-600 mt-1">{notification.message}</p>
        <p className="text-xs text-slate-500 mt-2">{notification.timeAgo}</p>
      </div>
      <button className="flex-shrink-0 p-1 text-slate-400 hover:text-slate-600 transition-colors">
        <X size={16} />
      </button>
    </div>
  );
}
