import NextLink from 'next/link'
import { Link } from '@components'
import { getUrlFromAction } from './utils'
import type { LinkData } from '../../types/types'

export const ButtonLink = ({ action }: { action: LinkData }) => {
  const { label, ariaLabel, extension, type, isStatic } = action

  const url = getUrlFromAction(action)
  if (!url) {
    console.warn(`Missing URL on 'ButtonLink' link with type: '${type}' and label: '${label}'`)
    return null
  }

  // If the URL is a static AEM page it should behave as an internal link in the web
  if (type === 'internalUrl' || isStatic) {
    return (
      <NextLink passHref href={url}>
        <Link variant="buttonLink" aria-label={ariaLabel}>
          {label}
        </Link>
      </NextLink>
    )
  }

  return (
    <Link href={url} variant="buttonLink" aria-label={ariaLabel}>
      {label} {extension && `(${extension.toUpperCase()})`}
    </Link>
  )
}
