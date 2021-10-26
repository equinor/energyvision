const linkSelectorFields = /* groq */ `
_type == "downloadableFile" => {
    "id": _key,
    "type": _type,
    "label": filename,
    "href": file.asset-> url,
    "extension": file.asset-> extension, 
  }
`

export default linkSelectorFields
