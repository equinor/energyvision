const { createClient } = require('redis');

const client = createClient({ url: process.env.REDIS_URL });
client.connect();

module.exports = {
  async get(cacheKey, softTags) {
    // Retrieve from Redis
    const stored = await client.get(cacheKey);
    if (!stored) return undefined;

    // Deserialize the entry
    const data = JSON.parse(stored);

    // Reconstruct the ReadableStream from stored data
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
  },

  async set(cacheKey, pendingEntry) {
    const entry = await pendingEntry;

    // Read the stream to get the data
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

    // Combine chunks and serialize for Redis storage
    const data = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));

    await client.set(
      cacheKey,
      JSON.stringify({
        value: data.toString('base64'),
        tags: entry.tags,
        stale: entry.stale,
        timestamp: entry.timestamp,
        expire: entry.expire,
        revalidate: entry.revalidate,
      }),
      { EX: entry.expire }, // Use Redis TTL for automatic expiration
    );
  },

  async refreshTags() {
    // No-op for basic Redis implementation
    // Could sync with external tag service if needed
  },

  async getExpiration(tags) {
    // Return 0 to indicate no tags have been revalidated
    // Could query Redis for tag expiration timestamps if tracking them
    return 0;
  },

  async updateTags(tags, durations) {
    // Implement tag-based invalidation if needed
    // Could iterate over keys with matching tags and delete them
  },
};
