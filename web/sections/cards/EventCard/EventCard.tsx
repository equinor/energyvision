'use client'
import { Icon } from '@equinor/eds-core-react'
import { world } from '@equinor/eds-icons'
import { toPlainText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { useTranslations } from 'next-intl'
import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import FormattedDateTime, {
  TimeIcon,
} from '@/core/FormattedDateTime/FormattedDateTime'
import { BaseLink } from '@/core/Link'
import { getEventDates } from '@/lib/helpers/dateUtilities'
import AddToCalendar from '../../../core/AddToCalendar/AddToCalendar'
import Blocks from '../../../portableText/Blocks'
import type { EventCardData } from '../../../types/index'

type Variants = 'default' | 'single' | 'carousel'
export type EventCardProps = {
  data: EventCardData
  hasSectionTitle: boolean
  variant?: Variants
} & HTMLAttributes<HTMLDivElement>

/**
 * Event Card component.
 * Remember to wrap in ul and li if in a list.
 * */
const EventCard = forwardRef<HTMLDivElement, EventCardProps>(function EventCard(
  {
    data,
    className = '',
    variant = 'default',
    hasSectionTitle = true,
    ...rest
  },
  ref,
) {
  const { title, location, eventDate, slug, ingress } = data
  const { start, end } = getEventDates(eventDate)
  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''

  const t = useTranslations()

  const variantClassName: Partial<Record<Variants, string>> = {
    default: '',
    single: 'max-w-prose',
    carousel: 'w-[383px]',
  }

  return (
    <div
      ref={ref}
      className={twMerge(
        `focus-visible:envis-outline dark:focus-visible:envis-outline-invert active:box-shadow-crisp-interact grid h-full w-full grid-rows-[1fr_max-content_max-content] gap-4 rounded-xs bg-white-100 px-6 py-8 text-slate-80 shadow-card focus:outline-hidden active:shadow-white-100-interact dark:text-white-100 ${variantClassName[variant]} `,
        className,
      )}
      {...rest}
    >
      <BaseLink href={slug} className='hover:underline'>
        <Blocks
          value={title}
          as={hasSectionTitle ? 'h3' : 'h2'}
          variant='h5'
          blockClassName='mb-1'
        />
      </BaseLink>
      <div
        className={`${
          variant === 'single' ? 'w-fit' : ''
        } flex flex-col justify-center divide-y divide-autumn-storm-60`}
      >
        {start && (
          <div className='h-full py-2'>
            <FormattedDateTime
              variant='date'
              dateIcon={true}
              datetime={start}
              className='text-xs'
            />
          </div>
        )}
        {location && (
          <div className={`flex h-full items-center gap-2 py-2`}>
            <Icon
              data={world}
              color={'currentColor'}
              className='text-2xs text-norwegian-woods-100'
            />
            <div className='mt-1 flex text-xs'>{location}</div>
          </div>
        )}

        {start && end ? (
          <div className={`flex h-full items-start gap-1 py-2`}>
            <FormattedDateTime
              variant='time'
              timeIcon={true}
              datetime={start}
              className='text-xs'
            />
            <span>-</span>
            <FormattedDateTime
              variant='time'
              datetime={end}
              showTimezone
              className='text-xs'
            />
          </div>
        ) : (
          <div
            className={`grid h-full grid-cols-[24px_auto] items-center gap-sm py-2`}
          >
            <TimeIcon />
            {t('tba')}
          </div>
        )}
      </div>
      {variant === 'single' && ingress && (
        <Blocks
          value={ingress}
          blockClassName='mt-4 max-w-prose text-sm text-pretty'
        />
      )}
      <div className='mt-4 lg:mt-8'>
        <AddToCalendar
          eventDate={eventDate}
          location={location}
          title={plainTitle}
        />
      </div>
    </div>
  )
})
export default EventCard
