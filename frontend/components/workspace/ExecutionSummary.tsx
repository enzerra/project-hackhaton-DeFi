'use client';

import React from 'react';
import { ArrowRight, Zap, ExternalLink } from 'lucide-react';
import { CONTRACT_ADDRESS } from '@/lib/constants';

interface ExecutionSummaryProps {
  isNativeMode: boolean;
  totalRecipients: number;
  totalAmount: number;
  isExecuting: boolean;
  isApproving: boolean;
  onExecute: () => void;
  onApprove?: () => void;
  needsApproval?: boolean;
}

export const ExecutionSummary: React.FC<ExecutionSummaryProps> = ({
  isNativeMode,
  totalRecipients,
  totalAmount,
  isExecuting,
  isApproving,
  onExecute,
  onApprove,
  needsApproval,
}) => {
  return (
    <div className="vercel-card p-6 mb-6">
      <h3 className="text-sm font-bold text-[#171717] mb-4">Execution Summary</h3>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center text-xs pb-2.5 border-b border-black/[0.08]">
          <span className="text-neutral-500">Target Asset Type</span>
          <span className="font-semibold text-neutral-800">{isNativeMode ? 'Native BOT Koin' : 'ERC20 Token'}</span>
        </div>

        <div className="flex justify-between items-center text-xs pb-2.5 border-b border-black/[0.08]">
          <span className="text-neutral-500">Total Recipients</span>
          <span className="font-semibold text-neutral-800">{totalRecipients} Wallets</span>
        </div>

        <div className="flex justify-between items-center text-xs pb-2.5 border-b border-black/[0.08]">
          <span className="text-neutral-500">Total Aggregate Amount</span>
          <span className="font-mono text-base font-bold text-sky-600">
            {totalAmount.toFixed(4)} {isNativeMode ? 'BOT' : 'Tokens'}
          </span>
        </div>

        <div className="flex justify-between items-center text-xs">
          <span className="text-neutral-500">Atomic Smart Contract</span>
          <a
            href={`https://scan.bohr.life/address/${CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 font-mono text-sky-600 hover:underline text-[11px]"
          >
            <span>{CONTRACT_ADDRESS.substring(0, 8)}...{CONTRACT_ADDRESS.substring(38)}</span>
            <ExternalLink className="w-3 h-3 text-neutral-400" />
          </a>
        </div>
      </div>

      <div className="space-y-2.5">
        {!isNativeMode && needsApproval && onApprove && (
          <button
            onClick={onApprove}
            disabled={isApproving}
            className="vercel-button-secondary w-full py-3 text-xs font-semibold disabled:opacity-50"
          >
            {isApproving ? 'Approving Token Allowance...' : 'Approve ERC20 Token Allowance'}
          </button>
        )}

        <button
          onClick={onExecute}
          disabled={isExecuting}
          className="vercel-button-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>{isExecuting ? 'Executing Atomic Distribution...' : 'Execute Atomic Distribution'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
