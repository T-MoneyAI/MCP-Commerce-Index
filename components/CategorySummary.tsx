'use client';

import { MCPData } from '@/lib/types';

interface CategorySummaryProps {
  data: MCPData[];
}

const categoryMeta: Record<string, { label: string; color: string }> = {
  payments: { label: 'Payments', color: 'text-[#1d4ed8]' },
  protocols: { label: 'Protocols', color: 'text-[#0e6245]' },
  commerce: { label: 'Commerce', color: 'text-[#7c3aed]' },
  wallets: { label: 'Wallets', color: 'text-[#b45309]' },
  crypto: { label: 'Crypto', color: 'text-[#c2410c]' },
};

function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export function CategorySummary({ data }: CategorySummaryProps) {
  const categories = Object.entries(
    data.reduce((acc, mcp) => {
      if (!acc[mcp.category]) acc[mcp.category] = [];
      acc[mcp.category].push(mcp);
      return acc;
    }, {} as Record<string, MCPData[]>)
  )
    .map(([cat, mcps]) => ({
      category: cat,
      count: mcps.length,
      downloads: mcps.reduce((s, m) => s + m.metrics.npmDownloadsWeekly, 0),
      stars: mcps.reduce((s, m) => s + m.metrics.githubStars, 0),
      meta: categoryMeta[cat] || { label: cat, color: 'text-[var(--text-tertiary)]' },
    }))
    .sort((a, b) => b.downloads - a.downloads);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
      {categories.map((cat) => (
        <div
          key={cat.category}
          className="border border-[var(--border-light)] rounded-lg p-3 hover:border-[var(--border)] transition-colors"
        >
          <div className={`text-[12px] font-semibold uppercase tracking-wide ${cat.meta.color}`}>
            {cat.meta.label}
          </div>
          <div className="text-[20px] font-semibold text-[var(--text-primary)] mt-1 font-[family-name:var(--font-geist-mono)]">
            {formatNumber(cat.downloads)}
          </div>
          <div className="text-[11px] text-[var(--text-tertiary)] mt-0.5">
            {cat.count} packages · {formatNumber(cat.stars)} ★
          </div>
        </div>
      ))}
    </div>
  );
}
