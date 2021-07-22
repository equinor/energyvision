import NextLink from 'next/link'
import { Button } from '@components'
import type { LinkData } from '../../types/types'

export const getUrl = (action: LinkData) => {
  const { link, href, type } = action

  if (type === 'internalUrl') {
    // Will there be more cases in the future?
    if (link?.type === 'news') return `/news/${link?.slug}`

    return link?.slug || ''
  }

  return href || ''
}

export const ButtonLink = ({ action }: { action: LinkData }) => {
  const { label, extension, type } = action
  const url = getUrl(action)

  if (type === 'internalUrl') {
    return (
      <NextLink passHref href={url}>
        <Button as="a" variant="outlined" color="secondary">
          {label}
        </Button>
      </NextLink>
    )
  }

  return (
    <Button as="a" variant="outlined" href={url} color="secondary">
      {label} {extension && `(${extension.toUpperCase()})`}
    </Button>
  )
}
