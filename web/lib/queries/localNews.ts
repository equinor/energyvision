import slugsForNewsAndMagazine from './slugsForNewsAndMagazine'
import {
  contentForNewsQuery,
  iframeForNewsQuery,
  ingressForNewsQuery,
  relatedLinksForNewsQuery,
} from './common/newsSubqueries'
import { publishDateTimeQuery } from './common/publishDateTime'
import { fixPreviewForDrafts } from './common/langAndDrafts'

const localNewsFields = /* groq */ `
  "id": _id,
  "updatedAt": _updatedAt,
  title,
  heroImage,
  ${slugsForNewsAndMagazine('localNews')},
  ${ingressForNewsQuery},
  "publishDateTime": ${publishDateTimeQuery},
  "iframe": ${iframeForNewsQuery},
  "content": ${contentForNewsQuery},
  "relatedLinks": ${relatedLinksForNewsQuery},
  "localNewsTag": localNewsTag->{
    ...
  },
`

export const localNewsQuery = /* groq */ `
  *[_type == "localNews" && slug.current == $slug && ${fixPreviewForDrafts}] | order(${publishDateTimeQuery} desc) {
    _id, //used for data filtering
    "slug": slug.current,
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
    "template": _type,
    openGraphImage,
    ${localNewsFields}
  }
`
