import { eventContentFields } from './common/eventContentFields'
import { functions, pageContentFunctions } from './common/functions'
import { heroFields } from './common/heroFields'
import { landingPageById } from './common/landingPageContentFields'
import pageContentFields from './common/pageContentFields'
import { seoAndSomeFields } from './common/seoAndSomeFields'

export const pageInfoById = /* groq */ `
  *[_id == $id] {
    _id,
    lang,
    "template": _type,
  }[0]
`

export const contentQueryById = /* groq */ `
  ${functions}
  ${pageContentFunctions}
  *[_id == $id] {
    _id,
    "title": title,
    "seoAndSome": ${seoAndSomeFields},
    "hero": ${heroFields},
    "template": _type,
     _type == "landingPage" => {
      ${landingPageById}
    },
    _type == "page" || _type == "homePage" || _type == "magazine" => {
      "content": content[] {
        ${pageContentFields}
      },
    },
    _type == "event" => {
      "content": {
        ${eventContentFields}
      }
    },
  }[0]
`
