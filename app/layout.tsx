import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const jetbrains = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MCP Commerce Index',
  description:
    'Real-time tracking of the agent commerce ecosystem. Payment MCPs, protocols, wallets, and commerce tools ranked by adoption.',
  keywords: ['MCP', 'Model Context Protocol', 'payments', 'commerce', 'agent payments', 'x402', 'machine payments', 'AI agents'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrains.variable} antialiased`}>
        <header className="border-b border-[var(--border)] bg-white/80 backdrop-blur-lg sticky top-0 z-50">
          <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-[#2563eb] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <span className="text-[15px] font-semibold text-[var(--text-primary)] tracking-[-0.01em]">
                MCP Commerce Index
              </span>
            </div>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-[var(--border)] py-6 mt-16">
          <div className="max-w-[1200px] mx-auto px-6 text-center text-[13px] text-[var(--text-tertiary)]">
            <p>Live data from npm & GitHub · Updated hourly</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
