import { Card, FormattedDate } from '@components'
import { default as NextLink } from 'next/link'
import { CSSProperties } from 'react'
import styled from 'styled-components'
import type { CardData } from '../../types/types'
import Image from '../shared/Image'
import RichText from '../shared/portableText/RichText'
import { Ratios } from '../shared/SanityImage'
import { Flags } from '../../common/helpers/datasetHelpers'

const { Title, Header, Action, Arrow, Media, CardLink, Text, Eyebrow } = Card

const StyledCard = styled(Card)`
  height: var(--height);
  --card-gap: var(--space-large);
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
  -webkit-box-orient: vertical;
`

const StyledIngress = styled(Text)`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  line-clamp: 5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`

type NewsCardProp = {
  data: CardData
  fitToContent?: boolean
}

const NewsCard = ({ data, fitToContent = false, ...rest }: NewsCardProp) => {
  const { slug, title, ingress, publishDateTime, heroImage } = data
  if (!heroImage) return null

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
            {heroImage && (
              <Image
                image={heroImage.image}
                maxWidth={400}
                aspectRatio={Ratios.NINE_TO_SIXTEEN}
                layout="responsive"
                sizes="(max-width: 360px) 315px,(max-width: 600px) 550px,(max-width: 700px) 310px,450px"
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
            {Flags.IS_DEV ? (
              <StyledTitle>
                <>{title}</>
              </StyledTitle>
            ) : (
              <Title>
                <>{title}</>
              </Title>
            )}
          </Header>
          {ingress &&
            (Flags.IS_DEV ? (
              <StyledIngress>
                <RichText value={ingress}></RichText>
              </StyledIngress>
            ) : (
              <Text style={{ marginTop: 'calc(var(--space-small) * -1)' }}>
                <RichText value={ingress}></RichText>
              </Text>
            ))}
          <Action>
            <Arrow />
          </Action>
        </StyledCard>
      </StyledLink>
    </NextLink>
  )
}

export default NewsCard
