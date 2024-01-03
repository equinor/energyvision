import linkSelector from './common/actions/linkSelectorFields'

export const iframeCarouselFields = /* groq */ `
    "id": _key,
    "type": _type,
    title,
    items[]{..., "action": action[0]{
      ${linkSelector},
    },},
    "designOptions": {
      "background": coalesce(background.title, 'none'),
    },
`
