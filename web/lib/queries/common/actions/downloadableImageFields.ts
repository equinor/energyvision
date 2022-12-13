const downloadableImageFields = /* groq */ `
_type == "downloadableImage" => {
    "id": _key,
    "type": _type,
    label,
    "href": image.asset->url,
    "extension": image.asset->extension,
  }
`

export default downloadableImageFields
