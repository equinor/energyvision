export const footerQuery = /* groq */ `
 *[_type == "footer" && _lang == $lang][0] {
	footerColumns[]{
    "id": _key,
    "header": columnHeader, 
    "linkList": columnLinks[]{ 
      "type": _type,
      "id": _key,
        label,
        someType,
        "isStatic": coalesce(isStatic, false),
  	    "link": reference-> {
        "type": _type,
        "slug": slug.current,
      },
       url,
      "staticUrl": staticUrl,
      } 
    }
	}
`
