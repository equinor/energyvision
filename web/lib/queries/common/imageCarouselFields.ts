import linkSelectorFields from './actions/linkSelectorFields'
import background from './background'
import markDefs from './blockEditorMarks'

export const imageCarouselFields = /* groq */ `
    "id": _key,
    "type": _type,
    title,
    ingress,
    hideTitle,
    items[]{
    "id": _key,
    'type': _type,
    image,
    _type == "imageWithAltAndCaption" =>{
      caption,
      attribution,
    },
    _type == "imageWithLinkAndOrOverlay" =>{
      captionTeaserTitle,
      captionTitle,
      captionText[]{..., ${markDefs}},
      action[0]{
        ${linkSelectorFields},
      }
    },
    _type == "imageWithRichTextBelow" =>{
      caption[]{..., ${markDefs}},
      action[0]{
        ${linkSelectorFields},
      }
    },
    },
    "options": {
      singleMode,
      autoplay,
      delay
    },
  "designOptions": {
     ${background}
    },
`
