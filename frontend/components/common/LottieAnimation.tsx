'use client';

import React, { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

interface LottieAnimationProps {
  url?: string;
}

export const LottieAnimation: React.FC<LottieAnimationProps> = ({
  url = 'https://assets9.lottiefiles.com/packages/lf20_kx5knq5p.json',
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <Player
        autoplay
        loop
        src={url}
        style={{ height: '220px', width: '220px' }}
      />
    </div>
  );
};
