'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Zap, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Layers, Wallet, Upload } from 'lucide-react';
import { CONTRACT_ADDRESS } from '@/lib/constants';

interface DeviceShowcaseSectionProps {
  onOpenApp: () => void;
}

export const DeviceShowcaseSection: React.FC<DeviceShowcaseSectionProps> = ({ onOpenApp }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D DYNAMIC MOUSE INTERACTION STAGE
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="py-24 bg-[#FAFAFA] border-t border-b border-[#E4E4E7] relative overflow-hidden font-sans text-left text-[#171717]">
      {/* AMBIENT GEOMETRIC BACKDROP */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black text-white text-[11px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            <span>ISOMETRIC 3D WORKSPACE CANVAS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#171717]">
            Designed for High-Precision Asset Batching
          </h2>
          <p className="text-sm text-neutral-500 font-normal leading-relaxed">
            1-Click atomic settlement powered by BOTChain Testnet 968 smart contract engine.
          </p>
        </motion.div>

        {/* WORLD-CLASS 3D ISOMETRIC STAGE (VERCEL / LINEAR STYLE) */}
        <div className="perspective-[1400px] flex justify-center items-center py-4">
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            onClick={onOpenApp}
            className="relative w-full max-w-4xl bg-white/90 backdrop-blur-xl p-4 sm:p-8 rounded-[36px] border border-black/[0.08] shadow-2xl cursor-pointer group transition-all duration-300"
          >
            {/* AMBIENT LIGHT AURA BEHIND STAGE */}
            <div className="absolute -inset-4 bg-gradient-to-r from-neutral-200 via-neutral-400 to-neutral-200 rounded-[48px] blur-3xl opacity-30 pointer-events-none" />

            {/* DUAL DISPLAY CANVAS ASSEMBLY */}
            <div
              style={{ transform: 'translateZ(40px)' }}
              className="relative bg-[#09090B] p-4 sm:p-6 rounded-[28px] border border-neutral-800 shadow-2xl text-white font-sans space-y-6 overflow-hidden"
            >
              {/* TOP APPLICATION BAR */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-white text-black flex items-center justify-center font-bold text-xs">
                    ⚡
                  </div>
                  <span className="font-extrabold text-white">BOTFlow Protocol Workspace</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>BOT Chain 968</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-[10px] font-bold">
                    0x2bA2...E520
                  </span>
                </div>
              </div>

              {/* DUAL CANVAS GRID (DESKTOP + MOBILE FLOATING CARD) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* 1. MAIN WORKSPACE CARD (LEFT 8 COLUMNS) */}
                <div className="lg:col-span-8 bg-neutral-900/90 p-4 sm:p-5 rounded-2xl border border-neutral-800 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Batch MultiSend Engine</span>
                    </span>
                    <div className="flex gap-1 text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-white text-black font-bold">Native BOT</span>
                      <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">ERC20 Token</span>
                    </div>
                  </div>

                  {/* RECIPIENT LIST PREVIEW */}
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-black border border-neutral-800 flex justify-between items-center">
                      <span className="text-neutral-300 truncate">0x3248fd7fb3f66523d79d5f1c41f641db49b60fa5</span>
                      <span className="font-bold text-emerald-400">1.5000 BOT</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-black border border-neutral-800 flex justify-between items-center">
                      <span className="text-neutral-300 truncate">0x1111111111111111111111111111111111111111</span>
                      <span className="font-bold text-emerald-400">0.8000 BOT</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-black border border-neutral-800 flex justify-between items-center">
                      <span className="text-neutral-300 truncate">0x2222222222222222222222222222222222222222</span>
                      <span className="font-bold text-emerald-400">0.4000 BOT</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-800 flex justify-between items-center">
                    <span className="text-xs text-neutral-400 font-mono">Total Aggregate: <strong className="text-white font-bold">2.7000 BOT</strong></span>
                    <button
                      type="button"
                      onClick={onOpenApp}
                      className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold flex items-center gap-1.5 hover:bg-neutral-200 transition-all cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-black fill-black" />
                      <span>Execute Batch Transfer</span>
                    </button>
                  </div>
                </div>

                {/* 2. MOBILE WALLET CARD (RIGHT 4 COLUMNS) */}
                <div
                  style={{ transform: 'translateZ(30px)' }}
                  className="lg:col-span-4 bg-white text-black p-4 rounded-2xl border border-neutral-200 shadow-xl space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center pb-2 border-b border-black/[0.06] text-xs">
                      <span className="font-extrabold flex items-center gap-1">
                        <Wallet className="w-3.5 h-3.5 text-black" />
                        <span>Mobile Wallet</span>
                      </span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black text-white">0x2bA2...</span>
                    </div>

                    <div className="p-2 rounded-xl bg-neutral-50 border border-black/[0.06] text-[10px] font-mono space-y-1">
                      <div className="flex justify-between text-neutral-500">
                        <span>Recipients: 3</span>
                        <span className="font-bold text-black">2.7 BOT</span>
                      </div>
                      <div className="p-1 rounded bg-white border border-black/[0.06] truncate">
                        0x3248...49b6 (1.5 BOT)
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenApp}
                    className="w-full py-2.5 rounded-xl bg-black text-white font-extrabold text-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Launch Mobile DApp</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* FLOATING 3D METRIC PINS ELEVATED ON Z-AXIS */}
            <div
              style={{ transform: 'translateZ(70px)' }}
              className="absolute -top-3 left-6 px-3.5 py-1.5 rounded-full bg-black text-white border border-neutral-700 text-xs font-mono font-bold shadow-xl flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>1-Click Settlement (&lt; 2.5s)</span>
            </div>

            <div
              style={{ transform: 'translateZ(70px)' }}
              className="absolute -bottom-3 right-6 px-3.5 py-1.5 rounded-full bg-black text-white border border-neutral-700 text-xs font-mono font-bold shadow-xl flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Revert Safe</span>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM GUARANTEE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2 font-mono text-xs">
          <div className="p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-xs">
            <span className="text-[10px] text-neutral-400 block uppercase font-bold">STATELESS ENGINE</span>
            <span className="font-extrabold text-[#171717] block mt-0.5">0 Storage Writes (SSTORE)</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-xs">
            <span className="text-[10px] text-neutral-400 block uppercase font-bold">EVM CAPACITY</span>
            <span className="font-extrabold text-[#171717] block mt-0.5">Up to 50 Recipients / Tx</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-xs">
            <span className="text-[10px] text-neutral-400 block uppercase font-bold">FEES & PRICING</span>
            <span className="font-extrabold text-[#171717] block mt-0.5">0% Platform Fee (100% Free)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
