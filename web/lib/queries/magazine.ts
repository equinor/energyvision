import pageContentFields from './common/pageContentFields'
import slugsForNewsAndMagazine from './slugsForNewsAndMagazine'

const promotedmagazineTags = `"": *[_id == "promoted-magazine-tags"][0]{"magazineTags":tags[]->title[$lang]}`
export const magazineQuery = /* groq */ `
*[_type == "magazine" && slug.current == $slug && _lang == $lang] {
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
    ${promotedmagazineTags},
    "content": content[] {
          ${pageContentFields}
      },
      ${slugsForNewsAndMagazine('magazine')},
}`

export const magazineIndexQuery = /* groq */ `
  *[_type == "magazineIndex" && _lang == $lang] {
    _id,
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
    openGraphImage,
    title,
    ingress,
    backgroundImage
  }`
