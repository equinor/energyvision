import pageContentFields from './common/pageContentFields'
import { heroFields } from './common/heroFields'
import { seoAndSomeFields } from './common/seoAndSomeFields'
import { breadcrumbsQuery } from './common/breadcrumbs'
import { stickyMenu } from './common/stickyMenu'

const allSlugsQuery = /* groq */ `
    "currentSlug": {
      "slug": "/",
      "lang":$lang
    },
    "slugsFromTranslations": *[_type == "translation.metadata" && references(^.value._ref)].translations[].value->{
    "slug":"/",
    lang
  }`

export const homePageQuery = /* groq */ `
  *[_type == "translation.metadata" && references(*[_id=="homepage" || _id=="drafts.homePage"][0].content._ref)].translations[_key==$lang] {
    "_id": value._ref, //used for data filtering
    "slug": "/",
    ${allSlugsQuery},
    "title": value->title,
    "seoAndSome": value->${seoAndSomeFields},
    ${stickyMenu},
    "hero": value->${heroFields},
    "template": value->_type,
    "isCampaign":value->isCampaign,
    "breadcrumbs": {
      ${breadcrumbsQuery}
    },
     "content": value->content[] {
          ${pageContentFields}
      },
  }{
    ...,
    "slugs":{
      "allSlugs" : select(count(slugsFromTranslations)> 0 => slugsFromTranslations, [currentSlug])
    }
  }
`
