'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Wallet, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const ComparisonSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0);

  const cards = [
    {
      id: 0,
      step: '01',
      suit: 'STEP 01',
      title: 'Input Recipients & Amounts',
      subtitle: 'Paste recipient wallet addresses or import CSV file in 1 second.',
      icon: FileText,
      badge: 'INPUT PHASE',
      detailTitle: 'Supported Input Modes',
      detailItems: [
        'Manual recipient & amount list entry',
        'Bulk CSV spreadsheet import',
        'Automatic recipient balance validation',
      ],
      previewCode: `0xED44fBf4... -> 5.0 BOT\n0x892A10c3... -> 3.0 BOT\n0x3F1090a1... -> 2.0 BOT`,
    },
    {
      id: 1,
      step: '02',
      suit: 'STEP 02',
      title: 'Select Token Engine',
      subtitle: 'Choose Native BOT Coin or any custom ERC20 token contract.',
      icon: Wallet,
      badge: 'ENGINE SELECTION',
      detailTitle: 'Asset Compatibility',
      detailItems: [
        'Native BOT Coin (msg.value execution)',
        'Standard ERC20 Tokens (transferFrom)',
        'Excess Value Auto-Refund to Sender',
      ],
      previewCode: `Token: Native BOT (Chain ID 968)\nContract: 0x9118EA4a...f9E9\nStatus: Verified Invariant`,
    },
    {
      id: 2,
      step: '03',
      suit: 'STEP 03',
      title: 'Execute Atomic MultiSend',
      subtitle: 'Confirm 1 Metamask signature. Guaranteed zero partial failures.',
      icon: ShieldCheck,
      badge: 'ATOMIC EXECUTION',
      detailTitle: 'Security Invariants',
      detailItems: [
        '100% All-or-Nothing Revert Protection',
        '~64.2% Gas Overhead Reduction',
        'Instant On-Chain Receipt',
      ],
      previewCode: `Tx Hash: 0x63a175bb86e0...\nBlock: #17324173\nResult: 100% SETTLED`,
    },
  ];

  return (
    <section className="bg-[#F4F4F5] py-20 md:py-28 border-y border-[#D4D4D8] w-full relative shadow-inner overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="font-mono text-[10px] uppercase bg-[#09090B] text-white border-[#09090B] px-3 py-1 font-bold mb-3 shadow-xs">
            STACKED CARDS WORKFLOW
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#09090B] mb-4 font-sans">
            3 Simple Steps. 1 Transaction.
          </h2>
          <p className="text-sm md:text-base text-[#52525B] font-normal">
            Click any card in the physical Stacked Cards deck to bring it to the top of the stack.
          </p>
        </div>

        {/* STACKED CARDS SELECTOR BUTTONS */}
        <div className="flex justify-center gap-2 mb-10">
          {cards.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setActiveCard(idx)}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeCard === idx
                  ? 'bg-[#09090B] text-white shadow-lg scale-105'
                  : 'bg-white text-[#27272A] border border-[#D4D4D8] hover:bg-[#FAFAFA]'
              }`}
            >
              <span className="w-5 h-5 rounded-lg bg-[#E4E4E7] text-[#09090B] text-[10px] flex items-center justify-center font-bold">
                {c.step}
              </span>
              <span>{c.title}</span>
            </button>
          ))}
        </div>

        {/* STACKED CARDS DECK CONTAINER */}
        <div className="relative min-h-[440px] md:min-h-[380px] max-w-3xl mx-auto flex items-center justify-center my-6">
          {cards.map((card, index) => {
            const isActive = activeCard === index;
            const offset = (index - activeCard + cards.length) % cards.length;
            const Icon = card.icon;

            return (
              <motion.div
                key={card.id}
                layout
                onClick={() => setActiveCard(index)}
                animate={{
                  top: offset * 18,
                  scale: isActive ? 1 : 1 - offset * 0.04,
                  rotate: isActive ? 0 : offset % 2 === 0 ? 2 : -2,
                  zIndex: cards.length - offset,
                  opacity: 1 - offset * 0.15,
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute w-full bg-gradient-to-b from-white via-[#FAFAFA] to-[#F4F4F5] border-2 ${
                  isActive
                    ? 'border-[#09090B] shadow-[0_25px_60px_-15px_rgba(9,9,11,0.25)]'
                    : 'border-[#D4D4D8] shadow-lg cursor-pointer hover:border-[#A1A1AA]'
                } rounded-3xl p-6 md:p-8 text-left transition-all`}
              >
                {/* PHYSICAL PLAYING CARD TOP HEADER */}
                <div className="flex justify-between items-center border-b border-[#E4E4E7] pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#09090B] text-white flex items-center justify-center font-bold shadow-md">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#A1A1AA] block font-bold tracking-widest">{card.suit}</span>
                      <h3 className="text-lg md:text-xl font-extrabold text-[#09090B] tracking-tight">{card.title}</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#09090B] text-white font-mono text-[10px] uppercase px-3 py-1 font-bold">
                      {card.badge}
                    </Badge>
                  </div>
                </div>

                <p className="text-xs text-[#52525B] mb-6 font-normal leading-relaxed">{card.subtitle}</p>

                {/* CARD BODY CONTENT */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* LEFT: CHECKLIST */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono text-[#71717A] font-bold uppercase block">
                      {card.detailTitle}
                    </span>
                    {card.detailItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#18181B] font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#09090B] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* RIGHT: LIVE TERMINAL PREVIEW */}
                  <div className="p-4 rounded-2xl bg-[#09090B] text-white font-mono text-[11px] space-y-1.5 shadow-md">
                    <div className="flex justify-between items-center border-b border-[#27272A] pb-1 mb-2">
                      <span className="text-[9px] text-[#A1A1AA] uppercase tracking-widest font-bold">
                        Engine State
                      </span>
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    </div>
                    <pre className="text-[10px] text-[#E4E4E7] whitespace-pre-wrap font-mono leading-relaxed">
                      {card.previewCode}
                    </pre>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
