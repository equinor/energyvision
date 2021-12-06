import { CSSProperties } from 'react'
import { Card, FormattedDate, FormattedTime } from '@components'
import styled from 'styled-components'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { TitleBlockRenderer } from '../../common/serializers'
// import AddToCalendar from '../topicPages/AddToCalendar'
import type { EventCardData } from '../../types/types'

const { Text, Media } = Card

const StyledCard = styled(Card)`
  height: var(--height);
`

type EventCardProps = {
  data: EventCardData
  hasSectionTitle: boolean
  orientation?: 'portrait' | 'landscape'
}

const PeopleCard = ({ data, hasSectionTitle, orientation = 'portrait', ...rest }: EventCardProps) => {
  const { title, location, eventDate } = data

  // @TODO: This is crap. :) We need to reuse the date and time across event and event card,
  // possible also the add to calendar
  const { date, startTime, endTime /* timezone */ } = eventDate

  const start = new Date(date)
  const end = new Date(date)
  if (startTime) {
    const timeParts = startTime.split(':').map(Number)
    start.setHours(timeParts[0])
    start.setMinutes(timeParts[1])
  }
  if (endTime) {
    const timeParts = endTime.split(':').map(Number)
    start.setHours(timeParts[0])
    start.setMinutes(timeParts[1])
  }

  return (
    <StyledCard
      orientation={orientation}
      style={
        {
          '--height': 'auto',
          '--card-padding': '0 0 var(--space-medium) 0',
        } as CSSProperties
      }
      {...rest}
    >
      <Media>
        {title && (
          <SimpleBlockContent
            blocks={title}
            serializers={{
              types: {
                block: (props) => <TitleBlockRenderer level={hasSectionTitle ? 'h3' : 'h2'} size="lg" {...props} />,
              },
            }}
          />
        )}
      </Media>
      <Text>
        <div>
          {/*   @TODO: Reuse the date from the event template somehow */}
          {date && (
            <div>
              <FormattedDate icon datetime={start.toString()}></FormattedDate>
            </div>
          )}
          <div>{location && <span>{location}</span>}</div>
          <div>
            {startTime && <FormattedTime icon datetime={start.toString()} />}
            {endTime && (
              <>
                <span style={{ lineHeight: '24px' }}> - </span> <FormattedTime icon datetime={end.toString()} />
              </>
            )}
          </div>
          {/*   <AddToCalendar event={data} /> */}
        </div>
      </Text>
    </StyledCard>
  )
}

export default PeopleCard
