import { BackgroundContainer, Card } from '@components'
import { tokens } from '@equinor/eds-tokens'
import { PortableTextBlock } from '@portabletext/types'
import { CSSProperties, Fragment } from 'react'
import styled from 'styled-components'
import type { PromoTileArrayData, PromoTileData } from '../../types/types'
import Image, { Ratios } from '../shared/SanityImage'
import PromotileTitleText from '../shared/portableText/PromoTileTitleText'
import { PromoTileButton } from './PromoTileButton'
import useWindowSize from '../../lib/hooks/useWindowSize'
import { Carousel } from '../shared/Carousel'

const { Header, Action, Media } = Card

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr;
  grid-gap: var(--space-medium);
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;

  @media (min-width: 750px) {
    grid-template-columns: 1fr 1fr;
  }
`

const HorizontalWrapper = styled.div`
  --card-maxWidth: 280px;

  margin-top: var(--space-3xLarge);
  margin-bottom: var(--space-3xLarge);

  @media (min-width: 800px) {
    --card-maxWidth: 400px;
  }
`

/**
 * tokens.shape.corners.borderRadius is the value used by the EDS Card component
 * Use same value from @equinor/eds-tokens to ensure consistency
 */
const StyledBackgroundContainer = styled(BackgroundContainer)`
  border-radius: ${tokens.shape.corners.borderRadius};
  box-shadow: var(--card-box-shadow);
`
const ImageWithRoundedUpperCorners = styled(Image)`
  border-radius: ${tokens.shape.corners.borderRadius} ${tokens.shape.corners.borderRadius} 0 0;
`

const StyledAction = styled(Action)`
  flex-grow: 0;
`

const StyledCard = styled(Card)`
  width: var(--card-maxWidth, 100%);
`

const PromoTileArray = ({ data, anchor }: { data: PromoTileArrayData; anchor?: string }) => {
  const { width } = useWindowSize()

  if (!data.group) return null

  const renderScroll = data.useHorizontalScroll || Boolean(width && width <= 800)

  const richTitle = (title: PortableTextBlock[], hasImage: boolean) => {
    return (
      <Header>
        <PromotileTitleText
          style={
            {
              '--card-title-fontSize': hasImage ? undefined : 'var(--typeScale-4)',
              '--card-title-fontWeight': hasImage ? '450' : '400',
            } as CSSProperties
          }
          value={title}
        />
      </Header>
    )
  }

  const Wrapper = renderScroll
    ? ({ children }: { children: React.ReactNode }) => (
        <HorizontalWrapper>
          <Carousel horizontalPadding>{children}</Carousel>
        </HorizontalWrapper>
      )
    : Container

  return (
    <div className="background-none" id={anchor}>
      <Wrapper>
        {data.group.map((tile: PromoTileData) => {
          const { id, designOptions, image, title, action, linkLabelAsTitle } = tile
          const { background } = designOptions
          const hasImage = !!image?.asset

          const Content = () =>
            linkLabelAsTitle ? (
              <PromoTileButton action={action} template="icon" hasImage={hasImage} />
            ) : (
              <>
                {<>{richTitle(title, hasImage)}</>}
                {action.label && (
                  <StyledAction>
                    <PromoTileButton action={action} hasImage={hasImage} />
                  </StyledAction>
                )}
              </>
            )

          return (
            /* Sneaky little hack to make it work with the bg colour See #667 */
            <StyledBackgroundContainer disableContainerWrapper={true} background={background} key={id}>
              <StyledCard type="promo" textOnly={!image} style={{ '--card-height': '100%' } as CSSProperties}>
                {image && (
                  <Media>
                    <ImageWithRoundedUpperCorners
                      image={image}
                      alt={image.alt}
                      maxWidth={400}
                      aspectRatio={Ratios.FOUR_TO_FIVE}
                    />
                  </Media>
                )}
                <Content />
              </StyledCard>
            </StyledBackgroundContainer>
          )
        })}
      </Wrapper>
    </div>
  )
}

export default PromoTileArray
