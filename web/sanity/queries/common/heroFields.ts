import linkSelectorFields from './actions/linkSelectorFields'
import markDefs from './blockEditorMarks'

export const heroFields = /* groq */ `{
    "type": coalesce(heroType, 'default'),
    "ratio": heroRatio,
    "ingress": heroIngress[]{
        ...,
        ${markDefs},
        _type == "thumbnail" => {
        ...,
        text[]{
          ...,
          ${markDefs},
        },
    },
    },
    "background": coalesce(heroBackground.key, 'white-100'),
    "backgroundGradient": heroBackgroundGradient,
    "useBrandTheme":heroUseBrandTheme,
    "displayTextVariant": coalesce(displayTextVariant, 'none'),
    layoutGrid,
    useBlurCenter,
    alignContentY,
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
    heroMobileImage,
    "link": heroLink[0]{
      ${linkSelectorFields}
    },
    "herolink": heroLink{
      ${linkSelectorFields}
    }
  }`
