import pageContentFields from './common/pageContentFields'

// @TODO: This should definitely not be duplicated across languages like this, but we are working with Sanity to figure
// out why the preview plugin doesn't work with param locale
export const pageQueryEn = /* groq */ ` 
   *[_type == "route" && slug.en_GB.current == $slug][0] {
    "slug": slug.en_GB.current,
    "allSlugs": slug,
    "title": content.en_GB->title,
    "seoAndSome": content.en_GB->{
      "documentTitle": seo.documentTitle,
          "metaDescription": seo.metaDescription,
          openGraphImage,
    },
    "heroImage": content.en_GB->heroFigure,
    "content": content.en_GB->content[]{
        
      ${pageContentFields}
    }
  }
`

export const pageQueryNo = /* groq */ ` 
   *[_type == "route" && slug.nb_NO.current == $slug][0] {
    "slug": slug.nb_NO.current,
    "allSlugs": slug,
    "title": content.nb_NO->title,
    "seoAndSome": content.nb_NO->{
      "documentTitle": seo.documentTitle,
          "metaDescription": seo.metaDescription,
          openGraphImage,
    },
    "heroImage": content.nb_NO->heroFigure,
    "content": content.nb_NO->content[]{
        
      ${pageContentFields}
    }
  }
`
