const downloadableFileFields = /* groq */ `
_type == "downloadableFile" => {
    "id": _key,
    "type": _type,
    "label": filename,
    "fileId": fileReference->asset.asset->_id,
    "extension": fileReference->asset.asset->extension,
    "fileName": fileReference->asset.asset->originalFilename
  }
`

export default downloadableFileFields
