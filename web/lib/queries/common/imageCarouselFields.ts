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
    "action": action[0]{
      ${linkSelectorFields},
    },
    ...
    },
    "options": {
      autoplay,
      delay
    },
    captionPositionUnderImage,
  "designOptions": {
     ${background}
    },
`
