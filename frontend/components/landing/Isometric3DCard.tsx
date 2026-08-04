'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CONTRACT_ADDRESS } from '@/lib/constants';

export const Isometric3DCard: React.FC = () => {
  return (
    <div className="w-full relative flex items-center justify-center p-2 my-2">
      <motion.div
        initial={{ rotateX: 12, rotateY: -10 }}
        whileHover={{ rotateX: 0, rotateY: 0, scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
        className="w-full bg-[#09090B] text-white p-6 md:p-8 rounded-2xl border border-[#27272A] shadow-2xl space-y-6 text-left relative overflow-hidden"
      >
        {/* LIGHT REFLECTION OVERLAY */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl pointer-events-none rounded-full" />

        {/* HEADER BLOCK */}
        <div className="flex justify-between items-center border-b border-[#27272A] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold">
              <Layers className="w-4 h-4 text-black" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">BOTFlow Protocol Engine</h4>
              <span className="text-[10px] font-mono text-[#A1A1AA]">Atomic MultiSend Contract</span>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#18181B] text-[#D4D4D8] border border-[#27272A] font-semibold">
            STATUS: ACTIVE
          </span>
        </div>

        {/* ISOMETRIC STACK PIPELINE CARDS */}
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-[#141416] border border-[#27272A] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-white shrink-0" />
              <span className="text-[#D4D4D8]">Invariant Safety Check</span>
            </div>
            <span className="text-white font-bold">PASS (100%)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#141416] border border-[#27272A] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-white shrink-0" />
              <span className="text-[#D4D4D8]">Gas Savings Ratio</span>
            </div>
            <span className="text-white font-bold">~64.2%</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#141416] border border-[#27272A] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
              <span className="text-[#D4D4D8]">Atomic Batch Execution</span>
            </div>
            <span className="text-white font-bold">1 BLOCK</span>
          </div>
        </div>

        {/* CONTRACT ADDRESS FOOTER */}
        <div className="pt-2 flex justify-between items-center text-[11px] font-mono text-[#A1A1AA] border-t border-[#27272A]">
          <span>Address: {CONTRACT_ADDRESS.substring(0, 8)}...{CONTRACT_ADDRESS.substring(38)}</span>
          <ArrowRight className="w-3.5 h-3.5 text-white" />
        </div>
      </motion.div>
    </div>
  );
};
