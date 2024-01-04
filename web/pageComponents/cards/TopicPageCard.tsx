import { Card } from '@components'
import { toPlainText } from '@portabletext/react'
import { CSSProperties } from 'react'
import styled from 'styled-components'
import Image, { Ratios } from '../shared/SanityImage'
import RichText from '../shared/portableText/RichText'

import type { PortableTextBlock } from '@portabletext/types'
import type { CardData } from '../../types/types'

const { Title, Header, Text, Action, Arrow, Media, CardLink } = Card

const StyledCard = styled(Card)`
  --card-height: var(--height);
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
  const { slug, title, heroImage, openGraphImage, ingress } = data

  const thumbnail = heroImage?.image?.asset ? heroImage.image : openGraphImage
  if (!thumbnail || !thumbnail.asset) return null

  const pageTitle = title ? toPlainText(title as PortableTextBlock[]) : ''

  return (
    <StyledLink href={slug} {...rest}>
      <StyledCard
        style={
          {
            '--height': fitToContent ? 'auto' : '100%',
          } as CSSProperties
        }
      >
        <Media>
          {thumbnail && <Image image={thumbnail} maxWidth={400} aspectRatio={Ratios.NINE_TO_SIXTEEN} sizes="220px" />}
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
  )
}

export default TopicPageCard
