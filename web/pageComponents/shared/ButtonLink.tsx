import NextLink from 'next/link'
import { Link } from '@components'
import { getUrlFromAction } from './utils'
import type { LinkData } from '../../types/types'

export const ButtonLink = ({ action }: { action: LinkData }) => {
  const { label, ariaLabel, extension, type } = action
  const url = getUrlFromAction(action)

  if (type === 'internalUrl') {
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
