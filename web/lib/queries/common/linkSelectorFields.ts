import slugReference from './slugReference'

const linkSelectorFields = /* groq */ `
_type == "linkSelector" => {
  "id": _key,
  "type": select(
    defined(url) => "externalUrl", "internalUrl"
  ),
  label,
  ariaLabel,
  "isStatic": coalesce(isStatic, false),
  "link": reference-> {
    "type": _type,
    "slug": ${slugReference}
  },
  "href": url,
  "staticUrl": staticUrl,
}
`

export default linkSelectorFields
