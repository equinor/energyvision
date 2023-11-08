import linkSelectorFields from './actions/linkSelectorFields'

export const heroFields = /* groq */ `{
    "type": coalesce(heroType, 'default'),
    "ratio": heroRatio,
    "isBigTitle":isBigTitle,
    "title": select( 
      heroType == 'fiftyFifty' => select(isBigTitle => heroBigTitleFiftyFifty,heroTitle),
      heroType == 'default' => select(isBigTitle => heroBigTitleDefault)
    ) ,
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
