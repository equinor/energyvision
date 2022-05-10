// https://www.sanity.io/docs/portable-text-internal-and-external-links
import { Link } from '@components'
import type { PortableTextLink } from '@portabletext/types'

export const ExternalLink = ({ value, children }: { value: PortableTextLink; children: React.ReactNode }) => {
  const { href } = value
  return (
    <Link href={href} type="externalUrl">
      {children}
    </Link>
  )
}
