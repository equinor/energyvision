import { ResourceLink } from '@core/Link'
import type { LinkData } from '../../types/index'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'
import envisTwMerge from '../../twMerge'

type CallToActionsProps = {
  callToActions: LinkData[]
  overrideButtonStyle?: boolean
  splitList?: boolean
  className?: string
}

const CallToActions = ({ callToActions = [], splitList, className }: CallToActionsProps) => {
  if (!callToActions) return null

  const getSingleAction = () => {
    const { label, extension, type, link } = callToActions[0]
    const url = getUrlFromAction(callToActions[0])
    if (!url) {
      console.warn(`CallToActions: Missing URL on Call to action link with type: '${type}' and label: '${label}'`)
      return null
    }

    return (
      <ResourceLink
        href={url}
        extension={extension}
        showExtensionIcon={true}
        {...(link?.lang && { locale: getLocaleFromName(link?.lang) })}
        type={type}
        variant="fit"
      >
        {label}
      </ResourceLink>
    )
  }

  return callToActions?.length === 1 ? (
    getSingleAction()
  ) : (
    <ul
      className={envisTwMerge(
        `grid grid-cols-[max-content] gap-x-8 gap-y-6 ${splitList ? 'md:grid md:grid-cols-2 items-end' : ''}
     `,
        className,
      )}
    >
      {callToActions.map((callToAction: LinkData) => {
        const url = getUrlFromAction(callToAction)
        return url ? (
          <li key={callToAction.id}>
            {/*  If the URL is a static AEM page it should behave as an internal link in the web */}
            <ResourceLink
              href={url}
              {...(callToAction.link?.lang && { locale: getLocaleFromName(callToAction.link?.lang) })}
              type={callToAction.type}
              extension={callToAction.extension}
              showExtensionIcon={true}
              variant="default"
            >
              {`${callToAction?.label}`}
            </ResourceLink>
          </li>
        ) : null
      })}
    </ul>
  )
}

export default CallToActions
