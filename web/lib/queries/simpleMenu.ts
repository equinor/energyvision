export const simpleMenuQuery = /* groq */ `
  *[_type == "simpleMenu" && _lang == $lang][0] {
	"subMenus": menuGroups[]->{
  	"id": _id,
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
}
`
