import { sameLang, noDrafts } from './../langAndDrafts'
import markDefs from '../blockEditorMarks'
import { publishDateTimeQuery } from '../publishDateTime'
import { heroFields } from '../../common/heroFields'

const promotedMagazineFields = /* groq */ `
  "id": _id,
  "type": _type,
  ingress[]{
    ...,
    ${markDefs},
  },
  "slug": slug.current,
  "title": title[]{
    ...,
    ${markDefs},
  },
  "heroImage": select(
    heroType == 'loopingVideo' => { "image": heroLoopingVideo->thumbnail },
    heroFigure
  ),
  openGraphImage,
  "heroType": coalesce(heroType, 'default'),
  "hero": ${heroFields},
`

export default /* groq */ `
  "id": _key,
  manuallySelectArticles,
  !manuallySelectArticles => {
    "tags": tags[]->{
      "id": _id,
      key,
      title,
    },
    "promotions": *[
      _type == "magazine"
      && (count(magazineTags[_ref in ^.^.tags[]._ref]) > 0)
      && ${sameLang} && ${noDrafts}
    ] | order(${publishDateTimeQuery} desc)[0...3]{
      ${promotedMagazineFields}
    }
  },
  manuallySelectArticles => {
    "promotions": promotedArticles[]->{
      ${promotedMagazineFields}
    }
  },
`
