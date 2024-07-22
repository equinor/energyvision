import linkSelectorFields from './common/actions/linkSelectorFields'
import background from './common/background'
import { cookiePolicyQuery } from './common/cookiePolicy'

export const iframeCarouselFields = /* groq */ `
    "id": _key,
    "type": _type,
    title,
    items[]{...,
    ${cookiePolicyQuery},
     "action": action[0]{
      ${linkSelectorFields},
    },},
    "designOptions": {
      ${background}
    },
`
