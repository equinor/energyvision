export const pageNotFoundQuery = /* groq */ `
  *[_type == "pageNotFound"  && _lang == $lang][0] {
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
    ...,
    }
 `
