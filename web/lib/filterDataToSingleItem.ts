/* eslint-disable @typescript-eslint/no-explicit-any */ // This is work in progress with the preview

export function filterDataToSingleItem(data: any, preview: any) {
  if (!Array.isArray(data)) {
    return data
  }

  return data.length > 1 && preview
    ? data.filter((item) => {
        return item._id.startsWith('drafts.')
      })[0]
    : data[0]
}
