import type { KeyValueStore } from "@web5/common";
import { MemoryLevel } from "memory-level";

export class MemoryLevelStore implements KeyValueStore<string, any> {
  private store: MemoryLevel<string, string>;

  constructor() {
    this.store = new MemoryLevel();
  }

  async clear(): Promise<void> {
    await this.store.clear();
  }

  async close(): Promise<void> {
    await this.store.close();
  }

  async delete(key: string): Promise<boolean> {
    await this.store.del(key);
    return true;
  }

  async get(key: string): Promise<any> {
    return await this.store.get(key);
  }

  async set(key: string, value: any): Promise<void> {
    await this.store.put(key, value);
  }
}
