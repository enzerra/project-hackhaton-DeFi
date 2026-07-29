import type { Metadata } from 'next';
import './globals.css';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'BOTFlow Protocol — Vercel Minimalist Asset Distribution',
  description: 'Atomic, multi-recipient token distribution platform for BOT Chain EVM.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className="min-h-screen bg-white text-[#171717] antialiased selection:bg-[#171717] selection:text-white">
        {children}
      </body>
    </html>
  );
}
