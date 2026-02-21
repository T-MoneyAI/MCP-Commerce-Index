import { NextResponse } from 'next/server';
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

async function fetchMCPData(mcp: (typeof mcpRegistry)[0]): Promise<MCPData> {
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

  return {
    ...mcp,
    metrics,
    trend,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    let mcps = mcpRegistry;
    if (category && category !== 'all') {
      mcps = mcpRegistry.filter((mcp) => mcp.category === category);
    }

    const mcpDataArray = await Promise.all(mcps.map(fetchMCPData));

    mcpDataArray.sort((a, b) => {
      const downloadDiff =
        b.metrics.npmDownloadsWeekly - a.metrics.npmDownloadsWeekly;
      if (downloadDiff !== 0) return downloadDiff;
      return b.metrics.githubStars - a.metrics.githubStars;
    });

    const rankedData = mcpDataArray.map((mcp, index) => ({
      ...mcp,
      rank: index + 1,
    }));

    return NextResponse.json(rankedData);
  } catch (error) {
    console.error('Error fetching MCP data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch MCP data' },
      { status: 500 }
    );
  }
}
