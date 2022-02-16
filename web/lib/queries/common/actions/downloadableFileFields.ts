const downloadableFileFields = /* groq */ `
_type == "downloadableFile" => {
    "id": _key,
    "type": _type,
    "label": filename,
    "href": fileReference->asset.asset->url,
    "extension": fileReference->asset.asset->extension,
    "fileName": fileReference->asset.asset->originalFilename
  }
`

export default downloadableFileFields
