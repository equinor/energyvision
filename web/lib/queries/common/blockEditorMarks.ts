const markDefs = /* groq */ `
"markDefs" : coalesce(markDefs[]{
  ...,
  _type == "reference" || _type == "homePageLink" || _type == "referenceOtherLang"=> {"internalLink" :links::getLinkFields(@){ ..., "id":link.slug, "lang": link.lang}}
})
`

export default markDefs
