import { functions } from './common/functions'
import { sameLang } from './common/langAndDrafts'

export const footerQuery = /* groq */ `
${functions}
 *[_type == "footer" && ${sameLang}] {
  _id,
	footerColumns[]{
    "id": _key,
    "header": columnHeader,
    "linkList": columnLinks[]{
      "type": _type,
      "id": _key,
        label,
  	    ...links::getLinkFields(link[0]),
    }
  }
}[0]
`
