import { Link } from '@components'

export const InternalLinkRenderer = (child: { mark: any; children: any }) => {
  try {
    const { mark, children } = child
    const { id, type } = mark.internalLink
    /** @TODO: More future proof way of handling this when routing is solved */
    switch (type) {
      case 'news':
        return <Link href={`/news/${id}`}>{children}</Link>
      default:
        return <span>Need to implement internal link</span>
    }
  } catch (e) {
    console.error('Could not render internal link', e)
    return null
  }
}
