import pageContentFields from './common/pageContentFields'

export const pageQueryById = /* groq */ `
  *[_type == "page" && _id == $id][0] {
    "title": title,
    "seoAndSome": {
      "documentTitle": seo.documentTitle,
          "metaDescription": seo.metaDescription,
          openGraphImage,
    },
    "heroImage": heroFigure,
    "content": content[]{
        
      ${pageContentFields}
    }
  }
`
