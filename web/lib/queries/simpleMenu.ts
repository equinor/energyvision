export const simpleMenuQuery = /* groq */ `
  *[_type == "simpleMenu" && _lang == $lang][0] {
	"groups": group[]{
      "id": _key,
      label,   
      "links": links[]{
          label,
          "isStatic": coalesce(isStatic, false),
         "id": _key,
         "link": route-> {
            "type": _type,
           "slug": slug.current,
         },
         
         "staticUrl": staticUrl,
       }
    },
}
`
