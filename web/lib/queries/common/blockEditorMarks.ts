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
  "markDefs": coalesce(markDefs[]{
      ...,
      _type == "internalLink" => {
        "internalLink": select(
          linkToOtherLanguage == true =>
            referenceToOtherLanguange->${referenceFields}, 
          reference->${referenceFields},
        )
    },
    _type == "attachment" => {
        "attachment": {
          "id": _key,
          "type": _type,
          "href": reference->asset.asset->url,
          "extension": reference->asset.asset->extension,
          "fileName": reference->asset.asset->originalFilename
        }
    }
    },[])
`

export default markDefs
