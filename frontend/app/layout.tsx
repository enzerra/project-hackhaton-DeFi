import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BOTFlow AI — Intelligent Asset Distribution Platform',
  description: 'AI-powered atomic asset distribution platform for BOT Chain EVM. Fast, gas-optimized, 100% All-or-Nothing batch transfers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-[#080C14] text-slate-100 antialiased overflow-x-hidden">
        <div className="bg-glow-cyan top-[-100px] left-[-100px]" />
        <div className="bg-glow-purple top-[300px] right-[-100px]" />
        {children}
      </body>
    </html>
  );
}
