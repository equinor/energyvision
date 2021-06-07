import { Fragment } from 'react'
import { Button, List, Link } from '@components'
import type { LinkData } from '../../types/types'
import { default as NextLink } from 'next/link'

const { Item } = List

type CallToActionsProps = {
  callToActions: LinkData[]
}

function getUrl(callToAction: LinkData) {
  const { type, link, href } = callToAction;
  let url: string
  if (type === 'internalUrl') {
    url = link?.type === 'news' ? `/news/${link?.slug}` : link?.slug || ''
  } else {
    url = href || ''
  }
  return url;
}

const C2ALinkAsButton = ({ callToAction }: { callToAction: LinkData }) => {
  const { type, label, extension } = callToAction

  const url = getUrl(callToAction)

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

const CallToActions = ({ callToActions }: CallToActionsProps) => {
  if (!callToActions) return null

  return (
    callToActions.length === 1 ?
      <C2ALinkAsButton callToAction={callToActions[0]} />
      :
      <List unstyled>{callToActions.map((callToAction: LinkData) => {
        const { id, type, label, extension } = callToAction
        const url = getUrl(callToAction)
        return (
          <Fragment key={id}>
            {type === 'internalUrl' ? (
              <Item>
                <NextLink href={url} passHref>
                  <Link variant="contentLink" type={type}>
                    {label}
                  </Link>
                </NextLink>
              </Item>
            ) : (
                <Item>
                  <Link variant="contentLink" type={type} href={url}>
                    {label} {extension && `(${extension.toUpperCase()})`}
                  </Link>
                </Item>
              )}
          </Fragment>
        )
      })}</List>
  )
}

export default CallToActions
