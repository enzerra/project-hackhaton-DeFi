'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Trophy, Vault, Layers, Calculator, ShieldCheck, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface WorkflowSectionProps {
  onLaunchApp: () => void;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ onLaunchApp }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides = [
    {
      id: 'hackathon',
      stepTag: 'FEATURE 01 — HACKATHON SPLIT',
      title: 'Hackathon Prize Pool Calculator',
      icon: Trophy,
      badge: '3 RECIPIENTS',
      expression: '5.0 BOT + 3.0 BOT + 2.0 BOT',
      result: '= 10.0 BOT',
      gasSaved: '64.2%',
      speed: '< 2.5s',
      recipientsCount: '3 WINNERS',
      summary: '50% / 30% / 20% Winner Pool',
    },
    {
      id: 'payroll',
      stepTag: 'FEATURE 02 — DAO PAYROLL',
      title: 'DAO Treasury Payroll Calculator',
      icon: Vault,
      badge: '10 RECIPIENTS',
      expression: '10.0 BOT + 5.0 BOT + 3.5 BOT',
      result: '= 18.5 BOT',
      gasSaved: '71.4%',
      speed: '< 2.5s',
      recipientsCount: '10 CONTRIBUTORS',
      summary: 'Monthly Core Contributor Batch',
    },
    {
      id: 'airdrop',
      stepTag: 'FEATURE 03 — COMMUNITY AIRDROP',
      title: 'Community Airdrop Stream Calculator',
      icon: Layers,
      badge: '50 RECIPIENTS',
      expression: '1.0 BOT × 50 Members',
      result: '= 50.0 BOT',
      gasSaved: '82.5%',
      speed: '< 2.5s',
      recipientsCount: '50 MEMBERS',
      summary: 'Equal Contributor Token Stream',
    },
  ];

  const current = slides[currentSlide];
  const Icon = current.icon;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      onLaunchApp();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <section className="bg-[#FAFAFA] py-20 md:py-28 border-b border-[#E4E4E7] w-full relative overflow-hidden shadow-inner">
      <div className="max-w-5xl mx-auto px-6">
        {/* SECTION HEADER */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <Badge variant="outline" className="font-mono text-[10px] uppercase bg-[#09090B] text-white border-[#09090B] px-3.5 py-1 font-bold mb-3 shadow-xs">
            GAS SAVINGS CALCULATOR
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#09090B] mb-2 font-sans">
            Payout Gas Calculator.
          </h2>
          <p className="text-sm text-[#52525B] font-normal">
            Click top tabs or navigation buttons to calculate gas savings for each use case.
          </p>
        </div>

        {/* TOP INTERACTIVE PRESET SELECTOR CHIPS */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {slides.map((s, idx) => {
            const ChipIcon = s.icon;
            const isSelected = currentSlide === idx;

            return (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#09090B] text-white shadow-xl scale-105'
                    : 'bg-white text-[#52525B] border border-[#D4D4D8] hover:bg-[#F4F4F5]'
                }`}
              >
                <ChipIcon className="w-4 h-4" />
                <span>{s.title.split(' ')[0]} {s.title.split(' ')[1]}</span>
              </button>
            );
          })}
        </div>

        {/* ULTRA-SIMPLE CALCULATOR THEATER STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border-2 border-[#09090B] rounded-3xl p-6 md:p-10 shadow-2xl mb-8 text-left"
          >
            {/* LEFT SIDE: DIGITAL CALCULATOR LCD DISPLAY */}
            <div className="lg:col-span-6">
              <Card className="p-6 bg-[#09090B] text-white border border-[#27272A] rounded-3xl space-y-4 shadow-xl">
                <div className="flex justify-between items-center border-b border-[#27272A] pb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold text-white font-mono">{current.stepTag}</span>
                  </div>
                  <Badge className="bg-white text-[#09090B] font-mono text-[9px] font-bold uppercase">
                    {current.badge}
                  </Badge>
                </div>

                {/* LCD DISPLAY */}
                <div className="p-4 rounded-2xl bg-[#141416] border border-[#27272A] text-right font-mono space-y-1 shadow-inner">
                  <div className="text-[10px] text-[#A1A1AA] uppercase font-bold">{current.summary}</div>
                  <div className="text-xs text-[#A1A1AA]">{current.expression}</div>
                  <div className="text-2xl md:text-3xl font-extrabold text-white">{current.result}</div>
                </div>

                {/* KEYPAD MATRIX */}
                <div className="grid grid-cols-4 gap-2 font-mono text-xs text-center">
                  {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((k, idx) => (
                    <div
                      key={idx}
                      className={`py-2.5 rounded-xl font-bold ${
                        ['÷', '×', '-', '+', '='].includes(k)
                          ? 'bg-white text-[#09090B]'
                          : 'bg-[#18181B] text-white border border-[#27272A]'
                      }`}
                    >
                      {k}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* RIGHT SIDE: 2 BIG BOLD STATS (ZERO TEXT PARAGRAPHS) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 rounded-2xl bg-[#09090B] text-white border border-[#27272A] flex items-center justify-between shadow-md">
                <div>
                  <span className="text-[10px] font-mono text-[#A1A1AA] block font-bold uppercase">GAS FEE SAVED</span>
                  <span className="text-3xl md:text-4xl font-extrabold text-white font-mono">{current.gasSaved}</span>
                </div>
                <Badge className="bg-white text-[#09090B] font-mono text-[10px] font-bold">LESS GAS</Badge>
              </div>

              <div className="p-6 rounded-2xl bg-[#09090B] text-white border border-[#27272A] flex items-center justify-between shadow-md">
                <div>
                  <span className="text-[10px] font-mono text-[#A1A1AA] block font-bold uppercase">EXECUTION SPEED</span>
                  <span className="text-3xl md:text-4xl font-extrabold text-white font-mono">{current.speed}</span>
                </div>
                <Badge className="bg-white text-[#09090B] font-mono text-[10px] font-bold">1 BLOCK</Badge>
              </div>

              <div className="p-4 rounded-2xl bg-[#F4F4F5] border border-[#E4E4E7] text-[#09090B] font-mono text-xs font-bold flex justify-between items-center">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#09090B]" />
                  <span>1 Single Tx • 100% Atomic Revert Protection</span>
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* BOTTOM NAVIGATION CONTROLS */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className="vercel-button-secondary px-6 py-3.5 text-xs font-bold font-mono flex items-center gap-2 border border-[#D4D4D8] rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Feature</span>
          </button>

          <div className="flex items-center gap-1.5 font-mono text-xs text-[#71717A] font-bold">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentSlide === idx ? 'bg-[#09090B] w-6' : 'bg-[#D4D4D8]'
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleNext}
            className="vercel-button-primary px-8 py-3.5 text-xs font-bold font-mono flex items-center gap-2 bg-[#09090B] text-white rounded-xl hover:bg-[#27272A] cursor-pointer shadow-lg"
          >
            <span>{currentSlide === slides.length - 1 ? 'Launch Workspace' : 'Next Feature'}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
