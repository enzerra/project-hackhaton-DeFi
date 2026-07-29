'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface InteractiveCalculatorProps {
  onLaunchApp: () => void;
}

export const InteractiveCalculator: React.FC<InteractiveCalculatorProps> = ({ onLaunchApp }) => {
  const [recipientCount, setRecipientCount] = useState<number>(3);
  const [perRecipientAmount, setPerRecipientAmount] = useState<number>(10);

  const totalAmount = recipientCount * perRecipientAmount;
  
  // Traditional transfers: ~21,000 gas per tx * recipientCount
  const traditionalGas = recipientCount * 21000;
  // BOTFlow MultiSend: ~35,000 gas flat for batch
  const botflowGas = 35000;
  const gasSavedPercent = Math.round(((traditionalGas - botflowGas) / traditionalGas) * 100);

  return (
    <Card className="vercel-card p-6 md:p-8 max-w-xl mx-auto bg-white border border-slate-200 shadow-md my-10 text-left">
      <CardContent className="p-0">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Badge variant="outline" className="font-mono text-[10px] uppercase bg-slate-900 text-white border-slate-900 px-2.5 py-0.5 font-bold">
              Interactive Gas Calculator
            </Badge>
            <h3 className="text-lg font-bold text-slate-900 mt-2">
              Simulate Your Batch Transfer
            </h3>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-900 bg-slate-100 px-3 py-1 rounded-full border border-slate-300 font-bold shadow-xs">
            <Zap className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
            <span>Save ~{gasSavedPercent}% Gas</span>
          </div>
        </div>

        {/* RECIPIENT COUNT SLIDER */}
        <div className="space-y-6 mb-6">
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-700 mb-2">
              <span>Number of Recipients:</span>
              <span className="font-mono font-bold text-slate-900">{recipientCount} Wallets</span>
            </div>
            <Slider
              defaultValue={[recipientCount]}
              min={1}
              max={3}
              step={1}
              onValueChange={(val) => setRecipientCount(val[0])}
              className="w-full py-1"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-slate-700 mb-2">
              <span>Amount per Recipient:</span>
              <span className="font-mono font-bold text-slate-900">{perRecipientAmount} BOT</span>
            </div>
            <Slider
              defaultValue={[perRecipientAmount]}
              min={1}
              max={100}
              step={5}
              onValueChange={(val) => setPerRecipientAmount(val[0])}
              className="w-full py-1"
            />
          </div>
        </div>

        {/* COMPARISON METRICS */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6">
          <div>
            <span className="text-[11px] text-slate-500 block">Total Distribution</span>
            <span className="text-lg font-bold font-mono text-slate-900">{totalAmount} BOT</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block">Execution Mode</span>
            <span className="text-xs font-semibold text-slate-900 flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" />
              1 Tx Atomic
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLaunchApp}
          className="vercel-button-primary w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 group shadow-md cursor-pointer bg-slate-900 text-white hover:bg-slate-800"
        >
          <span>Test This Configuration Live</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </CardContent>
    </Card>
  );
};
