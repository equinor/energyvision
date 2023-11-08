import { BackgroundContainer, Card } from '@components'
import { tokens } from '@equinor/eds-tokens'
import { CSSProperties } from 'react'
import styled from 'styled-components'
import type { PromoTextTileArrayData, PromoTextTileData } from '../../types/types'
import PromotileTitleText from '../shared/portableText/PromoTileTitleText'
import { PromoTileButton } from './PromoTileButton'

const { Header, Action, Text } = Card

const Container = styled.div<{ isMultipleCards: boolean }>`
  display: grid;
  grid-template-columns: ${({ isMultipleCards }) =>
    isMultipleCards ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr'};
  grid-gap: var(--space-medium);
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
  height: 100%;
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
`

const ContentWrapper = styled.div<{ alignLeft: boolean; hasLink: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ hasLink, alignLeft }) => (hasLink ? (alignLeft ? 'flex-start' : 'center') : 'center')};
  justify-content: ${({ hasLink, alignLeft }) => (hasLink ? (alignLeft ? 'flex-start' : 'center') : 'center')};
  text-align: center;
  margin-bottom: var(--space-medium);
  height: 100%;
`

const PromoTextTileArray = ({ data, anchor }: { data: PromoTextTileArrayData; anchor?: string }) => {
  if (!data.group) return null
  const isMultipleCards = data.group.length > 1

  return (
    <div className="background-none" id={anchor}>
      <Container isMultipleCards={isMultipleCards}>
        {data.group.map((tile: PromoTextTileData) => {
          const { id, designOptions, action, linkLabelAsTitle, text } = tile
          const { background } = designOptions
          console.log('text', text)

          return (
            <StyledBackgroundContainer
              style={data?.spacing ? { marginTop: '50px', marginBottom: '50px' } : {}}
              disableContainerWrapper={true}
              background={background}
              key={id}
            >
              <StyledCard
                type="promo"
                textOnly={true}
                alignLeft={isMultipleCards}
                style={
                  {
                    padding: 'var(--space-medium) 0 0 0',
                    '--card-maxWidth': !isMultipleCards ? '100%' : '280px',
                  } as CSSProperties
                }
              >
                <ContentWrapper alignLeft={isMultipleCards} hasLink={!!tile.action}>
                  <Text>
                    <PromotileTitleText value={text} />
                  </Text>
                  {action.label && (
                    <StyledAction>
                      {linkLabelAsTitle ? (
                        <PromoTileButton action={action} template="text" hasImage={true} />
                      ) : (
                        <PromoTileButton action={action} hasImage={false} template="icon" />
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
