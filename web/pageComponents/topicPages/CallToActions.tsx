import { Fragment } from 'react'
import { List, Link } from '@components'
import type { LinkData } from '../../types/types'
import { default as NextLink } from 'next/link'
import { ButtonLink } from '../shared/ButtonLink'
import { getUrlFromAction } from '../shared/utils'

const { Item } = List

type CallToActionsProps = {
  callToActions: LinkData[]
}

const CallToActions = ({ callToActions }: CallToActionsProps) => {
  if (!callToActions) return null

  return callToActions.length === 1 ? (
    <ButtonLink action={callToActions[0]} />
  ) : (
    <List unstyled>
      {callToActions.map((callToAction: LinkData) => {
        const { id, type, label, ariaLabel, extension } = callToAction
        const url = getUrlFromAction(callToAction)
        return (
          <Fragment key={id}>
            {type === 'internalUrl' ? (
              <Item>
                <NextLink href={url} passHref>
                  <Link variant="contentLink" type={type} aria-label={ariaLabel}>
                    {label}
                  </Link>
                </NextLink>
              </Item>
            ) : (
              <Item>
                <Link variant="contentLink" type={type} href={url} aria-label={ariaLabel}>
                  {label} {extension && `(${extension.toUpperCase()})`}
                </Link>
              </Item>
            )}
          </Fragment>
        )
      })}
    </List>
  )
}

export default CallToActions
