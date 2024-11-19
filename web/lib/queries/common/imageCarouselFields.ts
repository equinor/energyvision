import linkSelectorFields from './actions/linkSelectorFields'
import background from './background'

export const imageCarouselFields = /* groq */ `
    "id": _key,
    "type": _type,
    title,
    ingress,
    hideTitle,
    items[] {
    "id": _key,
    ...
    },
    "options": {
      autoplay,
      delay
    },
    captionPositionUnderImage,
"action": action[0]{
${linkSelectorFields},
},
  "designOptions": {
     ${background}
    },
`
