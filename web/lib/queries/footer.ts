import { sameLang } from './common/langAndDrafts'

export const footerQuery = /* groq */ `
 *[_type == "footer" && ${sameLang}] {
  _id,
	footerColumns[]{
    "id": _key,
    "header": columnHeader,
    "linkList": columnLinks[]{
      "type": _type,
      "id": _key,
        label,
        someType,
  	    "link": reference-> {
        "type": _type,
        "slug": slug.current,
      },
      url,
    }
  }
}
`
