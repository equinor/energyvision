import NextLink from 'next/link'
import { Button } from '@components'
import type { LinkData, LinkType } from '../../types/types'

// @TODO: Add support for other LinkType options
const getLinkType = (action: LinkData): LinkType => {
  const { link } = action

  if (link && link?.slug) return 'internalUrl'

  return 'externalUrl'
}

export const getUrl = (action: LinkData, type: LinkType) => {
  const { link, href } = action

  if (type === 'internalUrl') {
    // Will there be more cases in the future?
    if (link?.type === 'news') return `/news/${link?.slug}`

    return link?.slug || ''
  }

  return href || ''
}

export const ButtonLink = ({ action }: { action: LinkData }) => {
  const { label, extension } = action
  const type = getLinkType(action)
  const url = getUrl(action, type)

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
