'use client';

import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Share2, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { createPayLink, generatePayLinkUrl, PayLinkItem } from '@/lib/paylinkStore';

interface CreatePayLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  userAddress: string | null;
  onLinkCreated?: (link: PayLinkItem) => void;
}

export const CreatePayLinkModal: React.FC<CreatePayLinkModalProps> = ({
  isOpen,
  onClose,
  userAddress,
  onLinkCreated,
}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [isNative, setIsNative] = useState(true);
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('USDT');

  const [generatedLink, setGeneratedLink] = useState<PayLinkItem | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAddress) {
      alert('Please connect your wallet first!');
      return;
    }
    if (!title.trim()) {
      alert('Please enter a title or note for the bill.');
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter a valid amount greater than 0.');
      return;
    }

    const payId = 'PAY-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const newLink = createPayLink({
      id: payId,
      title: title.trim(),
      payeeAddress: userAddress,
      amount: amount.trim(),
      isNative,
      tokenAddress: isNative ? undefined : tokenAddress.trim(),
      tokenSymbol: isNative ? 'BOT' : tokenSymbol.trim() || 'TOKEN',
    });

    setGeneratedLink(newLink);
    if (onLinkCreated) onLinkCreated(newLink);
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    const url = generatePayLinkUrl(generatedLink.id);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToWhatsapp = () => {
    if (!generatedLink) return;
    const url = generatePayLinkUrl(generatedLink.id);
    const text = encodeURIComponent(
      `📌 BOTFlow PayLink: "${generatedLink.title}"\n💰 Total Tagihan: ${generatedLink.amount} ${generatedLink.tokenSymbol}\n\nKlik link ini untuk langsung bayar 1-click:\n${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const shareToTelegram = () => {
    if (!generatedLink) return;
    const url = generatePayLinkUrl(generatedLink.id);
    const text = encodeURIComponent(
      `📌 BOTFlow PayLink: "${generatedLink.title}" (${generatedLink.amount} ${generatedLink.tokenSymbol})`
    );
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${text}`, '_blank');
  };

  const handleResetModal = () => {
    setGeneratedLink(null);
    setTitle('');
    setAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden bg-[#09090B] text-white border border-[#27272A] rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#27272A] bg-[#121215]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Create PayLink / Split Bill</h3>
              <p className="text-xs text-neutral-400">Tagih pembayaran tanpa perlu minta alamat wallet pembayar</p>
            </div>
          </div>
          <button
            onClick={handleResetModal}
            className="p-2 rounded-xl hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!generatedLink ? (
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Catatan / Judul Tagihan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Makan Bareng Hackathon, Patungan Server"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#18181B] border border-[#27272A] rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Nominal Tagihan
                  </label>
                  <input
                    type="number"
                    step="any"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#18181B] border border-[#27272A] rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Jenis Token
                  </label>
                  <div className="flex bg-[#18181B] border border-[#27272A] rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => setIsNative(true)}
                      className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                        isNative ? 'bg-emerald-500 text-black font-semibold' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      BOT Native
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsNative(false)}
                      className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                        !isNative ? 'bg-emerald-500 text-black font-semibold' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      ERC20
                    </button>
                  </div>
                </div>
              </div>

              {!isNative && (
                <div className="space-y-3 p-3.5 rounded-xl bg-[#141417] border border-[#27272A]">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Smart Contract Address ERC20</label>
                    <input
                      type="text"
                      placeholder="0x..."
                      value={tokenAddress}
                      onChange={(e) => setTokenAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#18181B] border border-[#27272A] rounded-lg text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Simbol Token</label>
                    <input
                      type="text"
                      placeholder="USDT / USDC"
                      value={tokenSymbol}
                      onChange={(e) => setTokenSymbol(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#18181B] border border-[#27272A] rounded-lg text-white font-mono"
                    />
                  </div>
                </div>
              )}

              <div className="p-3 rounded-xl bg-[#121215] border border-[#27272A] text-xs space-y-1">
                <span className="text-neutral-400">Penerima Dana (Wallet Anda):</span>
                <p className="font-mono text-emerald-400 font-medium truncate">
                  {userAddress || 'Belum Terkoneksi'}
                </p>
              </div>

              <button
                type="submit"
                disabled={!userAddress}
                className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <span>Generate PayLink</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Success & Share View */
            <div className="space-y-5 text-center">
              <div className="inline-flex p-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-1">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">PayLink Berhasil Dibuat! 🎉</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Kirim link ini ke teman Anda. Mereka tinggal membuka link dan klik bayar 1-click.
                </p>
              </div>

              {/* Bill Details Preview */}
              <div className="p-4 rounded-xl bg-[#141417] border border-[#27272A] text-left space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">Judul:</span>
                  <span className="font-semibold text-white">{generatedLink.title}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">Jumlah Tagihan:</span>
                  <span className="font-bold text-emerald-400 text-sm">
                    {generatedLink.amount} {generatedLink.tokenSymbol}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">Penerima Tagihan:</span>
                  <span className="font-mono text-neutral-300 text-[11px]">
                    {generatedLink.payeeAddress.substring(0, 8)}...{generatedLink.payeeAddress.substring(36)}
                  </span>
                </div>
              </div>

              {/* URL & Copy Box */}
              <div className="flex items-center gap-2 p-2 bg-[#18181B] border border-[#27272A] rounded-xl">
                <input
                  type="text"
                  readOnly
                  value={generatePayLinkUrl(generatedLink.id)}
                  className="flex-1 px-2 text-xs bg-transparent text-neutral-300 font-mono focus:outline-none truncate"
                />
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tercopy!' : 'Copy'}</span>
                </button>
              </div>

              {/* Social Share Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={shareToWhatsapp}
                  className="py-2.5 px-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Kirim via WhatsApp</span>
                </button>
                <button
                  onClick={shareToTelegram}
                  className="py-2.5 px-3 bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/30 text-[#229ED9] text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Kirim via Telegram</span>
                </button>
              </div>

              <button
                onClick={handleResetModal}
                className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium rounded-xl transition-colors mt-2 cursor-pointer"
              >
                Selesai / Buat Tagihan Lain
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
