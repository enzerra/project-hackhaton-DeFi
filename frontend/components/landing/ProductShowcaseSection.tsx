'use client';

import React from 'react';

interface ProductShowcaseSectionProps {
  onOpenApp: () => void;
}

export const ProductShowcaseSection: React.FC<ProductShowcaseSectionProps> = ({ onOpenApp }) => {
  return (
    <section className="py-20 bg-[#FAFAFA] font-sans text-left text-[#171717] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* TITLE & SUBTITLE: OPTIMIZED FOR MULTI-DEVICE PRODUCT SHOWCASE */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10.5px] font-mono font-bold uppercase tracking-widest text-neutral-400 block">
            CROSS-PLATFORM ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#171717]">
            Unified Across Every Screen
          </h2>
          <p className="text-sm text-neutral-500 font-normal leading-relaxed">
            Execute atomic batch payouts seamlessly on desktop browsers, tablets, and mobile Web3 wallets.
          </p>
        </div>

        {/* CRYSTAL SHARP SEAMLESS IMAGE (ZERO BLUR, NATIVE CRISP RESOLUTION) */}
        <div
          className="w-full flex items-center justify-center cursor-pointer"
          onClick={onOpenApp}
        >
          <img
            src="/gambar-product.png"
            alt="BOTFlow Protocol Unified Across Every Screen (gambar product.png)"
            className="w-full h-auto object-contain max-w-4xl block"
            style={{
              imageRendering: '-webkit-optimize-contrast',
              WebkitBackfaceVisibility: 'hidden',
            }}
          />
        </div>
      </div>
    </section>
  );
};
