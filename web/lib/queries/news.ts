import slugsForNewsAndMagazine from './slugsForNewsAndMagazine'
import { Flags } from '../../common/helpers/datasetHelpers'
import { noDrafts, sameLang, fixPreviewForDrafts } from './common/langAndDrafts'
import {
  contentForNewsQuery,
  iframeForNewsQuery,
  ingressForNewsQuery,
  relatedLinksForNewsQuery,
} from './common/newsSubqueries'
import { publishDateTimeQuery } from './common/publishDateTime'

const excludeCrudeOilAssays =
  Flags.IS_DEV || Flags.IS_GLOBAL_PROD ? /* groq */ `!('crude-oil-assays' in tags[]->key.current) &&` : ''

const latestNewsFields = /* groq */ `
  "id": _id,
  "updatedAt": _updatedAt,
  title,
  heroImage,
  ${slugsForNewsAndMagazine('news')},
  ${ingressForNewsQuery},
  "publishDateTime": ${publishDateTimeQuery},
  "slug": slug.current,
  "iframe": ${iframeForNewsQuery},
`

const newsFields = /* groq */ `
  "id": _id,
  "updatedAt": _updatedAt,
  title,
  heroImage,
  "publishDateTime": ${publishDateTimeQuery},
  ${slugsForNewsAndMagazine('news')},
  ${ingressForNewsQuery},
  "iframe": ${iframeForNewsQuery},
  "content": ${contentForNewsQuery},
  "relatedLinks": ${relatedLinksForNewsQuery},
  "latestNews": *[
    _type == "news" &&
    slug.current != $slug &&
    heroImage.image.asset != null &&
    ${excludeCrudeOilAssays}
    ${sameLang} && ${noDrafts}] | order(${publishDateTimeQuery} desc)[0...3] {
      ${latestNewsFields}
    }
`

export const newsQuery = /* groq */ `
  *[_type == "news" && slug.current == $slug && ${fixPreviewForDrafts}] | order(${publishDateTimeQuery} desc) {
    _id, //used for data filtering
    "slug": slug.current,
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
    "template": _type,
    openGraphImage,
    ${newsFields}
  }
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
    && ${sameLang} && ${noDrafts})
  ] | order(${publishDateTimeQuery} desc)[0...3]{
    "type": _type,
    "id": _id,
    "updatedAt": _updatedAt,
    title,
    heroImage,
    "publishDateTime": ${publishDateTimeQuery},
    "slug": slug.current,
    ${ingressForNewsQuery},
  }
`
