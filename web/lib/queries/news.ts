import markDefs from './common/blockEditorMarks'
import linkSelectorFields from './common/actions/linkSelectorFields'
import downloadableFileFields from './common/actions/downloadableFileFields'
import downloadableImageFields from './common/actions/downloadableImageFields'
import slugsForNewsAndMagazine from './slugsForNewsAndMagazine'
import { defaultLanguage } from '../../languages'
import { Flags } from '../../common/helpers/datasetHelpers'

export const publishDateTimeQuery = /* groq */ `
  select(
    customPublicationDate == true =>
      publishDateTime,
      coalesce(firstPublishedAt, _createdAt)
  )
`

export const fixPreviewForDrafts = /* groq */ `
  ((defined(_lang) && _lang == $lang) || (!defined(_lang) && $lang == "${defaultLanguage.name}"))
`

const excludeCrudeOilAssays =
  Flags.IS_DEV || Flags.IS_GLOBAL_PROD ? /* groq */ `!('crude-oil-assays' in tags[]->key.current) &&` : ''

export const newsFields = /* groq */ `
  "id": _id,
  "updatedAt": _updatedAt,
  title,
  heroImage,
  "publishDateTime": ${publishDateTimeQuery},
  "slug": slug.current,
  ${slugsForNewsAndMagazine('news')},
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
  "news": *[_type == "news" && slug.current == $slug && ${fixPreviewForDrafts}] | order(${publishDateTimeQuery} desc) {
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
      ${excludeCrudeOilAssays}
      // filter drafts, will also filter when previewing
      !(_id in path("drafts.**"))
    ] | order(${publishDateTimeQuery} desc)[0...3] {
    ${newsFields}
  }
}`

export const newsSlugsQuery = /* groq */ `
*[_type == "news" && defined(slug.current)][].slug.current
`

export const newsPromotionQuery = `
  *[(_type == "news" || _type == "localNews")
    && _lang == $lang
    && (
      count(tags[_ref in $tags[].id]) > 0
      ||
      count(countryTags[_ref in $countryTags[].id]) > 0
      ||
      localNewsTag._ref in $localNewsTags[].id
    )
    && !(_id in path("drafts.**"))
  ] | order(${publishDateTimeQuery} desc)[0...3]{
    "type": _type,
    "id": _id,
    "updatedAt": _updatedAt,
    title,
    heroImage,
    "publishDateTime": ${publishDateTimeQuery},
    "slug": slug.current,
    ingress[]{
      ...,
      ${markDefs},
    },
  }
`
