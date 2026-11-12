import background from './common/background';

export const videoPlayerCarouselFields = /* groq */ `
  "id": _key,
  "type": _type,
  title,
  ingress,
  items[] {
    "id": _key,
    title,
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
  },
  "designOptions": {
    "aspectRatio": coalesce(aspectRatio, '16:9'),
    ${background}
  },
`;
