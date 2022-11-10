import { Card, FormattedDate, FormattedTime } from '@components'
import { default as NextLink } from 'next/link'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { toPlainText } from '@portabletext/react'
import { getEventDates } from '../../common/helpers/dateUtilities'
import { TimeIcon } from '../../components/src/FormattedDateTime/shared'
import { Icon } from '@equinor/eds-core-react'
import { world } from '@equinor/eds-icons'
import type { CSSProperties } from 'react'
import type { FeaturedContentData } from '../../types/types'
import type { PortableTextBlock } from '@portabletext/types'

const { Title, Media, Header, Text, Action, Arrow, CardLink } = Card

const StyledCard = styled(Card)`
  height: var(--height);
  --card-gap: var(--space-large);
`

const StyledLink = styled(CardLink)`
  width: 100%;
  display: inline-block;
`

const SmallText = styled.span`
  display: inline-block;
  font-size: var(--typeScale-0);
  margin-top: var(--space-3);
`

const Detail = styled.div`
  padding: var(--space-small) 0;
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

type FeaturedEventCardProps = {
  data: FeaturedContentData
  fitToContent?: boolean
}

const FeaturedEventCard = ({ data, fitToContent = false, ...rest }: FeaturedEventCardProps) => {
  const { slug, title, eventDate, location } = data
  const { start, end } = getEventDates(eventDate)

  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''

  return (
    <NextLink href={slug} passHref legacyBehavior>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <StyledLink {...rest}>
        <StyledCard
          style={
            {
              '--height': fitToContent ? 'auto' : '100%',
            } as CSSProperties
          }
        >
          <Media></Media>
          <Header>
            <Title>{plainTitle}</Title>
          </Header>
          <Text>
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
            {start && end ? (
              <Detail>
                <FormattedTime icon datetime={start} small />
                <span>-</span>
                <FormattedTime datetime={end} timezone small />
              </Detail>
            ) : (
              <Detail>
                <TimeIcon />
                <SmallText style={{ marginLeft: 'var(--space-small)' }}>
                  <FormattedMessage id="tba" defaultMessage="To be announced" />
                </SmallText>
              </Detail>
            )}
          </Text>
          <Action>
            <Arrow />
          </Action>
        </StyledCard>
      </StyledLink>
    </NextLink>
  )
}

export default FeaturedEventCard
