import ICacheProvider from '../models/ICacheProvider';

const map = new Map<string, string>();

class LocalCacheProvider implements ICacheProvider {
  private client: Map<string, string>;

  constructor() {
    this.client = map;
  }

  public async save(key: string, value: any): Promise<void> {
    this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    return JSON.parse(this.client.get(key) || '');
  }

  public async invalidate(key: string): Promise<void> {
    this.client.delete(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    this.client.forEach((item, key) => {
      if (item.includes(prefix)) {
        this.client.delete(key);
      }
    });
  }
}

export default LocalCacheProvider;
