'use client'
import { EventCardData } from '../../../types/index'
import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { getEventDates } from '../../../common/helpers/dateUtilities'
import { BaseLink } from '@/core/Link'
import { Icon } from '@equinor/eds-core-react'
import { world } from '@equinor/eds-icons'
import Blocks from '@/portableText/Blocks'
import { useLocale } from 'next-intl'

export type PastEventsListItemProps = {
  event: EventCardData
  hasSectionTitle: boolean
} & HTMLAttributes<HTMLAnchorElement>

const PastEventsListItem = forwardRef<HTMLAnchorElement, PastEventsListItemProps>(function PastEventsListItem(
  { event, className = '', hasSectionTitle = true, ...rest },
  ref,
) {
  const { title, eventDate, location, slug } = event
  const { start } = getEventDates(eventDate)
  const locale = useLocale()

  const dayMonth = start ? new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short' }).format(start) : ''
  const year = start ? new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(start) : ''

  return (
    <BaseLink
      ref={ref}
      href={slug}
      className={twMerge(`group grid h-full w-full grid-cols-[18%_auto] flex-col dark:text-white-100`, className)}
      {...rest}
    >
      <div className="flex aspect-square h-full w-full items-center justify-center bg-norwegian-woods-100 p-2 text-white-100">
        {start && (
          <div className="flex flex-col items-center justify-start gap-4 text-center">
            <span className="text-md">{dayMonth}</span>
            <span className="text-sm">{year}</span>
          </div>
        )}
      </div>
      <div className="px-6 py-6">
        <Blocks
          value={title}
          as={hasSectionTitle ? 'h3' : 'h2'}
          variant="h5"
          blockClassName="max-w-text pb-4 text-base text-pretty group-hover:underline"
        />
        {location && (
          <div className="gap-sm flex items-start">
            <Icon
              data={world}
              color={'currentColor'}
              style={{ fontSize: 'var(--typeScale-0)' }}
              className="text-norwegian-woods-100"
            />
            <p className="max-w-text pl-3 text-sm text-pretty">{location}</p>
          </div>
        )}
      </div>
    </BaseLink>
  )
})
export default PastEventsListItem
