import linkSelectorFields from './common/actions/linkSelectorFields'
import background from './common/background'

export const iframeCarouselFields = /* groq */ `
    "id": _key,
    "type": _type,
    title,
    hideTitle,
    items[]{...,
    cookiePolicy,
     "action": action[0]{
      ${linkSelectorFields},
    },
    },
    singleMode,
    useFullWidthScroll,
    "designOptions": {
      ${background}
    },
`
