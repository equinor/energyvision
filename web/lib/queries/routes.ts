import pageContentFields from './common/pageContentFields'

export const pageQuery = /* groq */ ` 
  *[_type == "route_" + $lang && slug.current == $slug][0] {
    "slug": slug.current,
    "title": content->title,
    "seoAndSome": content->{
      "documentTitle": seo.documentTitle,
          "metaDescription": seo.metaDescription,
          openGraphImage,
    },
    "heroImage": content->heroFigure,
    "content": content->content[]{
        
      ${pageContentFields}
    }
  }
`
