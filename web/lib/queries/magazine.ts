import pageContentFields from './common/pageContentFields'

export const magazineQuery = /* groq */ `
*[_type == "magazine" && slug.current == $slug] {
    _id, //used for data filtering
    "slug": slug.current,
    "title": title,
    "seoAndSome": {
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
    openGraphImage,
    },
    "heroImage": heroFigure,
    "template": _type,
    "content": content[] {
          ${pageContentFields}
      },
}`
