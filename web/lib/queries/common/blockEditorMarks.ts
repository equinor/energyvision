import slugReference from './slugReference'

const markDefs = `
  "markDefs": markDefs[]{
    ...,
    _type == "internalLink" => {
      "internalLink": reference->{
        name,
        "id": ${slugReference},
        "type": _type,
        "lang": _lang,
      },
    },
  }
`

export default markDefs
