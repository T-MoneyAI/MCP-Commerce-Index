import { Leaderboard } from '@/components/Leaderboard';
import { AggregateTrendChart } from '@/components/AggregateTrendChart';
import { CategorySummary } from '@/components/CategorySummary';
import { mcpRegistry } from '@/lib/mcps';
import { MCPData, MCPMetrics } from '@/lib/types';
import {
  getWeeklyDownloads,
  getDownloadsTrend,
  getDownloadsChangePercent,
  getNpmPackageMeta,
} from '@/lib/data-sources/npm';
import { getGitHubMetrics, mergeGitHubMetrics } from '@/lib/data-sources/github';

export const revalidate = 3600;

async function fetchInitialData(): Promise<MCPData[]> {
  const mcpDataArray = await Promise.all(
    mcpRegistry.map(async (mcp) => {
      const [weeklyDownloads, trend, changePercent, npmMeta] = mcp.npmPackage
        ? await Promise.all([
            getWeeklyDownloads(mcp.npmPackage),
            getDownloadsTrend(mcp.npmPackage),
            getDownloadsChangePercent(mcp.npmPackage),
            getNpmPackageMeta(mcp.npmPackage),
          ])
        : [null, [], 0, null];

      const githubMetrics = mcp.githubRepo
        ? await getGitHubMetrics(mcp.githubRepo)
        : null;

      const metrics: MCPMetrics = mergeGitHubMetrics(
        {
          npmDownloadsWeekly: weeklyDownloads ?? 0,
          npmDownloadsChange: changePercent,
          firstPublished: npmMeta?.firstPublished ?? null,
          latestVersion: npmMeta?.latestVersion ?? null,
          versionCount: npmMeta?.versionCount ?? 0,
          packageSizeKB: npmMeta?.packageSizeKB ?? null,
          license: npmMeta?.license ?? null,
          hasTypes: npmMeta?.hasTypes ?? false,
        },
        githubMetrics
      );

      return { ...mcp, metrics, trend };
    })
  );

  mcpDataArray.sort((a, b) => {
    const downloadDiff = b.metrics.npmDownloadsWeekly - a.metrics.npmDownloadsWeekly;
    if (downloadDiff !== 0) return downloadDiff;
    return b.metrics.githubStars - a.metrics.githubStars;
  });

  return mcpDataArray.map((mcp, index) => ({ ...mcp, rank: index + 1 }));
}

function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export default async function Home() {
  const initialData = await fetchInitialData();

  const totalDownloads = initialData.reduce((sum, mcp) => sum + mcp.metrics.npmDownloadsWeekly, 0);
  const totalStars = initialData.reduce((sum, mcp) => sum + mcp.metrics.githubStars, 0);

  const growthRates = initialData.filter((m) => m.metrics.npmDownloadsChange !== 0);
  const avgGrowth = growthRates.length > 0
    ? Math.round(growthRates.reduce((s, m) => s + m.metrics.npmDownloadsChange, 0) / growthRates.length)
    : 0;

  const fastestGrowing = [...initialData]
    .filter((mcp) => mcp.metrics.npmDownloadsWeekly > 100)
    .sort((a, b) => b.metrics.npmDownloadsChange - a.metrics.npmDownloadsChange)[0];

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10">
      {/* Hero */}
      <div className="mb-10">
        <h2 className="text-[32px] font-semibold text-[var(--text-primary)] tracking-[-0.03em]">
          The index for machine payments.
        </h2>
        <p className="text-[15px] text-[var(--text-secondary)] mt-2 max-w-2xl leading-relaxed">
          AI agents are learning to buy, sell, and transact. This index tracks every MCP package powering that shift — payments, protocols, wallets, and commerce tools — ranked by real developer adoption from npm and GitHub.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="stat-card rounded-lg p-4">
          <div className="text-[12px] font-medium text-[var(--text-tertiary)] uppercase tracking-wide">Packages</div>
          <div className="text-[24px] font-semibold text-[var(--text-primary)] mt-1 font-[family-name:var(--font-geist-mono)]">{initialData.length}</div>
        </div>
        <div className="stat-card rounded-lg p-4">
          <div className="text-[12px] font-medium text-[var(--text-tertiary)] uppercase tracking-wide">Weekly Downloads</div>
          <div className="text-[24px] font-semibold text-[var(--text-primary)] mt-1 font-[family-name:var(--font-geist-mono)]">{formatNumber(totalDownloads)}</div>
        </div>
        <div className="stat-card rounded-lg p-4">
          <div className="text-[12px] font-medium text-[var(--text-tertiary)] uppercase tracking-wide">GitHub Stars</div>
          <div className="text-[24px] font-semibold text-[var(--text-primary)] mt-1 font-[family-name:var(--font-geist-mono)]">{formatNumber(totalStars)}</div>
        </div>
        <div className="stat-card rounded-lg p-4">
          <div className="text-[12px] font-medium text-[var(--text-tertiary)] uppercase tracking-wide">Avg Growth</div>
          <div className={`text-[24px] font-semibold mt-1 font-[family-name:var(--font-geist-mono)] ${avgGrowth >= 0 ? 'text-[#0e6245]' : 'text-[#cd3d64]'}`}>
            {avgGrowth >= 0 ? '+' : ''}{avgGrowth}%
          </div>
        </div>
      </div>

      {/* Aggregate Trend */}
      <AggregateTrendChart data={initialData} />

      {/* Category Breakdown */}
      <CategorySummary data={initialData} />

      {/* Fastest growing */}
      {fastestGrowing && fastestGrowing.metrics.npmDownloadsChange > 0 && (
        <div className="mb-6 px-4 py-3 rounded-lg border border-[#c1f0d0] bg-[#f0fdf4]">
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-[#0e6245] font-medium">Fastest growing</span>
            <span className="text-[13px] text-[var(--text-primary)] font-semibold">{fastestGrowing.name}</span>
            <span className="text-[13px] text-[var(--text-tertiary)]">
              +{fastestGrowing.metrics.npmDownloadsChange}% · {formatNumber(fastestGrowing.metrics.npmDownloadsWeekly)} weekly
            </span>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <Leaderboard initialData={initialData} />
    </div>
  );
}
