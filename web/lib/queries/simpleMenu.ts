import { sameLang } from './common/langAndDrafts'

export const simpleMenuQuery = /* groq */ `
  *[_type == "simpleMenu" && ${sameLang}] {
    _id,
	  "groups": group[]{
      "id": _key,
      label,
      "type": _type,
      "readMoreLink": readMoreLink{label, "link":route-> {"type":_type, "slug": slug.current }},
      "links": links[]{
          label,
         "id": _key,
         "link": route-> {
            "type": _type,
           "slug": slug.current,
         },
      },
      "link": route-> {
            "type": _type,
           "slug": slug.current,
         },
    },
}
`
