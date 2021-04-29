// https://www.sanity.io/docs/portable-text-internal-and-external-links
import { Link } from '@components'

export const ExternalLinkRenderer = (child: { mark: any; children: any }) => {
  try {
    const { mark, children } = child
    const { href } = mark
    return (
      <Link href={href} type="externalUrl">
        {children}
      </Link>
    )
  } catch (e) {
    console.error('Could not render enternal link', e)
    return null
  }
}
