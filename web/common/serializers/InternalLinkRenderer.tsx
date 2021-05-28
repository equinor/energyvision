import { Link } from '@components'
import { default as NextLink } from 'next/link'

type InternalLinkMark = {
  _key: string
  _type: string
  internalLink: {
    id: string
    name: string | null
    type: string
  }
  reference: {
    _ref: string
    _type: string
  }
  markKey: string
}

type Child = {
  _type: string
  _key: string
  children: string[]
  mark: InternalLinkMark
  markKey: string
}

export const InternalLinkRenderer = (child: Child) => {
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
    console.error('Could not render internal link', child, e)
    return null
  }
}
