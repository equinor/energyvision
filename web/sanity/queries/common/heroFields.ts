import linkSelectorFields from './actions/linkSelectorFields'

export const heroFields = /* groq */ `{
    "type": coalesce(heroType, 'default'),
    "ratio": heroRatio,
    "isBigTitle":isBigTitle,
    "heroTitle": heroTitle,
    heroType == 'fiftyFifty' && isBigTitle => {
      "heroTitle" : heroBigTitleFiftyFifty,
    },
    heroType == "default" && isBigTitle => {
      "heroTitle" : heroBigTitleDefault,
    },
    "ingress": heroIngress,
    "background": coalesce(heroBackground.key, 'white-100'),
    "figure":  select(
      heroType == 'loopingVideo' => { "image": heroLoopingVideo->thumbnail},
      heroFigure),
    "loopingVideo": {
      "title": heroLoopingVideo->video.title,
      "poster": heroLoopingVideo->thumbnail,
      "src": heroLoopingVideo->video.url,
      "ratio": heroLoopingVideoRatio,
      containVideo,
    },
    "link": heroLink[0]{
      ${linkSelectorFields}
    },
    "herolink": heroLink{
      ${linkSelectorFields}
    }
  }`
