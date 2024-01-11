import { Card, FormattedDate } from '@components'
import { CSSProperties } from 'react'
import styled from 'styled-components'
import type { CardData } from '../../types/types'
import Image, { Ratios } from '../shared/SanityImage'
import RichText from '../shared/portableText/RichText'

const { Title, Header, Action, Arrow, Media, CardLink, Text, Eyebrow } = Card

const StyledCard = styled(Card)`
  --card-gap: var(--space-large);
  height: var(--height);
  @media (max-width: 800px) {
    --card-maxWidth: 300px;
  }
`
const StyledLink = styled(CardLink)`
  display: inline-block;
`
const StyledTitle = styled(Title)`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-clamp: 2;
  display: -webkit-box;
`

const StyledIngress = styled(Text)`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  line-clamp: 5;
  display: -webkit-box;
  margin-bottom: 0;
  font-size: var(--typeScale-1);
  line-height: var(--lineHeight-3);
`

const StyledWrapper = styled(Text)`
  margin-top: calc(var(--space-small) * -1);
  padding-left: 0;
  padding-right: 0;
`

type NewsCardProp = {
  data: CardData
  fitToContent?: boolean
}

const NewsCard = ({ data, fitToContent = false, ...rest }: NewsCardProp) => {
  const { slug, title, ingress, publishDateTime, heroImage } = data
  if (!heroImage) return null

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
          {heroImage && (
            <Image
              image={heroImage.image}
              maxWidth={400}
              aspectRatio={Ratios.NINE_TO_SIXTEEN}
              sizes="(min-width: 1780px) calc(-1.72vw + 401px), (min-width: 1340px) calc(17.86vw + 58px), 276px"
            />
          )}
        </Media>
        <Header>
          {publishDateTime && (
            <Eyebrow>
              <FormattedDate
                datetime={publishDateTime}
                style={{ textTransform: 'uppercase', marginBottom: 'var(--space-xSmall)' }}
              />
            </Eyebrow>
          )}
          <StyledTitle>
            <>{title}</>
          </StyledTitle>
        </Header>
        {ingress && (
          <StyledWrapper>
            <RichText
              value={ingress}
              components={{
                block: {
                  normal: ({ children }) => {
                    return <StyledIngress>{children}</StyledIngress>
                  },
                  smallText: ({ children }) => {
                    return <StyledIngress>{children}</StyledIngress>
                  },
                },
              }}
            ></RichText>
          </StyledWrapper>
        )}
        <Action>
          <Arrow />
        </Action>
      </StyledCard>
    </StyledLink>
  )
}

export default NewsCard
