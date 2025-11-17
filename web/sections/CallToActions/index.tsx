import { ResourceLink } from '@/core/Link'
import type { LinkData } from '../../types/index'
import { getLocaleFromName } from '../../sanity/localization'
import { twMerge } from 'tailwind-merge'
import { call } from '@equinor/eds-icons'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'

type CallToActionsProps = {
  callToActions: LinkData[]
  splitList?: boolean
  className?: string
  linkVariant?: 'default' | 'fit'
}

const CallToActions = ({ callToActions = [], splitList, linkVariant, className = '' }: CallToActionsProps) => {
  if (!callToActions) return null
  const getSingleAction = () => {
    const { label, extension, type, link } = callToActions[0]
    const url = getUrlFromAction(callToActions[0])
    if (!url && type !== 'downloadableFile') {
      console.warn(`CallToActions: Missing URL on Call to action link with type: '${type}' and label: '${label}'`)
      return null
    }

    return (
      <ResourceLink
        {...callToActions[0]}
        href={url}
        extension={extension}
        showExtensionIcon={true}
        {...(link?.lang && { hrefLang: getLocaleFromName(link?.lang) })}
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
      className={twMerge(
        `grid grid-cols-[fit-content] gap-x-8 gap-y-6 ${splitList ? 'items-end md:grid md:grid-cols-2' : ''} `,
        className,
      )}
    >
      {callToActions.map((callToAction: LinkData) => {
        const url = getUrlFromAction(callToAction)

        return url ? (
          <li key={callToAction.id}>
            {/*  If the URL is a static AEM page it should behave as an internal link in the web */}
            <ResourceLink
              {...callToAction}
              href={url}
              {...(callToAction.link?.lang && { hrefLang: getLocaleFromName(callToAction.link?.lang) })}
              type={callToAction.type}
              extension={callToAction.extension}
              showExtensionIcon={true}
              variant={linkVariant ? linkVariant : 'default'}
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
