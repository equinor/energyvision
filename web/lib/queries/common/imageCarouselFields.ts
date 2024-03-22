import background from './background'

export const imageCarouselFields = /* groq */ `
    "id": _key,
    "type": _type,
    title,
    items,
    "options": {
      autoplay,
      delay
    },
    "designOptions": {
     ${background}
    },
`
