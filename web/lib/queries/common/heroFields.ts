import linkSelectorFields from './actions/linkSelectorFields'

export const heroFields = /* groq */ `{
    "type": coalesce(heroType, 'default'),
    "ratio": heroRatio,
    "title": heroTitle,
    "ingress": heroIngress,
    "background": coalesce(heroBackground.title, 'White'),
    "figure": heroFigure,
    "loopingVideo": {
      "title": heroLoopingVideo->title,
      "thumbnail": heroLoopingVideo->thumbnail,
      "url": heroLoopingVideo->video.asset->url,
    },
    "video": {
      "":heroVideo.asset->{
      playbackId,
		},
    // @TODO: Move 'loop' and 'autoplay' inside 'video' object.
    "loop": coalesce(heroVideoLoop,false),
    "autoplay": coalesce(heroVideoAutoPlay,false)
  },
    "link": heroLink[0]{
      ${linkSelectorFields}
    }
  }`
