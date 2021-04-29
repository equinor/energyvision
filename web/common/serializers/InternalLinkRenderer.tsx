import { Link } from '@components'
import { default as NextLink } from 'next/link'

export const InternalLinkRenderer = (child: { mark: any; children: any }) => {
  try {
    const { mark, children } = child
    const { id, type } = mark.internalLink
    /** @TODO: More future proof way of handling this when routing is solved */
    switch (type) {
      case 'news':
        return (
          <NextLink passHref href={`/news/${id}`}>
            <Link href={`/news/${id}`}>{children}</Link>
          </NextLink>
        )
      default:
        return <span>Need to implement internal link</span>
    }
  } catch (e) {
    console.error('Could not render internal link', e)
    return null
  }
}
