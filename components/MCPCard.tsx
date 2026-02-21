'use client';

import { MCPData } from '@/lib/types';
import { TrendChart } from './TrendChart';
import { getCategoryColor } from './CategoryFilter';

interface MCPCardProps {
  mcp: MCPData;
  expanded?: boolean;
  onToggle?: () => void;
  sortBy?: 'downloads' | 'growth' | 'stars';
}

function isNewPackage(firstPublished: string | null): boolean {
  if (!firstPublished) return false;
  const published = new Date(firstPublished);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays <= 14;
}

function formatLastCommit(date: string | null) {
  if (!date) return 'N/A';
  const d = new Date(date);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

export function MCPCard({ mcp, expanded, onToggle, sortBy = 'downloads' }: MCPCardProps) {
  return (
    <div
      className={`border rounded-lg transition-all ${
        expanded
          ? 'border-[var(--border)] shadow-sm'
          : 'border-[var(--border-light)] hover:border-[var(--border)]'
      }`}
    >
      {/* Main row */}
      <div className="px-4 py-3 cursor-pointer flex items-center gap-3" onClick={onToggle}>
        {/* Rank */}
        <span className="flex-shrink-0 w-6 text-[13px] font-medium text-[var(--text-tertiary)] text-right font-[family-name:var(--font-geist-mono)]">
          {mcp.rank}
        </span>

        {/* Name block */}
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold text-[var(--text-primary)] truncate">
              {mcp.name}
            </span>
            <span className={`px-1.5 py-px text-[10px] font-medium rounded ${getCategoryColor(mcp.category)}`}>
              {mcp.category}
            </span>
            {isNewPackage(mcp.metrics.firstPublished) && (
              <span className="px-1.5 py-px text-[10px] font-semibold rounded bg-[#f0fdf4] text-[#0e6245] border border-[#c1f0d0]">
                NEW
              </span>
            )}
          </div>
          {mcp.description && (
            <p className="text-[13px] text-[var(--text-tertiary)] truncate mt-0.5">
              {mcp.description}
            </p>
          )}
        </div>

        {/* Primary metric */}
        <div className="flex-shrink-0 text-right min-w-[80px]">
          {sortBy === 'growth' ? (
            <>
              <div className={`text-[15px] sm:text-[18px] font-semibold font-[family-name:var(--font-geist-mono)] ${mcp.metrics.npmDownloadsChange >= 0 ? 'text-[#0e6245]' : 'text-[#cd3d64]'}`}>
                {mcp.metrics.npmDownloadsChange >= 0 ? '+' : ''}{mcp.metrics.npmDownloadsChange}%
              </div>
              <div className="text-[11px] text-[var(--text-tertiary)]">
                {mcp.metrics.npmDownloadsWeekly.toLocaleString()}/wk
              </div>
            </>
          ) : sortBy === 'stars' ? (
            <>
              <div className="text-[15px] sm:text-[18px] font-semibold text-[var(--text-primary)] font-[family-name:var(--font-geist-mono)]">
                {mcp.metrics.githubStars.toLocaleString()}
              </div>
              <div className="text-[11px] text-[var(--text-tertiary)]">stars</div>
            </>
          ) : (
            <>
              <div className="text-[15px] sm:text-[18px] font-semibold text-[var(--text-primary)] font-[family-name:var(--font-geist-mono)]">
                {mcp.metrics.npmDownloadsWeekly.toLocaleString()}
              </div>
              <div className="flex items-center justify-end gap-1 text-[11px]">
                <span className="text-[var(--text-tertiary)]">/wk</span>
                {mcp.metrics.npmDownloadsChange !== 0 && (
                  <span className={mcp.metrics.npmDownloadsChange > 0 ? 'text-[#0e6245]' : 'text-[#cd3d64]'}>
                    {mcp.metrics.npmDownloadsChange > 0 ? '+' : ''}{mcp.metrics.npmDownloadsChange}%
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Sparkline */}
        <div className="flex-shrink-0 w-20 hidden md:block">
          <TrendChart data={mcp.trend} height={32} />
        </div>

        {/* Stars (desktop) */}
        <div className="flex-shrink-0 items-center gap-1 text-[12px] text-[var(--text-tertiary)] hidden lg:flex font-[family-name:var(--font-geist-mono)]">
          <span>★</span>
          <span>{mcp.metrics.githubStars.toLocaleString()}</span>
        </div>

        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-[var(--text-tertiary)] flex-shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Expanded */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-[var(--border-light)]">
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Weekly Downloads', value: mcp.metrics.npmDownloadsWeekly, trend: mcp.metrics.npmDownloadsChange },
              { label: 'GitHub Stars', value: mcp.metrics.githubStars },
              { label: 'Forks', value: mcp.metrics.githubForks },
              { label: 'Open Issues', value: mcp.metrics.openIssues },
            ].map((m) => (
              <div key={m.label} className="bg-[var(--surface)] rounded-md p-3">
                <div className="text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wide">{m.label}</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[15px] font-semibold text-[var(--text-primary)] font-[family-name:var(--font-geist-mono)]">
                    {m.value.toLocaleString()}
                  </span>
                  {m.trend !== undefined && m.trend !== 0 && (
                    <span className={`text-[11px] font-medium ${m.trend > 0 ? 'text-[#0e6245]' : 'text-[#cd3d64]'}`}>
                      {m.trend > 0 ? '+' : ''}{m.trend}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Secondary metrics */}
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {mcp.metrics.contributors > 0 && (
              <div className="bg-[var(--surface)] rounded-md p-3">
                <div className="text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wide">Contributors</div>
                <div className="text-[15px] font-semibold text-[var(--text-primary)] mt-1 font-[family-name:var(--font-geist-mono)]">{mcp.metrics.contributors}</div>
              </div>
            )}
            {mcp.metrics.commitFrequency30d > 0 && (
              <div className="bg-[var(--surface)] rounded-md p-3">
                <div className="text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wide">Commits (30d)</div>
                <div className="text-[15px] font-semibold text-[var(--text-primary)] mt-1 font-[family-name:var(--font-geist-mono)]">{mcp.metrics.commitFrequency30d}</div>
              </div>
            )}
            {mcp.metrics.versionCount > 0 && (
              <div className="bg-[var(--surface)] rounded-md p-3">
                <div className="text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wide">Versions</div>
                <div className="text-[15px] font-semibold text-[var(--text-primary)] mt-1 font-[family-name:var(--font-geist-mono)]">
                  {mcp.metrics.versionCount}
                  {mcp.metrics.latestVersion && (
                    <span className="text-[11px] text-[var(--text-tertiary)] ml-1 font-normal">v{mcp.metrics.latestVersion}</span>
                  )}
                </div>
              </div>
            )}
            {mcp.metrics.packageSizeKB && (
              <div className="bg-[var(--surface)] rounded-md p-3">
                <div className="text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wide">Package Size</div>
                <div className="text-[15px] font-semibold text-[var(--text-primary)] mt-1 font-[family-name:var(--font-geist-mono)]">
                  {mcp.metrics.packageSizeKB > 1024
                    ? `${(mcp.metrics.packageSizeKB / 1024).toFixed(1)} MB`
                    : `${mcp.metrics.packageSizeKB} KB`}
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {mcp.metrics.license && (
              <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-[var(--surface)] text-[var(--text-tertiary)] border border-[var(--border-light)]">
                {mcp.metrics.license}
              </span>
            )}
            {mcp.metrics.hasTypes && (
              <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe]">
                TypeScript
              </span>
            )}
            {mcp.metrics.firstPublished && (
              <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-[var(--surface)] text-[var(--text-tertiary)] border border-[var(--border-light)]">
                Published {formatLastCommit(mcp.metrics.firstPublished)}
              </span>
            )}
            {mcp.metrics.commitFrequency30d > 10 && (
              <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-[#f0fdf4] text-[#0e6245] border border-[#c1f0d0]">
                Active
              </span>
            )}
            {mcp.metrics.commitFrequency30d === 0 && mcp.githubRepo && (
              <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-[#fef2f2] text-[#cd3d64] border border-[#fecaca]">
                Stale
              </span>
            )}
          </div>

          {/* Trend chart */}
          <div className="mt-4">
            <div className="text-[12px] font-medium text-[var(--text-tertiary)] uppercase tracking-wide mb-2">30-Day Downloads</div>
            <div className="h-32 bg-[var(--surface)] rounded-md p-3">
              <TrendChart data={mcp.trend} height={104} showAxis />
            </div>
          </div>

          {/* Links */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-4 text-[13px]">
              {mcp.npmPackage && (
                <a
                  href={`https://www.npmjs.com/package/${mcp.npmPackage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2563eb] hover:text-[#3b82f6] font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  npm ↗
                </a>
              )}
              {mcp.githubRepo && (
                <a
                  href={`https://github.com/${mcp.githubRepo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2563eb] hover:text-[#3b82f6] font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  GitHub ↗
                </a>
              )}
              {mcp.website && (
                <a
                  href={mcp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2563eb] hover:text-[#3b82f6] font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  Website ↗
                </a>
              )}
            </div>
            <span className="text-[12px] text-[var(--text-tertiary)]">
              Last commit: {formatLastCommit(mcp.metrics.lastCommit)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
