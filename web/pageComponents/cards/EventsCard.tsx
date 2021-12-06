import { CSSProperties } from 'react'
//import { default as NextLink } from 'next/link'
import { Card, FormattedDate, FormattedTime, Button } from '@components'
/* @TODO Is it OK with the deps on the Icon component here? */
import { Icon } from '@equinor/eds-core-react'
import { world } from '@equinor/eds-icons'
import styled from 'styled-components'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { TitleBlockRenderer } from '../../common/serializers'
//import AddToCalendar from '../topicPages/AddToCalendar'
import type { EventCardData } from '../../types/types'

const { Text, Media, Action } = Card

const StyledCard = styled(Card)`
  height: var(--height);
  width: 100%;

  /* For the event it's easier with the padding on the card itself,
  since we have horizontal lines */
  /* padding: var(--space-xxLarge) var(--space-xLarge); */
`

const StyledMedia = styled(Media)`
  padding: var(--space-xxLarge) var(--space-large) 0 var(--space-large);
`

const StyledText = styled(Text)`
  padding: 0 var(--space-large);
`
const Detail = styled.div`
  padding: var(--space-small) 0;
  border-bottom: 1px solid var(--moss-green-90);
  &:first-of-type {
    border-top: 1px solid var(--moss-green-90);
  }
`

const Center = styled.div`
  display: flex;
  align-items: center;
  & svg {
    flex-shrink: 0;
    margin-right: var(--space-small);
  }
`

const SmallText = styled.span`
  font-size: var(--typeScale-0);
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
          {/*  @TODO Just added some inline styles atm, but it is an issue that the font sizes here
          for the date and timing are different than the rest of the occurences */}
          {date && (
            <Detail>
              <FormattedDate
                icon
                datetime={start.toString()}
                style={{ fontSize: 'var(--typeScale-2)' }}
              ></FormattedDate>
            </Detail>
          )}
          {location && (
            <Detail>
              <Center>
                <Icon data={world} /> <SmallText>{location}</SmallText>
              </Center>
            </Detail>
          )}

          {startTime && (
            <Detail>
              {/* @TODO Rewrite into one StartEndTime-component? */}
              {/* @TODO The time component doesn't allow inline styling */}
              {startTime && (
                <FormattedTime /* style={{ fontSize: 'var(--typeScale-0)' }} */ icon datetime={start.toString()} />
              )}
              {endTime && (
                <>
                  <span style={{ lineHeight: '24px' }}> - </span> <FormattedTime icon datetime={end.toString()} />
                </>
              )}
            </Detail>
          )}
        </div>
      </StyledText>
      <Action>
        {/*   <AddToCalendar event={data} /> */}
        <Button>Add to calendar</Button>
      </Action>
    </StyledCard>
    /*      </CardLink>
    </NextLink> */
  )
}

export default PeopleCard
