'use client';

import React, { useState } from 'react';
import { Zap, LogOut, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NavbarProps {
  userAddress: string | null;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  activeTab: 'landing' | 'app' | 'splitbill';
  setActiveTab: (tab: 'landing' | 'app' | 'splitbill') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userAddress,
  isConnected,
  onConnect,
  onDisconnect,
  activeTab,
  setActiveTab,
}) => {
  const [showWalletMenu, setShowWalletMenu] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E4E4E7] bg-white/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        {/* LOGO & BRANDING */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#09090B] text-white shadow-md">
            <Zap className="h-5 w-5 text-white fill-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm tracking-tight text-[#09090B]">
              Batchpay <span className="font-normal text-xs text-[#71717A]">Protocol</span>
            </span>
          </div>
        </div>

        {/* CENTER TAB SWITCHER — VERCEL MINIMALIST UNDERLINE CONCEPT */}
        <div className="hidden md:flex items-center gap-7 text-xs font-sans">
          <button
            onClick={() => setActiveTab('landing')}
            className={`pb-1 border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === 'landing'
                ? 'text-black font-extrabold border-black'
                : 'text-neutral-400 hover:text-black font-medium border-transparent'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('app')}
            className={`pb-1 border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === 'app'
                ? 'text-black font-extrabold border-black'
                : 'text-neutral-400 hover:text-black font-medium border-transparent'
            }`}
          >
            MultiSend Engine
          </button>
          <button
            onClick={() => setActiveTab('splitbill')}
            className={`pb-1 border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === 'splitbill'
                ? 'text-black font-extrabold border-black'
                : 'text-neutral-400 hover:text-black font-medium border-transparent'
            }`}
          >
            Split Bill & PayLink
          </button>
        </div>

        {/* RIGHT CONTROLS (CONNECT / DISCONNECT WALLET) */}
        <div className="flex items-center gap-3 relative">
          {isConnected && userAddress ? (
            <div className="relative">
              <button
                onClick={() => setShowWalletMenu(!showWalletMenu)}
                className="px-4 py-2 text-xs font-bold font-mono flex items-center gap-2 bg-[#09090B] text-white rounded-xl hover:bg-[#27272A] cursor-pointer shadow-md"
              >
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>{userAddress.substring(0, 6)}...{userAddress.substring(38)}</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {showWalletMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-[#E4E4E7] shadow-xl py-1 z-50 text-left font-sans">
                  <div className="px-3 py-2 border-b border-[#E4E4E7] text-[10px] font-mono text-neutral-400">
                    BOT Chain Testnet 968
                  </div>
                  <button
                    onClick={() => {
                      onDisconnect();
                      setShowWalletMenu(false);
                    }}
                    className="w-full px-3 py-2.5 text-xs font-bold text-red-600 hover:bg-neutral-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-600" />
                    <span>Disconnect Wallet</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onConnect}
              className="vercel-button-primary px-4 py-2 text-xs font-bold font-mono flex items-center gap-2 bg-[#09090B] text-white rounded-xl hover:bg-[#27272A] cursor-pointer shadow-md"
            >
              <span>Connect Wallet</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
