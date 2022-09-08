import { Flags } from '../../common/helpers/datasetHelpers'
import { publishDateTimeQuery } from './news'

const isStatic = Flags.IS_DEV ? '' : `"isStatic": coalesce(isStatic, false),` // remove this after acceptance #986
const staticUrl = Flags.IS_DEV ? '' : `  "staticUrl": staticUrl,` // remove this after acceptance #986

export const menuQuery = /* groq */ `
  *[_type == "siteMenu" && _lang == $lang] {
    _id,
    "subMenus": menuGroups[]->{
    "id": _id,
    "topLevelLink": {
      label,
     ${isStatic}
  		"link": reference-> {
        "type": _type,
        "slug": slug.current,
      },
      "href": url,
     ${staticUrl}
    },
    "groups": group[]{
      "id": _key,
      label,
      "links": links[]{
          label,
          ${isStatic}
         "id": _key,
         "link": route-> {
            "type": _type,
           "slug": slug.current,
         },

        ${staticUrl}
       }
    },
    intro,
    "featuredContent": featuredContent->{
      "type": _type,
      "id": _id,
      "slug": slug.current,

      _type == "news" => {
        title,
        heroImage,
        "publishDateTime": ${publishDateTimeQuery},
        ingress,
      },
      _type match "route_*" => {
        "routeContentType": content->_type,
        "title": content->title,
        "heroImage": content->heroFigure,
        "eventDate": content->eventDate,
        "location": content->location,
      }
    },
	}
}
`
