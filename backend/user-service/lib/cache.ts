// lib/cache.ts
import { redis } from "bun";

const DEFAULT_TTL = 3600; // 1 hour default

/**
 * Wraps any data-fetching function with Bun's native Redis cache.
 * @param cacheKey The unique string identifier for the cache entry.
 * @param fn The asynchronous function to execute on a cache miss.
 * @param ttl Expiration time in seconds.
 */
export async function withCache<T>(
    cacheKey: string,
    fn: () => Promise<T>,
    ttl: number = DEFAULT_TTL
): Promise<T> {
    try {
        const cachedData = await redis.get(cacheKey);

        if (cachedData) {
            return JSON.parse(cachedData) as T;
        }

        const data = await fn();

        if (data !== undefined && data !== null) {
            await redis.set(cacheKey, JSON.stringify(data), "EX", ttl);
        }

        return data;
    } catch (error) {
        console.error(`[Cache Error] Failed for key "${cacheKey}":`, error);
        // Fail-safe: If Redis goes down, execute the function directly so the app doesn't crash
        return await fn();
    }
}

/**
 * Destroys a cache key instantly (Cache Busting).
 * @param cacheKey The key or specific tag to delete.
 */
export async function bustCache(cacheKey: string): Promise<void> {
    try {
        await redis.del(cacheKey);
        console.log(`Cache busted successfully for key: ${cacheKey}`);
    } catch (error) {
        console.error(`[Cache Bust Error] Failed to delete key "${cacheKey}":`, error);
    }
}