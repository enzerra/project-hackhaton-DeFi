'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Check, X } from 'lucide-react';

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
    <div className="vercel-card p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-[#171717] flex items-center gap-2">
          {isAllValid ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-600" />
          )}
          <span>Pre-Execution Verification</span>
        </h3>
        <span
          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
            isAllValid
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}
        >
          {isAllValid ? 'Ready for Execution' : 'Verification Required'}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-neutral-50 border border-black/[0.08] text-xs">
          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${checks.recipientsCount ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
            {checks.recipientsCount ? <Check className="w-3 h-3 stroke-[3]" /> : <X className="w-3 h-3 stroke-[3]" />}
          </span>
          <span className={checks.recipientsCount ? 'text-neutral-800' : 'text-neutral-500'}>
            1 to 3 Recipient Wallets Configured
          </span>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-neutral-50 border border-black/[0.08] text-xs">
          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${checks.noDuplicates ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
            {checks.noDuplicates ? <Check className="w-3 h-3 stroke-[3]" /> : <X className="w-3 h-3 stroke-[3]" />}
          </span>
          <span className={checks.noDuplicates ? 'text-neutral-800' : 'text-neutral-500'}>
            No Duplicate Wallet Addresses
          </span>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-neutral-50 border border-black/[0.08] text-xs">
          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${checks.noZeroAddress ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
            {checks.noZeroAddress ? <Check className="w-3 h-3 stroke-[3]" /> : <X className="w-3 h-3 stroke-[3]" />}
          </span>
          <span className={checks.noZeroAddress ? 'text-neutral-800' : 'text-neutral-500'}>
            No Empty/Zero Addresses (0x0...0)
          </span>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-neutral-50 border border-black/[0.08] text-xs">
          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${checks.validAmounts ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
            {checks.validAmounts ? <Check className="w-3 h-3 stroke-[3]" /> : <X className="w-3 h-3 stroke-[3]" />}
          </span>
          <span className={checks.validAmounts ? 'text-neutral-800' : 'text-neutral-500'}>
            Valid Non-Zero Amounts
          </span>
        </div>
      </div>
    </div>
  );
};
