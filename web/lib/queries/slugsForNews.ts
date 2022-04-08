type SlugsForNewsType = 'news' | 'localNews'

const slugsForNews = (type: SlugsForNewsType) => {
  const groqType = "'" + type + "'"

  return /* groq */ `
    "slugs": *[_type == ${groqType} && ^._id match _id + "*"] | order(_id asc)[0] {
      "allSlugs": *[_type == ${groqType} && _id match ^._id + "*" && !(_id in path("drafts.**"))] {
        "slug": *[_type == ${groqType} && _id == ^._id][0].slug.current,
        "lang": _lang
      }
    }`
}

export default slugsForNews
