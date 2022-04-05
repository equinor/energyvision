export const pageNotFoundQuery = /* groq */ `
  *[_type == "pageNotFound" && _lang == $lang] {
    _id,
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
    title,
    text,
    backgroundImage
    }
 `
