import { noDrafts } from './common/langAndDrafts'
import pageContentFields from './common/pageContentFields'
import { landingPageContentFields } from './common/landingPageContentFields'
import { eventContentFields } from './common/eventContentFields'
import { heroFields } from './common/heroFields'
import { seoAndSomeFields } from './common/seoAndSomeFields'
import { breadcrumbsQuery } from './common/breadcrumbs'

const allSlugsQuery = /* groq */ `
  "slugs":{
    "allSlugs": *[_type == "translation.metadata" && references(^.content._ref)].translations[].value->{
    "slug":*[_type match "route*" && content._ref == ^._id][0].slug.current,
    lang
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
    content->_type == "page" => {
      "isCampaign":content->isCampaign
    },
    "breadcrumbs": {
      ${breadcrumbsQuery}
    },
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
