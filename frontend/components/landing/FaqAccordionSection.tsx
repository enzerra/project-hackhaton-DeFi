'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, CheckCircle2, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export const FaqAccordionSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does 100% Atomic Transfer work?',
      a: 'Atomic transfers follow an all-or-nothing execution pattern in EVM Solidity. If even 1 recipient in the batch fails (e.g. invalid state, out of gas), the entire smart contract transaction reverts atomically, returning all funds to your wallet with zero partial loss.',
      code: 'require(success, "Atomic batch execution failed: Reverting all transfers");',
    },
    {
      q: 'How much gas does BOTFlow Protocol save?',
      a: 'By batching transfers into a single transaction and avoiding repeated base transaction overhead, BOTFlow saves between 64.2% and 82.5% in gas fees compared to separate manual transfers.',
      code: 'Gas Reduction: ~64.2% to 82.5% per batch execution',
    },
    {
      q: 'Is the Smart Contract verified on BOT Chain Testnet?',
      a: 'Yes! BOTFlow Protocol is deployed live on BOT Chain Testnet (Chain ID 968) at contract address 0x9118EA4a52C6c7873729c8d8702cCd85E573f9E9 with 100% verified source code on scan.bohr.life.',
      code: 'Contract Address: 0x9118EA4a52C6c7873729c8d8702cCd85E573f9E9',
    },
    {
      q: 'Does it support ERC20 tokens as well as Native BOT?',
      a: 'Yes! BOTFlow features a Dual Engine: Native BOT mode for native coins with auto-refund for excess msg.value, and ERC20 Token mode for standard ERC20 tokens like USDT or USDC.',
      code: 'Engine Mode: Native BOT & Standard ERC20 Tokens',
    },
    {
      q: 'How do I connect MetaMask to BOT Chain Testnet?',
      a: 'Simply click "Launch DApp Workspace" in the header. Our frontend automatically prompts MetaMask to add/switch to BOT Chain Testnet (Chain ID 968, RPC https://rpc.bohr.life).',
      code: 'Chain ID: 968 | RPC: https://rpc.bohr.life',
    },
    {
      q: 'Where can I inspect the Foundry unit test suite?',
      a: 'The smart contract is open-source and tested with Foundry (14/14 unit tests passing with 100% line coverage). You can inspect the contract code directly on GitHub or scan.bohr.life.',
      code: 'Foundry Tests: 14/14 PASS (100% Coverage)',
    },
  ];

  return (
    <section className="bg-[#FAFAFA] py-20 md:py-28 border-y border-[#E4E4E7] w-full relative shadow-inner overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="font-mono text-[10px] uppercase bg-[#09090B] text-white border-[#09090B] px-3.5 py-1 font-bold mb-3 shadow-xs">
            FREQUENTLY ASKED QUESTIONS
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#09090B] mb-3 font-sans">
            Frequently Asked Questions.
          </h2>
          <p className="text-sm md:text-base text-[#52525B] font-normal">
            Everything you need to know about BOTFlow Protocol, gas savings, and security.
          </p>
        </div>

        {/* UNIFIED SINGLE LIST OF ACCORDION CARDS */}
        <div className="space-y-4 text-left">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <Card
                key={idx}
                className={`vercel-card border-2 transition-all rounded-2xl overflow-hidden cursor-pointer ${
                  isOpen
                    ? 'border-[#09090B] bg-white shadow-xl ring-2 ring-[#09090B]/10'
                    : 'border-[#D4D4D8] bg-white hover:border-[#09090B]'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 md:p-6 text-left flex justify-between items-center gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${isOpen ? 'bg-[#09090B] text-white' : 'bg-[#F4F4F5] text-[#09090B]'}`}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <h3 className="text-base md:text-lg font-extrabold text-[#09090B] tracking-tight">
                      {item.q}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#09090B] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-6 pb-6 pt-2 border-t border-[#E4E4E7] space-y-3 bg-[#FAFAFA]"
                  >
                    <p className="text-xs md:text-sm text-[#52525B] leading-relaxed font-normal">
                      {item.a}
                    </p>

                    <div className="p-3 rounded-xl bg-[#09090B] text-white font-mono text-[11px] flex items-center gap-2 shadow-inner">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                      <span className="text-[#E4E4E7]">{item.code}</span>
                    </div>
                  </motion.div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
