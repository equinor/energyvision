import linkSelectorFields from './common/actions/linkSelectorFields';
import background from './common/background';
import markDefs from './common/blockEditorMarks';

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
    "title": select(
      videoFile->_type == "assetFile" => videoFile->title,
      videoFile->video.title
    ),
    "src": select(
      videoFile->_type == "assetFile" => videoFile->asset.asset->url,
      videoFile->video.url
    ),
    "poster": videoFile->thumbnail,
  },
  videoControls {
    loop,
    autoPlay,
    muted,
  },
  defined(showTranscript) && showTranscript && videoFile->_type == "videoFile" =>  { "transcript": videoFile->transcript.text},
  "designOptions": {
    "aspectRatio": coalesce(aspectRatio, '16:9'),
    containVideo,
    width,
    useBrandTheme,
    ${background}
  },
`;
