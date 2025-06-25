const slugsForNewsAndMagazine = /* groq */ `
 "slugsFromTranslations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    "slug": slug.current,
    lang
 },
 "currentSlug" : {
  "slug": slug.current,
  lang
 }
`

export const querySuffixForNewsAndMagazine = /* groq */ `
{
    ...,
    "slugs": {
    "allSlugs": select(count(slugsFromTranslations) > 0 => slugsFromTranslations , [currentSlug])
    }
  }
`

export default slugsForNewsAndMagazine
