import slugReference from '../slugReference'
import { Flags } from '../../../../common/helpers/datasetHelpers'

const isStatic = Flags.IS_DEV ? '' : `"isStatic": coalesce(isStatic, false),` // remove this after acceptance #986
const staticUrl = Flags.IS_DEV ? '' : `  "staticUrl": staticUrl,` // remove this after acceptance #986

const linkSelectorFields = /* groq */ `
_type == "linkSelector" => {
  "id": _key,
  "type": select(
    defined(url) => "externalUrl", "internalUrl"
  ),
  label,
  ariaLabel,
  ${isStatic}
  "link": reference-> {
    "type": _type,
    "slug": ${slugReference}
  },
  "href": url,
  ${staticUrl}
  anchorReference,
}
`

export default linkSelectorFields
