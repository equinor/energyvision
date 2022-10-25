import pageContentFields from './common/pageContentFields'
import { landingPageById } from './common/landingPageContentFields'
import { eventContentFields } from './common/eventContentFields'
import linkSelectorFields from './common/actions/linkSelectorFields'
import { HeroTypes } from '../../pageComponents/shared/Hero/HeroTypes'

/* export const pageQueryById =  `
  *[_type == "page" && _id == $id][0] {
    "title": title,
    "seoAndSome": {
      "documentTitle": seo.documentTitle,
          "metaDescription": seo.metaDescription,
          openGraphImage,
    },
    "heroImage": heroFigure,
    "content": content[]{

      ${pageContentFields}
    }
  }
` */

export const contentQueryById = /* groq */ `
  *[_id in $id] {
    _id,
    "title": title,
    "seoAndSome": {
      "documentTitle": seo.documentTitle,
          "metaDescription": seo.metaDescription,
          openGraphImage,
    },
    "hero": {
      "type": coalesce(heroType, 'default'),
      "ratio": heroRatio,
      "title": heroTitle,
      "ingress": heroIngress,
      "link": heroLink[0]{
        ${linkSelectorFields}
      }
    },
    "background": background.title,
    "heroImage": heroFigure,
    "heroVideo": heroVideo.asset->{
      playbackId,
		},
    "template": _type,
     _type == "landingPage" => {
        ${landingPageById}
    },
    _type == "page" => {
      "content": content[]{
          ${pageContentFields}
      },
    },
    _type == "event" => {
      "content": {
        ${eventContentFields}
      }
    },
    _type == "magazine" => {
      "content": content[]{
          ${pageContentFields}
      },
    },
  }
`
