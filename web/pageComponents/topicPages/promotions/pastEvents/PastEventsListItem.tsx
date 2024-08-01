import { Heading } from '@core/Typography'
import { EventCardData } from '../../../../types/types'
import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { getEventDates } from '../../../../common/helpers/dateUtilities'
import { toPlainText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import { useIntl } from 'react-intl'
import { BaseLink } from '@core/Link'
import Blocks from '../../../../pageComponents/shared/portableText/Blocks'
import FormattedDateTime from '@core/FormattedDateTime/FormattedDateTime'

export type PastEventsListItemProps = {
  event: EventCardData
  hasSectionTitle: boolean
} & HTMLAttributes<HTMLAnchorElement>

/**
 * Event Card component.
 * Remember to wrap in ul and li if in a list.
 * */
const PastEventsListItem = forwardRef<HTMLAnchorElement, PastEventsListItemProps>(function PastEventsListItem(
  { event, className = '', hasSectionTitle = true, ...rest },
  ref,
) {
  const intl = useIntl()
  const details = intl.formatMessage({ id: 'details', defaultMessage: 'Details' })

  const { title, eventDate, slug, ingress } = event
  const { start } = getEventDates(eventDate)
  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''

  return (
    <BaseLink
      ref={ref}
      href={slug}
      aria-label={`${details} ${plainTitle}`}
      className={twMerge(
        `h-full
        w-full
        flex
        flex-col
        pt-6
        pb-10
        dark:text-white-100
        group
      `,
        className,
      )}
      {...rest}
    >
      {start && <FormattedDateTime date={start} className="uppercase pb-3" timeClassName="text-xs" hideIcon />}
      <Heading
        value={title}
        as={hasSectionTitle ? 'h3' : 'h2'}
        variant="h5"
        className="text-base pb-4 group-hover:underline"
      />
      {ingress && <Blocks value={ingress} className="text-xs max-w-prose text-pretty" />}
    </BaseLink>
  )
})
export default PastEventsListItem
