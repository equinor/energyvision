import { Heading } from '@core/Typography'
import { EventCardData } from '../../../../types/types'
import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { getEventDates } from '../../../../common/helpers/dateUtilities'
import { toPlainText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import { FormattedDateParts, useIntl } from 'react-intl'
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
        grid
        grid-cols-[18%_auto]
        flex-col
        dark:text-white-100
        group
      `,
        className,
      )}
      {...rest}
    >
      <div className="w-full h-full aspect-square bg-norwegian-woods-100 text-white-100 flex justify-center items-center p-2">
        {/*   {start && <FormattedDateTime date={start} className="uppercase pb-3" timeClassName="text-sm" hideIcon />} */}
        {start && (
          <FormattedDateParts value={start} year="numeric" month="short" day="2-digit">
            {(parts) => {
              return (
                <div className="flex flex-col gap-4 justify-start items-center">
                  <span className="text-md">{`${parts[0].value} ${parts[2].value}`}</span>
                  {/*                   <div className="flex flex-col">
                    <span className="text-lg">{parts[0].value}</span>
                    <span className="text-base">{parts[2].value}</span>
                  </div> */}
                  <span className="text-sm">{parts[4].value}</span>
                </div>
              )
            }}
          </FormattedDateParts>
        )}
      </div>
      <div className="px-6 py-6">
        <Heading
          value={title}
          as={hasSectionTitle ? 'h3' : 'h2'}
          variant="h5"
          className="text-base pb-4 group-hover:underline"
        />
        {ingress && <Blocks value={ingress} className="text-xs max-w-prose text-pretty" />}
      </div>
    </BaseLink>
  )
})
export default PastEventsListItem
