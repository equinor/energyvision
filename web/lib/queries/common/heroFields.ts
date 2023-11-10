import linkSelectorFields from './actions/linkSelectorFields'

export const heroFields = /* groq */ `{
    "type": coalesce(heroType, 'default'),
    "ratio": heroRatio,
    "isBigTitle":isBigTitle,
    heroType == 'fiftyFifty' => {
      "title" : select(isBigTitle => heroBigTitleFiftyFifty,heroTitle),
    },
    heroType == "default" => {
      "title" : select(isBigTitle => heroBigTitleDefault),
    },
    "ingress": heroIngress,
    "background": coalesce(heroBackground.title, 'White'),
    "figure":  select(
      heroType == 'loopingVideo' => { "image": heroLoopingVideo->thumbnail},
      heroFigure),
    "loopingVideo": {
      "title": heroLoopingVideo->video.title,
      "thumbnail": heroLoopingVideo->thumbnail,
      "url": heroLoopingVideo->video.url,
      "ratio": heroLoopingVideoRatio,
    },
    "link": heroLink[0]{
      ${linkSelectorFields}
    }
  }`
