import styled from 'styled-components'
import { Button, List } from '@components'
import type { LinkData } from '../../types/types'
import { default as NextLink } from 'next/link'

const { Item } = List

type TeaserProps = {
  callToAction: LinkData[]
}

const C2ALink = ({ callToAction }: { callToAction: LinkData }) => {
  const { type, link, href, label, extension } = callToAction


  let url: string
  if (type === 'internalUrl') {
    url = link?.type === 'news' ? `/news/${link?.slug}` : link?.slug || ''
  } else {
    url = href || ''
  }
  return (
    <>
      {type === 'internalUrl' ? (
        <NextLink passHref href={url}>
          <Button as="a" variant="outlined" color="secondary">
            {label}
          </Button>
        </NextLink>
      ) : (
          <Button as="a" variant="outlined" href={url} color="secondary">
            {label} {extension && `(${extension.toUpperCase()})`}
          </Button>
        )}
    </>
  )
}

const CallToAction = ({ callToAction }: TeaserProps) => {
  if (!callToAction) return null



  return (
    callToAction.length === 1 ?
      <C2ALink callToAction={callToAction[0]} />
      :
      <List unstyled>{callToAction.map((link) => {
        return (
          <Item key={link.id} >
            <C2ALink callToAction={link} />
          </Item>
        )
      })}</List>
  )
}

export default CallToAction
