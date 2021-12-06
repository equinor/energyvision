import { CSSProperties } from 'react'
import { default as NextLink } from 'next/link'
import { Card, FormattedDate, FormattedTime, Button, Link } from '@components'
/* @TODO Is it OK with the deps on the Icon component here? */
import { Icon } from '@equinor/eds-core-react'
import { world } from '@equinor/eds-icons'
import styled from 'styled-components'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { TitleBlockRenderer } from '../../common/serializers'
import { blocksToText } from '../../common/helpers/blocksToText'

//import AddToCalendar from '../topicPages/AddToCalendar'
import type { EventCardData } from '../../types/types'
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
const Detail = styled.div<{ uppercase?: boolean }>`
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
  ${({ uppercase }) => uppercase && 'text-transform: uppercase;'}
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
          {/*   @TODO: Reuse the date from the event template somehow */}
          {/*  @TODO Just added some inline styles atm, but it is an issue that the font sizes here
          for the date and timing are different than the rest of the occurences */}
          {start && (
            <Detail uppercase>
              <FormattedDate icon datetime={start} style={{ fontSize: 'var(--typeScale-2)' }} />
            </Detail>
          )}
          {location && (
            <Detail>
              <Center>
                <Icon data={world} /> <SmallText>{location}</SmallText>
              </Center>
            </Detail>
          )}

          <Detail uppercase>
            {start && end ? (
              <>
                <FormattedTime icon datetime={start} />
                <span>-</span>
                <FormattedTime datetime={end} timezone />
              </>
            ) : (
              <>
                <TimeIcon />
                {/* @TODO: Add field to sanity or find a better way of handling this */}
                <span style={{ marginLeft: '0.5em' }}>To be announced</span>
              </>
            )}
          </Detail>

          {orientation === 'landscape' && <Actions slug={slug} title={title} />}
        </div>
      </StyledText>
      {orientation == 'portrait' && (
        <Action>
          <Actions slug={slug} title={title} />
        </Action>
      )}
    </StyledCard>
  )
}

// The design for the landscape mode breaks the Card behaviour for the action container,
// so we need to add some sparkles here
const Actions = ({ slug, title }: { slug: string; title?: BlockNode[] }) => {
  {
    /* @TODO Use the real AddToCalendar */
  }
  {
    /*   <AddToCalendar event={data} /> */
  }
  return (
    <ActionContainer>
      <Button>+ Add to calendar</Button>
      <NextLink href={slug} passHref>
        {/*  @TODO: Language string for Details */}
        <Link variant="buttonLink" type="internalUrl" aria-label={`Details ${title ? blocksToText(title) : ''}`}>
          Details
        </Link>
      </NextLink>
    </ActionContainer>
  )
}

export default PeopleCard
