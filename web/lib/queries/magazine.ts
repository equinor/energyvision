import pageContentFields from './common/pageContentFields'
import slugsForNewsAndMagazine from './slugsForNewsAndMagazine'
import linkSelectorFields from './common/actions/linkSelectorFields'
import downloadableFileFields from './common/actions/linkSelectorFields'
import downloadableImageFields from './common/actions/linkSelectorFields'
import markDefs from './common/blockEditorMarks'

const promotedmagazineTags = `"": *[_type == "magazineIndex" && _lang == $lang][0] {"magazineTags":promotedMagazineTags[]->title[$lang]}`
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
    "hero": {
      "type": heroType,
      "ratio": heroRatio,
    },
    "bannerTitle":bannerTitle,
    "bannerIngress":bannerIngress,
    "action":  action[0]{
      ${linkSelectorFields},
      ${downloadableFileFields},
      ${downloadableImageFields},
    },
    "background":background.title,
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
    backgroundImage,
    "magazineTags":promotedMagazineTags[]->title[$lang],
    "footerComponent": footerComponent{
      title,
      text[]{
        ...,
        ${markDefs},
      },
      "designOptions": {
        "background": coalesce(background.title, 'White'),
        "imagePosition": coalesce(imagePosition, 'left'),
      },
      "image": image{
        ...,
        "extension": asset-> extension
      },
      "action": action[0]{
        ${linkSelectorFields},
        ${downloadableFileFields},
        ${downloadableImageFields},
      },
    }
  }`
