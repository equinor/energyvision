import { CSSProperties } from 'react'
import { default as NextLink } from 'next/link'
import { toPlainText } from '@portabletext/react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Card, FormattedDate, FormattedTime, ButtonLink, Heading } from '@components'
import { Icon } from '@equinor/eds-core-react'
import { world } from '@equinor/eds-icons'
import styled from 'styled-components'
import isEmpty from '../../common/portableText/helpers/isEmpty'
import TitleText from '../../common/portableText/TitleText'
import AddToCalendar from '../topicPages/AddToCalendar'
import { getEventDates } from '../../common/helpers/dateUtilities'
import { TimeIcon } from '../../components/src/FormattedDateTime/shared'

import type { EventCardData, EventDateType } from '../../types/types'
import type { PortableTextBlock } from '@portabletext/types'

const { Text, Media, Action, StyledLandscapeCard } = Card

const StyledCard = styled(Card)`
  height: var(--height);
  width: 100%;
  /* For the landscape variant, we don't want the title
  column to be too wide*/
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
  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''

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
          <TitleText
            value={title}
            components={{
              block: {
                // This one needs an override because of the font weight change
                normal: ({ children }) => {
                  // eslint-disable-next-line
                  // @ts-ignore: Still struggling with the types here :/
                  if (isEmpty(children)) return null
                  return (
                    <Heading level={hasSectionTitle ? 'h3' : 'h2'} style={{ fontWeight: '500' }} size="md">
                      {children}
                    </Heading>
                  )
                },
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
        {orientation === 'landscape' && (
          <Actions slug={slug} title={plainTitle} location={location} eventDate={eventDate} />
        )}
      </StyledText>
      {orientation == 'portrait' && (
        <Action>
          <Actions slug={slug} title={plainTitle} location={location} eventDate={eventDate} />
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
  title: string
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
          aria-label={`${details} ${title}`}
        >
          {details}
        </ButtonLink>
      </NextLink>
    </ActionContainer>
  )
}

export default EventsCard
