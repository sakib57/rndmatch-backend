class CacheManager {
  private capacity = 10;
  private map = new Map();
  private queue = [];

  constructor(capacity = 10) {
    this.capacity = capacity;
    this.queue = new Array(this.capacity);
  }

  /**
   * remove a specific key form queue
   * @param key
   * @returns
   */
  private filterQueueByKey(key: string) {
    return this.queue.filter((val) => val !== key);
  }

  /**
   * This function generates key based on CacheKey and passed arguments
   * @param key cacheKey
   * @param args arguments
   * @returns {string}
   */
  public generateKey(key: string, args: any[]): string {
    const stringifyArgs = JSON.stringify(args);
    return `${key}:${stringifyArgs}`;
  }

  /**
   * Retrieve value from cache in reorder the queue
   * @param key
   * @returns {Promise<any>}
   */
  public async get(key: string): Promise<any> {
    if (!this.map.has(key)) return 0;

    this.queue = this.filterQueueByKey(key);
    this.queue.push(key);
    return this.map.get(key);
  }

  /**
   * return all keys of the map as generator
   * @returns {Promise<IterableIterator<string>>}
   */
  public async getKeys(): Promise<IterableIterator<string>> {
    return this.map.keys();
  }

  /**
   * Put value in the cache by key and reorder the queue
   * @param key
   * @param value
   */
  public async put(key: string, value: any) {
    if (this.map.has(key)) {
      this.queue = this.filterQueueByKey(key);
    } else if (this.queue.length === this.capacity) {
      const oldKey = this.queue.shift();
      if (oldKey) this.map.delete(oldKey);
    }

    this.map.set(key, value);
    this.queue.push(key);
  }

  /**
   * remove value from cache by key and reorder the queue
   * @param key
   * @returns
   */
  public async remove(key: string) {
    if (!this.map.has(key)) return 0;

    this.queue = this.filterQueueByKey(key);
    this.map.delete(key);
    return 1;
  }
}

export const CM = new CacheManager();
