import { Fragment } from 'react'
import { List } from '@components'
import type { LinkData } from '../../types/types'
import { ButtonLink, ReadMoreLink } from '@core/Link'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'

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
    <ButtonLink href={callToActions[0] && (getUrlFromAction(callToActions[0]) as string)} className="w-max" />
  ) : (
    <List unstyled splitList={splitList}>
      {callToActions.map((callToAction: LinkData) => {
        const url = getUrlFromAction(callToAction)
        return (
          <Fragment key={callToAction.id}>
            {/*  If the URL is a static AEM page it should behave as an internal link in the web */}

            <Item>
              <ReadMoreLink
                href={url as string}
                {...(callToAction.link?.lang && { locale: getLocaleFromName(callToAction.link?.lang) })}
                type={callToAction.type}
              >
                {`${callToAction.label} ${callToAction.extension ? `(${callToAction.extension.toUpperCase()})` : ''}`}
              </ReadMoreLink>
            </Item>
          </Fragment>
        )
      })}
    </List>
  )
}

export default CallToActions
