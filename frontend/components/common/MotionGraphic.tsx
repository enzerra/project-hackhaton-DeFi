'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Layers, ArrowRight, Check } from 'lucide-react';

interface MotionGraphicProps {
  type: 'speed' | 'atomic' | 'dual';
}

export const MotionGraphic: React.FC<MotionGraphicProps> = ({ type }) => {
  if (type === 'speed') {
    return (
      <div className="w-full h-44 flex flex-col justify-center gap-3 p-2 font-mono text-xs text-left">
        {[
          { label: 'Recipient #1 (0xED44...)', amount: '5.0 BOT' },
          { label: 'Recipient #2 (0x892A...)', amount: '3.0 BOT' },
          { label: 'Recipient #3 (0x3F10...)', amount: '2.0 BOT' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.15 }}
            className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 flex justify-between items-center shadow-xs"
          >
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.3 }}
                className="w-2 h-2 rounded-full bg-slate-900"
              />
              <span className="text-slate-800 font-semibold">{item.label}</span>
            </div>
            <span className="font-bold text-slate-900">{item.amount}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'atomic') {
    return (
      <div className="w-full h-44 flex items-center justify-center p-2 relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="w-32 h-32 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center relative"
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 rounded-full border border-white/60 flex items-center justify-center"
          >
            <ShieldCheck className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>
        <span className="absolute text-[10px] font-mono text-white bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700 font-bold">
          100% REVERT SAFE
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-44 flex flex-col items-center justify-center gap-3 p-2">
      <div className="flex gap-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 rounded-xl bg-slate-100 border border-slate-300 text-center font-mono shadow-xs"
        >
          <span className="text-[10px] text-slate-500 block uppercase font-bold">NATIVE</span>
          <span className="text-sm font-bold text-slate-900">BOT Coin</span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 rounded-xl bg-slate-100 border border-slate-300 text-center font-mono shadow-xs"
        >
          <span className="text-[10px] text-slate-500 block uppercase font-bold">STANDARD</span>
          <span className="text-sm font-bold text-slate-900">ERC20 Token</span>
        </motion.div>
      </div>
      <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 font-semibold">
        <Check className="w-3 h-3 text-slate-900" /> Auto msg.value Refund
      </span>
    </div>
  );
};
