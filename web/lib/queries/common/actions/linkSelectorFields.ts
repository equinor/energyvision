import slugReference from '../slugReference'

const linkSelectorFields = /* groq */ `
_type == "linkSelector" => {
  "id": _key,
  "type": select(
    defined(url) => "externalUrl", "internalUrl"
  ),
  label,
  ariaLabel,
  "link": reference-> {
    "type": _type,
    "slug": ${slugReference}
  },
  "href": url,
  anchorReference,
}
`

export default linkSelectorFields
