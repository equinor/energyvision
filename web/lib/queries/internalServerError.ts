export const internalServerErrorQuery = /* groq */ `
  *[_type == "internalServerError"  && _lang == $lang] {
    _id,
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
    ...,
    }
 `
