import { publishDateTimeQuery } from '../../../../lib/queries/news'
import markDefs from '../blockEditorMarks'

const promotedMagazineFields = `
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
  "heroImage": heroFigure,
  openGraphImage,
  "heroType": coalesce(heroType, 'default'),
  "heroVideo": heroVideo.asset->{
    playbackId,
  },
`

export default `
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
      && _lang == $lang
      && (count(magazineTags[_ref in ^.^.tags[]._ref]) > 0)
      && !(_id in path("drafts.**"))
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
