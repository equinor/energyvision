import slugReference from '../slugReference'

const lang = /* groq */ `
  select(_type match 'route_*' =>
    content->lang,
    lang
  )
`

export const linkReferenceFields = /* groq */ `
  {
    "type": _type,
    "slug": ${slugReference},
    "lang": ${lang},
  }
`

const linkSelectorFields = /* groq */ `
_type == "linkSelector" => {
  "id": _key,
  "type": select(
    defined(url) => "externalUrl", "internalUrl"
  ),
  label,
  ariaLabel,
  "link": select(
    linkToOtherLanguage == true =>
      referenceToOtherLanguage->${linkReferenceFields},
      reference->${linkReferenceFields},
  ),
  "href": url,
  anchorReference,
}
`

export default linkSelectorFields
