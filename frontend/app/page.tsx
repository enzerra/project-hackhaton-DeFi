'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CheckCircle2, AlertCircle, ExternalLink, X } from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { LandingHero } from '@/components/landing/LandingHero';
import { ProductShowcaseSection } from '@/components/landing/ProductShowcaseSection';
import { ComparisonSection } from '@/components/landing/ComparisonSection';
import { FeaturesShowcase } from '@/components/landing/FeaturesShowcase';
import { WorkflowSection } from '@/components/landing/WorkflowSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { FaqAccordionSection } from '@/components/landing/FaqAccordionSection';
import { CtaBanner } from '@/components/landing/CtaBanner';

import { WorkspaceDashboard } from '@/components/workspace/WorkspaceDashboard';
import { SplitBillTracker, PayLinkPaymentCard, PaymentNotificationToast, CreatePayLinkModal } from '@/components/splitbill';
import { PayLinkItem, getPayLinkById } from '@/lib/paylinkStore';
import { GeminiChatModal } from '@/components/ai/GeminiChatModal';
import { CONTRACT_ADDRESS, MULTISEND_ABI, ERC20_ABI, BOTCHAIN_TESTNET_PARAMS } from '@/lib/constants';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'landing' | 'app' | 'splitbill'>('landing');
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userBotBalance, setUserBotBalance] = useState<string>('0.0000');

  // Workspace MultiSend state
  const [isNativeMode, setIsNativeMode] = useState(true);
  const [tokenAddress, setTokenAddress] = useState('');
  const [erc20Balance, setErc20Balance] = useState('0.0000');
  const [erc20Symbol, setErc20Symbol] = useState('TOKEN');

  const [recipients, setRecipients] = useState<{ id: string; address: string; amount: string }[]>([
    { id: '1', address: '', amount: '' },
  ]);

  const [isExecuting, setIsExecuting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // SplitBill state
  const [isCreatePayLinkOpen, setIsCreatePayLinkOpen] = useState(false);
  const [activePayLink, setActivePayLink] = useState<PayLinkItem | null>(null);

  // Gemini Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);

  // CUSTOM EXECUTIVE FLOATING TOAST SYSTEM
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    title: string;
    message: string;
    txHash?: string;
  } | null>(null);

  const showToast = (type: 'success' | 'error', title: string, message: string, txHash?: string) => {
    setToast({ type, title, message, txHash });
    setTimeout(() => {
      setToast((current) => (current?.title === title ? null : current));
    }, 6000);
  };

  useEffect(() => {
    checkWalletConnected();

    // Check query param for payId
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const payId = searchParams.get('payId');
      if (payId) {
        const item = getPayLinkById(payId);
        if (item) {
          setActivePayLink(item);
          setActiveTab('splitbill');
        }
      }
    }
  }, []);

  const handleSwitchTab = (tab: 'landing' | 'app' | 'splitbill') => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const fetchUserNativeBalance = async () => {
    if (provider && userAddress) {
      try {
        const bal = await provider.getBalance(userAddress);
        setUserBotBalance(parseFloat(ethers.formatEther(bal)).toFixed(4));
      } catch (err) {
        console.error('Error fetching balance:', err);
      }
    }
  };

  const fetchERC20Details = async (contractAddr: string) => {
    if (!provider || !userAddress || !ethers.isAddress(contractAddr)) {
      setErc20Balance('0.0000');
      setErc20Symbol('TOKEN');
      return;
    }
    try {
      const tokenContract = new ethers.Contract(contractAddr, ERC20_ABI, provider);
      const [bal, dec, sym] = await Promise.all([
        tokenContract.balanceOf(userAddress),
        tokenContract.decimals(),
        tokenContract.symbol(),
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
      showToast('error', 'MetaMask Required', 'MetaMask extension is not installed! Please install MetaMask to use BOTFlow Protocol.');
      return;
    }

    try {
      const eth = (window as any).ethereum;
      
      let accounts: string[] = [];
      try {
        accounts = await eth.request({ method: 'eth_requestAccounts' });
      } catch (reqErr: any) {
        if (reqErr.code === 4001) {
          showToast('error', 'Connection Rejected', 'Wallet connection request was rejected.');
          return;
        } else if (reqErr.code === -32002) {
          showToast('error', 'Connection Pending', 'MetaMask connection request is already pending. Please check your extension popup.');
          return;
        }
        console.warn('eth_requestAccounts error:', reqErr);
      }

      if (!accounts || accounts.length === 0) {
        return;
      }

      const browserProvider = new ethers.BrowserProvider(eth);
      const userSigner = await browserProvider.getSigner();
      const addr = accounts[0];

      const network = await browserProvider.getNetwork();
      if (Number(network.chainId) !== 968) {
        try {
          await eth.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: BOTCHAIN_TESTNET_PARAMS.chainId }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            try {
              await eth.request({
                method: 'wallet_addEthereumChain',
                params: [BOTCHAIN_TESTNET_PARAMS],
              });
            } catch (addErr) {
              console.warn('Failed to add BOT Chain testnet:', addErr);
            }
          }
        }
      }

      setProvider(browserProvider);
      setSigner(userSigner);
      setUserAddress(addr);
      setIsConnected(true);

      const bal = await browserProvider.getBalance(addr);
      setUserBotBalance(parseFloat(ethers.formatEther(bal)).toFixed(4));

      showToast('success', 'Wallet Connected', `Connected to ${addr.substring(0, 6)}...${addr.substring(38)}`);
    } catch (err: any) {
      console.error('Wallet connection error caught:', err);
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setUserAddress(null);
    setIsConnected(false);
    setUserBotBalance('0.0000');
    setErc20Balance('0.0000');
    showToast('success', 'Disconnected', 'MetaMask wallet disconnected.');
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
    if (recipients.length >= 50) return;
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
    showToast('success', 'Preset Applied', `Loaded ${type.toUpperCase()} recipient preset.`);
  };

  const handleImportCsv = (fileRecipients: { address: string; amount: string }[]) => {
    const formatted = fileRecipients.map((r, idx) => ({
      id: String(idx + 1),
      address: r.address,
      amount: r.amount,
    }));
    setRecipients(formatted);
    showToast('success', 'CSV Imported', `Imported ${formatted.length} recipient addresses from CSV file.`);
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
      showToast('error', 'Missing Recipients', 'Please fill at least 1 recipient address and amount.');
      return;
    }

    const invalidRecipient = activeRecipients.find(
      (r) => !ethers.isAddress(r.address.trim()) || (parseFloat(r.amount) || 0) <= 0
    );

    if (invalidRecipient) {
      showToast('error', 'Invalid Input', 'Please make sure all active recipient addresses are valid 0x... format and amounts are greater than 0.');
      return;
    }

    const uniqueAddrs = new Set(activeRecipients.map((r) => r.address.toLowerCase().trim()));
    if (uniqueAddrs.size !== activeRecipients.length) {
      showToast('error', 'Duplicate Address', 'Duplicate recipient addresses detected! Each recipient must be unique.');
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
        const txHash = receipt ? receipt.hash : tx.hash;
        setStatusMsg(`Distribution Confirmed! Tx: ${txHash.substring(0, 14)}...`);
        
        showToast(
          'success',
          'Distribution Confirmed!',
          `Successfully distributed ${totalAmount} BOT to ${activeRecipients.length} recipients in 1 transaction payload.`,
          txHash
        );
        fetchUserNativeBalance();
      } else {
        if (!ethers.isAddress(tokenAddress)) {
          showToast('error', 'Invalid Token', 'Please enter a valid ERC20 token contract address.');
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
        const txHash = receipt ? receipt.hash : tx.hash;
        setStatusMsg(`ERC20 Distribution Confirmed!`);
        
        showToast(
          'success',
          'ERC20 Distribution Confirmed!',
          `Successfully distributed ${totalAmount} ${erc20Symbol} to ${activeRecipients.length} recipients in 1 transaction payload.`,
          txHash
        );
        fetchERC20Details(tokenAddress);
      }
    } catch (err: any) {
      console.error(err);
      const errReason = err.reason || err.message || 'Transaction execution failed.';
      setStatusMsg(`Transaction Error: ${errReason}`);
      showToast('error', 'Transaction Failed', errReason);
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
      const receipt = await tx.wait();
      const txHash = receipt ? receipt.hash : tx.hash;

      setStatusMsg('ERC20 Token allowance approved!');
      showToast('success', 'Allowance Approved', 'ERC20 Token allowance approved successfully.', txHash);
    } catch (err: any) {
      console.error(err);
      const errReason = err.reason || err.message || 'Approve failed.';
      setStatusMsg(`Approve Error: ${errReason}`);
      showToast('error', 'Approve Failed', errReason);
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#171717] font-sans">
      {/* CUSTOM FLOATING TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] sm:w-auto p-4 rounded-2xl bg-white border border-black/[0.08] text-[#171717] shadow-2xl animate-in fade-in slide-in-from-top-5 duration-300 font-sans text-left">
          <div className="flex items-start gap-3">
            {toast.type === 'success' ? (
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            ) : (
              <div className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-700 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
            )}
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717]">
                  {toast.title}
                </h4>
                <button onClick={() => setToast(null)} className="text-neutral-400 hover:text-black">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-neutral-600 font-medium leading-relaxed">{toast.message}</p>
              {toast.txHash && (
                <a
                  href={`https://scan.bohr.life/tx/${toast.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-black underline pt-1 hover:opacity-80"
                >
                  <span>View Explorer Proof</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

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
                  showToast('success', 'Bill Settled', 'Payment request paid successfully on BOT Chain.');
                }}
              />
            ) : (
              <SplitBillTracker
                userAddress={userAddress}
                onOpenCreateModal={() => setIsCreatePayLinkOpen(true)}
              />
            )}

            <CreatePayLinkModal
              isOpen={isCreatePayLinkOpen}
              onClose={() => setIsCreatePayLinkOpen(false)}
              userAddress={userAddress}
              onLinkCreated={() => {
                showToast('success', 'PayLink Created', 'New PayLink generated and saved.');
              }}
            />

            <PaymentNotificationToast />
          </div>
        ) : (
          /* DAPP WORKSPACE INTERFACE */
          <div className="w-full bg-white min-h-[calc(100vh-4rem)]">
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
              onImportCsv={handleImportCsv}
              totalAmount={totalAmount}
              isExecuting={isExecuting}
              isApproving={isApproving}
              statusMsg={statusMsg}
              onExecute={handleExecute}
              onApprove={handleApprove}
              onConnectWallet={connectWallet}
              onDisconnectWallet={disconnectWallet}
              fetchERC20Details={fetchERC20Details}
            />
          </div>
        )}
      </main>

      {/* GEMINI RAG AI ASSISTANT ("MONKEY BOT") MODAL */}
      <GeminiChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* FLOATING MONKEY BOT TRIGGER BUTTON */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-40 px-4 py-2.5 rounded-2xl bg-black text-white text-xs font-mono font-bold shadow-2xl flex items-center gap-2 hover:bg-neutral-800 transition-all cursor-pointer border border-white/20"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Monkey Bot</span>
      </button>
    </div>
  );
}
