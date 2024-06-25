import slugReference from './slugReference'

const lang = /* groq */ `
  select(_type match 'route_*' =>
    content->lang,
    lang
  )
`

const referenceFields = /* groq */ `
  {
    "id": ${slugReference},
    "lang": ${lang},
    "type": _type,
  }
`

const markDefs = /* groq */ `
  "markDefs": markDefs[]{
    ...,
    _type == "internalLink" => {
      "internalLink": select(
        linkToOtherLanguage == true =>
          referenceToOtherLanguange->${referenceFields},
          reference->${referenceFields},
        )
    },
  }
`

export default markDefs
