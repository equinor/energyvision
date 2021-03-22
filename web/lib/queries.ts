export const newsQuery = /* groq */ `
*[_type == "news"] | order(publishDateTime desc, _updatedAt desc) {
  "id": _id,
 title,
 "slug": slug.current,
}`
