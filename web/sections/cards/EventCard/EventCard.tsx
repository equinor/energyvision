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

export type EventCardProps = {
  data: EventCardData
  hasSectionTitle: boolean
} & HTMLAttributes<HTMLDivElement>

/**
 * Event Card component.
 * Remember to wrap in ul and li if in a list.
 * */
const EventCard = forwardRef<HTMLDivElement, EventCardProps>(function EventCard(
  { data, className = '', hasSectionTitle = true, ...rest },
  ref,
) {
  const intl = useIntl()
  const details = intl.formatMessage({ id: 'details', defaultMessage: 'Details' })

  const { title, location, eventDate, slug } = data
  const { start, end } = getEventDates(eventDate)
  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''
  const metaClassNames = `h-full flex gap-sm items-center py-2`
  return (
    <div
      ref={ref}
      className={twMerge(
        `h-full
        w-full
        grid
        grid-rows-[1fr_max-content_max-content]
      border
      border-autumn-storm-50
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
      <Heading value={title} as={hasSectionTitle ? 'h3' : 'h2'} variant="h4" />
      <div className="flex flex-col justify-center divide-y divide-autumn-storm-60">
        {start && (
          <div className="h-full py-2">
            <FormattedDate icon datetime={start} style={{ fontSize: 'var(--typeScale-0)' }} />
          </div>
        )}
        {location && (
          <div className={metaClassNames}>
            <Icon data={world} color={'currentColor'} className="text-norwegian-woods-100" /> {location}
          </div>
        )}

        {start && end ? (
          <div className={metaClassNames}>
            <FormattedTime icon datetime={start} small />
            <span>-</span>
            <FormattedTime datetime={end} timezone small />
          </div>
        ) : (
          <div className={metaClassNames}>
            <TimeIcon />
            <FormattedMessage id="tba" defaultMessage="To be announced" />
          </div>
        )}
      </div>
      <div className="mt-8 flex gap-6">
        <AddToCalendar eventDate={eventDate} location={location} title={plainTitle} />
        <ButtonLink variant="outlined" href={slug} aria-label={`${details} ${title}`}>
          {details}
        </ButtonLink>
      </div>
    </div>
  )
})
export default EventCard
