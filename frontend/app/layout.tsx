import type { Metadata } from 'next';
import './globals.css';
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'Batchpay Protocol — Vercel Minimalist Asset Distribution',
  description: '1-Click MultiSend & Split Bill Engine built for BOT Chain.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-sans">
      <body className="min-h-screen bg-white text-[#171717] antialiased selection:bg-[#171717] selection:text-white">
        {children}
      </body>
    </html>
  );
}
