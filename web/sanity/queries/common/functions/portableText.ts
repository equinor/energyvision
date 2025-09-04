export const markDefsFunction = /* groq */ `
fn portableText::markDefs($param) = $param{
 ...coalesce(markDefs[]{
  ...,
  _type == "reference_block" || _type == "homePageLink_block" || _type == "referenceToOtherLanguage_block" => {"internalLink" :links::getLinkFields(link[0]){ ..., "id":link.slug, "lang": link.lang}},
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
};
`
