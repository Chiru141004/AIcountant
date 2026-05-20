import React from 'react';
import { MoreVertical } from 'lucide-react';

export default function WorkflowItem({ workflow }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0">
      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-900">{workflow.name}</p>
        <p className="text-xs text-slate-600 mt-1">{workflow.client}</p>
      </div>
      <div className="flex items-center gap-3 ml-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${workflow.statusColor}`}>
          {workflow.status}
        </span>
        <span className="text-xs text-slate-500">{workflow.timeAgo}</span>
        <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
          <MoreVertical size={16} />
        </button>
      </div>
    </div>
  );
}
