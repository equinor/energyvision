import { twMerge } from 'tailwind-merge'
import ResourceLink from '@/core/Link/ResourceLink'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import { getLocaleFromName } from '../../sanity/helpers/localization'
import type { LinkData } from '../../types/index'

type CallToActionsProps = {
  callToActions: LinkData[]
  splitList?: boolean
  className?: string
  linkVariant?: 'default' | 'fit'
}

const CallToActions = ({
  callToActions = [],
  splitList,
  linkVariant,
  className = '',
}: CallToActionsProps) => {
  if (!callToActions) return null

  const getSingleAction = () => {
    const { label, type, link, file } = callToActions[0]
    const url = getUrlFromAction(callToActions[0])
    if (
      !url &&
      !(type === 'downloadableFile' || type === 'downloadableImage')
    ) {
      console.warn(
        `CallToActions: Missing URL on Call to action link with type: '${type}' and label: '${label}'`,
      )
      return null
    }

    return (
      <ResourceLink
        file={{
          ...file,
          label,
        }}
        href={url}
        type={type}
        variant='fit'
      >
        {label}
      </ResourceLink>
    )
  }

  return <div className='pt-8'>
    {
    callToActions?.length === 1 ? (
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
        const { id, label, type, link, file } = callToAction
        return url ? (
          <li key={id}>
            {/*  If the URL is a static AEM page it should behave as an internal link in the web */}
            <ResourceLink
              file={{
                ...file,
                label,
              }}
              href={url}
              type={type}
              variant={linkVariant ? linkVariant : 'default'}
            >
              {`${label}`}
            </ResourceLink>
          </li>
        ) : null
      })}
    </ul>
  )}
  </div>
}

export default CallToActions
