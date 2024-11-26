import Redis from 'ioredis'

export class Database {
  private redis: Redis

  constructor(redis: Redis) {
    this.redis = redis
  }

  async set(key: string, value: string) {
    await this.redis.set(key, value)
  }

  async get(key: string): Promise<string | null> {
    return await this.redis.get(key)
  }

  // Add other database operations as needed
}

export const createDb = (redis: Redis): Database => {
  return new Database(redis)
}

export const migrateToLatest = async (db: Database) => {
  // No migration needed for Redis
}
