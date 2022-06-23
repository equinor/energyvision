import { CSSProperties } from 'react'
import styled from 'styled-components'
import { Card, BackgroundContainer } from '@components'
import { tokens } from '@equinor/eds-tokens'
import type { PromoTileArrayData, PromoTileData } from '../../types/types'
import Image from '../shared/Image'
import { ButtonLink } from '../shared/ButtonLink'

const { Title, Header, Action, Media } = Card

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

/**
 * tokens.shape.corners.borderRadius is the value used by the EDS Card component
 * Use same value from @equinor/eds-tokens to ensure consistency
 */
const StyledBackgroundContainer = styled(BackgroundContainer)`
  border-radius: ${tokens.shape.corners.borderRadius};
`
const ImageWithRoundedUpperCorners = styled(Image)`
  border-radius: ${tokens.shape.corners.borderRadius} ${tokens.shape.corners.borderRadius} 0 0;
`

const PromoTileArray = ({ data, anchor }: { data: PromoTileArrayData; anchor?: string }) => {
  if (!data.group) return null

  return (
    <div className="background-none" id={anchor}>
      <Container>
        {data.group.map((tile: PromoTileData) => {
          const { id, designOptions, image, title, action } = tile
          const { background } = designOptions

          return (
            /* Sneaky little hack to make it work with the bg colour See #667 */
            <StyledBackgroundContainer disableContainerWrapper={true} background={background} key={id}>
              <Card type="promo" textOnly={!image} style={{ '--card-height': '100%' } as CSSProperties}>
                {image && (
                  <Media>
                    <ImageWithRoundedUpperCorners
                      image={image}
                      alt={image.alt}
                      maxWidth={400}
                      aspectRatio={0.8}
                      layout="responsive"
                    />
                  </Media>
                )}
                <Header>
                  {image ? (
                    <Title
                      style={
                        {
                          '--card-title-fontWeight': '450',
                        } as CSSProperties
                      }
                    >
                      {title}
                    </Title>
                  ) : (
                    <Title
                      style={
                        {
                          '--card-title-fontSize': 'var(--typeScale-4)',
                          '--card-title-fontWeight': '400',
                        } as CSSProperties
                      }
                    >
                      {title}
                    </Title>
                  )}
                </Header>
                {action.label && (
                  <Action>
                    <ButtonLink action={action} />
                  </Action>
                )}
              </Card>
            </StyledBackgroundContainer>
          )
        })}
      </Container>
    </div>
  )
}

export default PromoTileArray
