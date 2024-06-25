import linkSelectorFields from './common/actions/linkSelectorFields'
import background from './common/background'

export const iframeCarouselFields = /* groq */ `
    "id": _key,
    "type": _type,
    title,
    items[]{...,
    "cookiePolicy": select(count(cookiePolicy) != null => cookiePolicy,[cookiePolicy]),
     "action": action[0]{
      ${linkSelectorFields},
    },},
    "designOptions": {
      ${background}
    },
`
