// simple in-memory cache
const store: any = {};

export const cache = {
  async get(key: string) {
    const entry = store[key];
    if (!entry) return null;

    if (entry.expiresAt < Date.now()) {
      delete store[key];
      return null;
    }
    return entry.value;
  },

  async set(key: string, value: any, ttlSeconds: number) {
    store[key] = {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    };
  },
};