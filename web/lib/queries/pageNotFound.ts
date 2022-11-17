import { sameLang } from './common/langAndDrafts'

export const pageNotFoundQuery = /* groq */ `
  *[_type == "pageNotFound" && ${sameLang}] {
    _id,
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
    title,
    text,
    backgroundImage
  }
 `
