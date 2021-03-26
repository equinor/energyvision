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

export const newsQuery = /* groq */ `
{
  "news": *[_type == "news" && slug.current == $slug] | order(_updatedAt desc) | [0] {
    content,
    "relatedLinks": relatedLinks{
  	title,
  	"links": links[]{
      _type == "internalUrl" => {
      "type": _type,
      "id": _key,
      label,
      "link": reference -> {
        "type": _type,
        "slug": slug.current
    	},
    },
    _type == "externalUrl" => {
        "id": _key,
        "type": _type,
        label,
        "href": url,
      }
    }
  },
    ${newsFields}
  },
  "latestNews": *[_type == "news" && slug.current != $slug] | order(date desc, _updatedAt desc) | [0...2] {
    ${newsFields}
  }
}`

export const newsSlugsQuery = `
*[_type == "news" && defined(slug.current)][].slug.current
`
