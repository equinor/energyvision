import { NextRouter } from 'next/router'

export const anchorClick = (
  e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
  router: NextRouter,
) => {
  if (e != null) {
    const targetLink = (e.target as Element).closest('a')
    if (!targetLink) return
    if (targetLink.href.includes('#')) {
      e.preventDefault()
      if (
        targetLink.href
          .split(router.locale || 'en')
          .at(1)
          ?.split('#')
          .at(0) == router.asPath.split('#').at(0)
      ) {
        router.replace(targetLink.href, undefined, { shallow: true })
      } else router.push(targetLink.href)
    }
  }
}
