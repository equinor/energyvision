import { Card } from '@components'
import { default as NextLink } from 'next/link'
import styled from 'styled-components'
import type { CardData } from '../../types/types'
import Image from '../shared/Image'
import { blocksToText } from '../../common/helpers/blocksToText'
import type { BlockNode } from '@sanity/block-content-to-react'

const { Title, Header, Action, Arrow, Media, CardLink } = Card

const StyledCard = styled(Card)`
  height: auto;
`

const StyledLink = styled(CardLink)`
  width: 100%;
  display: inline-block;
`

type TopicPageCardProp = {
  data: CardData
  fitToContent?: boolean
}

const TopicPageCard = ({ data }: TopicPageCardProp) => {
  const { slug, title, heroImage } = data
  if (!heroImage) return null

  const pageTitle = title ? blocksToText(title as BlockNode[]) : ''

  return (
    <NextLink href={slug} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <StyledLink>
        <StyledCard>
          <Media>
            {heroImage && (
              <Image
                image={heroImage.image}
                maxWidth={400}
                aspectRatio={0.56}
                layout="responsive"
                sizes="(max-width: 360px) 315px,(max-width: 600px) 550px,(max-width: 700px) 310px,450px"
              />
            )}
          </Media>
          <Header>
            <Title>{pageTitle}</Title>
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
