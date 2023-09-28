import { ButtonLink as Link, ButtonLinkProps } from '@components'
import NextLink, { LinkProps } from 'next/link'
import { getUrlFromAction } from '../../common/helpers/getUrlFromAction'
import { getLocaleFromName } from '../../lib/localization'
import type { LinkData } from '../../types/types'

type Props = {
  action: LinkData
  children?: React.ReactNode
} & (ButtonLinkProps | LinkProps)

export const ButtonLink = ({ action, children, ...rest }: Props) => {
  const { label, ariaLabel, extension, type } = action

  const url = getUrlFromAction(action)
  if (!url) {
    console.warn(`Missing URL on 'ButtonLink' link with type: '${type}' and label: '${label}'`)
    return null
  }

  // If the URL is a static AEM page it should behave as an internal link in the web
  if (type === 'internalUrl') {
    const locale = getLocaleFromName(action.link?.lang)
    return (
      <>
        {children || (
          <Link locale={locale} href={url} aria-label={ariaLabel} {...(rest as ButtonLinkProps)}>
            {label}
          </Link>
        )}
      </>
    )
  }

  return children ? (
    <NextLink href={url} {...(rest as Omit<LinkProps, 'href'>)}>
      {children}
    </NextLink>
  ) : (
    <Link href={url} aria-label={ariaLabel} {...(rest as ButtonLinkProps)}>
      {label} {extension && `(${extension.toUpperCase()})`}
    </Link>
  )
}
