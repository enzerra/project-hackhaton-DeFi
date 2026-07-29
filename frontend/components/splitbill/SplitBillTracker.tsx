'use client';

import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, Copy, Check, ExternalLink, Plus, RefreshCw, Trash2, Zap } from 'lucide-react';
import { PayLinkItem, getPayLinks, generatePayLinkUrl } from '@/lib/paylinkStore';

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
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-[#09090B] border border-[#27272A] rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Zap className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">Split Bill & PayLink Tracker</h2>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Pantau status tagihan yang Anda kirim ke teman secara real-time (Pending vs Lunas)
          </p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="py-3 px-5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-2xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Buat PayLink Baru</span>
        </button>
      </div>

      {/* Tracker Table / Cards */}
      {links.length === 0 ? (
        <div className="text-center py-16 px-4 bg-[#09090B] border border-[#27272A] rounded-3xl space-y-3">
          <Clock className="w-10 h-10 text-neutral-600 mx-auto stroke-1" />
          <h3 className="text-base font-bold text-white">Belum Ada PayLink Ditagih</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Klik tombol "Buat PayLink Baru" di atas untuk menagih pembayaran tanpa repot meminta alamat wallet.
          </p>
          <button
            onClick={onOpenCreateModal}
            className="mt-2 py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Buat PayLink Pertama Anda</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map((link) => {
            const isPaid = link.status === 'PAID';
            return (
              <div
                key={link.id}
                className={`p-5 rounded-2xl border transition-all space-y-4 ${
                  isPaid
                    ? 'bg-[#0A120E] border-emerald-500/30'
                    : 'bg-[#09090B] border-[#27272A] hover:border-neutral-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-neutral-500 block mb-0.5">#{link.id}</span>
                    <h4 className="text-base font-bold text-white line-clamp-1">{link.title}</h4>
                  </div>

                  {isPaid ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>LUNAS</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold shrink-0">
                      <Clock className="w-3.5 h-3.5 animate-pulse" />
                      <span>PENDING</span>
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-[#27272A]/50">
                  <span className="text-xs text-neutral-400">Nominal Tagihan:</span>
                  <span className="text-lg font-black text-emerald-400">
                    {link.amount} <span className="text-xs font-bold text-white">{link.tokenSymbol}</span>
                  </span>
                </div>

                {/* Footer details & Action */}
                <div className="pt-2 border-t border-[#27272A]/50 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-neutral-500">
                    {new Date(link.createdAt).toLocaleDateString('id-ID', {
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
                        className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline font-medium"
                      >
                        <span>Bukti Tx</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )
                  ) : (
                    <div className="flex items-center gap-2">
                      <a
                        href={generatePayLinkUrl(link.id)}
                        className="px-2.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors"
                      >
                        <span>Uji Bayar</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        onClick={() => handleCopyLink(link.id)}
                        className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedId === link.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-semibold">Tercopy!</span>
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
  );
};
