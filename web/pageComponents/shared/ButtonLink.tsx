import NextLink from 'next/link'
import { ButtonLink as Link } from '@components'
import { getUrlFromAction } from '../../common/helpers/getUrlFromAction'
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
    return (
      <NextLink passHref href={url}>
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
