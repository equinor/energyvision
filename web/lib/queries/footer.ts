export const footerQuery = /* groq */ `
  *[_type == "footer" && _lang == $lang][0] {
	footerColumns[]{
        _key,
        footerIcon,
        "header": columnHeader, 
        "linkList": columnLinks[]{ 
        "image":image,
        _key,
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
