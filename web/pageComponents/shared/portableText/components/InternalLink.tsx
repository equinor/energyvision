import { Link } from '@core/Link'
import { getLocaleFromName } from '../../../../lib/localization'

type InternalLinkProps = {
  _key: string
  _type: 'internalLink'
  internalLink: {
    id: string
    name: string | null
    type: string
    lang: string
  }
  reference: {
    _ref: string
    _type: string
  }
  anchorReference?: string
}

export const InternalLink = ({ value, children }: { value?: InternalLinkProps; children?: React.ReactNode }) => {
  try {
    if (!value) return null
    const { id, lang } = value.internalLink
    const anchorReference = value.anchorReference
    const linkLocale = getLocaleFromName(lang)

    const href = anchorReference ? `${id}#${anchorReference}` : id
    if (!id) {
      return <>{children}</>
    }

    return (
      <Link locale={linkLocale} href={href}>
        {children}
      </Link>
    )
  } catch (e) {
    console.error('Could not render internal link', children, e)
    return null
  }
}
