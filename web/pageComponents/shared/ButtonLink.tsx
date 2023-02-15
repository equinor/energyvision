import { ButtonLink as Link } from '@components'
import NextLink from 'next/link'
import { HTMLAttributes } from 'react'
import { Flags } from '../../common/helpers/datasetHelpers'
import { getUrlFromAction } from '../../common/helpers/getUrlFromAction'
import { getLocaleFromName } from '../../lib/localization'
import type { LinkData } from '../../types/types'

export const ButtonLink = ({ action, ...rest }: { action: LinkData }) => {
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
      <NextLink passHref locale={Flags.IS_DEV ? locale : undefined} href={url} legacyBehavior>
        <Link aria-label={ariaLabel} {...rest}>
          {label}
        </Link>
      </NextLink>
    )
  }

  return (
    <Link href={url} aria-label={ariaLabel} {...rest}>
      {label} {extension && `(${extension.toUpperCase()})`}
    </Link>
  )
}

type Props = {
  action: LinkData
} & HTMLAttributes<HTMLAnchorElement>

export const ButtonLinkV2 = ({ action, children, ...rest }: Props) => {
  const { label, ariaLabel, extension, type } = action

  const url = getUrlFromAction(action)
  if (!url) {
    console.warn(`Missing URL on 'ButtonLink' link with type: '${type}' and label: '${label}'`)
    return null
  }
  // If the URL is a static AEM page it should behave as an internal link in the web
  const locale = getLocaleFromName(action.link?.lang)

  return (
    <NextLink href={url} passHref legacyBehavior locale={Flags.IS_DEV ? locale : undefined} {...rest}>
      {children || (
        <Link aria-label={ariaLabel}>
          {label} {extension && type !== 'internalUrl' && `(${extension.toUpperCase()})`}
        </Link>
      )}
    </NextLink>
  )
}
