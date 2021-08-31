export const menuQuery = /* groq */ `
  *[_type == "siteMenu" && _lang == $lang] {
	"subMenus": group[]{
  	"id": _key,
  	label,
    "group": group[]{
      "id": _key,
      label,
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
