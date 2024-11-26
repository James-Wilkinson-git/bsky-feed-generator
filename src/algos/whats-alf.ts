import { QueryParams } from '../lexicon/types/app/bsky/feed/getFeedSkeleton'
import { AppContext } from '../config'

// max 15 chars
export const shortname = 'whats-alf'

export const handler = async (ctx: AppContext, params: QueryParams) => {
  const redisKey = `feed:${shortname}:${params.cursor ?? 'initial'}`
  let feed = await ctx.redis.get(redisKey)

  if (!feed) {
    let builder = ctx.db
      .selectFrom('post')
      .selectAll()
      .orderBy('indexedAt', 'desc')
      .orderBy('cid', 'desc')
      .limit(params.limit)

    if (params.cursor) {
      const timeStr = new Date(parseInt(params.cursor, 10)).toISOString()
      builder = builder.where('post.indexedAt', '<', timeStr)
    }
    const res = await builder.execute()

    feed = res.map((row) => ({
      post: row.uri,
    }))

    await ctx.redis.set(redisKey, JSON.stringify(feed))
  } else {
    feed = JSON.parse(feed)
  }

  let cursor: string | undefined
  const last = feed.at(-1)
  if (last) {
    cursor = new Date(last.indexedAt).getTime().toString(10)
  }

  return {
    cursor,
    feed,
  }
}
