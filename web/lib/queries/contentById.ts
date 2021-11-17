import pageContentFields from './common/pageContentFields'
import { landingPageById } from './common/landingPageContentFields'
/* export const pageQueryById =  `
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
` */

export const contentQueryById = /* groq */ ` 
  *[_id == $id][0] {
    "title": title,
    "seoAndSome": {
      "documentTitle": seo.documentTitle,
          "metaDescription": seo.metaDescription,
          openGraphImage,
    },
    "heroImage": heroFigure,
    "template": _type,
     _type == "landingPage"=>{
        ${landingPageById}
    },
    _type == "page"=>{
      "content": content[]{
          ${pageContentFields}
      },
    },
  }
`
