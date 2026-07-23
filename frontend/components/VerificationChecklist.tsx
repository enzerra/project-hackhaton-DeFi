'use client';

import React from 'react';
import { ShieldCheck, Check, X } from 'lucide-react';

interface VerificationChecklistProps {
  checks: {
    recipientsCount: boolean;
    noDuplicates: boolean;
    noZeroAddress: boolean;
    validAmounts: boolean;
  };
}

export const VerificationChecklist: React.FC<VerificationChecklistProps> = ({ checks }) => {
  const isAllValid = Object.values(checks).every(Boolean);

  return (
    <div className="glass-panel p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <span>AI Safety Verification</span>
        </h3>
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
            isAllValid
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
          }`}
        >
          {isAllValid ? '100% Ready' : 'Verification Required'}
        </span>
      </div>

      <ul className="space-y-2.5">
        <li className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] text-xs">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center ${checks.recipientsCount ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {checks.recipientsCount ? <Check className="w-3 h-3 stroke-[3]" /> : <X className="w-3 h-3 stroke-[3]" />}
          </span>
          <span className={checks.recipientsCount ? 'text-slate-200' : 'text-slate-400'}>
            Valid Recipient Count (1 to 3 wallets for Atomic Guarantee)
          </span>
        </li>

        <li className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] text-xs">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center ${checks.noDuplicates ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {checks.noDuplicates ? <Check className="w-3 h-3 stroke-[3]" /> : <X className="w-3 h-3 stroke-[3]" />}
          </span>
          <span className={checks.noDuplicates ? 'text-slate-200' : 'text-slate-400'}>
            No Duplicate Recipient Addresses
          </span>
        </li>

        <li className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] text-xs">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center ${checks.noZeroAddress ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {checks.noZeroAddress ? <Check className="w-3 h-3 stroke-[3]" /> : <X className="w-3 h-3 stroke-[3]" />}
          </span>
          <span className={checks.noZeroAddress ? 'text-slate-200' : 'text-slate-400'}>
            No Zero Addresses (0x000...000)
          </span>
        </li>

        <li className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] text-xs">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center ${checks.validAmounts ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {checks.validAmounts ? <Check className="w-3 h-3 stroke-[3]" /> : <X className="w-3 h-3 stroke-[3]" />}
          </span>
          <span className={checks.validAmounts ? 'text-slate-200' : 'text-slate-400'}>
            Valid Non-Zero Token Amounts
          </span>
        </li>
      </ul>
    </div>
  );
};
