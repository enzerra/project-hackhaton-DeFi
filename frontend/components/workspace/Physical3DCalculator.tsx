'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Zap, ShieldCheck } from 'lucide-react';

interface Physical3DCalculatorProps {
  title: string;
  expression: string;
  result: string;
  gasSaved: string;
  recipientsCount: string;
}

export const Physical3DCalculator: React.FC<Physical3DCalculatorProps> = ({
  title,
  expression,
  result,
  gasSaved,
  recipientsCount,
}) => {
  const keys = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'];

  return (
    <div className="w-full relative flex items-center justify-center p-2">
      <motion.div
        initial={{ rotateX: 14, rotateY: -10 }}
        whileHover={{ rotateX: 0, rotateY: 0, scale: 1.02 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
        className="w-full max-w-md bg-[#09090B] text-white p-6 md:p-8 rounded-3xl border-2 border-white shadow-[0_25px_60px_-15px_rgba(9,9,11,0.5)] space-y-6 text-left relative overflow-hidden"
      >
        {/* LIGHT REFLECTION OVERLAY */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl pointer-events-none rounded-full" />

        {/* 3D CALCULATOR TOP BRAND BAR */}
        <div className="flex justify-between items-center border-b border-[#27272A] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white text-[#09090B] flex items-center justify-center font-bold shadow-md">
              <Calculator className="w-4 h-4 text-[#09090B]" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white tracking-tight">BOTFlow 3D Gas Calculator</h4>
              <span className="text-[9px] font-mono text-[#A1A1AA]">Model BOT-968 • Atomic Engine</span>
            </div>
          </div>
          <span className="text-[9px] font-mono px-2.5 py-1 rounded bg-[#18181B] text-white border border-[#27272A] font-bold">
            {recipientsCount}
          </span>
        </div>

        {/* PHYSICAL LCD DIGITAL DISPLAY SCREEN */}
        <div className="p-4 rounded-2xl bg-[#141416] border border-[#27272A] space-y-1 shadow-inner text-right font-mono">
          <div className="flex justify-between items-center text-[10px] text-[#A1A1AA] border-b border-[#27272A] pb-1 mb-1">
            <span className="text-white font-bold text-[9px] uppercase tracking-wider">{title}</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
              SAVED {gasSaved}
            </span>
          </div>
          <div className="text-xs text-[#A1A1AA] font-mono">{expression}</div>
          <div className="text-2xl font-extrabold text-white font-mono tracking-wider">{result}</div>
        </div>

        {/* PHYSICAL 3D KEYPAD MATRIX GRID */}
        <div className="grid grid-cols-4 gap-2 font-mono">
          {keys.map((key, idx) => {
            const isOperator = ['÷', '×', '-', '+', '='].includes(key);
            return (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`py-3 rounded-xl text-xs font-bold transition-all ${
                  isOperator
                    ? 'bg-white text-[#09090B] shadow-md hover:bg-[#FAFAFA]'
                    : 'bg-[#18181B] text-white border border-[#27272A] hover:bg-[#27272A]'
                }`}
              >
                {key}
              </motion.button>
            );
          })}
        </div>

        {/* FOOTER STATS */}
        <div className="pt-2 flex justify-between items-center text-[10px] font-mono text-[#A1A1AA] border-t border-[#27272A]">
          <span className="flex items-center gap-1 text-white font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-white" /> 100% Revert Safe
          </span>
          <span className="text-white font-bold">&lt; 2.5s Execution</span>
        </div>
      </motion.div>
    </div>
  );
};
