const downloadableImageFields = /* groq */ `
_type == "downloadableImage" => {
    "id": _key,
    "type": _type,
    label,
    "file": image.asset->{
      url,
      extension,
      originalFilename,
      title,
    }
  }
`

export default downloadableImageFields
