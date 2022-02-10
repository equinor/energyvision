import markDefs from './common/blockEditorMarks'
import linkSelectorFields from './common/actions/linkSelectorFields'
import downloadableFileFields from './common/actions/downloadableFileFields'
import downloadableImageFields from './common/actions/downloadableImageFields'

export const newsFields = /* groq */ `

  "id": _id,
  "updatedAt": _updatedAt,
  title,
  heroImage,
  "publishDateTime": coalesce(publishDateTime, _createdAt),
  "slug": slug.current,
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
*[_type == "news"] | order(publishDateTime desc, _updatedAt desc) {
  ${newsFields}
}`

export const newsQuery = /* groq */ `
{
  "news": *[_type == "news" && slug.current == $slug] | order(_updatedAt desc) {
    _id, //used for data filtering
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
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
      // filter drafts so it works similarly in sanity preview
      !(_id in path("drafts.**")) &&
      // ok to hardcode because news' langs are not dynamic
      ($lang == 'en_GB' && length(_id) == 36 || _lang == 'nb_NO')
    ] | order(publishDateTime desc, _updatedAt desc)[0...3] {
    ${newsFields}
  }
}`

export const newsSlugsQuery = /* groq */ `
*[_type == "news" && defined(slug.current)][].slug.current
`

// @TODO: why does the 'match' filter in groq not work here?
// "&& _id match $id" where $id = the base id without __i18n
export const queryLocalizedNewsById = /* groq */ `
*[_type == "news" && !(_id in path("drafts.**")) && _id == $id_en || _id == $id_no] {
  "slug": slug.current,
  "lang": _lang,
}
`
