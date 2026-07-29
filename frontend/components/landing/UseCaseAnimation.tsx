'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Vault, Layers, Sparkles } from 'lucide-react';

interface UseCaseAnimationProps {
  type: 'trophy' | 'vault' | 'airdrop';
}

export const UseCaseAnimation: React.FC<UseCaseAnimationProps> = ({ type }) => {
  if (type === 'trophy') {
    return (
      <div className="w-full h-48 bg-slate-900 flex items-center justify-center relative overflow-hidden p-4">
        {/* ANIMATED GLOW BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900 to-slate-900" />
        
        {/* TROPHY ANIMATED PODIUM VECTOR */}
        <div className="relative z-10 flex items-end justify-center gap-3">
          {/* 2ND PLACE */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 70 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-14 bg-slate-800 border border-slate-700 rounded-t-xl flex flex-col items-center justify-center font-mono text-[10px] text-slate-300 font-bold p-1 shadow-md"
          >
            <span>2ND</span>
            <span className="text-emerald-400">30%</span>
          </motion.div>

          {/* 1ST PLACE TROPHY */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 100 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="w-18 bg-white text-slate-900 rounded-t-xl flex flex-col items-center justify-center font-mono text-xs font-bold p-1 shadow-2xl relative"
          >
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Trophy className="w-6 h-6 text-slate-900 mb-1" />
            </motion.div>
            <span>1ST</span>
            <span className="text-[10px] text-slate-900 font-bold">50%</span>
          </motion.div>

          {/* 3RD PLACE */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 50 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="w-14 bg-slate-800 border border-slate-700 rounded-t-xl flex flex-col items-center justify-center font-mono text-[10px] text-slate-300 font-bold p-1 shadow-md"
          >
            <span>3RD</span>
            <span className="text-emerald-400">20%</span>
          </motion.div>
        </div>
      </div>
    );
  }

  if (type === 'vault') {
    return (
      <div className="w-full h-48 bg-slate-900 flex items-center justify-center relative overflow-hidden p-4">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900 to-slate-900" />
        
        {/* VAULT PULSE ANIMATION VECTOR */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 rounded-2xl bg-white text-slate-900 flex items-center justify-center shadow-2xl border-2 border-white"
          >
            <Vault className="w-8 h-8 text-slate-900" />
          </motion.div>

          <div className="flex gap-2 font-mono text-[10px]">
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="px-2.5 py-1 rounded bg-slate-800 text-emerald-400 border border-slate-700 font-bold"
            >
              Dev: 10 BOT
            </motion.span>
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }}
              className="px-2.5 py-1 rounded bg-slate-800 text-emerald-400 border border-slate-700 font-bold"
            >
              Mod: 5 BOT
            </motion.span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-48 bg-slate-900 flex items-center justify-center relative overflow-hidden p-4">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900 to-slate-900" />

      {/* AIRDROP CASCADE BEAM ANIMATION VECTOR */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-3">
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-2xl bg-white text-slate-900 flex items-center justify-center shadow-2xl"
        >
          <Layers className="w-6 h-6 text-slate-900" />
        </motion.div>

        <div className="flex gap-3">
          {[1, 2, 3].map((num) => (
            <motion.div
              key={num}
              animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.8, delay: num * 0.25, repeat: Infinity }}
              className="w-9 h-11 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 flex flex-col items-center justify-center text-[10px] font-mono font-bold shadow-md"
            >
              <span>1.0</span>
              <span className="text-[8px] text-slate-400">BOT</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
