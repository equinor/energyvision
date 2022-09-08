import { Flags } from '../../common/helpers/datasetHelpers'

const isStatic = Flags.IS_DEV ? '' : `"isStatic": isStatic,` // remove this after acceptance #986
const staticUrl = Flags.IS_DEV ? '' : `  "staticUrl": staticUrl,` // remove this after acceptance #986

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
        ${isStatic}
  	    "link": reference-> {
        "type": _type,
        "slug": slug.current,
      },
       url,
     ${staticUrl}
      }
    }
	}
`
