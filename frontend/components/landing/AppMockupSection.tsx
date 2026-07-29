'use client';

import React, { useState } from 'react';
import { Zap, ShieldCheck, Wallet, ArrowRight, CheckCircle2, Upload, Plus, Trash2 } from 'lucide-react';
import { CONTRACT_ADDRESS } from '../../lib/constants';

interface AppMockupSectionProps {
  onOpenApp: () => void;
}

export const AppMockupSection: React.FC<AppMockupSectionProps> = ({ onOpenApp }) => {
  const [isNativeMode, setIsNativeMode] = useState<boolean>(true);

  return (
    <section className="py-24 bg-[#FAFAFA] border-t border-b border-[#E4E4E7] relative overflow-hidden font-sans text-left text-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black text-white text-[11px] font-mono font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-white fill-white" />
            <span>Exact DApp Interface Mockup</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#171717]">
            Built For Laptop & Mobile Precision
          </h2>
          <p className="text-sm text-neutral-500 font-normal leading-relaxed">
            Here is the exact pixel-perfect workspace interface you will use when connected with MetaMask.
          </p>
        </div>

        {/* HIGH-END DUAL DEVICE PRESENTATION (LAPTOP + MOBILE PHONE) */}
        <div className="max-w-5xl mx-auto relative">
          {/* AMBIENT GLOW BACKDROP */}
          <div className="absolute -inset-2 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 rounded-3xl blur-2xl opacity-50" />

          <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8">
            {/* 1. REALISTIC LAPTOP FRAME */}
            <div className="w-full max-w-3xl">
              {/* LAPTOP SCREEN CONTAINER */}
              <div className="bg-[#09090B] p-2.5 sm:p-3 rounded-t-2xl border-t-8 border-x-8 border-[#18181B] shadow-2xl relative overflow-hidden">
                {/* WEBCAM DOT */}
                <div className="flex justify-center items-center pb-2">
                  <div className="w-2 h-2 rounded-full bg-neutral-800 border border-neutral-700" />
                </div>

                {/* EXACT INNER WEBSITE APP SCREEN */}
                <div className="bg-white rounded-xl p-4 sm:p-6 text-left border border-black/[0.08]">
                  {/* INNER APP WORKSPACE CARD */}
                  <div className="max-w-md mx-auto bg-white p-5 sm:p-6 rounded-2xl border border-black/[0.08] shadow-sm space-y-4 font-sans">
                    {/* HEADER & ENGINE SWITCHER */}
                    <div className="flex justify-between items-center pb-3 border-b border-black/[0.06]">
                      <div className="inline-flex p-1 rounded-xl bg-neutral-100 border border-black/[0.06]">
                        <button
                          type="button"
                          onClick={() => setIsNativeMode(true)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isNativeMode ? 'bg-black text-white shadow-xs' : 'text-neutral-500'
                          }`}
                        >
                          Native BOT
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsNativeMode(false)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            !isNativeMode ? 'bg-black text-white shadow-xs' : 'text-neutral-500'
                          }`}
                        >
                          ERC20 Token
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#171717]">
                        <Wallet className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{isNativeMode ? '5.9950 BOT' : '1,000 USDT'}</span>
                      </div>
                    </div>

                    {/* TOOLBAR */}
                    <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-neutral-50 border border-black/[0.06] text-xs font-mono">
                      <div className="flex gap-1">
                        <span className="px-2 py-1 rounded bg-white border border-black/[0.08] font-bold text-neutral-700 flex items-center gap-1">
                          <Upload className="w-3 h-3 text-black" />
                          Import CSV
                        </span>
                        <span className="px-2 py-1 rounded bg-white border border-black/[0.08] font-bold text-neutral-700">
                          Save List
                        </span>
                      </div>
                      <span className="px-2 py-1 rounded bg-black text-white font-bold">
                        Saved (3)
                      </span>
                    </div>

                    {/* RECIPIENT ROWS */}
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-neutral-500 font-medium">
                        <span>Recipients (3/3)</span>
                        <span className="text-black font-bold">+ Add Row</span>
                      </div>

                      <div className="grid grid-cols-[1fr_80px_20px] gap-1.5 items-center bg-neutral-50 p-2 rounded-xl border border-black/[0.06] font-mono">
                        <span className="text-[11px] text-neutral-800 truncate">0x3248...49b60fa5</span>
                        <span className="text-[11px] font-bold text-right">1.5000</span>
                        <Trash2 className="w-3 h-3 text-neutral-400" />
                      </div>

                      <div className="grid grid-cols-[1fr_80px_20px] gap-1.5 items-center bg-neutral-50 p-2 rounded-xl border border-black/[0.06] font-mono">
                        <span className="text-[11px] text-neutral-800 truncate">0x1111...11111111</span>
                        <span className="text-[11px] font-bold text-right">0.8000</span>
                        <Trash2 className="w-3 h-3 text-neutral-400" />
                      </div>

                      <div className="grid grid-cols-[1fr_80px_20px] gap-1.5 items-center bg-neutral-50 p-2 rounded-xl border border-black/[0.06] font-mono">
                        <span className="text-[11px] text-neutral-800 truncate">0x2222...22222222</span>
                        <span className="text-[11px] font-bold text-right">0.4000</span>
                        <Trash2 className="w-3 h-3 text-neutral-400" />
                      </div>
                    </div>

                    {/* SUMMARY & ACTION BUTTON */}
                    <div className="pt-3 border-t border-black/[0.08] space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-500">Total Aggregate Amount</span>
                        <span className="font-mono text-sm font-bold text-[#171717]">
                          2.7000 {isNativeMode ? 'BOT' : 'USDT'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={onOpenApp}
                        className="w-full py-3 rounded-xl bg-black text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all shadow-md cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5 fill-white text-white" />
                        <span>Execute Batch Transfer</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* LAPTOP BOTTOM CHASSIS BASE */}
              <div className="w-full h-5 bg-gradient-to-b from-[#D4D4D8] to-[#A1A1AA] rounded-b-2xl border-t border-neutral-400 shadow-xl flex justify-center items-start">
                <div className="w-20 h-1.5 rounded-b-md bg-neutral-500/50" />
              </div>
            </div>

            {/* 2. REALISTIC MOBILE PHONE FRAME (FLOATING OVERLAY) */}
            <div className="w-64 h-[440px] rounded-[36px] border-8 border-[#18181B] bg-[#09090B] shadow-2xl p-2 shrink-0 relative lg:-ml-12 lg:mt-12 group-hover:scale-105 transition-transform duration-500">
              {/* DYNAMIC ISLAND / NOTCH */}
              <div className="w-20 h-4 bg-[#18181B] rounded-full mx-auto mb-2 flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-neutral-800" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
              </div>

              {/* MOBILE APP CONTENT */}
              <div className="bg-white rounded-[24px] h-[390px] p-3 text-left border border-black/[0.08] space-y-3 overflow-hidden font-sans">
                <div className="text-center pb-2 border-b border-black/[0.06]">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 block">BOTFlow Mobile</span>
                  <span className="text-xs font-bold text-[#171717]">Batch Transfer Engine</span>
                </div>

                <div className="p-1 rounded-lg bg-neutral-100 flex text-[10px] font-bold text-center">
                  <span className="flex-1 py-1 rounded bg-black text-white">Native</span>
                  <span className="flex-1 py-1 text-neutral-500">ERC20</span>
                </div>

                <div className="p-2 rounded-xl bg-neutral-50 border border-black/[0.06] space-y-1 text-[10px] font-mono">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Recipients (2)</span>
                    <span className="font-bold text-black">Total: 2.3 BOT</span>
                  </div>
                  <div className="p-1.5 rounded bg-white border border-black/[0.06] truncate">
                    0x3248...49b6 (1.5 BOT)
                  </div>
                  <div className="p-1.5 rounded bg-white border border-black/[0.06] truncate">
                    0x1111...1111 (0.8 BOT)
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenApp}
                  className="w-full py-2.5 rounded-xl bg-black text-white font-extrabold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Zap className="w-3 h-3 fill-white" />
                  <span>Execute Mobile Batch</span>
                </button>
              </div>
            </div>
          </div>

          {/* GUARANTEE BADGES ROW */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#E4E4E7]">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-bold text-neutral-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>1-Click Settlement (&lt; 2.5s)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Atomic Revert Safe</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>82.5% Gas Savings</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenApp}
              className="px-6 py-3 rounded-xl bg-black text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all shadow-md cursor-pointer"
            >
              <span>Launch Live DApp Workspace</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
