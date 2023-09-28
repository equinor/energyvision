import linkSelectorFields from './common/actions/linkSelectorFields'

export const iframeCarouselFields = /* groq */ `
    "id": _key,
    "type": _type,
    title,
    items[]{..., "action": action[0]{
      ${linkSelectorFields},
    },},
    "designOptions": {
      "background": coalesce(background.title, 'none'),
    },
`
