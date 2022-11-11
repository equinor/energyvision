import { CSSProperties } from 'react'
import { Card } from '@components'
import { default as NextLink } from 'next/link'
import styled from 'styled-components'
import type { MagazineCardData } from '../../types/types'
import Image from '../shared/Image'

const { Title, Header, Action, Arrow, Media, CardLink } = Card

const StyledCard = styled(Card)`
  height: var(--height);
  --card-gap: var(--space-large);
`
const StyledLink = styled(CardLink)`
  display: inline-block;
`

const TagsContainer = styled.div`
  padding: 0 var(--space-medium) var(--space-medium);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-medium);
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

const MagazineCard = ({ data, fitToContent = false, ...rest }: MagazineCardProp) => {
  const { slug, title, heroImage, openGraphImage, tags } = data

  const thumbnail = heroImage?.asset ? heroImage : openGraphImage
  if (!thumbnail || !thumbnail.asset) return null

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
          <Media>
            {thumbnail && (
              <Image
                image={thumbnail}
                maxWidth={400}
                aspectRatio={0.56}
                layout="responsive"
                sizes="(max-width: 360px) 315px,(max-width: 600px) 550px,(max-width: 700px) 310px,450px"
              />
            )}
          </Media>
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
    </NextLink>
  )
}

export default MagazineCard
