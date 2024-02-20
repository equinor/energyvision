import { Card } from '@components'
import { CSSProperties } from 'react'
import styled from 'styled-components'
import Image, { Ratios } from '../shared/SanityImage'
import { MagazineCardData } from '../../types/types'

const { Title, Header, Action, Arrow, Media, CardLink } = Card

const StyledCard = styled(Card)`
  height: var(--height);
  --card-gap: var(--space-large);
`

const StyledLink = styled(CardLink)`
  display: inline-block;
`

const TagsContainer = styled.div`
  overflow-x: scroll;
  white-space: nowrap;
  flex-wrap: nowrap;
  gap: var(--space-medium);
  display: flex;
  padding: 0 var(--space-medium) var(--space-medium);

  ::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 1024px) {
    flex-wrap: wrap;
    overflow: overlay;
  }
`
const Tag = styled.span`
  color: var(--moss-green-100);
  font-weight: var(--fontWeight-medium);
  font-size: var(--typeScale-0);
`
type MagazineCardProp = {
  data: MagazineCardData
  fitToContent?: boolean
}

const getThumbnail = (data: MagazineCardData) => {
  const { heroImage } = data

  if (!heroImage?.asset) return false

  return (
    <Image
      image={heroImage}
      maxWidth={700}
      aspectRatio={Ratios.NINE_TO_SIXTEEN}
      sizes="(min-width: 1000px) 400px, (min-width: 440px) 335px, 82.5vw"
    />
  )
}

const MagazineCard = ({ data, fitToContent = false, ...rest }: MagazineCardProp) => {
  const { slug, title, tags } = data
  const thumbnail = getThumbnail(data)
  if (!thumbnail) return null

  return (
    <StyledLink href={slug} prefetch={false} {...rest}>
      <StyledCard
        style={
          {
            '--height': fitToContent ? 'auto' : '100%',
          } as CSSProperties
        }
      >
        <Media>{thumbnail}</Media>
        <Header>
          <Title>
            <>{title}</>
          </Title>
        </Header>
        <Action>
          <Arrow />
        </Action>
        {tags && tags.length > 0 && (
          <TagsContainer>
            {tags.map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagsContainer>
        )}
      </StyledCard>
    </StyledLink>
  )
}

export default MagazineCard
