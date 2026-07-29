'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { CheckCircle2, Clock, ShieldCheck, Zap, ArrowRight, ExternalLink, AlertCircle } from 'lucide-react';
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
      alert('Tagihan ini sudah lunas!');
      return;
    }

    setIsProcessing(true);
    setStatusMsg('Mempersiapkan transaksi di BOT Chain...');

    try {
      let txHash = '';
      if (payLink.isNative) {
        // Send Native BOT token directly to Payee
        const weiAmount = ethers.parseEther(payLink.amount);
        const tx = await signer.sendTransaction({
          to: payLink.payeeAddress,
          value: weiAmount,
        });

        setStatusMsg(`Transaksi terkirim: ${tx.hash.substring(0, 14)}... Menunggu konfirmasi...`);
        const receipt = await tx.wait();
        txHash = receipt ? receipt.hash : tx.hash;
      } else {
        // ERC20 Transfer to Payee
        if (!payLink.tokenAddress || !ethers.isAddress(payLink.tokenAddress)) {
          throw new Error('Alamat token ERC20 tidak valid.');
        }
        const tokenContract = new ethers.Contract(payLink.tokenAddress, ERC20_ABI, signer);
        const decimals = await tokenContract.decimals();
        const rawAmount = ethers.parseUnits(payLink.amount, decimals);

        const tx = await tokenContract.transfer(payLink.payeeAddress, rawAmount);
        setStatusMsg(`Transfer ERC20 terkirim: ${tx.hash.substring(0, 14)}... Menunggu konfirmasi...`);
        const receipt = await tx.wait();
        txHash = receipt ? receipt.hash : tx.hash;
      }

      // Mark status as PAID in paylinkStore
      const updated = markPayLinkAsPaid(payLink.id, userAddress || '0xPayee', txHash);
      setStatusMsg(`🎉 Pembayaran Sukses! Tx: ${txHash.substring(0, 14)}...`);
      alert(`🎉 Pembayaran berhasil sebesar ${payLink.amount} ${payLink.tokenSymbol} ke ${payLink.payeeAddress.substring(0, 8)}...`);

      if (onPaymentSuccess) onPaymentSuccess(txHash);
    } catch (err: any) {
      console.error('Payment Error:', err);
      setStatusMsg(`Gagal bayar: ${err.reason || err.message}`);
      alert(`Pembayaran Gagal: ${err.reason || err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto my-8 p-6 sm:p-8 bg-[#09090B] border border-[#27272A] rounded-3xl shadow-2xl space-y-6">
      {/* Header Status Badge */}
      <div className="flex items-center justify-between border-b border-[#27272A] pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">BOTFlow PayLink</h2>
            <p className="text-xs text-neutral-400">Tagihan Pembayaran Web3 1-Click</p>
          </div>
        </div>

        {isPaid ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>LUNAS</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Clock className="w-4 h-4 animate-pulse" />
            <span>PENDING</span>
          </div>
        )}
      </div>

      {/* Bill Card Details */}
      <div className="p-5 rounded-2xl bg-[#121215] border border-[#27272A] space-y-4">
        <div>
          <span className="text-xs text-neutral-400 block mb-1">Catatan Tagihan</span>
          <h3 className="text-xl font-extrabold text-white tracking-tight">{payLink.title}</h3>
        </div>

        <div className="pt-2 border-t border-[#27272A] grid grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-neutral-400 block mb-0.5">Jumlah Tagihan</span>
            <span className="text-2xl font-black text-emerald-400">
              {payLink.amount} <span className="text-sm font-bold text-white">{payLink.tokenSymbol}</span>
            </span>
          </div>

          <div>
            <span className="text-xs text-neutral-400 block mb-0.5">Penerima Dana</span>
            <span className="font-mono text-xs text-neutral-300 font-semibold block truncate">
              {payLink.payeeAddress}
            </span>
          </div>
        </div>
      </div>

      {/* Execution Status / Msg */}
      {statusMsg && (
        <div className="p-3.5 rounded-xl bg-[#18181B] border border-[#27272A] text-xs text-neutral-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">{statusMsg}</span>
        </div>
      )}

      {/* Action Button */}
      {isPaid ? (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Tagihan Ini Telah Lunas!</span>
          </div>
          {payLink.paidTxHash && (
            <a
              href={`https://scan.bohr.life/tx/${payLink.paidTxHash}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-emerald-400 transition-colors"
            >
              <span>Lihat Bukti Transaksi di Explorer</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      ) : !isConnected ? (
        <button
          onClick={onConnectWallet}
          className="w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm rounded-2xl transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShieldCheck className="w-5 h-5" />
          <span>Connect Wallet untuk Bayar ({payLink.amount} {payLink.tokenSymbol})</span>
        </button>
      ) : (
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-extrabold text-sm rounded-2xl transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{isProcessing ? 'Memproses Pembayaran...' : `Confirm & Bayar ${payLink.amount} ${payLink.tokenSymbol}`}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
