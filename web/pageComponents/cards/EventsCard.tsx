import { CSSProperties } from 'react'
import { default as NextLink } from 'next/link'
import { Card, FormattedDate, FormattedTime, ButtonLink } from '@components'
/* @TODO Is it OK with the deps on the Icon component here? */
import { Icon } from '@equinor/eds-core-react'
import { world } from '@equinor/eds-icons'
import styled from 'styled-components'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { TitleBlockRenderer } from '../../common/serializers'
import { blocksToText } from '../../common/helpers/blocksToText'
import AddToCalendar from '../topicPages/AddToCalendar'
import type { EventCardData, EventDateType } from '../../types/types'
import type { BlockNode } from '@sanity/block-content-to-react'
import { getEventDates } from '../../common/helpers/dateUtilities'
import { TimeIcon } from '../../components/src/FormattedDateTime/shared'

const { Text, Media, Action, StyledPortraitCard, StyledLandscapeCard } = Card

const StyledCard = styled(Card)`
  height: var(--height);
  width: 100%;

  /* For the event it's easier with the padding on the card itself,
  since we have horizontal lines */
  /* padding: var(--space-xxLarge) var(--space-xLarge); */
`

const StyledMedia = styled(Media)`
  padding: var(--space-xxLarge) var(--space-large) 0 var(--space-large);
  ${StyledLandscapeCard} & {
    background-color: var(--moss-green-50);
  }
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
  display: flex;
  align-items: center;
  & > * ~ * {
    margin-left: 0.3em;
  }
`

const Center = styled.div`
  display: flex;
  align-items: center;
  & svg {
    flex-shrink: 0;
    margin-right: 0.5em;
  }
`

const SmallText = styled.span`
  display: inline-block;
  font-size: var(--typeScale-0);
  margin-top: var(--space-3);
`

const ActionContainer = styled.div`
  display: flex;
  gap: var(--space-small);
`

type EventCardProps = {
  data: EventCardData
  hasSectionTitle: boolean
  orientation?: 'portrait' | 'landscape'
}

const PeopleCard = ({ data, hasSectionTitle, orientation = 'portrait', ...rest }: EventCardProps) => {
  const { title, location, eventDate, slug } = data

  const { start, end } = getEventDates(eventDate)

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
          {/*  @TODO Just added some inline styles atm, but it is an issue that the font sizes here
          for the date and timing are different than the rest of the occurences */}
          {start && (
            <Detail>
              <FormattedDate icon datetime={start} style={{ fontSize: 'var(--typeScale-2)' }} />
            </Detail>
          )}
          {location && (
            <Detail>
              <Center>
                <Icon data={world} color={'var(--moss-green-100)'} /> <SmallText>{location}</SmallText>
              </Center>
            </Detail>
          )}

          <Detail>
            {start && end ? (
              <>
                <FormattedTime icon datetime={start} small />
                <span>-</span>
                <FormattedTime datetime={end} timezone small />
              </>
            ) : (
              <>
                <TimeIcon />
                {/* @TODO: Add field to sanity or find a better way of handling this */}
                <SmallText style={{ marginLeft: '0.5em' }}>To be announced</SmallText>
              </>
            )}
          </Detail>

          {orientation === 'landscape' && (
            <Actions slug={slug} title={title} location={location} eventDate={eventDate} />
          )}
        </div>
      </StyledText>
      {orientation == 'portrait' && (
        <Action>
          <Actions slug={slug} title={title} location={location} eventDate={eventDate} />
        </Action>
      )}
    </StyledCard>
  )
}

// The design for the landscape mode breaks the Card behaviour for the action container,
// so we need to add some sparkles here
const Actions = ({
  slug,
  title,
  eventDate,
  location,
}: {
  slug: string
  title: BlockNode[]
  location?: string
  eventDate: EventDateType
}) => {
  return (
    <ActionContainer>
      <AddToCalendar eventDate={eventDate} location={location} title={title} />
      <NextLink href={slug} passHref>
        {/*  @TODO: Language string for Details */}
        <ButtonLink aria-label={`Details ${title ? blocksToText(title) : ''}`}>Details</ButtonLink>
      </NextLink>
    </ActionContainer>
  )
}

export default PeopleCard
