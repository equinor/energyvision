import { publishDateTimeQuery } from './news'
import markDefs from './common/blockEditorMarks'
import linkSelectorFields from './common/actions/linkSelectorFields'
import downloadableFileFields from './common/actions/downloadableFileFields'
import downloadableImageFields from './common/actions/downloadableImageFields'
import slugsForNews from './slugsForNews'

export const localNewsFields = /* groq */ `
  "id": _id,
  "updatedAt": _updatedAt,
  title,
  heroImage,
  "publishDateTime": ${publishDateTimeQuery},
  "slug": slug.current,
  ${slugsForNews('localNews')},
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

export const localNewsQuery = /* groq */ `
{
  "news": *[_type == "localNews" && slug.current == $slug] | order(${publishDateTimeQuery} desc) {
    _id, //used for data filtering
    "slug": slug.current,
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
    "template": _type,
    openGraphImage,
    "localNewsTag": localNewsTag->{
      ...
    },
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
    ${localNewsFields}
  },
}`

export const localNewsSlugsQuery = /* groq */ `
*[_type == "localNews" && defined(slug.current)][].slug.current
`
