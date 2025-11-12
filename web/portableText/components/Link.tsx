import { Link as CoreLink, LinkProps as _LinkProps } from '@/core/Link'
import { getLocaleFromName } from '@/sanity/localization'

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

type ExternalLinkProps = {
  _type: 'link'
  href: string
}

export type LinkProps = {
  value?: InternalLinkProps | ExternalLinkProps
  children?: React.ReactNode
} & Omit<_LinkProps, 'href'>

export const Link = ({ value, children, type, ...rest }: LinkProps) => {
  try {
    if (!value) return null
    let props: _LinkProps = {
      href: '',
    }
    if ('internalLink' in value && type === 'internalUrl') {
      const { id, lang } = value.internalLink
      const anchorReference = value.anchorReference
      const linkLocale = getLocaleFromName(lang)
      props = {
        href: anchorReference ? `${id}#${anchorReference}` : id,
        hrefLang: linkLocale,
      }
    }
    if ('href' in value && type === 'externalUrl') {
      props = {
        href: value?.href,
      }
    }
    return props.href && props.href !== '' ? (
      <CoreLink {...rest} {...props} type="externalUrl">
        {children}
      </CoreLink>
    ) : (
      <span>{children}</span>
    )
  } catch (e) {
    console.error('Could not render portabletext link', children, e)
    return null
  }
}
