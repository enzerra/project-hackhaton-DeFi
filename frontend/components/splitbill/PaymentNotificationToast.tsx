'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, X, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { PayLinkItem } from '@/lib/paylinkStore';

export const PaymentNotificationToast: React.FC = () => {
  const [activeToast, setActiveToast] = useState<PayLinkItem | null>(null);

  useEffect(() => {
    const handlePaidEvent = (e: Event) => {
      const customEvent = e as CustomEvent<PayLinkItem>;
      if (customEvent.detail) {
        setActiveToast(customEvent.detail);

        // Try playing subtle notification audio if supported
        try {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
          audio.volume = 0.4;
          audio.play().catch(() => {});
        } catch {}

        // Auto dismiss after 7 seconds
        setTimeout(() => {
          setActiveToast(null);
        }, 7000);
      }
    };

    window.addEventListener('paylink-paid', handlePaidEvent);
    return () => window.removeEventListener('paylink-paid', handlePaidEvent);
  }, []);

  if (!activeToast) return null;

  return (
    <div className="fixed top-6 right-6 z-50 max-w-md w-full animate-in slide-in-from-top-5 duration-300">
      <div className="p-4 rounded-2xl bg-[#09090B] border-2 border-emerald-500 text-white shadow-2xl shadow-emerald-500/20 flex items-start gap-3.5">
        <div className="p-2.5 rounded-xl bg-emerald-500 text-black font-bold shrink-0 mt-0.5 shadow-md">
          <Sparkles className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-extrabold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>PEMBAYARAN DITERIMA!</span>
            </h4>
            <button
              onClick={() => setActiveToast(null)}
              className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-white font-medium line-clamp-2">
            Tagihan <span className="font-bold text-emerald-300">"{activeToast.title}"</span> telah dibayar lunas!
          </p>

          <div className="pt-1.5 flex items-center justify-between text-[11px] text-neutral-300">
            <span className="font-mono font-bold text-emerald-400 text-xs">
              +{activeToast.amount} {activeToast.tokenSymbol}
            </span>
            {activeToast.paidTxHash && (
              <a
                href={`https://scan.bohr.life/tx/${activeToast.paidTxHash}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-0.5 text-neutral-400 hover:text-emerald-400 transition-colors"
              >
                <span>Lihat Explorer</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
