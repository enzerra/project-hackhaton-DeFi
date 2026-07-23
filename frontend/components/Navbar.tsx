'use client';

import React from 'react';
import { Cpu, Wallet, CheckCircle2, AlertCircle } from 'lucide-react';

interface NavbarProps {
  userAddress: string | null;
  isConnected: boolean;
  onConnect: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ userAddress, isConnected, onConnect }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#080C14]/80 backdrop-blur-md border-b border-white/10 py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Cpu className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight">
              BOTFlow <span className="gradient-text">AI</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">Intelligent Asset Distribution for BOT Chain</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
            {isConnected ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>BOT Chain Testnet</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Disconnected</span>
              </>
            )}
          </div>

          <button
            onClick={onConnect}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold text-sm hover:opacity-95 transition-all shadow-lg shadow-cyan-500/25 active:scale-95"
          >
            <Wallet className="w-4 h-4 text-black" />
            <span>
              {isConnected && userAddress
                ? `${userAddress.substring(0, 6)}...${userAddress.substring(38)}`
                : 'Connect Wallet'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
