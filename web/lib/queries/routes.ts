import pageContentFields from './common/pageContentFields'

const localizedSlugsFromEnglish = /* groq */ `
  "allSlugs": {
    "en_GB": slug.current,
    "nb_NO": *[_type == "route_nb_NO" && content._ref == ^.content._ref + "__i18n_nb_NO"][0].slug.current,
  }
`

const localizedSlugsFromNorwegian = /* groq */ `
  "allSlugs": {
    "en_GB": *[_type == "route_en_GB" && content._ref + "__i18n_nb_NO" == ^.content._ref][0].slug.current,
    "nb_NO": slug.current,
  }
`

export const pageQuery = /* groq */ ` 
  *[_type == "route_" + $lang && slug.current == $slug][0] {
    "slug": slug.current,
    $lang == "en_GB" => {
      ${localizedSlugsFromEnglish}
    },
    $lang == "nb_NO" => {
      ${localizedSlugsFromNorwegian}
    },
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
