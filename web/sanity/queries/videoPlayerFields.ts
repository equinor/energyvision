import linkSelectorFields from './common/actions/linkSelectorFields'
import background from './common/background'
import markDefs from './common/blockEditorMarks'

export const videoPlayerFields = /* groq */ `
  "id": _key,
  "type": _type,
  title,
  hideTitle,
  ingress[] {
    ...,
    ${markDefs},
  },
  "action": action[0] {
    ${linkSelectorFields},
  },
  "video": {
    "title": videoFile->video.title,
    "src": videoFile->video.url,
    "poster": videoFile->thumbnail,
  },
  videoControls {
    playButton,
    controls,
    loop,
    allowFullScreen,
    autoPlay,
    muted,
  },
  defined(showTranscript) && showTranscript =>  { "transcript": videoFile->transcript.text},
  "designOptions": {
    "aspectRatio": coalesce(aspectRatio, '16:9'),
    height,
    width,
    useBrandTheme,
    ${background}
  },
`
