'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Zap, Link, Calculator, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface WorkflowSectionProps {
  onLaunchApp: () => void;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ onLaunchApp }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides = [
    {
      id: 'multisend',
      stepTag: 'FEATURE 01 — MULTISEND ENGINE',
      title: 'MultiSend Batch Payout Engine',
      icon: Zap,
      badge: 'ATOMIC BATCH PAYOUTS',
      expression: '0.2 BOT × 50 Recipients',
      result: '= 10.0 BOT Total',
      gasSaved: '82.5%',
      speed: '< 2.5s',
      recipientsCount: 'UP TO 50 RECIPIENTS',
      summary: '1-Click Atomic Batch Token Transfers',
    },
    {
      id: 'paylink',
      stepTag: 'FEATURE 02 — SPLIT BILL & PAYLINK',
      title: '1-Click Split Bill & PayLink',
      icon: Link,
      badge: 'SHAREABLE PAYLINKS',
      expression: 'Request 2.5 BOT via WhatsApp',
      result: '1-Click Direct Settlement',
      gasSaved: '100% Direct',
      speed: '< 2.0s',
      recipientsCount: 'INSTANT SHARE',
      summary: 'Shareable PayLink with Automated Tracking',
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
          <Badge variant="outline" className="font-mono text-[10px] uppercase bg-black text-white border-black px-3.5 py-1 font-bold mb-3 shadow-xs">
            FEATURE PERFORMANCE CALCULATOR
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#09090B] mb-2 font-sans">
            Core Features Performance.
          </h2>
          <p className="text-sm text-[#52525B] font-normal">
            Click top tabs to see performance metrics for MultiSend and Split Bill PayLink.
          </p>
        </div>

        {/* TOP INTERACTIVE PRESET SELECTOR CHIPS */}
        <div className="flex justify-center gap-3 mb-8">
          {slides.map((s, idx) => {
            const ChipIcon = s.icon;
            const isSelected = currentSlide === idx;

            return (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? 'bg-black text-white border-black shadow-md'
                    : 'bg-white text-neutral-600 border-black/[0.08] hover:bg-neutral-100 hover:text-black'
                }`}
              >
                <ChipIcon className="w-4 h-4" />
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* INTERACTIVE CAROUSEL CARD CONTAINER */}
        <Card className="vercel-card p-0 bg-white border border-black/[0.08] shadow-2xl rounded-3xl overflow-hidden max-w-4xl mx-auto">
          {/* TOP OBSIDIAN HEADER INSIDE CARD */}
          <div className="p-6 md:p-8 bg-black text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-800">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">
                {current.stepTag}
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <Icon className="w-6 h-6 text-white" />
                <span>{current.title}</span>
              </h3>
            </div>
            <Badge className="bg-white text-black font-mono text-[10px] uppercase px-3 py-1 font-extrabold border-none shadow-xs">
              {current.badge}
            </Badge>
          </div>

          {/* MIDDLE ANIMATED CONTENT BODY */}
          <div className="p-6 md:p-10 space-y-8 bg-white text-[#171717]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* MATH EXPRESSION DISPLAY */}
                <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-black/[0.06] text-center space-y-2">
                  <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                    {current.summary}
                  </div>
                  <div className="text-xl md:text-3xl font-mono font-black text-black">
                    {current.expression} <span className="text-black font-bold">{current.result}</span>
                  </div>
                </div>

                {/* PERFORMANCE METRICS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
                  <div className="p-4 rounded-xl bg-[#FAFAFA] border border-black/[0.06] text-left">
                    <span className="text-[10px] text-neutral-400 uppercase block">Execution Speed</span>
                    <span className="text-lg font-bold text-black flex items-center gap-1.5 mt-1">
                      <Zap className="w-4 h-4 text-black fill-black" />
                      {current.speed}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAFAFA] border border-black/[0.06] text-left">
                    <span className="text-[10px] text-neutral-400 uppercase block">Gas Fee Advantage</span>
                    <span className="text-lg font-bold text-emerald-600 flex items-center gap-1.5 mt-1">
                      <Calculator className="w-4 h-4 text-emerald-600" />
                      {current.gasSaved}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAFAFA] border border-black/[0.06] text-left">
                    <span className="text-[10px] text-neutral-400 uppercase block">Capacity</span>
                    <span className="text-lg font-bold text-black flex items-center gap-1.5 mt-1">
                      <ShieldCheck className="w-4 h-4 text-black" />
                      {current.recipientsCount}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CAROUSEL NAVIGATION CONTROLS */}
            <div className="flex items-center justify-between pt-4 border-t border-black/[0.06]">
              <button
                onClick={handlePrev}
                disabled={currentSlide === 0}
                className="px-4 py-2 rounded-xl bg-neutral-100 text-black font-bold text-xs flex items-center gap-1.5 hover:bg-neutral-200 transition-all disabled:opacity-30 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      currentSlide === idx ? 'bg-black w-6' : 'bg-neutral-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-black text-white font-extrabold text-xs flex items-center gap-1.5 hover:bg-neutral-800 transition-all cursor-pointer shadow-md"
              >
                <span>{currentSlide === slides.length - 1 ? 'Launch DApp' : 'Next Feature'}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
