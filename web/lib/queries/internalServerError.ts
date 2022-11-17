import { sameLang } from './common/langAndDrafts'

export const internalServerErrorQuery = /* groq */ `
  *[_type == "internalServerError" && ${sameLang}] {
    _id,
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
    ...,
  }
 `
