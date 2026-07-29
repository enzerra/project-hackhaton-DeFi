'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DotLottieReact = dynamic(
  () => import('@lottiefiles/dotlottie-react').then((mod) => mod.DotLottieReact),
  { ssr: false }
);

interface DotLottiePlayerProps {
  src: string;
  width?: string;
  height?: string;
}

export const DotLottiePlayer: React.FC<DotLottiePlayerProps> = ({
  src,
  width = '240px',
  height = '240px',
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center" style={{ width, height }}>
        <div className="w-5 h-5 rounded-full border-2 border-[#09090B] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center overflow-hidden">
      <DotLottieReact
        src={src}
        loop
        autoplay
        style={{ width, height }}
      />
    </div>
  );
};
