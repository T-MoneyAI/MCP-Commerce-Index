import { GitHubRepoResponse, MCPMetrics } from '../types';
import { getCached, setCache } from './cache';

const GITHUB_API_BASE = 'https://api.github.com/repos';

interface GitHubMetrics {
  stars: number;
  forks: number;
  openIssues: number;
  lastCommit: string | null;
  contributors: number;
  commitFrequency30d: number;
}

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export async function getGitHubMetrics(
  repoPath: string
): Promise<GitHubMetrics | null> {
  const cacheKey = `github-${repoPath}`;
  const cached = getCached<GitHubMetrics>(cacheKey);
  if (cached !== null) return cached;

  try {
    const headers = getHeaders();

    // Fetch repo data
    const repoResponse = await fetch(`${GITHUB_API_BASE}/${repoPath}`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!repoResponse.ok) {
      console.warn(`GitHub API error for ${repoPath}: ${repoResponse.status}`);
      return null;
    }

    const data: GitHubRepoResponse = await repoResponse.json();

    // Fetch contributors count (just first page to get total)
    let contributors = 0;
    try {
      const contribResponse = await fetch(
        `${GITHUB_API_BASE}/${repoPath}/contributors?per_page=1&anon=true`,
        { headers, next: { revalidate: 3600 } }
      );
      if (contribResponse.ok) {
        // GitHub returns total in Link header
        const linkHeader = contribResponse.headers.get('Link') || '';
        const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
        if (lastPageMatch) {
          contributors = parseInt(lastPageMatch[1], 10);
        } else {
          const contribData = await contribResponse.json();
          contributors = Array.isArray(contribData) ? contribData.length : 0;
        }
      }
    } catch {
      // non-critical, skip
    }

    // Fetch commit activity (last 30 days)
    let commitFrequency30d = 0;
    try {
      const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const commitsResponse = await fetch(
        `${GITHUB_API_BASE}/${repoPath}/commits?since=${since}&per_page=1`,
        { headers, next: { revalidate: 3600 } }
      );
      if (commitsResponse.ok) {
        const linkHeader = commitsResponse.headers.get('Link') || '';
        const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
        if (lastPageMatch) {
          commitFrequency30d = parseInt(lastPageMatch[1], 10);
        } else {
          const commitData = await commitsResponse.json();
          commitFrequency30d = Array.isArray(commitData) ? commitData.length : 0;
        }
      }
    } catch {
      // non-critical, skip
    }

    const metrics: GitHubMetrics = {
      stars: data.stargazers_count,
      forks: data.forks_count,
      openIssues: data.open_issues_count,
      lastCommit: data.pushed_at,
      contributors,
      commitFrequency30d,
    };

    setCache(cacheKey, metrics);
    return metrics;
  } catch (error) {
    console.error(`Failed to fetch GitHub data for ${repoPath}:`, error);
    return null;
  }
}

export function mergeGitHubMetrics(
  metrics: Partial<MCPMetrics>,
  github: GitHubMetrics | null
): MCPMetrics {
  return {
    npmDownloadsWeekly: metrics.npmDownloadsWeekly ?? 0,
    npmDownloadsChange: metrics.npmDownloadsChange ?? 0,
    githubStars: github?.stars ?? 0,
    githubForks: github?.forks ?? 0,
    openIssues: github?.openIssues ?? 0,
    lastCommit: github?.lastCommit ?? null,
    firstPublished: metrics.firstPublished ?? null,
    latestVersion: metrics.latestVersion ?? null,
    versionCount: metrics.versionCount ?? 0,
    packageSizeKB: metrics.packageSizeKB ?? null,
    license: metrics.license ?? null,
    hasTypes: metrics.hasTypes ?? false,
    contributors: github?.contributors ?? 0,
    commitFrequency30d: github?.commitFrequency30d ?? 0,
  };
}
