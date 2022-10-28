import linkSelectorFields from './actions/linkSelectorFields'

export const heroFields = /* groq */ `{
    "type": coalesce(heroType, 'default'),
    "ratio": heroRatio,
    "title": heroTitle,
    "ingress": heroIngress,
    "background": coalesce(heroBackground.title, 'White'),
    "figure": heroFigure,
    "video": heroVideo.asset->{
      playbackId,
		},
    "link": heroLink[0]{
      ${linkSelectorFields}
    }
  }`
