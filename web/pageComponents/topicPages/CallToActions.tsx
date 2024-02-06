import { Fragment } from 'react'
import { List } from '@components'
import type { LinkData } from '../../types/types'
import { ButtonLink } from '../shared/ButtonLink'
import ReadMoreLink from '../shared/ReadMoreLink'

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
        return (
          <Fragment key={callToAction.id}>
            {/*  If the URL is a static AEM page it should behave as an internal link in the web */}
            <Item>
              <ReadMoreLink action={callToAction} variant="contentLink" />
            </Item>
          </Fragment>
        )
      })}
    </List>
  )
}

export default CallToActions
