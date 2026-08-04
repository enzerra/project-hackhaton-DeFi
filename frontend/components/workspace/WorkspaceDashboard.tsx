'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Wallet, Zap, Plus, Trash2, Upload, Save, FolderOpen, Check, LogOut } from 'lucide-react';
import { CONTRACT_ADDRESS } from '@/lib/constants';

interface RecipientRow {
  id: string;
  address: string;
  amount: string;
}

interface SavedRoster {
  id: string;
  name: string;
  date: string;
  recipients: RecipientRow[];
}

interface WorkspaceDashboardProps {
  isConnected: boolean;
  userAddress: string | null;
  userBotBalance: string;
  erc20Balance: string;
  erc20Symbol: string;
  isNativeMode: boolean;
  setIsNativeMode: (val: boolean) => void;
  tokenAddress: string;
  setTokenAddress: (val: string) => void;
  recipients: RecipientRow[];
  onSetRecipients: (newRecipients: RecipientRow[]) => void;
  onAddRecipient: () => void;
  onRemoveRecipient: (id: string) => void;
  onUpdateRecipient: (id: string, field: 'address' | 'amount', value: string) => void;
  onApplyPreset: (type: 'hackathon' | 'payroll' | 'airdrop') => void;
  onImportCsv?: (fileRecipients: { address: string; amount: string }[]) => void;
  fetchERC20Details?: (contractAddr: string) => void;
  totalAmount: number;
  isExecuting: boolean;
  isApproving: boolean;
  statusMsg: string | null;
  onExecute: () => void;
  onApprove: () => void;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
}

