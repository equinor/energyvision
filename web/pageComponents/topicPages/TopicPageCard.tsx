import { Card } from '@components'
import { default as NextLink } from 'next/link'
import styled from 'styled-components'
import type { CardData } from '../../types/types'
import Image from '../shared/Image'

const { Title, Header, Action, Arrow, Media, CardLink } = Card

const StyledCard = styled(Card)`
  height: auto;
`

const StyledLink = styled(CardLink)`
  display: inline-block;
`

type TopicPageCardProp = {
  data: CardData
  fitToContent?: boolean
}

const TopicPageCard = ({ data }: TopicPageCardProp) => {
  const { slug, title, heroImage } = data
  if (!heroImage) return null

  return (
    <NextLink href={slug} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <StyledLink>
        <StyledCard>
          <Media>
            {heroImage && <Image image={heroImage.image} maxWidth={400} aspectRatio={0.56} layout="responsive" />}
          </Media>
          <Header>
            <Title>{title}</Title>
          </Header>
          <Action>
            <Arrow />
          </Action>
        </StyledCard>
      </StyledLink>
    </NextLink>
  )
}

export default TopicPageCard
