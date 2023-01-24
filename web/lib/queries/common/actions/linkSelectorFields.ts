import slugReference from '../slugReference'

const lang = /* groq */ `
  select(_type match 'route_*' =>
    content->_lang,
    _lang
  )
`

export const linkReferenceFields = /* groq */ `
  {
    "type": _type,
    "slug": ${slugReference},
    "lang": ${lang},
  }
`

export const linkSelector = /* groq */ `
  "link": select(
    link.linkToOtherLanguage == true =>
      link.referenceToOtherLanguage->${linkReferenceFields},
      link.reference->${linkReferenceFields},
  )
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
