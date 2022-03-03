// https://www.sanity.io/docs/portable-text-internal-and-external-links
import { Link } from '@components'

type ExternalLinkMark = {
  _key: string
  _type: string
  href: string
}

type Child = {
  _type: string
  _key: string
  children: string[]
  mark: ExternalLinkMark
  markKey: string
}

export const ExternalLinkRenderer = (child: Child) => {
  try {
    const { mark, children } = child
    const { href } = mark
    return (
      <Link href={href} type="externalUrl">
        {children}
      </Link>
    )
  } catch (e) {
    console.error('Could not render internal link', e)
    return null
  }
}
