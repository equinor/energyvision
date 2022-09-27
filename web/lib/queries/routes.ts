import pageContentFields from './common/pageContentFields'
import { landingPageContentFields } from './common/landingPageContentFields'
import { eventContentFields } from './common/eventContentFields'
import linkSelectorFields from './common/actions/linkSelectorFields'
import downloadableFileFields from './common/actions/linkSelectorFields'
import downloadableImageFields from './common/actions/linkSelectorFields'

const allSlugsQuery = /* groq */ `
  "slugs": *[_type in ['page', 'landingPage', 'event'] && ^.content._ref match _id + "*"] | order(_id asc)[0] {
    "allSlugs": *[_type in ['page', 'landingPage', 'event'] && _id match ^._id + "*" && !(_id in path("drafts.**"))] {
       "slug": *[_type match "route*" && content._ref == ^._id][0].slug.current,
       "lang": _lang
    }
  }`

export const pageQuery = /* groq */ `
  *[(_type match "route_" + $lang + "*") && slug.current == $slug] {
    _id, //used for data filtering
    "slug": slug.current,
    ${allSlugsQuery},
    "title": content->title,
    "seoAndSome": content->{
      "documentTitle": seo.documentTitle,
          "metaDescription": seo.metaDescription,
          openGraphImage,
    },
    "hero": {
      "type": content->heroType,
      "ratio": content->heroRatio,
    },
    "bannerTitle":content->bannerTitle,
    "bannerIngress":content->bannerIngress,
    "action":content-> action[0]{
      ${linkSelectorFields},
      ${downloadableFileFields},
      ${downloadableImageFields},
    },
    "background":content->background.title,
    "heroImage": content->heroFigure,
    "template": content->_type,
     content->_type == "landingPage" => {
        ${landingPageContentFields}
    },
    content->_type == "page" => {
      "content": content->content[] {
          ${pageContentFields}
      },
    },
    content->_type == "event" => {
      "content": content->{
        ${eventContentFields}
      }
    },
    content->_type == "magazine" => {
      "content": content->content[] {
          ${pageContentFields}
      },
    },
  }
`
