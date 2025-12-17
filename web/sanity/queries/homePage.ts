import { breadcrumbsQuery } from './common/breadcrumbs'
import { functions, pageContentFunctions } from './common/functions'
import { heroFields } from './common/heroFields'
import pageContentFields from './common/pageContentFields'
import { seoAndSomeFields } from './common/seoAndSomeFields'
import { stickyMenuOutSideContent } from './common/stickyMenu'

const homepageSlugsQuery = /* groq */ `
    "currentSlug": {
      "slug": "/",
      "lang":$lang
    },
    "translationSlugs": *[_type == "translation.metadata" && references(^._ref)].translations[].value->{
    "slug":"/",
    lang}`

export const homePageQuery = /* groq */ `
   ${functions}
   ${pageContentFunctions}
  fn ex::content($docRef)=$docRef{
    "_id": _ref, //used for data filtering
    "slug": "/",
    "slugs":{${homepageSlugsQuery}},
    "title": @->title,
    "seoAndSome": @->${seoAndSomeFields},
    ${stickyMenuOutSideContent},
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
}.pageData
`
