import background from './common/background'

export const videoPlayerCarouselFields = /* groq */ `
  "id": _key,
  "type": _type,
  title,
  ingress,
  items[] {
    "id": _key,
    title,
    "video": {
      "title": videoFile->video.title,
      "url": videoFile->video.url,
      "thumbnail": videoFile->thumbnail,
    },
  },
  scrollMode,
  "designOptions": {
    "aspectRatio": coalesce(aspectRatio, '16:9'),
    ${background}
  },
`
