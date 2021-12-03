import { CSSProperties } from 'react'
import { Card } from '@components'
import styled from 'styled-components'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { TitleBlockRenderer } from '../../common/serializers'
import AddToCalendar from '../topicPages/AddToCalendar'
import type { EventCardData } from '../../types/types'

const { Text } = Card

const StyledCard = styled(Card)`
  height: var(--height);
`

type EventCardProps = {
  data: EventCardData
  hasSectionTitle: boolean
  orientation?: 'portrait' | 'landscape'
}

const PeopleCard = ({ data, hasSectionTitle, orientation = 'portrait', ...rest }: EventCardProps) => {
  const { title, location /* eventDate */ } = data

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
      <Text>
        <div>
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
          {/*   @TODO: Reuse the date from the event template somehow */}
          {/*  {eventDate && <span>{eventDate}</span>} */}
          {location && <span>{location}</span>}
          {/*   <AddToCalendar event={data} /> */}
        </div>
      </Text>
    </StyledCard>
  )
}

export default PeopleCard
