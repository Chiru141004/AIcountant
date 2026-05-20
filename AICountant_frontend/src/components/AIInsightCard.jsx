
import { ChevronRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export default function AIInsightCard({ insight }) {
  const Icon = LucideIcons[insight.icon] || LucideIcons.Lightbulb;

  return (
    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
          <Icon size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 text-sm">{insight.title}</p>
          <p className="text-xs text-slate-600 mt-1">{insight.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
        <p className="text-xs font-medium text-slate-700">{insight.action}</p>
        <ChevronRight size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
      </div>
    </div>
  );
}
