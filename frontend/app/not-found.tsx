import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-[#171717] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-extrabold mb-2">404 — Page Not Found</h1>
      <p className="text-sm text-neutral-600 mb-6">The page you are looking for does not exist.</p>
      <Link href="/" className="vercel-button-primary px-6 py-2.5 text-xs font-bold">
        Return Home
      </Link>
    </div>
  );
}
