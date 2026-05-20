import React from 'react';
import { Shield, Lock, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <div className="bg-white border-t border-slate-200 px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <p>Secure | Compliant | Reliable</p>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1">
            <Shield size={14} />
            ISO 27001 Certified
          </span>
          <span className="inline-flex items-center gap-1">
            <Lock size={14} />
            Data Encryption
          </span>
          <span className="inline-flex items-center gap-1">
            <Zap size={14} />
            Regular Backups
          </span>
        </div>
        <div className="flex gap-6">
          <button className="text-slate-600 hover:text-slate-900 transition-colors">
            Connected Integrations:
          </button>
          <span className="flex items-center gap-1">
            Tally • Busy • ClearTax • GST • Others
          </span>
        </div>
      </div>
    </div>
  );
}
