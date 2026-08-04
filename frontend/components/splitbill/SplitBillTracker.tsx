'use client';

import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, Copy, Check, ExternalLink, Plus, Zap } from 'lucide-react';
import { PayLinkItem, getPayLinks, generatePayLinkUrl } from '@/lib/paylinkStore';
import { CONTRACT_ADDRESS } from '@/lib/constants';

interface SplitBillTrackerProps {
  userAddress: string | null;
  onOpenCreateModal: () => void;
}

export const SplitBillTracker: React.FC<SplitBillTrackerProps> = ({
  userAddress,
  onOpenCreateModal,
}) => {
  const [links, setLinks] = useState<PayLinkItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadLinks = () => {
    const allLinks = getPayLinks();
    if (userAddress) {
      const userLinks = allLinks.filter(
        (l) => l.payeeAddress.toLowerCase() === userAddress.toLowerCase()
      );
      setLinks(userLinks);
    } else {
      setLinks(allLinks);
    }
  };

  useEffect(() => {
    loadLinks();

    const handleUpdate = () => loadLinks();
    window.addEventListener('paylink-updated', handleUpdate);
    window.addEventListener('paylink-paid', handleUpdate);

    return () => {
      window.removeEventListener('paylink-updated', handleUpdate);
      window.removeEventListener('paylink-paid', handleUpdate);
    };
  }, [userAddress]);

  const handleCopyLink = (id: string) => {
    const url = generatePayLinkUrl(id);
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full bg-white py-6 sm:py-12 flex flex-col items-center justify-center font-sans text-left text-[#171717]">
      {/* CENTERED VERCEL CARD MATCHING MULTISEND ENGINE SCREENSHOT 2 */}
      <div className="w-full max-w-[540px] mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-black/[0.08] shadow-sm space-y-6">
        {/* HEADER BAR */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-black/[0.06]">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block">
              PAYMENT REQUESTS
            </span>
            <h2 className="text-xl font-extrabold text-[#171717] tracking-tight mt-0.5">
              Split Bill & PayLink Tracker
            </h2>
          </div>

          <button
            onClick={onOpenCreateModal}
            className="py-2.5 px-4 bg-black hover:bg-neutral-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create PayLink</span>
          </button>
        </div>

        {/* PAYLINK CARDS LIST */}
        {links.length === 0 ? (
          <div className="text-center py-12 px-4 bg-[#FAFAFA] border border-black/[0.06] rounded-2xl space-y-3">
            <Clock className="w-9 h-9 text-neutral-400 mx-auto stroke-1" />
            <h3 className="text-sm font-bold text-[#171717]">No Active PayLinks Found</h3>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto">
              Click "Create PayLink" above to request instant 1-click payments.
            </p>
            <button
              onClick={onOpenCreateModal}
              className="mt-1 py-2 px-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create PayLink</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {links.map((link) => {
              const isPaid = link.status === 'PAID';
              return (
                <div
                  key={link.id}
                  className="p-4 rounded-2xl bg-[#FAFAFA] border border-black/[0.06] hover:border-black/[0.12] transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-neutral-400 block mb-0.5">#{link.id}</span>
                      <h4 className="text-sm font-bold text-[#171717] line-clamp-1">{link.title}</h4>
                    </div>

                    {isPaid ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-bold shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>PAID</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-mono font-bold shrink-0">
                        <Clock className="w-3 h-3 animate-pulse" />
                        <span>PENDING</span>
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-baseline pt-2 border-t border-black/[0.06]">
                    <span className="text-xs font-mono text-neutral-500">Requested Amount:</span>
                    <span className="text-base font-mono font-black text-[#171717]">
                      {link.amount} <span className="text-xs font-bold text-neutral-600">{link.tokenSymbol}</span>
                    </span>
                  </div>

                  {/* FOOTER ACTION ROW */}
                  <div className="pt-2 border-t border-black/[0.06] flex items-center justify-between gap-2 font-mono text-xs">
                    <span className="text-[10px] text-neutral-400">
                      {new Date(link.createdAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>

                    {isPaid ? (
                      link.paidTxHash && (
                        <a
                          href={`https://scan.bohr.life/tx/${link.paidTxHash}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-black font-bold hover:underline"
                        >
                          <span>Tx Proof</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )
                    ) : (
                      <div className="flex items-center gap-2">
                        <a
                          href={generatePayLinkUrl(link.id)}
                          className="px-2.5 py-1 bg-white hover:bg-neutral-100 border border-black/[0.08] text-black text-xs font-bold rounded-lg flex items-center gap-1 transition-colors shadow-2xs"
                        >
                          <span>Test Pay</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          onClick={() => handleCopyLink(link.id)}
                          className="px-3 py-1 bg-black hover:bg-neutral-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                        >
                          {copiedId === link.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span className="text-white font-bold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Link</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FOOTER DEPLOYED CONTRACT ADDRESS MATCHING SCREENSHOT 2 */}
      <div className="text-center font-mono text-xs text-neutral-400">
        Deployed Contract:{' '}
        <a
          href={`https://scan.bohr.life/address/${CONTRACT_ADDRESS}`}
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-black font-medium transition-colors"
        >
          {CONTRACT_ADDRESS.substring(0, 10)}...{CONTRACT_ADDRESS.substring(38)}
        </a>
      </div>
    </div>
  );
};
