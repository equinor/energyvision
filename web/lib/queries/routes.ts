import pageContentFields from './common/pageContentFields'
import { landingPageContentFields } from './common/landingPageContentFields'
import { eventContentFields } from './common/eventContentFields'
import linkSelectorFields from './common/actions/linkSelectorFields'
import { HeroTypes } from '../../pageComponents/shared/Hero/HeroTypes'

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
      "type": coalesce(content->heroType,'default'),
      "ratio": content->heroRatio,
      "title": content->heroTitle,
      "ingress": content->heroIngress,
      "link": content-> heroLink[0]{
        ${linkSelectorFields}
      },
    },
    "background": content->background.title,
    "heroImage": content->heroFigure,
    "heroVideo": content->heroVideo.asset->{
      playbackId,
		},
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
