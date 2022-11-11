import { CSSProperties } from 'react'
import { Card } from '@components'
import { default as NextLink } from 'next/link'
import { toPlainText } from '@portabletext/react'
import styled from 'styled-components'
import Image from '../shared/Image'
import RichText from '../shared/portableText/RichText'
import Img from 'next/image'

import type { CardData } from '../../types/types'
import type { PortableTextBlock } from '@portabletext/types'

const { Title, Header, Text, Action, Arrow, Media, CardLink } = Card

const StyledCard = styled(Card)`
  height: var(--height);
  --card-gap: var(--space-large);
`

const StyledLink = styled(CardLink)`
  width: 100%;
  display: inline-block;
`

type TopicPageCardProp = {
  data: CardData
  fitToContent?: boolean
}

const TopicPageCard = ({ data, fitToContent = false, ...rest }: TopicPageCardProp) => {
  const { slug, title, heroImage, openGraphImage, heroVideo, heroType, ingress } = data
  console.log(heroVideo?.playbackId, 'Topic Page')
  const thumbnail = heroImage?.image?.asset ? heroImage.image : openGraphImage
  if (!thumbnail || !thumbnail.asset) return null

  const pageTitle = title ? toPlainText(title as PortableTextBlock[]) : ''

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
            <Title>{pageTitle}</Title>
          </Header>
          {ingress && (
            <Text style={{ marginTop: 'calc(var(--space-small) * -1)' }}>
              <RichText value={ingress}></RichText>
            </Text>
          )}
          <Action>
            <Arrow />
          </Action>
        </StyledCard>
      </StyledLink>
    </NextLink>
  )
}

export default TopicPageCard
