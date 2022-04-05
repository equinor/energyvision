export const footerQuery = /* groq */ `
 *[_type == "footer" && _lang == $lang] {
  _id,
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
