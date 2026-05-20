
import { Sparkles } from 'lucide-react';

export default function EmptyState({ title = 'Nothing to show', description = 'Try adjusting filters or creating a new record.' }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center mb-3">
        <Sparkles size={20} />
      </div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600 mt-1">{description}</p>
    </div>
  );
}

