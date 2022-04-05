/* eslint-disable @typescript-eslint/no-explicit-any */
export function filterDataToSingleItem(data: any, preview: any) {
  if (!Array.isArray(data)) return data

  /**
   * Data may contain draft documents in it.
   * We should filter out irrelevant documents.
   * Drafts are relevant only when in preview mode.
   */
  return preview
    ? data.find((item) => item._id.startsWith('drafts.')) ?? data[0]
    : data.find((item) => !item._id.startsWith('drafts.')) ?? null
}
