import { NpmDownloadsResponse, NpmRangeResponse } from '../types';
import { getCached, setCache } from './cache';

interface NpmPackageMeta {
  firstPublished: string | null;
  latestVersion: string | null;
  versionCount: number;
  packageSizeKB: number | null;
  license: string | null;
  hasTypes: boolean;
}

export async function getNpmPackageMeta(
  packageName: string
): Promise<NpmPackageMeta> {
  const cacheKey = `npm-meta-${packageName}`;
  const cached = getCached<NpmPackageMeta>(cacheKey);
  if (cached !== null) return cached;

  const defaults: NpmPackageMeta = {
    firstPublished: null,
    latestVersion: null,
    versionCount: 0,
    packageSizeKB: null,
    license: null,
    hasTypes: false,
  };

  try {
    const encodedPackage = encodeURIComponent(packageName);
    const response = await fetch(
      `https://registry.npmjs.org/${encodedPackage}`,
      { next: { revalidate: 86400 } } // cache for 24h — this data changes slowly
    );

    if (!response.ok) return defaults;

    const data = await response.json();
    const versions = Object.keys(data.versions || {});
    const latestVersion = data['dist-tags']?.latest || null;
    const latestMeta = latestVersion ? data.versions?.[latestVersion] : null;
    const timeEntries = data.time || {};

    const meta: NpmPackageMeta = {
      firstPublished: timeEntries.created || null,
      latestVersion,
      versionCount: versions.length,
      packageSizeKB: latestMeta?.dist?.unpackedSize
        ? Math.round(latestMeta.dist.unpackedSize / 1024)
        : null,
      license: data.license || latestMeta?.license || null,
      hasTypes: !!(
        latestMeta?.types ||
        latestMeta?.typings ||
        packageName.startsWith('@types/')
      ),
    };

    setCache(cacheKey, meta, 86400000); // 24h TTL
    return meta;
  } catch (error) {
    console.error(`Failed to fetch npm meta for ${packageName}:`, error);
    return defaults;
  }
}

const NPM_API_BASE = 'https://api.npmjs.org/downloads';

export async function getWeeklyDownloads(
  packageName: string
): Promise<number | null> {
  const cacheKey = `npm-weekly-${packageName}`;
  const cached = getCached<number>(cacheKey);
  if (cached !== null) return cached;

  try {
    const encodedPackage = encodeURIComponent(packageName);
    const response = await fetch(
      `${NPM_API_BASE}/point/last-week/${encodedPackage}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      console.warn(`npm API error for ${packageName}: ${response.status}`);
      return null;
    }

    const data: NpmDownloadsResponse = await response.json();
    setCache(cacheKey, data.downloads);
    return data.downloads;
  } catch (error) {
    console.error(`Failed to fetch npm downloads for ${packageName}:`, error);
    return null;
  }
}

export async function getDownloadsTrend(
  packageName: string
): Promise<number[]> {
  const cacheKey = `npm-trend-${packageName}`;
  const cached = getCached<number[]>(cacheKey);
  if (cached !== null) return cached;

  try {
    const encodedPackage = encodeURIComponent(packageName);
    const response = await fetch(
      `${NPM_API_BASE}/range/last-month/${encodedPackage}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      console.warn(`npm API trend error for ${packageName}: ${response.status}`);
      return [];
    }

    const data: NpmRangeResponse = await response.json();
    // Get last 7 days
    const trend = data.downloads.slice(-7).map((d) => d.downloads);
    setCache(cacheKey, trend);
    return trend;
  } catch (error) {
    console.error(`Failed to fetch npm trend for ${packageName}:`, error);
    return [];
  }
}

export async function getDownloadsChangePercent(
  packageName: string
): Promise<number> {
  try {
    const encodedPackage = encodeURIComponent(packageName);
    const response = await fetch(
      `${NPM_API_BASE}/range/last-month/${encodedPackage}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) return 0;

    const data: NpmRangeResponse = await response.json();
    const downloads = data.downloads;

    if (downloads.length < 14) return 0;

    // Compare last 7 days vs previous 7 days
    const lastWeek = downloads.slice(-7).reduce((sum, d) => sum + d.downloads, 0);
    const previousWeek = downloads.slice(-14, -7).reduce((sum, d) => sum + d.downloads, 0);

    if (previousWeek === 0) return lastWeek > 0 ? 100 : 0;

    return Math.round(((lastWeek - previousWeek) / previousWeek) * 100);
  } catch {
    return 0;
  }
}
