'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Link, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { DotLottiePlayer } from '../common/DotLottiePlayer';

interface FeaturesShowcaseProps {
  onOpenApp: () => void;
}

export const FeaturesShowcase: React.FC<FeaturesShowcaseProps> = ({ onOpenApp }) => {
  const coreFeatures = [
    {
      id: 'multisend',
      tag: '01. BATCH PAYOUT ENGINE',
      title: 'MultiSend Engine',
      subtitle: 'Execute atomic batch token payouts to up to 50 recipients in 1 single transaction payload with up to 82.5% gas savings.',
      lottieSrc: 'https://lottie.host/3896472c-cb1f-4769-b87b-a9389f01e76c/buP8MvD8Dp.lottie',
      badge: 'ATOMIC BATCH PAYOUTS',
      icon: Zap,
      highlights: [
        'Native BOT & ERC20 Token Support',
        'Stateless Zero-SSTORE Execution',
        'CSV Import & Preset Rosters',
        '100% All-or-Nothing Atomic Revert',
      ],
    },
    {
      id: 'paylink',
      tag: '02. 1-CLICK SETTLEMENT',
      title: 'Split Bill & PayLink',
      subtitle: 'Generate shareable Web3 payment request links for instant 1-click settlement. Share instantly to WhatsApp & Telegram.',
      lottieSrc: 'https://lottie.host/db14d1b6-b0b1-43eb-aa6a-1b6010b7832d/dLEaQnLAd5.lottie',
      badge: 'SHAREABLE PAYLINKS',
      icon: Link,
      highlights: [
        '1-Click Web3 Settlement Request',
        'Direct WhatsApp & Telegram Sharing',
        'Light Theme Vercel Minimalist UI',
        'Real-time Paid & Settled Tracking',
      ],
    },
  ];

  return (
    <section className="bg-[#FAFAFA] py-20 md:py-28 border-b border-[#E4E4E7] w-full relative overflow-hidden shadow-inner">
      <div className="max-w-5xl mx-auto px-6">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="outline" className="font-mono text-[10px] uppercase bg-black text-white border-black px-3 py-1 font-bold mb-3 shadow-xs">
            CORE PLATFORM PILLARS
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#09090B] mb-3 font-sans">
            Two Powerful Core Features.
          </h2>
          <p className="text-sm md:text-base text-[#52525B] font-normal">
            Everything you need for batch token payouts and Web3 bill splitting on BOT Chain.
          </p>
        </div>

        {/* 2 FLAGSHIP CORE PILLARS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {coreFeatures.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-0 bg-white border border-black/[0.08] shadow-sm rounded-3xl overflow-hidden hover:border-black transition-all text-left h-full flex flex-col justify-between">
                  <div>
                    {/* TOP WHITE ANIMATION BOX */}
                    <div className="relative w-full h-56 bg-[#FAFAFA] border-b border-black/[0.06] flex items-center justify-center p-4">
                      <DotLottiePlayer src={item.lottieSrc} />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-black text-white font-mono text-[10px] uppercase px-3 py-1 border border-black/20 font-bold shadow-xs">
                          {item.badge}
                        </Badge>
                      </div>
                    </div>

                    {/* CONTENT BOX */}
                    <div className="p-6 md:p-8 space-y-4 bg-white text-[#171717]">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-black" />
                        <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">{item.tag}</span>
                      </div>
                      <h3 className="text-2xl font-extrabold text-[#171717] tracking-tight">{item.title}</h3>
                      <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                        {item.subtitle}
                      </p>

                      <div className="pt-2 space-y-2 border-t border-black/[0.06]">
                        {item.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-mono text-neutral-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM BUTTON BOX */}
                  <div className="p-6 md:p-8 pt-0 bg-white">
                    <button
                      onClick={onOpenApp}
                      className="w-full py-3 rounded-xl bg-black text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all cursor-pointer shadow-md"
                    >
                      <span>Launch {item.title}</span>
                      <ArrowRight className="w-4 h-4 text-white" />
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
