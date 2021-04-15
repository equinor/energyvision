const newsFields = /* groq */ `
  "id": _id,
  "updatedAt": _updatedAt,
  title,
  heroImage,
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
    "content": content[]{
      ...,
      "markDefs": markDefs[]{
        ...,
        _type == "internalLink" => {
          "internalLink": reference->{
            name,
            "id": slug.current,
            "type": _type,
          },
        },
      }, 
    },
    "relatedLinks": relatedLinks{
  	title,
    heroImage,
  	"links": links[]{
      _type == "internalUrl" => {
      "type": _type,
      "id": _key,
      label,
      "link": reference-> {
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
  "latestNews": *[_type == "news" && slug.current != $slug] | order(date desc, _updatedAt desc) | [0...3] {
    ${newsFields}
  }
}`

export const newsSlugsQuery = `
*[_type == "news" && defined(slug.current)][].slug.current
`
