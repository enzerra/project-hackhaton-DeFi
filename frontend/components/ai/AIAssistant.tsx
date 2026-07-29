'use client';

import React from 'react';
import { Sparkles, Trophy, Briefcase, Gift } from 'lucide-react';

interface AIAssistantProps {
  promptText: string;
  setPromptText: (val: string) => void;
  onGenerate: () => void;
  onApplyTemplate: (type: 'hackathon' | 'payroll' | 'airdrop') => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  promptText,
  setPromptText,
  onGenerate,
  onApplyTemplate,
}) => {
  return (
    <div className="vercel-card p-6 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-[#171717] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-600" />
          <span>Quick Distribution Presets</span>
        </h3>
        <span className="text-[11px] text-neutral-500 font-mono">1-Click Setup</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
        <button
          onClick={() => onApplyTemplate('hackathon')}
          className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 border border-black/[0.08] hover:border-black/[0.2] hover:bg-white text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#171717] block">Hackathon Prize</span>
            <span className="text-[10px] text-neutral-500">50% / 30% / 20% Top 3</span>
          </div>
        </button>

        <button
          onClick={() => onApplyTemplate('payroll')}
          className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 border border-black/[0.08] hover:border-black/[0.2] hover:bg-white text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 group-hover:scale-105 transition-transform">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#171717] block">DAO Payroll</span>
            <span className="text-[10px] text-neutral-500">Core Team Payouts</span>
          </div>
        </button>

        <button
          onClick={() => onApplyTemplate('airdrop')}
          className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 border border-black/[0.08] hover:border-black/[0.2] hover:bg-white text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 group-hover:scale-105 transition-transform">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#171717] block">Airdrop Reward</span>
            <span className="text-[10px] text-neutral-500">Equal Member Split</span>
          </div>
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-neutral-700">Or type custom text plan:</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="e.g. Send 50 BOT to 0x1111..., 30 BOT to 0x2222..."
            className="vercel-input flex-1 px-3.5 py-2 text-xs placeholder:text-neutral-400"
          />
          <button
            onClick={onGenerate}
            className="vercel-button-secondary px-4 py-2 text-xs font-semibold"
          >
            Parse Text
          </button>
        </div>
      </div>
    </div>
  );
};
