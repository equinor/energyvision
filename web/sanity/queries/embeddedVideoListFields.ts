export const embeddedVideoListFields = /* groq */ `
  "id": _key,
  "type": _type,
  title,
  hideTitle,
  ingress,
  cookiePolicy,
  gridColumns,
  items[] {
    "id": _key,
    title,
    videoId,
    highlighted,
  },
`;
