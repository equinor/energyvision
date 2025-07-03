const markDefs = /* groq */ `
"markDefs" : coalesce(markDefs[]{
  ...,
  _type == "reference_block" || _type == "homePageLink_block" || _type == "referenceToOtherLanguage_block" => {"internalLink" :links::getLinkFields(link[0]){ ..., "id":link.slug, "lang": link.lang}}
},[])
`

export default markDefs
