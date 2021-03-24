const newsFields = /* groq */ `
  "id": _id,
  title,
  publishDateTime,
  "slug": slug.current,
  ingress,
`

export const allNewsQuery = /* groq */ `
*[_type == "news"] | order(publishDateTime desc, _updatedAt desc) {
  ${newsFields}
}`

export const newsQuery = `
{
  "news": *[_type == "news" && slug.current == $slug] | order(_updatedAt desc) | [0] {
    content,
    ${newsFields}
  },
}`

export const newsSlugsQuery = `
*[_type == "news" && defined(slug.current)][].slug.current
`
