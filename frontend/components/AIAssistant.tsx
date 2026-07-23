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
    <div className="glass-panel p-6 mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span>AI Distribution Assistant</span>
        </h3>
        <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-slate-300 font-medium">Natural Language</span>
      </div>
      <p className="text-xs text-slate-400 mb-4">
        Type your distribution intent in natural text or choose a verified smart template.
      </p>

      <div className="space-y-3 mb-5">
        <textarea
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="Example: Send 50 BOT to 0x1111... (Juara 1 50%), 30 BOT to 0x2222... (Juara 2 30%), 20 BOT to 0x3333... (Juara 3 20%)"
          rows={3}
          className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-slate-200 focus:border-cyan-400 outline-none transition-all placeholder:text-slate-500"
        />
        <button
          onClick={onGenerate}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-white hover:bg-white/15 transition-all"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Generate Plan with AI</span>
        </button>
      </div>

      <div className="pt-4 border-t border-white/10">
        <label className="text-xs font-semibold text-slate-300 block mb-2">Quick Distribution Templates:</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onApplyTemplate('hackathon')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-200 hover:border-cyan-400/50 hover:text-cyan-300 transition-all"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>🏆 Hackathon Prize (50/30/20%)</span>
          </button>
          <button
            onClick={() => onApplyTemplate('payroll')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-200 hover:border-cyan-400/50 hover:text-cyan-300 transition-all"
          >
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>💼 DAO Payroll</span>
          </button>
          <button
            onClick={() => onApplyTemplate('airdrop')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-200 hover:border-cyan-400/50 hover:text-cyan-300 transition-all"
          >
            <Gift className="w-3.5 h-3.5 text-purple-400" />
            <span>🎁 Community Airdrop</span>
          </button>
        </div>
      </div>
    </div>
  );
};
