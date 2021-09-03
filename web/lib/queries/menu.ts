export const menuQuery = /* groq */ `
  *[_type == "siteMenu" && _lang == $lang][0] {
	"subMenus": group[]{
  	"id": _key,
    "topLevelLink": {
      label,
      "isStatic": coalesce(isStatic, false),
  		"link": reference-> {
        "type": _type,
        "slug": slug.current,
      },
      "href": url,
      "staticUrl": staticUrl,
    },
    "group": group[]{
      "id": _key,
      "topLevelLink": {
        label,
        isStatic,
      },
     
      "links": links[]{
         "id": _key,
        "slug": route->slug.current,
        label,
      ...,
      }
    },
	}
}
`
