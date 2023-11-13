import { BackgroundContainer, Card } from '@components'
import { tokens } from '@equinor/eds-tokens'
import { CSSProperties } from 'react'
import styled from 'styled-components'
import type { PromoTextTileArrayData, PromoTextTileData } from '../../types/types'
import PromotileTitleText from '../shared/portableText/PromoTileTitleText'
import { PromoTileButton } from './PromoTileButton'
import { PortableTextBlock } from '@portabletext/types'

const { Action, Text } = Card

const Container = styled.div<{ isMultipleCards: boolean; isSpacing?: boolean }>`
  display: grid;
  grid-gap: var(--space-medium);
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
  height: 100%;
  grid-template-columns: ${({ isMultipleCards }) =>
    isMultipleCards ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr'};
  ${({ isSpacing }) =>
    isSpacing && {
      marginTop: '50px',
      marginBottom: '50px',
    }}
`

const StyledBackgroundContainer = styled(BackgroundContainer)`
  border-radius: ${tokens.shape.corners.borderRadius};
  box-shadow: var(--card-box-shadow);
`

const StyledAction = styled(Action)`
  flex-grow: 1;
`

const StyledCard = styled(Card)<{ alignLeft: boolean }>`
  width: 100%;
  --card-maxWidth: 280px;
  flex-direction: row;
  height: 300px;
  overflow: hidden;
  justify-content: ${({ alignLeft }) => (alignLeft ? 'flex-start' : 'center')};
  @media (max-width: 1004px) {
    justify-content: center;
  }
`

const ContentWrapper = styled.div<{ alignLeft: boolean; hasLink: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ hasLink, alignLeft }) => (hasLink ? (alignLeft ? 'flex-start' : 'center') : 'center')};
  justify-content: ${({ hasLink, alignLeft }) => (hasLink ? (alignLeft ? 'flex-start' : 'center') : 'center')};
  text-align: center;
  margin-bottom: var(--space-medium);
  height: 100%;
  @media (max-width: 1004px) {
    justify-content: center;
    align-items: center;
  }
`

const PromoTextTileArray = ({ data, anchor }: { data: PromoTextTileArrayData; anchor?: string }) => {
  if (!data.group) return null
  const isMultipleCards = data.group.length > 1

  return (
    <div className="background-none" id={anchor}>
      <Container isMultipleCards={isMultipleCards} isSpacing={data?.spacing}>
        {data.group.map((tile: PromoTextTileData) => {
          const { id, designOptions, action, linkLabelAsTitle, ingress } = tile
          const { background } = designOptions

          return (
            <StyledBackgroundContainer disableContainerWrapper={true} background={background} key={id}>
              <StyledCard
                type="promo"
                textOnly={true}
                alignLeft={isMultipleCards}
                style={
                  {
                    padding: 'var(--space-medium)',
                    '--card-maxWidth': !isMultipleCards ? '100%' : '280px',
                    fontSize: 'var(--typeScale-5)',
                  } as CSSProperties
                }
              >
                <ContentWrapper alignLeft={isMultipleCards} hasLink={!!tile.action}>
                  <Text>
                    <PromotileTitleText
                      style={
                        {
                          '--card-title-fontSize': 'var(--typeScale-3)',
                          '--card-title-fontWeight': '400',
                        } as CSSProperties
                      }
                      value={ingress as PortableTextBlock[]}
                    />
                  </Text>
                  {action.label && (
                    <StyledAction>
                      {linkLabelAsTitle ? (
                        <PromoTileButton action={action} template="text" hasImage={true} />
                      ) : (
                        <PromoTileButton action={action} template="icon" hasImage={false} />
                      )}
                    </StyledAction>
                  )}
                </ContentWrapper>
              </StyledCard>
            </StyledBackgroundContainer>
          )
        })}
      </Container>
    </div>
  )
}

export default PromoTextTileArray
