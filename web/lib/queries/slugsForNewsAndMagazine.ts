const slugsForNewsAndMagazine = /* groq */ ` "slugs": {
      "allSlugs": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    "slug": slug.current,
    lang
  }
    }
    `

export default slugsForNewsAndMagazine
