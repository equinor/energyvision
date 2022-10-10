export const newsroomQuery = /* groq */ `
  *[_type == "newsroom" && _lang == $lang] {
    _id,
    "seoAndSome": {
      "documentTitle": seo.documentTitle,
      "metaDescription": seo.metaDescription,
      openGraphImage,
      },
    title,
    ingress,
    backgroundImage
  }`
