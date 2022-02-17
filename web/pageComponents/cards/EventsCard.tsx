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
import { FormattedMessage, useIntl } from 'react-intl'

const { Text, Media, Action, StyledLandscapeCard } = Card

const StyledCard = styled(Card)`
  height: var(--height);
  width: 100%;
  /* For the landscape variant, we don't want the title
  column to be too wid*/
  --column-sizes: 40% 1fr;
`

const StyledMedia = styled(Media)`
  padding: var(--space-large) var(--space-large) 0 var(--space-large);
  word-break: break-word;
  /* Hyphens doesn't work with the Equinor font
  hyphens: auto; */
  ${StyledLandscapeCard} & {
    @media (min-width: 520px) {
      background-color: var(--moss-green-50);
      padding: var(--space-xxLarge) var(--space-large) var(--space-medium) var(--space-large);
    }
  }
`

const StyledText = styled(Text)`
  padding: 0 var(--space-large);
  ${StyledLandscapeCard} & {
    padding-bottom: var(--space-medium);
    @media (min-width: 520px) {
      /*  Because we repositioned the button container for the landscape version */
      padding: var(--space-xLarge) var(--space-large) var(--space-medium) 0;
      /* And the plot thickens... We need to push the button container to the end
       to make it look good even with a long title */
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
`
const Detail = styled.div`
  padding: var(--space-small) 0;
  border-bottom: 1px solid var(--moss-green-90);
  &:first-of-type {
    border-top: 1px solid var(--moss-green-90);
  }
  /* No top border for landscape card */
  ${StyledLandscapeCard} &:first-of-type {
    @media (min-width: 520px) {
      border-top: none;
    }
  }
  display: flex;
  align-items: center;
  & > * ~ * {
    margin-left: var(--space-3);
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
  display: inline-block;
  font-size: var(--typeScale-0);
  margin-top: var(--space-3);
`

const ActionContainer = styled.div`
  display: flex;
  gap: var(--space-small);
  ${StyledLandscapeCard} & {
    margin-top: var(--space-large);
  }
`

const TextInfoWrapper = styled.div``

type EventCardProps = {
  data: EventCardData
  hasSectionTitle: boolean
  orientation?: 'portrait' | 'landscape'
}

const EventsCard = ({ data, hasSectionTitle, orientation = 'portrait', ...rest }: EventCardProps) => {
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
                block: (props) => (
                  <TitleBlockRenderer
                    level={hasSectionTitle ? 'h3' : 'h2'}
                    style={{ fontWeight: '500' }}
                    size="md"
                    {...props}
                  />
                ),
              },
            }}
          />
        )}
      </StyledMedia>
      <StyledText>
        <TextInfoWrapper>
          {/*  @TODO Just added some inline styles atm, but it is an issue that the font sizes here
          for the date and timing are different than the rest of the occurences */}
          {start && (
            <Detail>
              <FormattedDate icon datetime={start} style={{ fontSize: 'var(--typeScale-0)' }} />
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
                <SmallText style={{ marginLeft: 'var(--space-small)' }}>
                  <FormattedMessage id="tba" defaultMessage="To be announced" />
                </SmallText>
              </>
            )}
          </Detail>
        </TextInfoWrapper>
        {orientation === 'landscape' && <Actions slug={slug} title={title} location={location} eventDate={eventDate} />}
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
  const intl = useIntl()
  const details = intl.formatMessage({ id: 'details', defaultMessage: 'Details' })
  return (
    <ActionContainer>
      <AddToCalendar eventDate={eventDate} location={location} title={title} />
      <NextLink href={slug} passHref>
        {/*  @TODO: Language string for Details */}
        <ButtonLink
          style={
            {
              '--eds_button__font_size': 'var(--typeScale-0)',
              '--eds_button__padding_y': 'var(--space-xSmall)',
            } as CSSProperties
          }
          aria-label={`${details} ${title ? blocksToText(title) : ''}`}
        >
          {details}
        </ButtonLink>
      </NextLink>
    </ActionContainer>
  )
}

export default EventsCard
