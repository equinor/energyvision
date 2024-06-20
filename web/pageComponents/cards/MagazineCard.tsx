import { Card } from '@components'
import { CSSProperties, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Image, { Ratios } from '../shared/SanityImage'
import { MagazineCardData } from '../../types/types'
import { Icon } from '@equinor/eds-core-react'
import { chevron_right } from '@equinor/eds-icons'

const { Title, Header, Action, Arrow, Media, CardLink } = Card

const StyledCard = styled(Card)`
  height: var(--height);
  --card-gap: var(--space-large);
`

const TagsContainer = styled.div`
  padding: 0 var(--space-medium) var(--space-medium);
  scrollbar-width: none; 
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none; 
  }
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
  const tagsContainerRef = useRef<HTMLDivElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    const tagsContainer = tagsContainerRef.current
    if (tagsContainer) {
      const checkOverflow = () => {
        const isAtEnd = tagsContainer.scrollWidth - tagsContainer.scrollLeft <= tagsContainer.clientWidth
        setIsOverflowing(!isAtEnd)
      }

      checkOverflow()
      tagsContainer.addEventListener('scroll', checkOverflow)

      return () => {
        tagsContainer.removeEventListener('scroll', checkOverflow)
      }
    }
  }, [tags])

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
            <TagsContainer className='overflow-x-auto flex whitespace-nowrap gap-x-4' ref={tagsContainerRef}>
              {tags.map((tag: string) => (
                <span className="text-moss-green-100 font-medium text-xs" key={tag}>
                  {tag}
                </span>
              ))}
            </TagsContainer>
            <div
              className={`${
                isOverflowing ? 'opacity-100' : 'opacity-0'
              } shrink-0 flex items-center pr-2 transition-opacity pt-0 pb-4`}
            >
              <Icon className="sm:min-h-6 sm:min-w-6 h-6 w-6 text-moss-green-100" data={chevron_right} />
            </div>
          </div>
        )}
      </StyledCard>
    </CardLink>
  )
}

export default MagazineCard