export const WorkspaceDashboard: React.FC<WorkspaceDashboardProps> = ({
  isConnected,
  userAddress,
  userBotBalance,
  erc20Balance,
  erc20Symbol,
  isNativeMode,
  setIsNativeMode,
  tokenAddress,
  setTokenAddress,
  recipients,
  onSetRecipients,
  onAddRecipient,
  onRemoveRecipient,
  onUpdateRecipient,
  totalAmount,
  isExecuting,
  isApproving,
  statusMsg,
  onExecute,
  onApprove,
  onConnectWallet,
  onDisconnectWallet,
}) => {
  const [savedRosters, setSavedRosters] = useState<SavedRoster[]>([]);
  const [rosterNameInput, setRosterNameInput] = useState<string>('');
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved rosters from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('botflow_saved_rosters');
      if (stored) {
        setSavedRosters(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading saved rosters:', e);
    }
  }, []);

  // Save ALL filled recipient rows as a template
  const handleSaveRoster = () => {
    if (!rosterNameInput.trim()) {
      alert('Please enter a name for your template (e.g. "Monthly Core Team").');
      return;
    }

    // Filter all rows that have address or amount filled in
    const activeFilledRows = recipients.filter(
      (r) => r.address.trim() !== '' || r.amount.trim() !== ''
    );

    if (activeFilledRows.length === 0) {
      alert('Please fill in recipient address and amount before saving template.');
      return;
    }

    const newRoster: SavedRoster = {
      id: Math.random().toString(36).substring(2),
      name: rosterNameInput.trim(),
      date: new Date().toLocaleDateString(),
      recipients: activeFilledRows.map((r) => ({ ...r })),
    };

    const updated = [newRoster, ...savedRosters];
    setSavedRosters(updated);
    try {
      localStorage.setItem('botflow_saved_rosters', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving roster:', e);
    }

    setRosterNameInput('');
    setShowSaveModal(false);
    setSaveSuccessMsg(`Saved "${newRoster.name}" (${activeFilledRows.length} Wallets)!`);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // Load ALL saved recipient rows into state
  const handleLoadRoster = (roster: SavedRoster) => {
    if (roster.recipients && roster.recipients.length > 0) {
      // Replaces state completely with ALL saved recipient rows!
      onSetRecipients(roster.recipients.map((r) => ({ ...r, id: Math.random().toString(36).substring(2) })));
      setSaveSuccessMsg(`Loaded "${roster.name}" (${roster.recipients.length} Wallets)!`);
      setTimeout(() => setSaveSuccessMsg(null), 3000);
    }
  };

  // CSV Import File Handler (Imports ALL rows from CSV!)
  const handleCsvFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) return;

      const lines = text.split(/\r\n|\n/);
      const newRows: RecipientRow[] = [];

      lines.forEach((line) => {
        const parts = line.split(',');
        if (parts.length >= 2) {
          const addr = parts[0].trim();
          const amt = parts[1].trim();

          if (addr.startsWith('0x') && newRows.length < 3) {
            newRows.push({
              id: Math.random().toString(36).substring(2),
              address: addr,
              amount: amt,
            });
          }
        }
      });

      if (newRows.length > 0) {
        onSetRecipients(newRows);
        setSaveSuccessMsg(`Imported ALL ${newRows.length} addresses from CSV!`);
        setTimeout(() => setSaveSuccessMsg(null), 3000);
      }
    };

    reader.readAsText(file);
    if (event.target) event.target.value = '';
  };

  return (
    <div className="py-12 max-w-md mx-auto px-4 font-sans text-left text-[#171717]">
      {/* VERY ULTRA SIMPLE SINGLE CARD */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-black/[0.08] shadow-sm space-y-5">
        {/* HEADER & WALLET BALANCE */}
        <div className="flex justify-between items-center pb-3 border-b border-black/[0.06]">
          <div className="inline-flex p-1 rounded-xl bg-neutral-100 border border-black/[0.06]">
            <button
              type="button"
              onClick={() => setIsNativeMode(true)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isNativeMode ? 'bg-black text-white shadow-xs' : 'text-neutral-500 hover:text-black'
              }`}
            >
              Native BOT
            </button>
            <button
              type="button"
              onClick={() => setIsNativeMode(false)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                !isNativeMode ? 'bg-black text-white shadow-xs' : 'text-neutral-500 hover:text-black'
              }`}
            >
              ERC20 Token
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#171717]">
              <Wallet className="w-3.5 h-3.5 text-neutral-400" />
              <span>
                {isConnected
                  ? isNativeMode
                    ? `${userBotBalance} BOT`
                    : `${erc20Balance} ${erc20Symbol}`
                  : 'Connect Wallet'}
              </span>
            </div>

            {isConnected && (
              <button
                type="button"
                onClick={onDisconnectWallet}
                className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                title="Disconnect Wallet"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {!isNativeMode && (
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="ERC20 Token Address (0x...)"
            className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-black/[0.08] text-xs font-mono placeholder:text-neutral-400 focus:outline-none focus:border-black"
          />
        )}

        {/* UNIFIED TOOLBAR: IMPORT CSV & SAVE/LOAD TEMPLATE */}
        <div className="flex items-center justify-between gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleCsvFileUpload}
            accept=".csv,.txt"
            className="hidden"
          />

          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-100 border border-black/[0.06] text-xs font-bold text-neutral-700 hover:bg-neutral-200 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Upload className="w-3 h-3 text-black" />
              <span>Import CSV</span>
            </button>

            <button
              type="button"
              onClick={() => setShowSaveModal(true)}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-100 border border-black/[0.06] text-xs font-bold text-neutral-700 hover:bg-neutral-200 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Save className="w-3 h-3 text-black" />
              <span>Save List</span>
            </button>
          </div>

          {savedRosters.length > 0 && (
            <div className="relative group">
              <button
                type="button"
                className="px-2.5 py-1.5 rounded-lg bg-black text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <FolderOpen className="w-3 h-3 text-white" />
                <span>Saved ({savedRosters.length})</span>
              </button>

              <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl border border-black/[0.1] shadow-xl py-1 z-30 hidden group-hover:block">
                {savedRosters.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleLoadRoster(s)}
                    className="w-full px-3 py-1.5 text-left hover:bg-neutral-100 text-xs font-mono font-medium text-[#171717] block transition-colors"
                  >
                    <span className="font-bold block">{s.name}</span>
                    <span className="text-[9.5px] text-neutral-400 block">{s.date} • {s.recipients?.length || 0} Wallets</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {saveSuccessMsg && (
          <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* SAVE TEMPLATE MODAL */}
        {showSaveModal && (
          <div className="p-3 rounded-xl bg-neutral-100 border border-black/[0.08] space-y-2">
            <label className="text-xs font-bold text-[#171717] block">
              Save List Template Name:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={rosterNameInput}
                onChange={(e) => setRosterNameInput(e.target.value)}
                placeholder="e.g. Core Team / Winners List"
                className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-black/[0.08] text-xs font-mono focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSaveRoster}
                className="px-3 py-1.5 rounded-lg bg-black text-white text-xs font-bold cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowSaveModal(false)}
                className="px-2 rounded-lg bg-neutral-200 text-neutral-700 text-xs font-medium cursor-pointer"
              >
                X
              </button>
            </div>
          </div>
        )}

        {/* RECIPIENTS SECTION */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-xs font-medium text-neutral-600">
            <span>Recipients ({recipients.length}/3)</span>
            {recipients.length < 3 && (
              <button
                type="button"
                onClick={onAddRecipient}
                className="font-bold text-black hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Row</span>
              </button>
            )}
          </div>

          <div className="space-y-2">
            {recipients.map((rec, index) => (
              <div
                key={rec.id}
                className="grid grid-cols-[1fr_90px_28px] gap-2 items-center bg-neutral-50 p-2 rounded-xl border border-black/[0.06]"
              >
                <input
                  type="text"
                  value={rec.address}
                  onChange={(e) => onUpdateRecipient(rec.id, 'address', e.target.value)}
                  placeholder={`Recipient #${index + 1} Address (0x...)`}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-black/[0.08] text-xs font-mono placeholder:text-neutral-400 focus:outline-none focus:border-black"
                />
                <input
                  type="number"
                  step="any"
                  value={rec.amount}
                  onChange={(e) => onUpdateRecipient(rec.id, 'amount', e.target.value)}
                  placeholder="Amount"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-black/[0.08] text-xs font-mono placeholder:text-neutral-400 focus:outline-none focus:border-black"
                />
                <button
                  type="button"
                  onClick={() => onRemoveRecipient(rec.id)}
                  className="w-6 h-6 rounded-md flex items-center justify-center text-neutral-400 hover:text-black transition-colors cursor-pointer"
                  title="Remove recipient"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SUMMARY & ACTION BUTTON */}
        <div className="pt-3 border-t border-black/[0.08] space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-neutral-500">Total Aggregate Amount</span>
            <span className="font-mono text-base font-bold text-[#171717]">
              {(Number(totalAmount) || 0).toFixed(4)} {isNativeMode ? 'BOT' : erc20Symbol}
            </span>
          </div>

          {!isNativeMode && (
            <button
              type="button"
              onClick={onApprove}
              disabled={isApproving}
              className="w-full py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-black font-bold text-xs transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isApproving ? 'Approving Token...' : 'Approve ERC20 Allowance'}
            </button>
          )}

          {!isConnected ? (
            <div className="space-y-2">
              <button
                type="button"
                onClick={onConnectWallet}
                className="w-full py-3.5 rounded-xl bg-black text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all shadow-md cursor-pointer"
              >
                <Wallet className="w-4 h-4 text-white" />
                <span>Connect Wallet to Execute Batch Payout</span>
              </button>
              <p className="text-[11px] font-mono text-center text-neutral-400">
                You can explore features & fill data freely. Connect wallet when ready to sign on-chain.
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={onExecute}
              disabled={isExecuting}
              className="w-full py-3.5 rounded-xl bg-black text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white text-white" />
              <span>{isExecuting ? 'Executing Transfer...' : 'Execute Batch Transfer'}</span>
            </button>
          )}

          {statusMsg && (
            <div className="p-2.5 rounded-xl bg-neutral-100 border border-black/[0.08] text-xs font-mono text-neutral-700 text-center">
              {statusMsg}
            </div>
          )}
        </div>
      </div>

      {/* CONTRACT FOOTER */}
      <div className="mt-5 text-center text-xs text-neutral-400 font-mono">
        Deployed Contract:{' '}
        <a
          href={`https://scan.bohr.life/address/${CONTRACT_ADDRESS}`}
          target="_blank"
          rel="noreferrer"
          className="underline text-neutral-700 font-bold"
        >
          {CONTRACT_ADDRESS.substring(0, 8)}...{CONTRACT_ADDRESS.substring(38)}
        </a>
      </div>
    </div>
  );
};
