'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Share2, Zap, ArrowRight, Wallet } from 'lucide-react';
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
      `📌 BOTFlow PayLink: "${generatedLink.title}"\n💰 Amount: ${generatedLink.amount} ${generatedLink.tokenSymbol}\n\nPay in 1-click:\n${url}`
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-lg overflow-hidden bg-[#09090B] text-white border border-[#27272A] rounded-2xl shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-[#27272A] bg-[#121215]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold text-xs shadow-xs">
              ⚡
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white tracking-tight">Create Web3 PayLink</h3>
              <p className="text-[11px] font-mono text-neutral-400">Generate 1-click payment request links</p>
            </div>
          </div>
          <button
            onClick={handleResetModal}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 space-y-5 text-left">
          {!generatedLink ? (
            <form onSubmit={handleCreate} className="space-y-4">
              {/* ASSET TYPE SWITCHER */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider block">
                  Asset Type
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#18181B] border border-[#27272A] text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setIsNative(true)}
                    className={`py-2 rounded-lg font-bold transition-all cursor-pointer ${
                      isNative ? 'bg-white text-black shadow-xs' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Native BOT Token
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsNative(false)}
                    className={`py-2 rounded-lg font-bold transition-all cursor-pointer ${
                      !isNative ? 'bg-white text-black shadow-xs' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    ERC20 Token
                  </button>
                </div>
              </div>

              {/* TITLE INPUT */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider block">
                  Bill Title / Purpose
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hackathon Coffee & Lunch Split"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#18181B] border border-[#27272A] text-white text-xs font-sans placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              {/* AMOUNT INPUT */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider block">
                  Amount Requested ({isNative ? 'BOT' : tokenSymbol})
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#18181B] border border-[#27272A] text-white text-sm font-mono placeholder-neutral-500 focus:outline-none focus:border-white transition-colors pr-16"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-neutral-400">
                    {isNative ? 'BOT' : tokenSymbol}
                  </span>
                </div>
              </div>

              {!isNative && (
                <div className="space-y-3 p-3 rounded-xl bg-[#121215] border border-[#27272A]">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-neutral-400 block">ERC20 Contract Address</label>
                    <input
                      type="text"
                      placeholder="0x..."
                      value={tokenAddress}
                      onChange={(e) => setTokenAddress(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#18181B] border border-[#27272A] text-white text-xs font-mono placeholder-neutral-600 focus:outline-none focus:border-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-neutral-400 block">Token Symbol</label>
                    <input
                      type="text"
                      placeholder="USDT"
                      value={tokenSymbol}
                      onChange={(e) => setTokenSymbol(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#18181B] border border-[#27272A] text-white text-xs font-mono placeholder-neutral-600 focus:outline-none focus:border-white"
                    />
                  </div>
                </div>
              )}

              {/* PAYEE RECIPIENT DISPLAY */}
              <div className="p-3 rounded-xl bg-[#121215] border border-[#27272A] text-xs font-mono text-neutral-400 flex justify-between items-center">
                <span>Recipient (Payee):</span>
                <span className="text-white font-bold truncate max-w-[200px]">
                  {userAddress ? `${userAddress.substring(0, 8)}...${userAddress.substring(36)}` : 'Wallet Not Connected'}
                </span>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={!userAddress}
                className="w-full py-3 rounded-xl bg-white text-black font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all cursor-pointer disabled:opacity-50 shadow-md"
              >
                <span>Generate PayLink</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </form>
          ) : (
            /* SUCCESS GENERATED PAYLINK VIEW */
            <div className="space-y-5">
              <div className="text-center space-y-2 p-4 rounded-xl bg-[#121215] border border-[#27272A]">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">PayLink Created Successfully!</h4>
                <p className="text-xs font-mono text-neutral-400">
                  {generatedLink.title} — <strong className="text-white">{generatedLink.amount} {generatedLink.tokenSymbol}</strong>
                </p>
              </div>

              {/* URL LINK BOX */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                  Shareable PayLink URL
                </label>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#18181B] border border-[#27272A]">
                  <input
                    type="text"
                    readOnly
                    value={generatePayLinkUrl(generatedLink.id)}
                    className="w-full bg-transparent text-xs font-mono text-neutral-300 focus:outline-none px-2 select-all"
                  />
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-lg bg-white text-black font-bold text-xs flex items-center gap-1 hover:bg-neutral-200 transition-all shrink-0 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5 text-black" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* SOCIAL SHARE BUTTONS */}
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  onClick={shareToWhatsapp}
                  className="py-2.5 px-3 rounded-xl bg-[#18181B] border border-[#27272A] text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Share WhatsApp</span>
                </button>
                <button
                  onClick={shareToTelegram}
                  className="py-2.5 px-3 rounded-xl bg-[#18181B] border border-[#27272A] text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>Share Telegram</span>
                </button>
              </div>

              <button
                onClick={handleResetModal}
                className="w-full py-2.5 rounded-xl bg-neutral-800 text-white font-bold text-xs hover:bg-neutral-700 transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
