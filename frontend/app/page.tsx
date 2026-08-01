'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Navbar, DotLottiePlayer } from '../components/common';
import {
  LandingHero,
  ProductShowcaseSection,
  ComparisonSection,
  FeaturesShowcase,
  WorkflowSection,
  FAQSection,
  FaqAccordionSection,
  CtaBanner,
} from '../components/landing';
import { WorkspaceDashboard } from '../components/workspace';
import { GeminiChatModal } from '../components/ai';
import {
  CreatePayLinkModal,
  PayLinkPaymentCard,
  SplitBillTracker,
  PaymentNotificationToast,
} from '../components/splitbill';
import { getPayLinkById, PayLinkItem } from '../lib/paylinkStore';
import {
  CONTRACT_ADDRESS,
  BOTCHAIN_TESTNET_PARAMS,
  MULTISEND_ABI,
  ERC20_ABI,
} from '@/lib/constants';

interface RecipientRow {
  id: string;
  address: string;
  amount: string;
}

const CHATBOT_LOTTIE_URL = 'https://lottie.host/889b0dba-90ad-4450-8617-1affbcb85fde/9LxEKBVZag.lottie';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'landing' | 'app' | 'splitbill'>('landing');
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);
  const [isCreatePayLinkOpen, setIsCreatePayLinkOpen] = useState<boolean>(false);
  const [activePayLink, setActivePayLink] = useState<PayLinkItem | null>(null);

  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Live Wallet & Token Data
  const [userBotBalance, setUserBotBalance] = useState<string>('0.0000');
  const [erc20Balance, setErc20Balance] = useState<string>('0.0000');
  const [erc20Symbol, setErc20Symbol] = useState<string>('TOKEN');

  const [isNativeMode, setIsNativeMode] = useState<boolean>(true);
  const [tokenAddress, setTokenAddress] = useState<string>('');

  // Start with 1 recipient row
  const [recipients, setRecipients] = useState<RecipientRow[]>([
    { id: '1', address: '', amount: '' }
  ]);

  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    checkWalletConnected();

    // Check for PayLink query param in URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const payId = params.get('payId');
      if (payId) {
        const found = getPayLinkById(payId);
        if (found) {
          setActivePayLink(found);
          setActiveTab('splitbill');
        }
      }
    }
  }, []);

  useEffect(() => {
    if (isConnected && provider && userAddress) {
      fetchUserNativeBalance();
    }
  }, [isConnected, provider, userAddress]);

  useEffect(() => {
    if (isConnected && signer && !isNativeMode && ethers.isAddress(tokenAddress)) {
      fetchERC20Details(tokenAddress);
    }
  }, [isConnected, signer, isNativeMode, tokenAddress]);

  const handleSwitchTab = (tab: 'landing' | 'app' | 'splitbill') => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const fetchUserNativeBalance = async () => {
    if (!provider || !userAddress) return;
    try {
      const bal = await provider.getBalance(userAddress);
      const formatted = parseFloat(ethers.formatEther(bal)).toFixed(4);
      setUserBotBalance(formatted);
    } catch (err) {
      console.error('Error fetching native balance:', err);
    }
  };

  const fetchERC20Details = async (tokenAddr: string) => {
    if (!signer || !userAddress) return;
    try {
      const contract = new ethers.Contract(tokenAddr, ERC20_ABI, signer);
      const [bal, dec, sym] = await Promise.all([
        contract.balanceOf(userAddress),
        contract.decimals(),
        contract.symbol(),
      ]);
      const formatted = parseFloat(ethers.formatUnits(bal, dec)).toFixed(4);
      setErc20Balance(formatted);
      setErc20Symbol(sym);
    } catch (err) {
      console.error('Error fetching ERC20 details:', err);
      setErc20Balance('0.0000');
      setErc20Symbol('TOKEN');
    }
  };

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      alert('MetaMask extension is not installed!');
      return;
    }

    try {
      const eth = (window as any).ethereum;
      const browserProvider = new ethers.BrowserProvider(eth);
      await browserProvider.send('eth_requestAccounts', []);
      const userSigner = await browserProvider.getSigner();
      const addr = await userSigner.getAddress();

      const network = await browserProvider.getNetwork();
      if (Number(network.chainId) !== 968) {
        try {
          await eth.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: BOTCHAIN_TESTNET_PARAMS.chainId }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            await eth.request({
              method: 'wallet_addEthereumChain',
              params: [BOTCHAIN_TESTNET_PARAMS],
            });
          }
        }
      }

      setProvider(browserProvider);
      setSigner(userSigner);
      setUserAddress(addr);
      setIsConnected(true);

      const bal = await browserProvider.getBalance(addr);
      setUserBotBalance(parseFloat(ethers.formatEther(bal)).toFixed(4));
    } catch (err: any) {
      console.error(err);
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setUserAddress(null);
    setIsConnected(false);
    setUserBotBalance('0.0000');
    setErc20Balance('0.0000');
  };

  const checkWalletConnected = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      const eth = (window as any).ethereum;
      const accounts = await eth.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        connectWallet();
      }
    }
  };

  const handleAddRecipient = () => {
    if (recipients.length >= 3) return;
    setRecipients((prev) => [
      ...prev,
      { id: Math.random().toString(36).substring(2), address: '', amount: '' },
    ]);
  };

  const handleRemoveRecipient = (id: string) => {
    if (recipients.length <= 1) {
      setRecipients([{ id: '1', address: '', amount: '' }]);
      return;
    }
    setRecipients((prev) => prev.filter((r) => r.id !== id));
  };

  const handleUpdateRecipient = (id: string, field: 'address' | 'amount', value: string) => {
    setRecipients((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleApplyPreset = (type: 'hackathon' | 'payroll' | 'airdrop') => {
    if (type === 'hackathon') {
      setRecipients([
        { id: '1', address: '0x3248fd7fb3f66523d79d5f1c41f641db49b60fa5', amount: '1' },
        { id: '2', address: '0x1111111111111111111111111111111111111111', amount: '0.5' },
        { id: '3', address: '0x2222222222222222222222222222222222222222', amount: '0.2' },
      ]);
    } else if (type === 'payroll') {
      setRecipients([
        { id: '1', address: '0x3248fd7fb3f66523d79d5f1c41f641db49b60fa5', amount: '2' },
        { id: '2', address: '0x7777777777777777777777777777777777777777', amount: '1' },
      ]);
    } else if (type === 'airdrop') {
      setRecipients([
        { id: '1', address: '0x3248fd7fb3f66523d79d5f1c41f641db49b60fa5', amount: '0.1' },
        { id: '2', address: '0xAAAA00000000000000000000000000000000AAAA', amount: '0.1' },
      ]);
    }
  };

  const activeRecipients = recipients.filter(
    (r) => r.address.trim() !== '' || r.amount.trim() !== ''
  );

  const totalAmount = activeRecipients.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);

  const handleExecute = async () => {
    if (!signer) {
      await connectWallet();
      return;
    }

    if (activeRecipients.length === 0) {
      alert('Please fill at least 1 recipient address and amount.');
      return;
    }

    const invalidRecipient = activeRecipients.find(
      (r) => !ethers.isAddress(r.address.trim()) || (parseFloat(r.amount) || 0) <= 0
    );

    if (invalidRecipient) {
      alert('Please make sure all active recipient addresses are valid 0x... format and amounts are greater than 0.');
      return;
    }

    const uniqueAddrs = new Set(activeRecipients.map((r) => r.address.toLowerCase().trim()));
    if (uniqueAddrs.size !== activeRecipients.length) {
      alert('Duplicate recipient addresses detected! Each recipient must be unique.');
      return;
    }

    setIsExecuting(true);
    setStatusMsg('Broadcasting transaction to BOT Chain...');
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, MULTISEND_ABI, signer);
      const addresses = activeRecipients.map((r) => r.address.trim());
      const amounts = activeRecipients.map((r) => (parseFloat(r.amount) || 0).toString());

      if (isNativeMode) {
        const weiAmounts = amounts.map((a) => ethers.parseEther(a));
        const totalWei = ethers.parseEther(totalAmount.toString());

        let estimatedGas: bigint;
        try {
          estimatedGas = await contract.multiSendNative.estimateGas(addresses, weiAmounts, { value: totalWei });
          estimatedGas = (estimatedGas * BigInt(120)) / BigInt(100);
        } catch {
          estimatedGas = BigInt(200000);
        }

        const tx = await contract.multiSendNative(addresses, weiAmounts, {
          value: totalWei,
          gasLimit: estimatedGas,
        });
        setStatusMsg(`Transaction sent: ${tx.hash.substring(0, 14)}... Confirming...`);

        const receipt = await tx.wait();
        setStatusMsg(`Distribution Confirmed! Tx: ${receipt.hash.substring(0, 14)}...`);
        alert(`🎉 Success! Distributed ${totalAmount} BOT to ${activeRecipients.length} recipients in 1 transaction!`);
        fetchUserNativeBalance();
      } else {
        if (!ethers.isAddress(tokenAddress)) {
          alert('Please enter a valid ERC20 token contract address.');
          setIsExecuting(false);
          setStatusMsg(null);
          return;
        }

        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
        const decimals = await tokenContract.decimals();
        const rawAmounts = amounts.map((a) => ethers.parseUnits(a, decimals));

        let estimatedGas: bigint;
        try {
          estimatedGas = await contract.multiSendERC20.estimateGas(tokenAddress, addresses, rawAmounts);
          estimatedGas = (estimatedGas * BigInt(120)) / BigInt(100);
        } catch {
          estimatedGas = BigInt(250000);
        }

        const tx = await contract.multiSendERC20(tokenAddress, addresses, rawAmounts, {
          gasLimit: estimatedGas,
        });
        setStatusMsg(`Transaction sent: ${tx.hash.substring(0, 14)}... Confirming...`);

        const receipt = await tx.wait();
        setStatusMsg(`ERC20 Distribution Confirmed!`);
        alert(`🎉 Success! Distributed ERC20 Tokens!`);
        fetchERC20Details(tokenAddress);
      }
    } catch (err: any) {
      console.error(err);
      setStatusMsg(`Transaction Error: ${err.reason || err.message}`);
      alert(`Transaction Failed: ${err.reason || err.message}`);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleApprove = async () => {
    if (!signer || !ethers.isAddress(tokenAddress)) return;
    setIsApproving(true);
    try {
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
      const decimals = await tokenContract.decimals();
      const totalRaw = ethers.parseUnits(totalAmount.toString(), decimals);

      setStatusMsg('Approving ERC20 allowance...');
      const tx = await tokenContract.approve(CONTRACT_ADDRESS, totalRaw, { gasLimit: BigInt(100000) });
      await tx.wait();

      setStatusMsg('ERC20 Token allowance approved!');
      alert('ERC20 Token allowance approved!');
    } catch (err: any) {
      console.error(err);
      setStatusMsg(`Approve error: ${err.message}`);
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#171717]">
      <Navbar
        userAddress={userAddress}
        isConnected={isConnected}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
        activeTab={activeTab}
        setActiveTab={handleSwitchTab}
      />

      <main className="w-full">
        {activeTab === 'landing' ? (
          /* FULL WIDTH DISTINCT SECTIONS LANDING PAGE WITH PRODUCT SHOWCASE SECTION */
          <div className="w-full">
            <LandingHero onOpenApp={() => handleSwitchTab('app')} />
            <ProductShowcaseSection onOpenApp={() => handleSwitchTab('app')} />
            <ComparisonSection />
            <FeaturesShowcase onOpenApp={() => handleSwitchTab('app')} />
            <WorkflowSection onLaunchApp={() => handleSwitchTab('app')} />
            <FAQSection />
            <FaqAccordionSection />
            <CtaBanner onLaunchApp={() => handleSwitchTab('app')} />
          </div>
        ) : activeTab === 'splitbill' ? (
          /* SPLIT BILL & PAYLINK SUITE */
          <div className="w-full bg-white min-h-[calc(100vh-4rem)] py-8">
            {activePayLink ? (
              <PayLinkPaymentCard
                payLink={activePayLink}
                userAddress={userAddress}
                isConnected={isConnected}
                onConnectWallet={connectWallet}
                signer={signer}
                onPaymentSuccess={() => {
                  fetchUserNativeBalance();
                  if (activePayLink) {
                    setActivePayLink({ ...activePayLink, status: 'PAID' });
                  }
                }}
              />
            ) : (
              <SplitBillTracker
                userAddress={userAddress}
                onOpenCreateModal={() => setIsCreatePayLinkOpen(true)}
              />
            )}
          </div>
        ) : (
          /* ULTRA-MINIMALIST DAPP WORKSPACE VIEW WITH DYNAMIC SAVE/LOAD ROSTER SUPPORT */
          <WorkspaceDashboard
            isConnected={isConnected}
            userAddress={userAddress}
            userBotBalance={userBotBalance}
            erc20Balance={erc20Balance}
            erc20Symbol={erc20Symbol}
            isNativeMode={isNativeMode}
            setIsNativeMode={setIsNativeMode}
            tokenAddress={tokenAddress}
            setTokenAddress={setTokenAddress}
            recipients={recipients}
            onSetRecipients={setRecipients}
            onAddRecipient={handleAddRecipient}
            onRemoveRecipient={handleRemoveRecipient}
            onUpdateRecipient={handleUpdateRecipient}
            onApplyPreset={handleApplyPreset}
            totalAmount={totalAmount}
            isExecuting={isExecuting}
            isApproving={isApproving}
            statusMsg={statusMsg}
            onExecute={handleExecute}
            onApprove={handleApprove}
            onConnectWallet={connectWallet}
            onDisconnectWallet={disconnectWallet}
          />
        )}
      </main>

      {/* CREATE PAYLINK MODAL */}
      <CreatePayLinkModal
        isOpen={isCreatePayLinkOpen}
        onClose={() => setIsCreatePayLinkOpen(false)}
        userAddress={userAddress}
        onLinkCreated={(link) => {
          setActivePayLink(null);
        }}
      />

      {/* REAL-TIME IN-APP TOAST NOTIFICATION */}
      <PaymentNotificationToast />

      {/* ULTRA-CLEAN ROUNDED RECTANGLE FLOATING CARD FOR MONKEY BOT */}
      <button
        onClick={() => setIsAiChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-12 pl-2 pr-4 rounded-2xl bg-[#09090B] text-white border border-[#27272A] shadow-2xl hover:shadow-3xl font-mono text-xs font-bold flex items-center gap-2.5 transition-all hover:scale-105 cursor-pointer"
      >
        <div className="w-8 h-8 rounded-xl bg-white overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
          <DotLottiePlayer src={CHATBOT_LOTTIE_URL} width="32px" height="32px" />
        </div>
        <span className="text-xs font-bold text-white">Monkey Bot</span>
      </button>

      {/* GEMINI RAG AI CHATBOT MODAL */}
      <GeminiChatModal isOpen={isAiChatOpen} onClose={() => setIsAiChatOpen(false)} />

      <footer className="mt-20 py-6 border-t border-black/[0.08] text-center text-xs text-neutral-400">
        Built for <strong>BOT Chain Build Week Hackathon</strong>
      </footer>
    </div>
  );
}
