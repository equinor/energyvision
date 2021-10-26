import slugReference from './slugReference'

export default `
  _type == "internalLink" => {
    "internalLink": reference->{
      name,
      "id": ${slugReference},
      "type": _type,
      "lang": coalesce(_lang, 'en_GB'),
    },
  }
`
