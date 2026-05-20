import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function TaskItem({ task }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-all">
      <div className="flex items-center gap-3">
        <input type="checkbox" className="w-4 h-4 accent-primary-600 rounded" />
        <div>
          <p className="text-sm font-semibold text-slate-900">{task.title}</p>
          <p className="text-xs text-slate-600 mt-1">{task.clientCount} Clients</p>
        </div>
      </div>
      <span className={`text-sm font-bold ${task.priorityColor}`}>
        {task.priority}
      </span>
    </div>
  );
}
