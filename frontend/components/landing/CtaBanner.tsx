'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CtaBannerProps {
  onLaunchApp: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onLaunchApp }) => {
  return (
    <section className="bg-[#09090B] py-20 md:py-28 text-white w-full border-t border-[#27272A] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
        {/* TOP BADGE */}
        <Badge variant="outline" className="font-mono text-[10px] uppercase bg-white text-[#09090B] border-white px-3.5 py-1 font-bold shadow-sm">
          GET STARTED
        </Badge>

        {/* HEADLINE */}
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
          Ready to Batch Transfer?
        </h2>

        {/* SUBTITLE */}
        <p className="text-xs md:text-sm text-[#A1A1AA] max-w-md mx-auto font-normal">
          Connect your wallet and distribute tokens to multiple recipients in 1 single atomic transaction.
        </p>

        {/* 1 BIG CLEAN BUTTON */}
        <div className="pt-2">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onLaunchApp}
            className="vercel-button-primary px-8 py-4 text-sm font-bold flex items-center justify-center gap-2 bg-white text-[#09090B] rounded-2xl hover:bg-[#FAFAFA] transition-all cursor-pointer shadow-2xl mx-auto"
          >
            <Zap className="w-4 h-4 text-[#09090B] fill-[#09090B]" />
            <span>Launch DApp Workspace</span>
            <ArrowRight className="w-4 h-4 text-[#09090B]" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
