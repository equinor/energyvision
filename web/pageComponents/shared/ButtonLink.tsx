import { ButtonLink as Link, ButtonLinkProps } from '@components'
import { LinkProps } from 'next/link'
import { getUrlFromAction } from '../../common/helpers/getUrlFromAction'
import { getLocaleFromName } from '../../lib/localization'
import type { LinkData } from '../../types/types'

type Props = {
  action: LinkData
} & (ButtonLinkProps | LinkProps)

export const ButtonLink = ({ action, ...rest }: Props) => {
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
      <Link locale={locale} href={url} aria-label={ariaLabel} {...(rest as ButtonLinkProps)}>
        {label}
      </Link>
    )
  }

  return (
    <Link href={url} aria-label={ariaLabel} {...(rest as ButtonLinkProps)}>
      {label} {extension && `(${extension.toUpperCase()})`}
    </Link>
  )
}
