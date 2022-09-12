import { Fragment } from 'react'
import { List, Link } from '@components'
import type { LinkData } from '../../types/types'
import { default as NextLink } from 'next/link'
import { ButtonLink } from '../shared/ButtonLink'
import { getUrlFromAction } from '../../common/helpers/getUrlFromAction'

const { Item } = List

type CallToActionsProps = {
  callToActions: LinkData[]
  overrideButtonStyle: boolean
  splitList?: boolean
}

const CallToActions = ({ callToActions, overrideButtonStyle, splitList }: CallToActionsProps) => {
  if (!callToActions) return null

  // If we have only one link and the publisher has not made an active choice of overriding the style
  // in Sanity the default style is a button style
  return callToActions.length === 1 && !overrideButtonStyle ? (
    <ButtonLink action={callToActions[0]} />
  ) : (
    <List unstyled splitList={splitList}>
      {callToActions.map((callToAction: LinkData) => {
        const { id, type, label, ariaLabel, extension } = callToAction

        const url = getUrlFromAction(callToAction)
        if (!url) {
          console.warn(`Missing URL on 'CallToActions' link with type: '${type}' and label: '${label}'`)
          return null
        }

        return (
          <Fragment key={id}>
            {/*  If the URL is a static AEM page it should behave as an internal link in the web */}
            {type === 'internalUrl' || callToAction.isStatic ? (
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
