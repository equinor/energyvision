import { seoAndSomeFields } from './common/seoAndSomeFields'

export const newsroomQuery = /* groq */ `
  *[_type == "newsroom" && _lang == $lang] {
    _id,
    "seoAndSome": ${seoAndSomeFields},
    title,
    ingress,
    backgroundImage
  }`
