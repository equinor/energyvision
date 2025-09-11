'use client'
import { Typography } from '@/core/Typography'
import { EventCardData } from '../../../types/index'
import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { getEventDates } from '../../../common/helpers/dateUtilities'
import { BaseLink } from '@/core/Link'
import { Icon } from '@equinor/eds-core-react'
import { world } from '@equinor/eds-icons'
import Blocks from '@/portableText/Blocks'

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

  return (
    <BaseLink
      ref={ref}
      href={slug}
      className={twMerge(`group grid h-full w-full grid-cols-[18%_auto] flex-col dark:text-white-100`, className)}
      {...rest}
    >
      <div className="flex aspect-square h-full w-full items-center justify-center bg-norwegian-woods-100 p-2 text-white-100">
        {
          start && ''
          /*<FormattedDateParts value={start} year="numeric" month="short" day="2-digit">
            {(parts) => {
              return (
                <div className="flex flex-col gap-4 justify-start items-center text-center">
                  <span className="text-md">{`${parts[0].value} ${parts[2].value}`}</span>
                  <span className="text-sm">{parts[4].value}</span>
                </div>
              )
            }}
          </FormattedDateParts>*/
        }
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
            <Typography variant="body" className="max-w-text text-sm text-pretty">
              {location}
            </Typography>
          </div>
        )}
      </div>
    </BaseLink>
  )
})
export default PastEventsListItem
