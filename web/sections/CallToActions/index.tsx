import { List } from '@core/List'
import { ResourceLink, ButtonLink } from '@core/Link'
import type { LinkData } from '../../types/index'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'
import { twMerge } from 'tailwind-merge'

type CallToActionsProps = {
  callToActions: LinkData[]
  overrideButtonStyle?: boolean
  splitList?: boolean
  className?: string
}

const CallToActions = ({ callToActions = [], overrideButtonStyle, splitList, className }: CallToActionsProps) => {
  if (!callToActions) return null

  const getSingleAction = () => {
    const { label, extension, type, link } = callToActions[0]
    const url = getUrlFromAction(callToActions[0])
    if (!url) {
      console.warn(`CallToActions: Missing URL on 'ButtonLink' link with type: '${type}' and label: '${label}'`)
      return null
    }
    const linkContent = `${label} ${extension ? `(${extension.toUpperCase()})` : ''}`

    return overrideButtonStyle ? (
      <ResourceLink
        href={url}
        {...(link?.lang && { locale: getLocaleFromName(link?.lang) })}
        type={type}
        className="w-fit"
      >
        {linkContent}
      </ResourceLink>
    ) : (
      <ButtonLink
        {...(type === 'internalUrl' && { locale: getLocaleFromName(link?.lang) })}
        href={url}
        type={type}
        className={twMerge(className, 'mb-8 block')}
      >
        {linkContent}
      </ButtonLink>
    )
  }

  return callToActions?.length === 1 ? (
    getSingleAction()
  ) : (
    <List split={splitList} className={className} listClassName={'list-none'}>
      {callToActions.map((callToAction: LinkData) => {
        const url = getUrlFromAction(callToAction)
        return url ? (
          <List.Item key={callToAction.id}>
            {/*  If the URL is a static AEM page it should behave as an internal link in the web */}
            <ResourceLink
              href={url}
              {...(callToAction.link?.lang && { locale: getLocaleFromName(callToAction.link?.lang) })}
              type={callToAction.type}
            >
              {`${callToAction?.label} ${callToAction?.extension ? `(${callToAction?.extension.toUpperCase()})` : ''}`}
            </ResourceLink>
          </List.Item>
        ) : null
      })}
    </List>
  )
}

export default CallToActions
