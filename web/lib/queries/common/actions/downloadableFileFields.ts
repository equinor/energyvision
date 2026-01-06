const downloadableFileFields = /* groq */ `
_type == "downloadableFile" => {
    "id": _key,
    "type": _type,
    "label": filename,
    "file": fileReference->asset.asset->{
      url,
      extension,
      originalFilename,
      title,
    }
  }
`

export default downloadableFileFields
