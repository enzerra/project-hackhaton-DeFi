'use client';

import React from 'react';
import { ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';
import { CONTRACT_ADDRESS } from '@/lib/constants';

export const Banner: React.FC = () => {
  return (
    <section className="vercel-card p-6 mb-8 border border-black/[0.08]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-neutral-100 border border-black/[0.08] text-xs font-medium text-neutral-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Guaranteed Atomic All-or-Nothing Transfer</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#171717]">
            Send Native BOT & ERC20 Tokens to Multiple Recipients
          </h2>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Distribute batch payments for Hackathon Prizes, DAO Payroll, or Airdrops in 1 single transaction. Zero risk of partial transfer failures.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-black/[0.08]">
          <div className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-neutral-50 border border-black/[0.08]">
            <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider block">Estimated Gas Saved</span>
            <div className="flex items-center gap-1 text-lg font-bold text-sky-600 font-mono">
              <Zap className="w-4 h-4 fill-sky-600" />
              <span>~64.2%</span>
            </div>
          </div>

          <a
            href={`https://scan.bohr.life/address/${CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noreferrer"
            className="vercel-button-secondary px-3.5 py-3 text-xs font-medium flex items-center gap-1.5 text-neutral-700"
          >
            <span>Contract</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
