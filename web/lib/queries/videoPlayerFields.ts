import linkSelectorFields from './common/actions/linkSelectorFields'
import markDefs from './common/blockEditorMarks'

export const videoPlayerFields = /* groq */ `
  "id": _key,
  "type": _type,
  title,
  ingress[] {
    ...,
    ${markDefs},
  },
  "action": action[0] {
    ${linkSelectorFields},
  },
  "video": {
    "title": videoFile->video.title,
    "url": videoFile->video.url,
    "thumbnail": videoFile->thumbnail,
  },
  videoControls {
    playButton,
    controls,
    loop,
    allowFullScreen,
    autoPlay,
    muted,
  },
  "designOptions": {
    "aspectRatio": coalesce(aspectRatio, '16:9'),
    "background": coalesce(background.title, 'none'),
    height,
  },
`
