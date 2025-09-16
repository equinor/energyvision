import pageContentFields from './common/pageContentFields'
import { landingPageById } from './common/landingPageContentFields'
import { eventContentFields } from './common/eventContentFields'
import { heroFields } from './common/heroFields'
import { seoAndSomeFields } from './common/seoAndSomeFields'
import { functions, pageContentFunctions } from './common/functions'

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
    _type == "page" || _type == "homePage" => {
      "content": content[] {
        ${pageContentFields}
      },
    },
    _type == "event" => {
      "content": {
        ${eventContentFields}
      }
    },
  }
`
