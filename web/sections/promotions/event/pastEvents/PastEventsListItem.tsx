'use client'
import { Icon } from '@equinor/eds-core-react'
import { world } from '@equinor/eds-icons'
import { useFormatter } from 'next-intl'
import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { BaseLink } from '@/core/Link/BaseLink'
import { Typography } from '@/core/Typography'
import { getEventDates } from '@/lib/helpers/dateUtilities'
import Blocks from '@/portableText/Blocks'
import type { EventCardData } from '@/sections/cards/EventCard/EventCard'

export type PastEventsListItemProps = {
  event: EventCardData
  hasSectionTitle: boolean
} & HTMLAttributes<HTMLAnchorElement>

const PastEventsListItem = forwardRef<
  HTMLAnchorElement,
  PastEventsListItemProps
>(function PastEventsListItem(
  { event, className = '', hasSectionTitle = true, ...rest },
  ref,
) {
  const { title, eventDate, location, slug } = event
  const { start } = getEventDates(eventDate)
  const formatter = useFormatter()

  return (
    <BaseLink
      ref={ref}
      href={slug}
      className={twMerge(
        `group grid h-full w-full grid-cols-[18%_auto] flex-col dark:text-white-100`,
        className,
      )}
      {...rest}
    >
      <div className='flex h-full w-full items-start justify-center bg-norwegian-woods-100 px-2 pt-6 text-white-100'>
        {start && (
          <span className='text-md'>
            <time suppressHydrationWarning dateTime={eventDate?.date}>
              {formatter.dateTime(start, { dateStyle: 'medium' })}
            </time>
          </span>
        )}
      </div>
      <div className='px-6 py-6'>
        <Blocks
          value={title}
          as={hasSectionTitle ? 'h3' : 'h2'}
          variant='h5'
          blockClassName='max-w-text pb-4 text-base text-pretty group-hover:underline'
        />
        {location && (
          <div className='flex items-start gap-2'>
            <Icon
              data={world}
              color={'currentColor'}
              className='text-2xs text-norwegian-woods-100'
            />
            <Typography
              group='plain'
              variant='div'
              className='max-w-text text-pretty text-sm'
            >
              {location}
            </Typography>
          </div>
        )}
      </div>
    </BaseLink>
  )
})
export default PastEventsListItem
