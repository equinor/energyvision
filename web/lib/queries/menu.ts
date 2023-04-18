import { sameLang } from './common/langAndDrafts'
import { publishDateTimeQuery } from './common/publishDateTime'

export const menuQuery = /* groq */ `
  *[_type == "siteMenu" && ${sameLang}] {
    _id,
    "subMenus": menuGroups[]->{
    "id": _id,
    "topLevelLink": {
      label,
  		"link": reference-> {
        "type": _type,
        "slug": slug.current,
      },
      "href": url,
    },
    "groups": group[]{
      "id": _key,
      label,
      "links": links[]{
          label,
         "id": _key,
         "link": route-> {
            "type": _type,
           "slug": slug.current,
         },

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
        "heroImage": select(
            content->heroType == 'loopingVideo' => { "image": content->heroLoopingVideo->thumbnail },
            content->heroFigure),
        "eventDate": content->eventDate,
        "location": content->location,
      }
    },
	}
}
`
