import { ResourceLink } from '@core/Link'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'
import envisTwMerge from '../../twMerge'
import type { LinkData } from '../../types/index'

type CallToActionsProps = {
  callToActions: LinkData[]
  overrideButtonStyle?: boolean
  splitList?: boolean
  className?: string
}

const CallToActions = ({ callToActions = [], splitList, className }: CallToActionsProps) => {
  if (!callToActions) return null

  const getSingleAction = () => {
    const { label, type, link, file } = callToActions[0]
    const url = getUrlFromAction(callToActions[0])
    if (!url && !(type === 'downloadableFile' || type === 'downloadableImage')) {
      console.warn(`CallToActions: Missing URL on Call to action link with type: '${type}' and label: '${label}'`)
      return null
    }

    return (
      <ResourceLink
        file={{
          ...file,
          label,
        }}
        href={url}
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
        `grid grid-cols-[fit-content] gap-x-8 gap-y-6 ${splitList ? 'md:grid md:grid-cols-2 items-end' : ''}
     `,
        className,
      )}
    >
      {callToActions.map((callToAction: LinkData) => {
        const url = getUrlFromAction(callToAction)
        const { id, label, type, link, file } = callToAction

        return url ? (
          <li key={id}>
            {/*  If the URL is a static AEM page it should behave as an internal link in the web */}
            <ResourceLink
              file={{
                ...file,
                label,
              }}
              type={type}
              href={url}
              {...(link?.lang && {
                locale: getLocaleFromName(link?.lang),
              })}
              showExtensionIcon={true}
              variant="default"
            >
              {`${label}`}
            </ResourceLink>
          </li>
        ) : null
      })}
    </ul>
  )
}

export default CallToActions
