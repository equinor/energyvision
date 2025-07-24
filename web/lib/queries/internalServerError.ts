import { functions } from './common/functions/functions'
import { sameLang } from './common/langAndDrafts'

export const internalServerErrorQuery = /* groq */ `
 ${functions}
  *[_type == "internalServerError" && ${sameLang}] {
    _id,
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
    ...,
  }
 `
