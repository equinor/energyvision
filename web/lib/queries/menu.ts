export const menuQuery = /* groq */ `
*[_type == "subMenu"] {
  "id": _key,
  label,
  "group": group[]{
  	"id": _key,
  	label,
 		"links": links[]{
       "id": _key,
      "slug" :route->slug[$lang].current,
      label,
    }
  },
}`
