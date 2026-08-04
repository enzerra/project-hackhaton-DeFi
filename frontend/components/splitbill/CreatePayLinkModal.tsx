'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Share2, ArrowRight } from 'lucide-react';
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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!userAddress) {
      setErrorMsg('Please connect your MetaMask wallet first.');
      return;
    }
    if (!title.trim()) {
      setErrorMsg('Please enter a valid bill title or note.');
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMsg('Please enter an amount greater than 0.');
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
      `📌 Batchpay PayLink: "${generatedLink.title}"\n💰 Amount: ${generatedLink.amount} ${generatedLink.tokenSymbol}\n\nPay in 1-click:\n${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const shareToTelegram = () => {
    if (!generatedLink) return;
    const url = generatePayLinkUrl(generatedLink.id);
    const text = encodeURIComponent(
      `📌 Batchpay PayLink: "${generatedLink.title}" (${generatedLink.amount} ${generatedLink.tokenSymbol})`
    );
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${text}`, '_blank');
  };

  const handleResetModal = () => {
    setGeneratedLink(null);
    setTitle('');
    setAmount('');
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 font-sans text-left text-[#171717]">
      <div className="relative w-full max-w-lg overflow-hidden bg-white text-[#171717] border border-black/[0.08] rounded-3xl shadow-2xl space-y-0">
        {/* LIGHT HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-black/[0.06] bg-[#FAFAFA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center font-bold text-xs shadow-xs">
              ⚡
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#171717] tracking-tight">Create Web3 PayLink</h3>
              <p className="text-[11px] font-mono text-neutral-500">Generate 1-click payment request links</p>
            </div>
          </div>
          <button
            onClick={handleResetModal}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
              {errorMsg}
            </div>
          )}

          {!generatedLink ? (
            <form onSubmit={handleCreate} className="space-y-4">
              {/* ASSET TYPE SWITCHER */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider block">
                  Asset Type
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#F4F4F5] border border-black/[0.06] text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setIsNative(true)}
                    className={`py-2 rounded-lg font-bold transition-all cursor-pointer ${
                      isNative ? 'bg-black text-white shadow-xs' : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    Native BOT Token
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsNative(false)}
                    className={`py-2 rounded-lg font-bold transition-all cursor-pointer ${
                      !isNative ? 'bg-black text-white shadow-xs' : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    ERC20 Token
                  </button>
                </div>
              </div>

              {/* TITLE INPUT */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider block">
                  Bill Title / Purpose
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hackathon Coffee & Lunch Split"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAFA] border border-black/[0.08] text-[#171717] text-xs font-sans placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              {/* AMOUNT INPUT */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider block">
                  Amount Requested ({isNative ? 'BOT' : tokenSymbol})
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAFA] border border-black/[0.08] text-[#171717] text-sm font-mono placeholder-neutral-400 focus:outline-none focus:border-black transition-colors pr-16"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-neutral-500">
                    {isNative ? 'BOT' : tokenSymbol}
                  </span>
                </div>
              </div>

              {!isNative && (
                <div className="space-y-3 p-3 rounded-xl bg-[#FAFAFA] border border-black/[0.06]">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-neutral-500 block">ERC20 Contract Address</label>
                    <input
                      type="text"
                      placeholder="0x..."
                      value={tokenAddress}
                      onChange={(e) => setTokenAddress(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-black/[0.08] text-[#171717] text-xs font-mono placeholder-neutral-400 focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-neutral-500 block">Token Symbol</label>
                    <input
                      type="text"
                      placeholder="USDT"
                      value={tokenSymbol}
                      onChange={(e) => setTokenSymbol(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-black/[0.08] text-[#171717] text-xs font-mono placeholder-neutral-400 focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              )}

              {/* PAYEE RECIPIENT DISPLAY */}
              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-black/[0.06] text-xs font-mono text-neutral-500 flex justify-between items-center">
                <span>Recipient Address:</span>
                <span className="text-[#171717] font-bold truncate max-w-[200px]">
                  {userAddress ? `${userAddress.substring(0, 8)}...${userAddress.substring(36)}` : 'Wallet Not Connected'}
                </span>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={!userAddress}
                className="w-full py-3 rounded-xl bg-black text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all cursor-pointer disabled:opacity-50 shadow-md"
              >
                <span>Generate PayLink</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </form>
          ) : (
            /* SUCCESS GENERATED PAYLINK VIEW */
            <div className="space-y-5">
              <div className="text-center space-y-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-emerald-950">PayLink Created Successfully!</h4>
                <p className="text-xs font-mono text-emerald-800">
                  {generatedLink.title} — <strong className="text-emerald-950">{generatedLink.amount} {generatedLink.tokenSymbol}</strong>
                </p>
              </div>

              {/* URL LINK BOX */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block">
                  Shareable PayLink URL
                </label>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAFAFA] border border-black/[0.08]">
                  <input
                    type="text"
                    readOnly
                    value={generatePayLinkUrl(generatedLink.id)}
                    className="w-full bg-transparent text-xs font-mono text-[#171717] focus:outline-none px-2 select-all"
                  />
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-lg bg-black text-white font-bold text-xs flex items-center gap-1 hover:bg-neutral-800 transition-all shrink-0 cursor-pointer shadow-xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-white" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* SOCIAL SHARE BUTTONS */}
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  onClick={shareToWhatsapp}
                  className="py-2.5 px-3 rounded-xl bg-[#FAFAFA] border border-black/[0.08] text-[#171717] hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Share WhatsApp</span>
                </button>
                <button
                  onClick={shareToTelegram}
                  className="py-2.5 px-3 rounded-xl bg-[#FAFAFA] border border-black/[0.08] text-[#171717] hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-sky-600" />
                  <span>Share Telegram</span>
                </button>
              </div>

              <button
                onClick={handleResetModal}
                className="w-full py-2.5 rounded-xl bg-neutral-100 text-[#171717] font-bold text-xs hover:bg-neutral-200 transition-colors cursor-pointer border border-black/[0.08]"
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
