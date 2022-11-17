import { noDrafts } from './common/langAndDrafts'

type SlugsForNewsAndMagazineType = 'news' | 'localNews' | 'magazine'

const slugsForNewsAndMagazine = (type: SlugsForNewsAndMagazineType) => {
  const groqType = "'" + type + "'"

  return /* groq */ `
    "slugs": *[_type == ${groqType} && ^._id match _id + "*"] | order(_id asc)[0] {
      "allSlugs": *[_type == ${groqType} && _id match ^._id + "*" && ${noDrafts}] {
        "slug": *[_type == ${groqType} && _id == ^._id][0].slug.current,
        "lang": _lang
      }
    }`
}

export default slugsForNewsAndMagazine
