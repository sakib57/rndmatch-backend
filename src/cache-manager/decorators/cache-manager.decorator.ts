import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CM } from '../service/cache-manager.service';

/**
 * cacheService Decorator to implement caching at service level
 * @param {string} cacheKey
 */
export function cache(cacheKey: string) {
  return function (target: Record<string, any>, name: string, descriptor) {
    const originalFunc = target[name];
    descriptor.value = async function (...args: any[]) {
      try {
        const key = CM.generateKey(cacheKey, args);
        const cacheData = await CM.get(key);
        if (cacheData === 0) {
          Logger.warn(`MISS: ${key}`, 'CACHE');
        } else {
          Logger.log(`HIT: ${key}`, 'CACHE');
        }
        if (cacheData !== 0) return cacheData;

        const data = await originalFunc.apply(this, args);
        CM.put(key, data);
        return data;
      } catch (err: any) {
        throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
      }
    };
  };
}
