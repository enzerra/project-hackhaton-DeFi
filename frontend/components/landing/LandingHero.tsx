'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, ExternalLink, Activity } from 'lucide-react';
import { CONTRACT_ADDRESS } from '@/lib/constants';
import { TypewriterHeadline } from './TypewriterHeadline';
import { Isometric3DCard } from './Isometric3DCard';

interface LandingHeroProps {
  onOpenApp: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onOpenApp }) => {
  return (
    <section className="bg-white pt-12 pb-20 md:pb-28 border-b border-[#E4E4E7] w-full relative overflow-hidden">
      {/* AMBIENT RADIAL GLOW & GRID PATTERN */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#F4F4F5] blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        {/* ASYMMETRIC SPLIT HERO (LEFT CONTENT / RIGHT PRE-BUILT 3D CARD) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-6">
          {/* LEFT COLUMN: TYPEWRITER HEADLINE & MONOCHROME CTAS */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* TYPEWRITER ANIMATED HEADLINE */}
            <TypewriterHeadline text="The Atomic Asset Distribution Protocol." typingSpeed={45} />

            {/* SUBTITLE */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-[#52525B] leading-relaxed max-w-xl font-normal"
            >
              Batch multi-wallet payouts for Hackathons, DAO Payroll, and Airdrops in <strong>1 single transaction</strong>. Guaranteed zero partial transfer failures.
            </motion.p>

            {/* PRIMARY MONOCHROME CTAS (NO WRAPPING) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenApp}
                className="vercel-button-primary px-8 py-4 text-sm font-bold flex items-center justify-center gap-2.5 shadow-lg bg-[#09090B] text-white rounded-xl hover:bg-[#27272A] transition-all cursor-pointer"
              >
                <span className="whitespace-nowrap">Launch DApp Workspace</span>
                <ArrowRight className="w-4 h-4 text-[#A1A1AA] group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`https://scan.bohr.life/address/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noreferrer"
                className="vercel-button-secondary px-6 py-4 text-sm font-medium flex items-center justify-center gap-2 text-[#09090B] bg-white border border-[#D4D4D8] rounded-xl hover:bg-[#FAFAFA] transition-all cursor-pointer shadow-xs"
              >
                <span className="whitespace-nowrap">Inspect Contract</span>
                <ExternalLink className="w-4 h-4 text-[#A1A1AA]" />
              </motion.a>
            </motion.div>

            {/* MONOCHROME LIVE ON-CHAIN STATS TICKER PILLS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E4E4E7] max-w-lg"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-[#A1A1AA] block">Atomic Safety</span>
                <span className="text-sm font-bold text-[#09090B] font-mono flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#09090B]" /> 100% Revert
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#A1A1AA] block">Gas Fee Saved</span>
                <span className="text-sm font-bold text-[#09090B] font-mono flex items-center gap-1 mt-0.5">
                  <Zap className="w-3.5 h-3.5 text-[#09090B] fill-[#09090B]" /> ~64.2%
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#A1A1AA] block">Block Time</span>
                <span className="text-sm font-bold text-[#09090B] font-mono flex items-center gap-1 mt-0.5">
                  <Activity className="w-3.5 h-3.5 text-[#09090B]" /> &lt; 2.5s
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: PRE-BUILT 3D ISOMETRIC STACK CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <Isometric3DCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
