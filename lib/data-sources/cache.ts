import { CacheEntry } from '../types';

const cache = new Map<string, CacheEntry<unknown>>();

const DEFAULT_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
import { CacheEntry } from '../types';

  const cache = new Map<string, CacheEntry<unknown>>();

  const DEFAULT_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

  export function getCached<T>(key: string): T | null {
      const entry = cache.get(key) as CacheEntry<T> | undefined;
      if (!entry) return null;

      const now = Date.now();
      const ttl = entry.ttl ?? DEFAULT_TTL;
      if (now - entry.timestamp > ttl) {
            cache.delete(key);
            return null;
      }

      return entry.data;
  }

  export function setCache<T>(key: string, data: T, ttl?: number): void {
      cache.set(key, {
            data,
            timestamp: Date.now(),
            ttl,
      });
  }

  export function clearCache(): void {
      cache.clear();
  }
  const now = Date.now();
  if (now - entry.timestamp > DEFAULT_TTL) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

export function setCache<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

export function clearCache(): void {
  cache.clear();
}
