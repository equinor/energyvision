import { functions } from './common/functions'
import { sameLang } from './common/langAndDrafts'

export const footerAndErrorImageQuery = /* groq */ `
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
  },
  "errorImage": *[_type == "settings"]{backgroundImage}[0].backgroundImage,
}[0]
`
