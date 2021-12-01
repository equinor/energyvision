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
  "news": *[_type == "news" && slug.current == $slug] | order(_updatedAt desc)[0] {
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
    openGraphImage,
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
        },
      _type == "downloadableFile" => {
        "id": _key,
        "type": _type,
        "label": filename,
        "href": file.asset-> url,
        "extension": file.asset-> extension 
      },
      _type == "downloadableImage" => {
        "id": _key,
        "type": _type,
        label,
        "href": image.asset-> url, 
        "extension": image.asset-> extension 
      },
    }
  },
    ${newsFields}
  },
  "latestNews": *[_type == "news" && slug.current != $slug] | order(publishDateTime desc, _updatedAt desc)[0...3] {
    ${newsFields}
  }
}`

export const newsSlugsQuery = /* groq */ `
*[_type == "news" && defined(slug.current)][].slug.current
`

// @TODO: Don't know if we need the content key, it depends...
export const pageQuery = /* groq */ ` 
   *[_type match "page_*" && slug.current == $slug][0] {
     "seoAndSome": {
      "documentTitle": seo.documentTitle,
      "metaDescription": seo.metaDescription,
      openGraphImage,
     },
    title,
    "slug": slug.current,
    "content": content[]{
      _type == "teaser"=>{
        "type": _type,
        "id": _key,
        overline,
        title,
        text,
        "designOptions": {
          background,
          imagePosition,
          imageSize,
        },
        "action": {
          "label": linkLabel,
          "link": reference-> {
            "type": _type,
            "slug": slug.current
          },
          "href": url,
        },
        "image": image{
          ...,
          "extension": asset-> extension
        }  
      },
      _type == "textBlock"=>{
        "type": _type,
        "id": _key,
        overline,
        title,
        ingress,
        text,
        "designOptions": {
          background,
        },
      }
    }
  }
`
