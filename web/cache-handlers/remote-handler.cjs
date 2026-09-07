const { createClient } = require('redis');

const CACHE_KEY_PREFIX = 'next-cache:';
const REVALIDATED_TAGS_KEY = `${CACHE_KEY_PREFIX}revalidated-tags`;
const redisUrl = process.env.REDIS_URL;
const localTagTimestamps = new Map();

let client;
let connectPromise;

function getCacheKey(cacheKey) {
  return `${CACHE_KEY_PREFIX}${cacheKey}`;
}

function getTagKey(tag) {
  return `${CACHE_KEY_PREFIX}tag:${tag}`;
}

function logRedisError(error) {
  console.warn(`[cache-handler] Redis unavailable: ${error.message}`);
}

async function getClient() {
  if (!redisUrl) return undefined;

  if (!client) {
    client = createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: false,
      },
    });
    client.on('error', logRedisError);
  }

  if (!client.isOpen) {
    connectPromise ||= client.connect().catch((error) => {
      connectPromise = undefined;
      logRedisError(error);
      return undefined;
    });
    await connectPromise;
  }

  return client.isOpen ? client : undefined;
}

function isExpired(entry, softTags = []) {
  const now = Date.now();
  if (now > entry.timestamp + entry.revalidate * 1000) return true;

  const tags = [...(entry.tags || []), ...softTags];
  return tags.some((tag) => (localTagTimestamps.get(tag) || 0) > entry.timestamp);
}

module.exports = {
  async get(cacheKey, softTags) {
    const redisClient = await getClient();
    if (!redisClient) return undefined;

    try {
      const stored = await redisClient.get(getCacheKey(cacheKey));
      if (!stored) return undefined;

      const data = JSON.parse(stored);
      if (isExpired(data, softTags)) return undefined;

      return {
        value: new ReadableStream({
          start(controller) {
            controller.enqueue(Buffer.from(data.value, 'base64'));
            controller.close();
          },
        }),
        tags: data.tags,
        stale: data.stale,
        timestamp: data.timestamp,
        expire: data.expire,
        revalidate: data.revalidate,
      };
    } catch (error) {
      logRedisError(error);
      return undefined;
    }
  },

  async set(cacheKey, pendingEntry) {
    const redisClient = await getClient();
    if (!redisClient) return;

    const entry = await pendingEntry;

    const reader = entry.value.getReader();
    const chunks = [];

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }

    const data = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
    const redisValue = JSON.stringify({
      value: data.toString('base64'),
      tags: entry.tags,
      stale: entry.stale,
      timestamp: entry.timestamp,
      expire: entry.expire,
      revalidate: entry.revalidate,
    });
    const ttl = Number(entry.expire);

    try {
      if (Number.isFinite(ttl) && ttl > 0) {
        await redisClient.set(getCacheKey(cacheKey), redisValue, {
          EX: Math.ceil(ttl),
        });
      } else {
        await redisClient.set(getCacheKey(cacheKey), redisValue);
      }
    } catch (error) {
      logRedisError(error);
    }
  },

  async refreshTags() {
    const redisClient = await getClient();
    if (!redisClient) return;

    try {
      const tags = await redisClient.sMembers(REVALIDATED_TAGS_KEY);
      if (tags.length === 0) return;

      const values = await redisClient.mGet(tags.map(getTagKey));
      for (let index = 0; index < tags.length; index++) {
        localTagTimestamps.set(tags[index], Number(values[index]) || 0);
      }
    } catch (error) {
      logRedisError(error);
    }
  },

  async getExpiration(tags) {
    return Math.max(...tags.map((tag) => localTagTimestamps.get(tag) || 0), 0);
  },

  async updateTags(tags, durations) {
    void durations;

    const redisClient = await getClient();
    if (!redisClient) return;

    const now = Date.now();
    const pipeline = redisClient.multi();

    for (const tag of tags) {
      pipeline.set(getTagKey(tag), String(now));
      pipeline.sAdd(REVALIDATED_TAGS_KEY, tag);
      localTagTimestamps.set(tag, now);
    }

    try {
      await pipeline.exec();
    } catch (error) {
      logRedisError(error);
    }
  },
};
