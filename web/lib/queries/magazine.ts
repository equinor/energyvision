import { heroFields } from './common/heroFields'
import pageContentFields from './common/pageContentFields'
import slugsForNewsAndMagazine, { querySuffixForNewsAndMagazine } from './slugsForNewsAndMagazine'
import linkSelectorFields from './common/actions/linkSelectorFields'
import downloadableFileFields from './common/actions/downloadableFileFields'
import downloadableImageFields from './common/actions/downloadableImageFields'
import markDefs from './common/blockEditorMarks'
import { seoAndSomeFields } from './common/seoAndSomeFields'
import { sameLang, fixPreviewForDrafts, noDrafts } from './common/langAndDrafts'

const footerComponentFields = /* groq */ `
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
  "actions": [action[0]]{
    ${linkSelectorFields},
    ${downloadableFileFields},
    ${downloadableImageFields},
  },
`

const promotedmagazineTags = /* groq */ `"": *[_type == "magazineIndex" && ${sameLang} && ${noDrafts}][0] {"magazineTags":promotedMagazineTags[]->title[$lang]}`

export const magazineQuery = /* groq */ `
*[_type == "magazine" && slug.current == $slug && ${fixPreviewForDrafts}] {
    _id, //used for data filtering
    "slug": slug.current,
    "title": title,
    "seoAndSome": ${seoAndSomeFields},
    "hero": ${heroFields},
    "template": _type,
    ${promotedmagazineTags},
    "content": content[] {
          ${pageContentFields}
      },
      ${slugsForNewsAndMagazine},
    "footerComponent": *[_type == 'magazineIndex' && ${sameLang} && ${noDrafts}][0]{
      "data": footerComponent{
        ${footerComponentFields}
      }
    },
    hideFooterComponent,
}${querySuffixForNewsAndMagazine}`

export const magazineIndexQuery = /* groq */ `
  *[_type == "magazineIndex" && ${sameLang}] {
    _id,
    "seoAndSome": ${seoAndSomeFields},
    title,
    "hero": ${heroFields},
    "ingress": {
      "content": ingress[]{
        ...,
        ${markDefs},
      },
      "background": coalesce(ingressBackground.title, 'White'),
    },
    "magazineTags": promotedMagazineTags[]->title[$lang],
    "footerComponent": footerComponent{
      ${footerComponentFields}
    }
  }`
