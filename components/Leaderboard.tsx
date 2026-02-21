'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { MCPData } from '@/lib/types';
import { MCPCard } from './MCPCard';
import { CategoryFilter } from './CategoryFilter';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type SortBy = 'downloads' | 'growth' | 'stars';

interface LeaderboardProps {
  initialData?: MCPData[];
}

export function Leaderboard({ initialData }: LeaderboardProps) {
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortBy>('downloads');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const { data, error, isLoading } = useSWR<MCPData[]>(
    `/api/mcps?category=${category}`,
    fetcher,
    {
      fallbackData: initialData,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 60 * 60 * 1000,
    }
  );

  const query = search.toLowerCase().trim();
  const filteredData = data ? data.filter((mcp) => {
    if (!query) return true;
    return (
      mcp.name.toLowerCase().includes(query) ||
      (mcp.description?.toLowerCase().includes(query)) ||
      (mcp.npmPackage?.toLowerCase().includes(query)) ||
      (mcp.githubRepo?.toLowerCase().includes(query))
    );
  }) : [];

  const sortedData = filteredData.length > 0 ? [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case 'growth':
        return b.metrics.npmDownloadsChange - a.metrics.npmDownloadsChange;
      case 'stars':
        return b.metrics.githubStars - a.metrics.githubStars;
      case 'downloads':
      default:
        return b.metrics.npmDownloadsWeekly - a.metrics.npmDownloadsWeekly;
    }
  }).map((mcp, index) => ({ ...mcp, rank: index + 1 })) : [] as MCPData[];

  return (
    <div className="space-y-4">
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search packages..."
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-[var(--border-light)] bg-white text-[13px] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]/20"
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <CategoryFilter selected={category} onChange={setCategory} />
        <div className="flex items-center gap-1">
          {(['downloads', 'growth', 'stars'] as SortBy[]).map((option) => (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-all ${
                sortBy === option
                  ? 'bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)]'
                  : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {option === 'downloads' ? 'Downloads' : option === 'growth' ? 'Growth' : 'Stars'}
            </button>
          ))}
        </div>
      </div>

      {isLoading && !data ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-[var(--surface)] rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-1.5">
          {sortedData.map((mcp) => (
            <MCPCard
              key={mcp.id}
              mcp={mcp}
              expanded={expandedId === mcp.id}
              onToggle={() => setExpandedId(expandedId === mcp.id ? null : mcp.id)}
              sortBy={sortBy}
            />
          ))}
        </div>
      )}

      {sortedData.length === 0 && !isLoading && (
        <div className="text-center py-12 text-[var(--text-tertiary)]">
          No packages in this category.
        </div>
      )}
    </div>
  );
}
