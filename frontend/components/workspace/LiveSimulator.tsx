'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Check, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export const LiveSimulator: React.FC = () => {
  const [simState, setSimState] = useState<'idle' | 'running' | 'success'>('idle');
  const [currentStep, setCurrentStep] = useState<number>(0);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#171717', '#525252', '#737373', '#FFFFFF'],
      });
    } catch (e) {
      console.error(e);
    }
  };

  const runSimulation = () => {
    setSimState('running');
    setCurrentStep(1);

    setTimeout(() => setCurrentStep(2), 650);
    setTimeout(() => setCurrentStep(3), 1300);
    setTimeout(() => {
      setCurrentStep(4);
      setSimState('success');
      triggerConfetti();
    }, 1950);
  };

  const resetSimulation = () => {
    setSimState('idle');
    setCurrentStep(0);
  };

  return (
    <Card className="vercel-card p-6 md:p-8 max-w-2xl mx-auto bg-white border border-slate-200 shadow-md my-10 text-left overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <Badge variant="outline" className="font-mono text-[10px] uppercase bg-slate-900 text-white border-slate-900 px-3 py-1 font-bold">
              Interactive Live Simulator
            </Badge>
            <h3 className="text-lg font-bold text-slate-900 mt-2">
              Simulate an On-Chain Atomic Transfer
            </h3>
          </div>

          {simState === 'idle' ? (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={runSimulation}
              className="vercel-button-primary px-5 py-2.5 text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-white text-white" />
              <span>Run Test</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={resetSimulation}
              className="vercel-button-secondary px-4 py-2 text-xs font-medium flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-700" />
              <span>Reset</span>
            </motion.button>
          )}
        </div>

        {/* SIMULATION PIPELINE */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { step: 1, title: 'Calldata Packing', code: '01. PREPARE' },
            { step: 2, title: 'Gas Check (~64%)', code: '02. ESTIMATE' },
            { step: 3, title: 'Atomic MultiSend', code: '03. EXECUTE' },
            { step: 4, title: '100% Settled', code: '04. CONFIRM' },
          ].map((item) => {
            const isCompleted = currentStep >= item.step;

            return (
              <motion.div
                key={item.step}
                animate={{
                  scale: currentStep === item.step ? 1.04 : 1,
                }}
                transition={{ duration: 0.2 }}
                className={`p-3.5 rounded-xl border text-center transition-all ${
                  isCompleted
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}
              >
                <span className="text-[10px] font-mono block mb-1 opacity-80">{item.code}</span>
                <span className="text-xs font-bold block">{item.title}</span>
                {isCompleted && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-1 flex justify-center">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* SIMULATION STATUS DISPLAY */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-900 flex justify-between items-center min-h-[52px]">
          <AnimatePresence mode="wait">
            <motion.span
              key={simState + currentStep}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
            >
              {simState === 'idle' && 'Click "Run Test" to simulate on-chain atomic execution pipeline.'}
              {simState === 'running' && `[Step ${currentStep}/4] Processing calldata & verifying atomic invariant...`}
              {simState === 'success' && '[SUCCESS] 3 Recipients Received BOT Tokens in 1 Transaction! Block #17324173.'}
            </motion.span>
          </AnimatePresence>

          {simState === 'running' && (
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900 animate-ping shrink-0 ml-2" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
