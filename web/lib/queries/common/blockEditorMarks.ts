import slugReference from './slugReference'

const lang = `
  select(_type match 'route_*' =>
    content->_lang,
    _lang
  )
`

const referenceFields = `
  {
    "id": ${slugReference},
    "lang": ${lang},
    "type": _type,
  }
`

const markDefs = `
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
