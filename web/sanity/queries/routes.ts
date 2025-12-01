import { breadcrumbsQuery } from './common/breadcrumbs'
import { eventContentFields } from './common/eventContentFields'
import { functions, pageContentFunctions } from './common/functions'
import { heroFields } from './common/heroFields'
import { landingPageContentFields } from './common/landingPageContentFields'
import pageContentFields from './common/pageContentFields'
import { seoAndSomeFields } from './common/seoAndSomeFields'
import { stickyMenu } from './common/stickyMenu'

const allSlugsQuery = /* groq */ `
    "currentSlug": {
      "slug": slug.current,
      "lang":$lang
    },
    "slugsFromTranslations": *[_type == "translation.metadata" && references(^.content._ref)].translations[].value->{
    "slug":*[_type match "route*" && content._ref == ^._id][0].slug.current,
    lang
  }`
export const pageDataForHeaderQuery = /* groq */ `
  *[(_type match "route_" + $lang) && slug.current == $slug] {
    _id, //used for data filtering
    "slug": slug.current,
    ${allSlugsQuery},
    "title": content->title,
    "seoAndSome": content->${seoAndSomeFields},
    ${stickyMenu},
    "template": content->_type,
  }[0]{
    ...,
    "slugs":{
      "allSlugs" : select(count(slugsFromTranslations)> 0 => slugsFromTranslations, [currentSlug])
    }
  }
`

export const routeQuery = /* groq */ `
  ${functions}
  ${pageContentFunctions}
  *[(_type match "route_" + $lang) && slug.current == $slug] {
    _id, //used for data filtering
    "slug": slug.current,
    ${allSlugsQuery},
    "title": content->title,
    "seoAndSome": content->${seoAndSomeFields},
    ${stickyMenu},
    "hero": content->${heroFields},
    "template": content->_type,
    "breadcrumbs": {
      ${breadcrumbsQuery}
    },
    content->_type == "landingPage" => {
        ${landingPageContentFields}
    },
    content->_type == "page" || content->_type == "magazine"=> {
      "content": content->content[] {
          ${pageContentFields}
      },
    },
    content->_type == "event" => {
      "content": content->{
        ${eventContentFields}
      }
    },
  }[0]{
    ...,
    "slugs":{
      "allSlugs" : select(count(slugsFromTranslations)> 0 => slugsFromTranslations, [currentSlug])
    }
  }
`
