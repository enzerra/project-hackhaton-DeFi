'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, ShieldCheck, Zap, FileText } from 'lucide-react';
import { DotLottiePlayer } from '../common/DotLottiePlayer';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

interface GeminiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHATBOT_LOTTIE_URL = 'https://lottie.host/889b0dba-90ad-4450-8617-1affbcb85fde/9LxEKBVZag.lottie';

export function GeminiChatModal({ isOpen, onClose }: GeminiChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substring(2),
      sender: 'user',
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await res.json();

      const aiMsg: Message = {
        id: Math.random().toString(36).substring(2),
        sender: 'ai',
        text: data.reply || 'I can only answer questions regarding BOTFlow Protocol.',
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2),
          sender: 'ai',
          text: 'I can only answer questions regarding BOTFlow Protocol, gas savings, and BOT Chain executions.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    { label: 'Atomic Revert', text: 'How does 100% Atomic Revert work?', icon: ShieldCheck },
    { label: 'Gas Savings', text: 'How much gas fee does BOTFlow save?', icon: Zap },
    { label: 'Contract Address', text: 'What is the Contract Address?', icon: FileText },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-20 right-6 z-50 w-80 sm:w-88 h-[440px] bg-white border border-[#09090B] text-[#09090B] rounded-2xl shadow-2xl overflow-hidden flex flex-col text-left font-sans"
      >
        {/* MINIMALIST HEADER */}
        <div className="p-3.5 border-b border-[#E4E4E7] flex justify-between items-center bg-[#FAFAFA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#09090B] flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
              <DotLottiePlayer src={CHATBOT_LOTTIE_URL} width="32px" height="32px" />
            </div>
            <h4 className="text-xs font-extrabold text-[#09090B]">Monkey Bot</h4>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-[#F4F4F5] hover:bg-[#09090B] hover:text-white text-[#09090B] flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* CHAT CONTAINER */}
        <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs bg-white">
          {/* INITIAL WELCOME SCREEN */}
          <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E4E4E7] text-center space-y-2 mb-2 shadow-xs">
            <div className="flex justify-center -my-1">
              <DotLottiePlayer src={CHATBOT_LOTTIE_URL} width="96px" height="96px" />
            </div>
            <h5 className="text-xs font-extrabold text-[#09090B]">Monkey Bot</h5>
            <p className="text-[11px] text-[#52525B] leading-relaxed font-normal">
              Ask anything about BOTFlow gas savings, security, or executions.
            </p>
          </div>

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-6 h-6 rounded-md bg-[#09090B] text-white flex items-center justify-center shrink-0 mt-0.5 overflow-hidden">
                  <DotLottiePlayer src={CHATBOT_LOTTIE_URL} width="26px" height="26px" />
                </div>
              )}

              <div
                className={`p-3 rounded-xl max-w-[85%] text-[11px] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#09090B] text-white font-medium shadow-xs'
                    : 'bg-[#F4F4F5] text-[#09090B] border border-[#E4E4E7] font-mono'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2 justify-start items-center text-[#71717A] font-mono text-[10px]">
              <div className="w-6 h-6 rounded-md bg-[#09090B] text-white flex items-center justify-center shrink-0 overflow-hidden">
                <DotLottiePlayer src={CHATBOT_LOTTIE_URL} width="26px" height="26px" />
              </div>
              <div className="p-2 rounded-xl bg-[#F4F4F5] border border-[#E4E4E7] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#09090B] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#09090B] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#09090B] animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* QUICK SUGGESTION PILLS */}
        <div className="p-2 bg-[#FAFAFA] border-t border-[#E4E4E7] flex gap-1.5 overflow-x-auto font-mono">
          {suggestions.map((s, idx) => {
            const Icon = s.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSend(s.text)}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#D4D4D8] hover:bg-[#09090B] hover:text-white text-[#09090B] text-[9.5px] font-bold whitespace-nowrap transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Icon className="w-3 h-3" />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* INPUT FORM */}
        <div className="p-2.5 border-t border-[#E4E4E7] bg-white flex gap-1.5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Monkey Bot..."
            className="flex-1 px-3 py-2 rounded-xl bg-[#F4F4F5] border border-[#E4E4E7] text-[#09090B] text-xs font-mono placeholder:text-[#999999] focus:outline-none focus:border-[#09090B]"
          />

          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="px-3.5 py-2 rounded-xl bg-[#09090B] text-white font-bold text-xs flex items-center justify-center hover:bg-[#27272A] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-xs"
          >
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default GeminiChatModal;
