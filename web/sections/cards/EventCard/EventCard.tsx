import { Heading } from '@core/Typography'
import { EventCardData } from '../../../types/types'
import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { TimeIcon } from '@components/FormattedDateTime/shared'
import { FormattedDate, FormattedTime } from '@components'
import { world } from '@equinor/eds-icons'
import { Icon } from '@equinor/eds-core-react'
import { getEventDates } from '../../../common/helpers/dateUtilities'
import { toPlainText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import { FormattedMessage, useIntl } from 'react-intl'
import AddToCalendar from '../../../pageComponents/topicPages/AddToCalendar'
import { ButtonLink } from '@core/Link'
import Blocks from '../../../pageComponents/shared/portableText/Blocks'

export type EventCardProps = {
  data: EventCardData
  hasSectionTitle: boolean
  variant?: 'default' | 'single'
} & HTMLAttributes<HTMLDivElement>

/**
 * Event Card component.
 * Remember to wrap in ul and li if in a list.
 * */
const EventCard = forwardRef<HTMLDivElement, EventCardProps>(function EventCard(
  { data, className = '', variant = 'default', hasSectionTitle = true, ...rest },
  ref,
) {
  const intl = useIntl()
  const details = intl.formatMessage({ id: 'details', defaultMessage: 'Details' })

  const { title, location, eventDate, slug, ingress } = data
  const { start, end } = getEventDates(eventDate)
  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''
  const metaClassNames = `h-full grid grid-cols-[24px_auto] gap-sm items-center py-2`

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
      `,
        className,
      )}
      {...rest}
    >
      <Heading value={title} as={hasSectionTitle ? 'h3' : 'h2'} variant="h5" className="mb-1" />
      <div
        className={`${
          variant === 'single' ? 'w-fit' : ''
        } flex flex-col justify-center divide-y divide-autumn-storm-60`}
      >
        {start && (
          <div className="h-full py-2">
            <FormattedDate icon datetime={start} style={{ fontSize: 'var(--typeScale-0)' }} />
          </div>
        )}
        {location && (
          <div className={metaClassNames}>
            <Icon
              data={world}
              color={'currentColor'}
              style={{ fontSize: 'var(--typeScale-0)' }}
              className="text-norwegian-woods-100"
            />
            <span className="text-xs">{location}</span>
          </div>
        )}

        {start && end ? (
          <div className={`h-full flex gap-1 items-center py-2`}>
            <FormattedTime icon datetime={start} small />
            <span className="w-max">-</span>
            <FormattedTime datetime={end} timezone small />
          </div>
        ) : (
          <div className={metaClassNames}>
            <TimeIcon />
            <FormattedMessage id="tba" defaultMessage="To be announced" />
          </div>
        )}
      </div>
      {variant === 'single' && ingress && <Blocks value={ingress} className="mt-4 text-sm max-w-prose text-pretty" />}
      <div className="mt-4 lg:mt-8 flex gap-6">
        <AddToCalendar eventDate={eventDate} location={location} title={plainTitle} />
        <ButtonLink variant="outlined" href={slug} aria-label={`${details} ${title}`}>
          {details}
        </ButtonLink>
      </div>
    </div>
  )
})
export default EventCard
