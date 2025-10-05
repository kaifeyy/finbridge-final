// Storage interface for the PSX stock screener
// Stock data is loaded from JSON file in routes.ts
export interface IStorage {
  // Future: Add methods for storing user preferences, saved screens, etc.
}

export class MemStorage implements IStorage {
  constructor() {
    // In-memory storage for future features
  }
}

export const storage = new MemStorage();
