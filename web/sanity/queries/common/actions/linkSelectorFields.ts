const linkSelectorFields = /* groq */ `
_type == "linkSelector" => {
  ...links::getLinkFields(link[0]),
  label,
  "aria-label":ariaLabel,
  anchorReference,
}
`

export default linkSelectorFields
