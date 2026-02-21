export type Category = 'payments' | 'commerce' | 'crypto' | 'protocols' | 'wallets' | 'data';

export interface MCPConfig {
  id: string;
  name: string;
  category: Category;
  npmPackage: string | null;
  githubRepo: string | null;
  description?: string;
  website?: string;
}

export interface MCPMetrics {
  npmDownloadsWeekly: number;
  npmDownloadsChange: number;
  githubStars: number;
  githubForks: number;
  openIssues: number;
  lastCommit: string | null;
  // New npm fields
  firstPublished: string | null;
  latestVersion: string | null;
  versionCount: number;
  packageSizeKB: number | null;
  license: string | null;
  hasTypes: boolean;
  // New GitHub fields
  contributors: number;
  commitFrequency30d: number;
}

export interface MCPData extends MCPConfig {
  metrics: MCPMetrics;
  trend: number[];
  rank?: number;
}

export interface NpmDownloadsResponse {
  downloads: number;
  start: string;
  end: string;
  package: string;
}

export interface NpmRangeResponse {
  downloads: Array<{ downloads: number; day: string }>;
  start: string;
  end: string;
  package: string;
}

export interface GitHubRepoResponse {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  pushed_at: string;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl?: number;
}
