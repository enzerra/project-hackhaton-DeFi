'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { CheckCircle2, Clock, ShieldCheck, Zap, ArrowRight, ExternalLink, AlertCircle, Wallet } from 'lucide-react';
import { PayLinkItem, markPayLinkAsPaid } from '@/lib/paylinkStore';
import { CONTRACT_ADDRESS, MULTISEND_ABI, ERC20_ABI } from '@/lib/constants';

interface PayLinkPaymentCardProps {
  payLink: PayLinkItem;
  userAddress: string | null;
  isConnected: boolean;
  onConnectWallet: () => void;
  signer: ethers.Signer | null;
  onPaymentSuccess?: (txHash: string) => void;
}

export const PayLinkPaymentCard: React.FC<PayLinkPaymentCardProps> = ({
  payLink,
  userAddress,
  isConnected,
  onConnectWallet,
  signer,
  onPaymentSuccess,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const isPaid = payLink.status === 'PAID';

  const handlePay = async () => {
    if (!isConnected || !signer) {
      onConnectWallet();
      return;
    }

    if (isPaid) {
      alert('This PayLink is already settled!');
      return;
    }

    setIsProcessing(true);
    setStatusMsg('Broadcasting transaction to BOT Chain...');

    try {
      let txHash = '';
      if (payLink.isNative) {
        // Send Native BOT token directly to Payee
        const weiAmount = ethers.parseEther(payLink.amount);
        const tx = await signer.sendTransaction({
          to: payLink.payeeAddress,
          value: weiAmount,
        });

        setStatusMsg(`Transaction sent: ${tx.hash.substring(0, 14)}... Confirming...`);
        const receipt = await tx.wait();
        txHash = receipt ? receipt.hash : tx.hash;
      } else {
        // ERC20 Transfer to Payee
        if (!payLink.tokenAddress || !ethers.isAddress(payLink.tokenAddress)) {
          throw new Error('Invalid ERC20 token contract address.');
        }
        const tokenContract = new ethers.Contract(payLink.tokenAddress, ERC20_ABI, signer);
        const decimals = await tokenContract.decimals();
        const rawAmount = ethers.parseUnits(payLink.amount, decimals);

        const tx = await tokenContract.transfer(payLink.payeeAddress, rawAmount);
        setStatusMsg(`ERC20 transfer sent: ${tx.hash.substring(0, 14)}... Confirming...`);
        const receipt = await tx.wait();
        txHash = receipt ? receipt.hash : tx.hash;
      }

      // Mark status as PAID in paylinkStore
      const updated = markPayLinkAsPaid(payLink.id, userAddress || '0xPayee', txHash);
      setStatusMsg(`Payment Confirmed! Tx: ${txHash.substring(0, 14)}...`);
      alert(`🎉 Payment of ${payLink.amount} ${payLink.tokenSymbol} sent to ${payLink.payeeAddress.substring(0, 8)}...`);

      if (onPaymentSuccess) onPaymentSuccess(txHash);
    } catch (err: any) {
      console.error('Payment Error:', err);
      setStatusMsg(`Payment error: ${err.reason || err.message}`);
      alert(`Payment Failed: ${err.reason || err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto my-8 p-6 sm:p-8 bg-[#09090B] text-white border border-[#27272A] rounded-3xl shadow-2xl space-y-6 font-sans text-left">
      {/* HEADER STATUS BADGE */}
      <div className="flex items-center justify-between border-b border-[#27272A] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-bold text-sm shadow-xs">
            ⚡
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white tracking-tight">BOTFlow PayLink</h2>
            <p className="text-xs font-mono text-neutral-400">1-Click Web3 Settlement Request</p>
          </div>
        </div>

        {isPaid ? (
          <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>PAID & SETTLED</span>
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full bg-amber-950 border border-amber-800 text-amber-400 font-mono text-xs font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            <span>PAYMENT REQUESTED</span>
          </span>
        )}
      </div>

      {/* BILL DETAILS CONTAINER */}
      <div className="p-5 rounded-2xl bg-[#121215] border border-[#27272A] space-y-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider block mb-1">
            BILL PURPOSE / NOTE
          </span>
          <h3 className="text-xl font-bold text-white leading-snug">{payLink.title}</h3>
        </div>

        <div className="pt-3 border-t border-[#27272A] flex justify-between items-baseline">
          <span className="text-xs font-mono text-neutral-400">Requested Amount:</span>
          <span className="text-2xl font-mono font-black text-white">
            {payLink.amount} <span className="text-sm font-bold text-neutral-400">{payLink.tokenSymbol}</span>
          </span>
        </div>

        <div className="pt-3 border-t border-[#27272A] space-y-2 text-xs font-mono">
          <div className="flex justify-between items-center text-neutral-400">
            <span>Payee Address:</span>
            <span className="text-white font-bold truncate max-w-[220px]">
              {payLink.payeeAddress}
            </span>
          </div>

          <div className="flex justify-between items-center text-neutral-400">
            <span>Network:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>BOT Chain Testnet (Chain ID 968)</span>
            </span>
          </div>
        </div>
      </div>

      {/* PAID PROOF BANNER */}
      {isPaid ? (
        <div className="p-4 rounded-2xl bg-[#121215] border border-emerald-800/60 text-emerald-400 space-y-2 font-mono text-xs text-center">
          <div className="flex items-center justify-center gap-2 font-bold text-sm text-white">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Bill Settled Successfully</span>
          </div>
          <p className="text-[11px] text-neutral-400">
            Paid by: <strong className="text-white">{payLink.paidBy}</strong>
          </p>
          {payLink.paidTxHash && (
            <a
              href={`https://scan.bohr.life/tx/${payLink.paidTxHash}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 underline hover:text-white font-bold pt-1"
            >
              <span>View On Explorer</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      ) : (
        /* PAYMENT ACTION AREA */
        <div className="space-y-4">
          {statusMsg && (
            <div className="p-3 rounded-xl bg-[#121215] border border-[#27272A] text-xs font-mono text-center text-neutral-300">
              {statusMsg}
            </div>
          )}

          {!isConnected ? (
            <button
              onClick={onConnectWallet}
              className="w-full py-3.5 rounded-xl bg-white text-black font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all cursor-pointer shadow-md"
            >
              <Wallet className="w-4 h-4 text-black" />
              <span>Connect Wallet to Pay</span>
            </button>
          ) : (
            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-white text-black font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all cursor-pointer disabled:opacity-50 shadow-md"
            >
              <Zap className="w-4 h-4 text-black fill-black" />
              <span>{isProcessing ? 'Processing Payment...' : `Execute 1-Click Pay (${payLink.amount} ${payLink.tokenSymbol})`}</span>
            </button>
          )}

          <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-neutral-500">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
            <span>100% Direct On-Chain Settlement</span>
          </div>
        </div>
      )}
    </div>
  );
};
