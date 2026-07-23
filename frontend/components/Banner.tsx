'use client';

import React from 'react';
import { ShieldCheck, Zap, Layers } from 'lucide-react';

export const Banner: React.FC = () => {
  return (
    <section className="glass-panel glass-panel-glow p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-cyan-500/20">
      <div className="space-y-2 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-xs font-semibold text-cyan-300">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% Guaranteed Atomic Execution (All-or-Nothing)</span>
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          Zero Human Error Asset Distribution Platform
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Execute multi-wallet payouts for Hackathons, DAO Payroll, and Airdrops in 1 single transaction. All-or-Nothing execution ensures 0% risk of partial loss.
        </p>
      </div>

      <div className="flex gap-4 w-full md:w-auto">
        <div className="flex-1 md:flex-initial flex flex-col items-center md:items-end px-5 py-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-1 font-display text-2xl font-bold gradient-text">
            <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400" />
            <span>~64.2%</span>
          </div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Gas Saved</span>
        </div>

        <div className="flex-1 md:flex-initial flex flex-col items-center md:items-end px-5 py-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-1 font-display text-2xl font-bold text-white">
            <Layers className="w-5 h-5 text-purple-400" />
            <span>1 Tx</span>
          </div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Atomic Batch</span>
        </div>
      </div>
    </section>
  );
};
