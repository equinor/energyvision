export const footerQuery = /* groq */ `
  *[_type == "footer" && _lang == $lang][0] {
	footerColumns[]{
        _key,
        "header": columnHeader, 
        "linkList": columnLinks[]{ 
        label,
        "isStatic": coalesce(isStatic, false),
  	    "link": reference-> {
        "type": _type,
        "slug": slug.current,
      },
       url,
      "staticUrl": staticUrl,} 
      }
   
	}

`
