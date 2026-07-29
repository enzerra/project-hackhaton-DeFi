'use client';

import React, { useState, useEffect } from 'react';

interface TypewriterHeadlineProps {
  text: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export const TypewriterHeadline: React.FC<TypewriterHeadlineProps> = ({
  text,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseTime = 2500,
}) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < text.length) {
        timer = setTimeout(() => {
          setDisplayedText(text.substring(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing out, pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(text.substring(0, displayedText.length - 1));
        }, deletingSpeed);
      } else {
        // Finished deleting, start typing out again
        setIsDeleting(false);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, text, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08] font-sans min-h-[90px] sm:min-h-[110px]">
      {displayedText}
      <span className="inline-block w-1.5 h-10 md:h-12 bg-slate-900 ml-1 translate-y-1 animate-pulse" />
    </h1>
  );
};
