import { Flags } from '../helpers/datasetHelpers'
import { functions } from './common/functions'
import { fixPreviewForDrafts, sameLang } from './common/langAndDrafts'
import {
  contentForNewsQuery,
  iframeForNewsQuery,
  ingressForNewsQuery,
  relatedLinksForNewsQuery,
} from './common/newsSubqueries'
import {
  lastUpdatedTimeQuery,
  publishDateTimeQuery,
} from './common/publishDateTime'
import { inlineSlugsQuery } from './metaData'

export const excludeCrudeOilAssays =
  Flags.IS_DEV || Flags.IS_GLOBAL_PROD
    ? /* groq */ `!('crude-oil-assays' in tags[]->key.current) &&`
    : ''

const latestNewsFields = /* groq */ `
  "id": _id,
  "updatedAt": ${lastUpdatedTimeQuery},
  title,
  heroImage,
  "slugs":{${inlineSlugsQuery}},
  ${ingressForNewsQuery},
  "publishDateTime": ${publishDateTimeQuery},
  "slug": slug.current,
  "iframe": ${iframeForNewsQuery},
`

const newsFields = /* groq */ `
  "id": _id,
  "updatedAt": ${lastUpdatedTimeQuery},
  title,
  heroImage,
  "publishDateTime": ${publishDateTimeQuery},
  "slugs":{${inlineSlugsQuery}},
  ${ingressForNewsQuery},
  "iframe": ${iframeForNewsQuery},
  "content": ${contentForNewsQuery},
  "relatedLinks": ${relatedLinksForNewsQuery},
  "latestNews": *[
    _type == "news" &&
    slug.current != $slug &&
    heroImage.image.asset != null &&
    ${excludeCrudeOilAssays}
    ${sameLang}] | order(${publishDateTimeQuery} desc)[0...3] {
      ${latestNewsFields}
    }
`

export const newsQuery = /* groq */ `
  ${functions}
  *[_type == "news" && slug.current == $slug && ${fixPreviewForDrafts}] | order(${publishDateTimeQuery} desc) {
    _id, //used for data filtering
    "slug": slug.current,
    "slugs": {${inlineSlugsQuery}},
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
    "template": _type,
    openGraphImage,
    ${newsFields}
  }[0]
`

export const newsPromotionQuery = /* groq */ `
  *[(_type == "news" || _type == "localNews")
    && (
      count(tags[_ref in $tags[].id]) > 0
      ||
      count(countryTags[_ref in $countryTags[].id]) > 0
      ||
      localNewsTag._ref in $localNewsTags[].id
    )
    && ${sameLang})
  ] | order(${publishDateTimeQuery} desc)[0...3]{
    "type": _type,
    "id": _id,
    "updatedAt":  ${lastUpdatedTimeQuery},
    title,
    heroImage,
    "publishDateTime": ${publishDateTimeQuery},
    "slug": slug.current,
    ${ingressForNewsQuery},
  }
`
