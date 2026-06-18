const linkSelectorFields = /* groq */ `
_type == "linkSelector" => {
  ...links::getLinkFields(link[0]),
  "label": coalesce(
    label,
    select(
      link[0]._type =="reference" || link[0]._type =="referenceToOtherLanguage" => 
        coalesce(link[0]->content->title, link[0]->title),
      "",
    ),
  ),
  "aria-label":ariaLabel,
  anchorReference,
}
`

export default linkSelectorFields
