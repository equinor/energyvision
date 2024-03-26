import List from '../../core/List'
import { ResourceLink, ButtonLink } from '../../core/Link'
import type { LinkData } from '../../types/types'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'

type CallToActionsProps = {
  callToActions: LinkData[]
  overrideButtonStyle: boolean
  splitList?: boolean
}

const CallToActions = ({ callToActions = [], overrideButtonStyle, splitList }: CallToActionsProps) => {
  if (!callToActions) return null

  const getSingleButtonLink = () => {
    const { label, extension, type, link } = callToActions[0]
    const url = getUrlFromAction(callToActions[0])
    if (!url) {
      console.warn(`CallToActions: Missing URL on 'ButtonLink' link with type: '${type}' and label: '${label}'`)
    }
    return (
      <ButtonLink {...(type === 'internalUrl' && { locale: getLocaleFromName(link?.lang) })} href={url} type={type}>
        {`${label} ${extension ? `(${extension.toUpperCase()})` : ''}`}
      </ButtonLink>
    )
  }
  // If we have only one link and the publisher has not made an active choice of overriding the style
  // in Sanity the default style is a button style
  return callToActions?.length === 1 && !overrideButtonStyle ? (
    getSingleButtonLink()
  ) : (
    <List split={splitList} className="list-none">
      {callToActions.map((callToAction: LinkData) => {
        return (
          <List.Item key={callToAction.id}>
            {/*  If the URL is a static AEM page it should behave as an internal link in the web */}
            <ResourceLink
              href={getUrlFromAction(callToAction)}
              {...(callToAction.link?.lang && { locale: getLocaleFromName(callToAction.link?.lang) })}
              type={callToAction.type}
            >
              {`${callToAction?.label} ${callToAction?.extension ? `(${callToAction?.extension.toUpperCase()})` : ''}`}
            </ResourceLink>
          </List.Item>
        )
      })}
    </List>
  )
}

export default CallToActions
