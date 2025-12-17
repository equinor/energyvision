import { functions } from './common/functions/functions'
import { fixPreviewForDrafts } from './common/langAndDrafts'
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

const localNewsFields = /* groq */ `
  "id": _id,
  "updatedAt":  ${lastUpdatedTimeQuery},
  title,
  heroImage,
  "slugs":{${inlineSlugsQuery}},
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
 ${functions}
  *[_type == "localNews" && slug.current == $slug && ${fixPreviewForDrafts}] | order(${publishDateTimeQuery} desc) {
    _id, //used for data filtering
    "slug": slug.current,
    "slugs":{${inlineSlugsQuery}},
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
    "template": _type,
    openGraphImage,
    ${localNewsFields}
  }
`
