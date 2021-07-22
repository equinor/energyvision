import NextLink from 'next/link'
import { Button } from '@components'
import { getUrlFromAction } from './utils'
import type { LinkData } from '../../types/types'

export const ButtonLink = ({ action }: { action: LinkData }) => {
  const { label, extension, type } = action
  const url = getUrlFromAction(action)

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
