import { CSSProperties } from 'react'
import { default as NextLink } from 'next/link'
import { Card, FormattedDate, FormattedTime } from '@components'
import styled from 'styled-components'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { TitleBlockRenderer } from '../../common/serializers'
// import AddToCalendar from '../topicPages/AddToCalendar'
import type { EventCardData } from '../../types/types'

const { Text, Media, CardLink } = Card

const StyledCard = styled(Card)`
  height: var(--height);
  width: 100%;
  display: inline-block;
  /* For the event it's easier with the padding on the card itself,
  since we have horizontal lines */
  padding: var(--space-xxLarge) var(--space-xLarge);
`

const StyledMedia = styled(Media)`
  padding-bottom: var(--space-xLarge);
  border-bottom: 1px solid var(--moss-green-90);
`

const StyledText = styled(Text)`
  padding: 0;
`
const Detail = styled.div`
  border-bottom: 1px solid var(--moss-green-90);
`

type EventCardProps = {
  data: EventCardData
  hasSectionTitle: boolean
  orientation?: 'portrait' | 'landscape'
}

const PeopleCard = ({ data, hasSectionTitle, orientation = 'portrait', ...rest }: EventCardProps) => {
  const { title, location, eventDate, slug } = data

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
    /*  <NextLink href={slug} passHref>
      <CardLink> */
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
      <StyledMedia>
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
      </StyledMedia>
      <StyledText>
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
      </StyledText>
    </StyledCard>
    /*      </CardLink>
    </NextLink> */
  )
}

export default PeopleCard
