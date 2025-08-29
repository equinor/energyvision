const linkSelectorFields = /* groq */ `
_type == "linkSelector" => {
  ...links::getLinkFields(link[0]),
  label,
  ariaLabel,
  anchorReference,
}
`

export default linkSelectorFields
