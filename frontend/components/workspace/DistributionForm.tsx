'use client';

import React from 'react';
import { Coins, Plus, Trash2, UserCheck } from 'lucide-react';

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
    <div className="vercel-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-sm font-bold text-[#171717] flex items-center gap-2">
            <Coins className="w-4 h-4 text-sky-600" />
            <span>Distribution Parameters</span>
          </h3>
          <p className="text-xs text-neutral-500">Configure target asset type and recipient wallets.</p>
        </div>

        <div className="inline-flex p-1 rounded-xl bg-neutral-100 border border-black/[0.08] self-start sm:self-auto">
          <button
            onClick={() => setIsNativeMode(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isNativeMode
                ? 'bg-white text-black shadow-sm'
                : 'text-neutral-500 hover:text-black'
            }`}
          >
            Native BOT
          </button>
          <button
            onClick={() => setIsNativeMode(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              !isNativeMode
                ? 'bg-white text-black shadow-sm'
                : 'text-neutral-500 hover:text-black'
            }`}
          >
            ERC20 Token
          </button>
        </div>
      </div>

      {!isNativeMode && (
        <div className="mb-5 space-y-1.5">
          <label className="text-xs font-medium text-neutral-700">ERC20 Token Contract Address:</label>
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="0x... (e.g. USDT / USDC Token Address)"
            className="vercel-input w-full px-3.5 py-2.5 text-xs font-mono placeholder:text-neutral-400"
          />
        </div>
      )}

      <div className="flex justify-between items-center mb-3">
        <label className="text-xs font-medium text-neutral-700 flex items-center gap-1.5">
          <UserCheck className="w-3.5 h-3.5 text-neutral-500" />
          <span>Recipients (Max 3 for Atomic Guarantee):</span>
        </label>
        {recipients.length < 3 && (
          <button
            onClick={onAddRecipient}
            className="flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Recipient</span>
          </button>
        )}
      </div>

      <div className="space-y-2.5">
        {recipients.map((rec, index) => (
          <div
            key={rec.id}
            className="grid grid-cols-[1fr_130px_36px] gap-2 items-center bg-neutral-50 p-2.5 rounded-xl border border-black/[0.08]"
          >
            <input
              type="text"
              value={rec.address}
              onChange={(e) => onUpdateRecipient(rec.id, 'address', e.target.value)}
              placeholder={`Recipient #${index + 1} (0x...)`}
              className="vercel-input w-full px-3 py-2 text-xs font-mono placeholder:text-neutral-400"
            />
            <div className="relative">
              <input
                type="number"
                step="any"
                value={rec.amount}
                onChange={(e) => onUpdateRecipient(rec.id, 'amount', e.target.value)}
                placeholder="0.00"
                className="vercel-input w-full pl-3 pr-8 py-2 text-xs font-mono placeholder:text-neutral-400"
              />
              <span className="absolute right-2.5 top-2.5 text-[10px] font-semibold text-neutral-400 font-mono">
                {isNativeMode ? 'BOT' : 'TOKEN'}
              </span>
            </div>
            <button
              onClick={() => onRemoveRecipient(rec.id)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
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
