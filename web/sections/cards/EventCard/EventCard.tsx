'use client'
import { Heading } from '@/core/Typography'
import { EventCardData } from '../../../types/index'
import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { FormattedDate, FormattedTime, TimeIcon } from '@/core/FormattedDateTime/'
import { world } from '@equinor/eds-icons'
import { Icon } from '@equinor/eds-core-react'
import { getEventDates } from '../../../common/helpers/dateUtilities'
import { toPlainText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import AddToCalendar from '../../../pageComponents/topicPages/AddToCalendar'
import { BaseLink } from '@/core/Link'
import Blocks from '../../../pageComponents/shared/portableText/Blocks'
import { useTranslations } from 'next-intl'

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
  { data, className = '', variant = 'default', hasSectionTitle = true, ...rest },
  ref,
) {
  const { title, location, eventDate, slug, ingress } = data
  const { start, end } = getEventDates(eventDate)
  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''
  const metaClassNames = `h-full grid grid-cols-[24px_auto] gap-sm items-center py-2`
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
        `h-full
        w-full
        grid
        grid-rows-[1fr_max-content_max-content]
        gap-4
        shadow-card
        rounded-sm
        px-6
        py-8
        bg-white-100
        text-slate-80
        active:box-shadow-crisp-interact
        active:shadow-white-100-interact
        focus:outline-none
        focus-visible:envis-outline
        dark:text-white-100
        dark:focus-visible:envis-outline-invert
        ${variantClassName[variant]}
      `,
        className,
      )}
      {...rest}
    >
      <BaseLink href={slug} className="hover:underline">
        <Heading value={title} as={hasSectionTitle ? 'h3' : 'h2'} variant="h5" className="mb-1" />
      </BaseLink>
      <div
        className={`${
          variant === 'single' ? 'w-fit' : ''
        } flex flex-col justify-center divide-y divide-autumn-storm-60`}
      >
        {start && (
          <div className="h-full py-2">
            <FormattedDate icon datetime={start} className="text-xs" />
          </div>
        )}
        {location && (
          <div className={metaClassNames}>
            <Icon data={world} color={'currentColor'} className="text-norwegian-woods-100 text-2xs" />
            <span className="text-xs">{location}</span>
          </div>
        )}

        {start && end ? (
          <div className={`h-full flex gap-1 items-center py-2`}>
            <FormattedTime icon datetime={start} small />
            <span className="w-max">-</span>
            <FormattedTime datetime={end} showTimezone small />
          </div>
        ) : (
          <div className={metaClassNames}>
            <TimeIcon />
            {t('tba')}
          </div>
        )}
      </div>
      {variant === 'single' && ingress && <Blocks value={ingress} className="mt-4 text-sm max-w-prose text-pretty" />}
      <div className="mt-4 lg:mt-8">
        <AddToCalendar eventDate={eventDate} location={location} title={plainTitle} />
      </div>
    </div>
  )
})
export default EventCard
