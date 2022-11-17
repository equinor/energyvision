import { sameLang } from './langAndDrafts'
import { defaultWebLanguage } from '../../../../satellitesConfig'
import downloadableFileFields from './actions/downloadableFileFields'
import downloadableImageFields from './actions/downloadableImageFields'
import linkSelectorFields from './actions/linkSelectorFields'
import markDefs from './blockEditorMarks'

export const iframeForNewsQuery = /* groq */ `iframe {
  title,
  frameTitle,
  url,
  "designOptions": {
    "aspectRatio": coalesce(aspectRatio, '16:9'),
    height,
  },
}`

export const contentForNewsQuery = /* groq */ `content[] {
    ...,
    _type == "pullQuote" => {
      "type": _type,
      "id": _key,
      author,
      authorTitle,
      image,
      quote,
      "designOptions": {
        "imagePosition": coalesce(imagePosition, 'right'),
      }
    },
    _type == "positionedInlineImage" => {
      ...,
      // For these images, we don't want crop and hotspot
      // because we don't know the aspect ratio
      "image": image{
        _type,
        "asset": asset,
        "alt": alt
      }
    },
    ${markDefs},
  }`

export const relatedLinksForNewsQuery = /* groq */ `relatedLinks {
    title,
    heroImage,
    "links": links[]{
      ${linkSelectorFields},
      ${downloadableFileFields},
      ${downloadableImageFields},
    }
  }`

export const ingressForNewsQuery = /* groq */ `ingress[]{
    ...,
    ${markDefs},
  }
`

export const fixPreviewForDrafts = /* groq */ `
  ((defined(_lang) && ${sameLang}) || (!defined(_lang) && $lang == "${defaultWebLanguage.name}"))
`
