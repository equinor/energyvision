import { breadcrumbsQuery } from './common/breadcrumbs'
import { eventContentFields } from './common/eventContentFields'
import { functions, pageContentFunctions } from './common/functions'
import { heroFields } from './common/heroFields'
import { landingPageContentFields } from './common/landingPageContentFields'
import pageContentFields from './common/pageContentFields'
import { seoAndSomeFields } from './common/seoAndSomeFields'
import { stickyMenu } from './common/stickyMenu'
import { contentRefSlugsQuery } from './metaData'

export const routeQuery = /* groq */ `
  ${functions}
  ${pageContentFunctions}
  *[(_type match "route_" + $lang) && slug.current == $slug] {
    _id, //used for data filtering
    "slug": slug.current,
    "slugs":{${contentRefSlugsQuery}},
    //"title": content->title,
    "title": select(
      content->heroType == 'fiftyFifty' => content->richTitle,
      content->heroType == 'fullWidthImage' => content->richTitle,
      content->heroType == 'backgroundImage' => content->richTitle,
      content->title),
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
  }[0]
`
