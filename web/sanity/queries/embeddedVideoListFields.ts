export const embeddedVideoListFields = /* groq */ `
  "id": _key,
  "type": _type,
  title,
  ingress,
  cookiePolicy,
  items[] {
    "id": _key,
    title,
    videoId,
    highlighted,
  },
`
