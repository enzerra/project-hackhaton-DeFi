'use client';

import React from 'react';
import { Coins, Plus, Trash2 } from 'lucide-react';

export interface RecipientRow {
  id: string;
  address: string;
  amount: string;
}

interface DistributionFormProps {
  isNativeMode: boolean;
  setIsNativeMode: (val: boolean) => void;
  tokenAddress: string;
  setTokenAddress: (val: string) => void;
  recipients: RecipientRow[];
  onAddRecipient: () => void;
  onRemoveRecipient: (id: string) => void;
  onUpdateRecipient: (id: string, field: 'address' | 'amount', value: string) => void;
}

export const DistributionForm: React.FC<DistributionFormProps> = ({
  isNativeMode,
  setIsNativeMode,
  tokenAddress,
  setTokenAddress,
  recipients,
  onAddRecipient,
  onRemoveRecipient,
  onUpdateRecipient,
}) => {
  return (
    <div className="glass-panel p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
          <Coins className="w-5 h-5 text-cyan-400" />
          <span>Distribution Parameters</span>
        </h3>

        <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setIsNativeMode(true)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              isNativeMode ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Native BOT
          </button>
          <button
            onClick={() => setIsNativeMode(false)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              !isNativeMode ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ERC20 Token
          </button>
        </div>
      </div>

      {!isNativeMode && (
        <div className="mb-5 space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">ERC20 Token Contract Address:</label>
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="0x... (e.g. USDT / USDC Token Address)"
            className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-slate-200 focus:border-cyan-400 outline-none font-mono"
          />
        </div>
      )}

      <div className="flex justify-between items-center mb-3">
        <label className="text-xs font-semibold text-slate-300">
          Recipients (Max 3 for Atomic Guarantee):
        </label>
        {recipients.length < 3 && (
          <button
            onClick={onAddRecipient}
            className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Recipient</span>
          </button>
        )}
      </div>

      <div className="space-y-3">
        {recipients.map((rec, index) => (
          <div key={rec.id} className="grid grid-cols-[1fr_120px_32px] gap-2 items-center bg-black/30 p-2.5 rounded-xl border border-white/10">
            <input
              type="text"
              value={rec.address}
              onChange={(e) => onUpdateRecipient(rec.id, 'address', e.target.value)}
              placeholder={`0x... Recipient #${index + 1}`}
              className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-slate-200 font-mono outline-none focus:border-cyan-400"
            />
            <input
              type="number"
              step="any"
              value={rec.amount}
              onChange={(e) => onUpdateRecipient(rec.id, 'amount', e.target.value)}
              placeholder="Amount"
              className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-slate-200 outline-none focus:border-cyan-400"
            />
            <button
              onClick={() => onRemoveRecipient(rec.id)}
              className="flex items-center justify-center text-red-400 hover:text-red-300 transition-all"
              title="Remove recipient"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
