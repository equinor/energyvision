import { noDrafts } from './common/langAndDrafts'
import pageContentFields from './common/pageContentFields'
import { landingPageContentFields } from './common/landingPageContentFields'
import { eventContentFields } from './common/eventContentFields'
import { heroFields } from './common/heroFields'
import { seoAndSomeFields } from './common/seoAndSomeFields'

const allSlugsQuery = /* groq */ `
  "slugs": *[_type in ['page', 'landingPage', 'event'] && ^.content._ref match _id + "*"] | order(_id asc)[0] {
    "allSlugs": *[_type in ['page', 'landingPage', 'event'] && _id match ^._id + "*" && ${noDrafts}] {
       "slug": *[_type match "route*" && content._ref == ^._id][0].slug.current,
       "lang": _lang
    }
  }`

export const routeQuery = /* groq */ `
  *[(_type match "route_" + $lang + "*") && slug.current == $slug] {
    _id, //used for data filtering
    "slug": slug.current,
    ${allSlugsQuery},
    "title": content->title,
    "seoAndSome": content->${seoAndSomeFields},
    "hero": content->${heroFields},
    "template": content->_type,
     content->_type == "landingPage" => {
        ${landingPageContentFields}
    },
    content->_type == "page" || content->_type == "magazine" => {
      "content": content->content[] {
          ${pageContentFields}
      },
    },
    content->_type == "event" => {
      "content": content->{
        ${eventContentFields}
      }
    },
  }
`
