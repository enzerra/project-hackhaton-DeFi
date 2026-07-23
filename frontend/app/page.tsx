'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Navbar } from '../components/Navbar';
import { Banner } from '../components/Banner';
import { AIAssistant } from '../components/AIAssistant';
import { DistributionForm, RecipientRow } from '../components/DistributionForm';
import { VerificationChecklist } from '../components/VerificationChecklist';
import { ExecutionSummary } from '../components/ExecutionSummary';
import { ActivityLog, LogEntry } from '../components/ActivityLog';
import {
  CONTRACT_ADDRESS,
  BOTCHAIN_TESTNET_PARAMS,
  MULTISEND_ABI,
  ERC20_ABI,
} from '../lib/constants';

export default function Home() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const [isNativeMode, setIsNativeMode] = useState<boolean>(true);
  const [tokenAddress, setTokenAddress] = useState<string>('');
  const [promptText, setPromptText] = useState<string>('');

  const [recipients, setRecipients] = useState<RecipientRow[]>([
    { id: '1', address: '0x1111111111111111111111111111111111111111', amount: '50' },
    { id: '2', address: '0x2222222222222222222222222222222222222222', amount: '30' },
    { id: '3', address: '0x3333333333333333333333333333333333333333', amount: '20' },
  ]);

  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    checkWalletConnected();
  }, []);

  const addLog = (message: string, type: 'info' | 'success' | 'error' = 'info', txHash?: string) => {
    const entry: LogEntry = {
      id: Math.random().toString(36).substring(2),
      time: new Date().toLocaleTimeString(),
      message,
      txHash,
      type,
    };
    setLogs((prev) => [entry, ...prev]);
  };

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      alert('MetaMask extension is not installed! Please install MetaMask to use BOTChain.');
      return;
    }

    try {
      const eth = (window as any).ethereum;
      const browserProvider = new ethers.BrowserProvider(eth);
      await browserProvider.send('eth_requestAccounts', []);
      const userSigner = await browserProvider.getSigner();
      const addr = await userSigner.getAddress();

      // Switch to BOT Chain Testnet if needed
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
      addLog(`Connected wallet: ${addr}`, 'success');
    } catch (err: any) {
      console.error(err);
      addLog(`Wallet connection error: ${err.message}`, 'error');
    }
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
    if (recipients.length >= 3) {
      alert('Maximum 3 recipients allowed per atomic transaction.');
      return;
    }
    setRecipients((prev) => [
      ...prev,
      { id: Math.random().toString(36).substring(2), address: '', amount: '' },
    ]);
  };

  const handleRemoveRecipient = (id: string) => {
    setRecipients((prev) => prev.filter((r) => r.id !== id));
  };

  const handleUpdateRecipient = (id: string, field: 'address' | 'amount', value: string) => {
    setRecipients((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleGenerateAI = () => {
    if (!promptText.trim()) {
      alert('Please enter a prompt or pick a template below!');
      return;
    }
    const addrs = promptText.match(/0x[a-fA-F0-9]{40}/g) || [];
    const nums = promptText.match(/\b\d+(\.\d+)?\b/g) || [];

    if (addrs.length > 0) {
      const newRows: RecipientRow[] = addrs.slice(0, 3).map((a, idx) => ({
        id: Math.random().toString(36).substring(2),
        address: a,
        amount: nums[idx] || '10',
      }));
      setRecipients(newRows);
      addLog(`AI Assistant parsed ${newRows.length} addresses from prompt`, 'info');
    } else {
      alert('AI Tip: Include 0x wallet addresses in your prompt or use template buttons!');
    }
  };

  const handleApplyTemplate = (type: 'hackathon' | 'payroll' | 'airdrop') => {
    if (type === 'hackathon') {
      setPromptText('Hackathon Prize Distribution: 50 BOT to Winner #1, 30 BOT to Winner #2, 20 BOT to Winner #3.');
      setRecipients([
        { id: '1', address: '0x1111111111111111111111111111111111111111', amount: '50' },
        { id: '2', address: '0x2222222222222222222222222222222222222222', amount: '30' },
        { id: '3', address: '0x3333333333333333333333333333333333333333', amount: '20' },
      ]);
    } else if (type === 'payroll') {
      setPromptText('DAO Monthly Payroll: Lead Dev 100 BOT, Moderator 50 BOT, Designer 50 BOT.');
      setRecipients([
        { id: '1', address: '0x7777777777777777777777777777777777777777', amount: '100' },
        { id: '2', address: '0x8888888888888888888888888888888888888888', amount: '50' },
        { id: '3', address: '0x9999999999999999999999999999999999999999', amount: '50' },
      ]);
    } else if (type === 'airdrop') {
      setPromptText('Community Reward Airdrop: Equal 25 BOT to 3 active contributors.');
      setRecipients([
        { id: '1', address: '0xAAAA00000000000000000000000000000000AAAA', amount: '25' },
        { id: '2', address: '0xBBBB00000000000000000000000000000000BBBB', amount: '25' },
        { id: '3', address: '0xCCCC00000000000000000000000000000000CCCC', amount: '25' },
      ]);
    }
  };

  const totalAmount = recipients.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);

  // Verification calculations
  const checks = {
    recipientsCount: recipients.length > 0 && recipients.length <= 3,
    noDuplicates:
      recipients.length > 0 &&
      new Set(recipients.map((r) => r.address.toLowerCase())).size === recipients.length,
    noZeroAddress:
      recipients.length > 0 &&
      !recipients.some((r) => r.address === '0x0000000000000000000000000000000000000000' || !r.address),
    validAmounts: recipients.length > 0 && !recipients.some((r) => (parseFloat(r.amount) || 0) <= 0),
  };

  const handleExecute = async () => {
    if (!signer) {
      await connectWallet();
      return;
    }

    if (!Object.values(checks).every(Boolean)) {
      alert('Please resolve all safety verification items before executing!');
      return;
    }

    setIsExecuting(true);
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, MULTISEND_ABI, signer);
      const addresses = recipients.map((r) => r.address.trim());
      const amounts = recipients.map((r) => (parseFloat(r.amount) || 0).toString());

      if (isNativeMode) {
        const weiAmounts = amounts.map((a) => ethers.parseEther(a));
        const totalWei = ethers.parseEther(totalAmount.toString());

        addLog(`Initiating native BOT multi-send (${totalAmount} BOT)...`, 'info');
        const tx = await contract.multiSendNative(addresses, weiAmounts, { value: totalWei });
        addLog(`Tx broadcasted: ${tx.hash.substring(0, 10)}...`, 'info', tx.hash);

        const receipt = await tx.wait();
        addLog(`🎉 Atomic Native BOT Distribution Confirmed!`, 'success', receipt.hash);
        alert(`🎉 Success! Distributed ${totalAmount} BOT to ${recipients.length} recipients in 1 transaction!`);
      } else {
        if (!ethers.isAddress(tokenAddress)) {
          alert('Please enter a valid ERC20 token address.');
          setIsExecuting(false);
          return;
        }

        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
        const decimals = await tokenContract.decimals();
        const rawAmounts = amounts.map((a) => ethers.parseUnits(a, decimals));

        addLog(`Initiating ERC20 multi-send...`, 'info');
        const tx = await contract.multiSendERC20(tokenAddress, addresses, rawAmounts);
        addLog(`Tx broadcasted: ${tx.hash.substring(0, 10)}...`, 'info', tx.hash);

        const receipt = await tx.wait();
        addLog(`🎉 Atomic ERC20 Distribution Confirmed!`, 'success', receipt.hash);
        alert(`🎉 Success! Distributed ERC20 Tokens!`);
      }
    } catch (err: any) {
      console.error(err);
      addLog(`❌ Transaction Error: ${err.reason || err.message}`, 'error');
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

      addLog(`Approving ERC20 allowance for MultiSend contract...`, 'info');
      const tx = await tokenContract.approve(CONTRACT_ADDRESS, totalRaw);
      await tx.wait();

      addLog(`✅ Allowance granted to MultiSend contract`, 'success');
      alert('✅ ERC20 Token allowance approved!');
    } catch (err: any) {
      console.error(err);
      addLog(`❌ Approval error: ${err.message}`, 'error');
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <Navbar userAddress={userAddress} isConnected={isConnected} onConnect={connectWallet} />

      <main className="max-w-7xl mx-auto px-6 pt-8">
        <Banner />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <AIAssistant
              promptText={promptText}
              setPromptText={setPromptText}
              onGenerate={handleGenerateAI}
              onApplyTemplate={handleApplyTemplate}
            />

            <DistributionForm
              isNativeMode={isNativeMode}
              setIsNativeMode={setIsNativeMode}
              tokenAddress={tokenAddress}
              setTokenAddress={setTokenAddress}
              recipients={recipients}
              onAddRecipient={handleAddRecipient}
              onRemoveRecipient={handleRemoveRecipient}
              onUpdateRecipient={handleUpdateRecipient}
            />
          </div>

          <div className="lg:col-span-5">
            <VerificationChecklist checks={checks} />

            <ExecutionSummary
              isNativeMode={isNativeMode}
              totalRecipients={recipients.length}
              totalAmount={totalAmount}
              isExecuting={isExecuting}
              isApproving={isApproving}
              onExecute={handleExecute}
              onApprove={handleApprove}
              needsApproval={!isNativeMode}
            />

            <ActivityLog logs={logs} />
          </div>
        </div>
      </main>

      <footer className="mt-16 py-6 border-t border-white/10 text-center text-xs text-slate-500">
        Built for <strong className="text-slate-300">BOT Chain Build Week Hackathon</strong> • Contract Deployed at{' '}
        <a
          href={`https://scan.bohr.life/address/${CONTRACT_ADDRESS}`}
          target="_blank"
          rel="noreferrer"
          className="text-cyan-400 hover:underline font-mono"
        >
          {CONTRACT_ADDRESS}
        </a>
      </footer>
    </div>
  );
}
