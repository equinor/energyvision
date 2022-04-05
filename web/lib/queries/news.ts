import markDefs from './common/blockEditorMarks'
import linkSelectorFields from './common/actions/linkSelectorFields'
import downloadableFileFields from './common/actions/downloadableFileFields'
import downloadableImageFields from './common/actions/downloadableImageFields'

const allSlugsQuery = /* groq */ `
  "slugs": *[_type == 'news' && ^._id match _id + "*"] | order(_id asc)[0] {
    "allSlugs": *[_type == 'news' && _id match ^._id + "*"] {
       "slug": *[_type == 'news' && _id == ^._id][0].slug.current,
       "lang": _lang
    }
  }`

export const publishDateTimeQuery = /* groq */ `
  select(
    customPublicationDate == true =>
      publishDateTime,
      _createdAt
  )
`

export const newsFields = /* groq */ `
  "id": _id,
  "updatedAt": _updatedAt,
  title,
  heroImage,
  "publishDateTime": ${publishDateTimeQuery},
  "slug": slug.current,
  ${allSlugsQuery},
  ingress[]{
    ...,
    ${markDefs},
  },
  "iframe": iframe{
    title,
    frameTitle,
    url,
    "designOptions": {
      "aspectRatio": coalesce(aspectRatio, '16:9'),
      height,
    },
  },
`

export const allNewsQuery = /* groq */ `
*[_type == "news"] | order(${publishDateTimeQuery} desc) {
  ${newsFields}
}`

export const newsQuery = /* groq */ `
{
  "news": *[_type == "news" && slug.current == $slug] | order(${publishDateTimeQuery} desc) {
    _id, //used for data filtering
    "slug": slug.current,
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
    "template": _type,
    openGraphImage,
    "content": content[]{
      ...,
      _type == "pullQuote" => {
        "type": _type,
        "id": _key,
        author,
        authorTitle,
        image,
        quote,
        "designOptions": {
          "imagePosition": coalesce(imagePosition, 'right'),
        }
      },
      _type == "positionedInlineImage" => {
        ...,
        // For these images, we don't want crop and hotspot
        // because we don't know the aspect ratio
        "image": image{
          _type,
          "asset": asset,
          "alt": alt
        }
      },
      ${markDefs},
    },
    "relatedLinks": relatedLinks{
      title,
      heroImage,
      "links": links[]{
       ${linkSelectorFields},
       ${downloadableFileFields},
       ${downloadableImageFields},
    }
  },
    ${newsFields}
  },
  "latestNews": *[
      _type == "news" &&
      slug.current != $slug &&
      heroImage.image.asset != null &&
      _lang == $lang &&
      // filter drafts, will also filter when previewing
      !(_id in path("drafts.**"))
    ] | order(${publishDateTimeQuery} desc)[0...3] {
    ${newsFields}
  }
}`

export const newsSlugsQuery = /* groq */ `
*[_type == "news" && defined(slug.current)][].slug.current
`
