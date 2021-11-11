

// API for Algolia stuff

// Push to Algolia index
type UpdateType = (indexName: string, value: string) => boolean
export const update: UpdateType = (indexName, value) => !!(indexName && value)
