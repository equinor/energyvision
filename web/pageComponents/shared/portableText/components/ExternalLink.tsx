import { Link } from '../../../../core/Link'

interface DefaultLink {
  _type: 'link'
  href: string
}

export const ExternalLink = ({ value, children }: { value?: DefaultLink; children?: React.ReactNode }) => {
  return (
    <Link href={value?.href} type="externalUrl">
      {children}
    </Link>
  )
}
