'use client';

import React from 'react';
import { BarChart3, Zap } from 'lucide-react';
import { CONTRACT_ADDRESS } from '../lib/constants';

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
    <div className="glass-panel p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <span>Execution Summary</span>
        </h3>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center text-xs pb-2 border-b border-dashed border-white/10">
          <span className="text-slate-400">Distribution Type</span>
          <span className="font-semibold text-slate-200">{isNativeMode ? 'Native BOT Koin' : 'ERC20 Token'}</span>
        </div>

        <div className="flex justify-between items-center text-xs pb-2 border-b border-dashed border-white/10">
          <span className="text-slate-400">Total Recipients</span>
          <span className="font-semibold text-slate-200">{totalRecipients} Wallets</span>
        </div>

        <div className="flex justify-between items-center text-xs pb-2 border-b border-dashed border-white/10">
          <span className="text-slate-400">Total Aggregate Amount</span>
          <span className="font-display text-base font-extrabold gradient-text">
            {totalAmount.toFixed(4)} {isNativeMode ? 'BOT' : 'Tokens'}
          </span>
        </div>

        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-400">Atomic Contract Address</span>
          <a
            href={`https://scan.bohr.life/address/${CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-cyan-400 hover:underline text-[11px]"
          >
            {CONTRACT_ADDRESS.substring(0, 8)}...{CONTRACT_ADDRESS.substring(38)}
          </a>
        </div>
      </div>

      <div className="space-y-3">
        {!isNativeMode && needsApproval && onApprove && (
          <button
            onClick={onApprove}
            disabled={isApproving}
            className="w-full py-3.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold text-sm hover:bg-white/15 transition-all disabled:opacity-50"
          >
            {isApproving ? '⏳ Approving Token...' : 'Approve ERC20 Token'}
          </button>
        )}

        <button
          onClick={onExecute}
          disabled={isExecuting}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-black font-extrabold text-sm hover:opacity-95 transition-all shadow-xl shadow-cyan-500/25 active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Zap className="w-5 h-5 fill-black" />
          <span>{isExecuting ? '⏳ Executing Atomic Transfer...' : '⚡ Execute Atomic Distribution'}</span>
        </button>
      </div>
    </div>
  );
};
