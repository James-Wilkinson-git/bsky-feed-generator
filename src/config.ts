import { Database } from './db'
import { DidResolver } from '@atproto/identity'
import Redis from 'ioredis'

export type AppContext = {
  db: Database
  redis: Redis
  didResolver: DidResolver
  cfg: Config
}

export type Config = {
  port: number
  listenhost: string
  hostname: string
  sqliteLocation: string
  subscriptionEndpoint: string
  serviceDid: string
  publisherDid: string
  subscriptionReconnectDelay: number
  redisHost: string
  redisPort: number
  redisPassword?: string
}
