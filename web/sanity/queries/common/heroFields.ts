import linkSelectorFields from './actions/linkSelectorFields'
export const heroTitle = /* groq */ `
"title": select(
      content->heroType == 'fiftyFifty' => content->richTitle,
      content->heroType == 'fullWidthImage' => content->richTitle,
      content->heroType == 'backgroundImage' => content->richTitle,
      content->title)
`

export const heroFields = /* groq */ `{
    "type": coalesce(heroType, 'default'),
    "ratio": heroRatio,
    "ingress": heroIngress,
    "background": coalesce(heroBackground.key, 'white-100'),
    "backgroundGradient": backgroundGradient,
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
