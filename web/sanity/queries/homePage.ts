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
    "slugsFromTranslations": *[_type == "translation.metadata" && references(^._ref)].translations[].value->{
    "slug":"/",
    lang

  }`

export const homePageQuery = /* groq */ `
  fn ex::content($docRef)=$docRef{
    "_id": _ref, //used for data filtering
    "slug": "/",
    ${allSlugsQuery},
    "title": @->title,
    "seoAndSome": @->${seoAndSomeFields},
    ${stickyMenu},
    "hero": @->${heroFields},
    "template": @->_type,
    "isCampaign":@->isCampaign,
    "breadcrumbs": {
      ${breadcrumbsQuery}
    },
     "content": @->content[] {
          ${pageContentFields}
      },
  };
{
 "data": select(count(*[ _type =="translation.metadata"])>0 =>*[_type == "translation.metadata" && references(*[_id=="route_homepage" || _id=="drafts.route_homepage"][0].content._ref)][0].translations[_key==$lang][0] 
 {
   "pageData":ex::content(value)
  }, ex::content(*[_id=="route_homepage" || _id=="drafts.route_homepage"][0].content))
}
 {
  "pageData": data.pageData,
 "slugs":{
      "allSlugs" : select(count(data.slugsFromTranslations)> 0 => data.slugsFromTranslations, [data.currentSlug])
    }
  }
`
