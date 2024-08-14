import { Card } from '@components'
import { CSSProperties } from 'react'
import styled from 'styled-components'
import Image, { Ratios } from '../shared/SanityImage'
import { MagazineCardData } from '../../types/index'

const { Title, Header, Action, Arrow, Media, CardLink } = Card

const StyledCard = styled(Card)`
  height: var(--height);
  --card-gap: var(--space-large);
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
    <CardLink className="inline-block" href={slug} prefetch={false} {...rest}>
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
          <div className="relative flex items-center">
            <div className="gap-x-1 px-4 pt-0 pb-4">
              {tags.map((tag: string, index: number) => (
                <span className="text-moss-green-100 font-medium text-xs" key={tag}>
                  {tag}
                  {index < tags.length - 1 && ', '}
                </span>
              ))}
            </div>
          </div>
        )}
      </StyledCard>
    </CardLink>
  )
}

export default MagazineCard
