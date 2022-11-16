import { CSSProperties } from 'react'
import { Card } from '@components'
import { default as NextLink } from 'next/link'
import styled from 'styled-components'
import { HeroTypes, ImageWithAlt, MagazineCardData, VideoHeroData } from '../../types/types'
import Image from '../shared/Image'
import Img from 'next/legacy/image'

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

type ThumbnailProps = {
  heroVideo?: VideoHeroData
  heroType?: HeroTypes
  heroImage?: ImageWithAlt
  openGraphImage?: ImageWithAlt
}

const getThumbnail = ({ heroVideo, heroType, heroImage, openGraphImage }: ThumbnailProps) => {
  if (heroType === HeroTypes.VIDEO_HERO) {
    console.log('hero video')
  }

  const getSanityImage = (image: ImageWithAlt) => {
    return (
      <Image
        image={image}
        maxWidth={400}
        aspectRatio={0.56}
        layout="responsive"
        sizes="(max-width: 360px) 315px,(max-width: 600px) 550px,(max-width: 700px) 310px,450px"
      />
    )
  }
  if (heroType === HeroTypes.VIDEO_HERO) {
    return (
      <Img
        src={`https://image.mux.com/${heroVideo?.playbackId}/thumbnail.jpg`}
        alt="thumbnail"
        layout="responsive"
        sizes="(max-width: 360px) 315px,(max-width: 600px) 550px,(max-width: 700px) 310px,450px"
        width="500"
        height="300"
      />
    )
  } else if (heroImage?.asset) {
    return getSanityImage(heroImage)
  } else if (openGraphImage) {
    return getSanityImage(openGraphImage)
  }
}

const MagazineCard = ({ data, fitToContent = false, ...rest }: MagazineCardProp) => {
  const { slug, title, heroImage, openGraphImage, heroVideo, heroType, tags } = data
  const hasThumbnail = heroImage?.asset || heroVideo?.playbackId || openGraphImage
  if (!hasThumbnail) return null

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
          <Media>{getThumbnail({ heroVideo, heroType, heroImage, openGraphImage })}</Media>

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
