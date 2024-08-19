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
    "designOptions": {
     ${background}
    },
`
