'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Vault, Layers, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { DotLottiePlayer } from '../common/DotLottiePlayer';

interface FeaturesShowcaseProps {
  onOpenApp: () => void;
}

export const FeaturesShowcase: React.FC<FeaturesShowcaseProps> = ({ onOpenApp }) => {
  const useCases = [
    {
      id: 'hackathon',
      tag: '01. PRIZE POOL',
      title: 'Hackathon Winner Pool',
      subtitle: 'Split 1st, 2nd, and 3rd place prizes in 1 transaction.',
      lottieSrc: 'https://lottie.host/3896472c-cb1f-4769-b87b-a9389f01e76c/buP8MvD8Dp.lottie',
      badge: '50 / 30 / 20 SPLIT',
      icon: Trophy,
    },
    {
      id: 'payroll',
      tag: '02. DAO PAYROLL',
      title: 'DAO Treasury Payroll',
      subtitle: 'Batch monthly contributor compensation in 1 click.',
      lottieSrc: 'https://lottie.host/db14d1b6-b0b1-43eb-aa6a-1b6010b7832d/dLEaQnLAd5.lottie',
      badge: 'MONTHLY BATCH',
      icon: Vault,
    },
    {
      id: 'airdrop',
      tag: '03. COMMUNITY DROP',
      title: 'Community Airdrops',
      subtitle: 'Distribute equal community rewards with zero gas waste.',
      lottieSrc: 'https://lottie.host/4483c48b-2b88-4be9-8acd-dc458d2c0a1e/5qMx9Ycpfv.lottie',
      badge: 'EQUAL STREAM',
      icon: Layers,
    },
  ];

  return (
    <section className="bg-[#FAFAFA] py-20 md:py-28 border-b border-[#E4E4E7] w-full relative overflow-hidden shadow-inner">
      <div className="max-w-6xl mx-auto px-6">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="outline" className="font-mono text-[10px] uppercase bg-[#09090B] text-white border-[#09090B] px-3 py-1 font-bold mb-3 shadow-xs">
            WEB3 PAYOUT USE CASES
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#09090B] mb-3 font-sans">
            Web3 Payout Use Cases.
          </h2>
          <p className="text-sm md:text-base text-[#52525B] font-normal">
            Automated multi-payout presets powered by BOTFlow smart contract engine.
          </p>
        </div>

        {/* 3 CLEAN ANIMATED LOTTIE CARDS GRID (FLIPPED: WHITE TOP ANIMATION / BLACK OBSIDIAN BOTTOM CONTENT) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {useCases.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="vercel-card p-0 bg-[#09090B] border border-[#27272A] shadow-2xl rounded-3xl overflow-hidden hover:border-black transition-all text-left h-full flex flex-col justify-between">
                  <div>
                    {/* TOP WHITE ANIMATION BOX */}
                    <div className="relative w-full h-56 bg-white border-b border-[#E4E4E7] flex items-center justify-center p-4">
                      <DotLottiePlayer src={item.lottieSrc} />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-[#09090B] text-white font-mono text-[10px] uppercase px-3 py-1 border border-[#27272A] font-bold shadow-md">
                          {item.badge}
                        </Badge>
                      </div>
                    </div>

                    {/* BOTTOM OBSIDIAN BLACK CONTENT BOX */}
                    <div className="p-6 space-y-3 bg-[#09090B] text-white">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-white" />
                        <span className="text-[10px] font-mono text-[#A1A1AA] font-bold uppercase tracking-wider">{item.tag}</span>
                      </div>
                      <h3 className="text-xl font-extrabold text-white tracking-tight">{item.title}</h3>
                      <p className="text-xs text-[#E4E4E7] leading-relaxed font-normal opacity-90">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* BOTTOM BUTTON BOX INSIDE OBSIDIAN BLACK */}
                  <div className="p-6 pt-0 bg-[#09090B]">
                    <button
                      onClick={onOpenApp}
                      className="w-full py-3.5 rounded-xl bg-white hover:bg-[#FAFAFA] text-[#09090B] text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <span>Launch In Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#09090B]" />
                    </button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
