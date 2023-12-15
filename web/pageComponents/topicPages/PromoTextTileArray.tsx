import { BackgroundContainer, Card } from '@components'
import { tokens } from '@equinor/eds-tokens'
import { CSSProperties } from 'react'
import styled from 'styled-components'
import type { PromoTextTileArrayData, PromoTextTileData } from '../../types/types'
import { PromoTileButton } from './PromoTileButton'
import { PortableTextBlock } from '@portabletext/types'
import PromoTextTileIngress from '../shared/portableText/PromoTextTileIngress'
import useWindowSize from '../../lib/hooks/useWindowSize'

const { Action, Text } = Card

const Container = styled.div<{ isMultipleCards: boolean; isSpacing?: boolean }>`
  display: grid;
  grid-gap: var(--space-medium);
  padding: var(--space-large) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
  grid-template-columns: ${({ isMultipleCards }) =>
    isMultipleCards ? 'repeat(auto-fit, minmax(min(100%, 280px), 1fr));' : '1fr'};
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

const StyledCard = styled(Card)<{ alignLeft: boolean }>`
  justify-content: ${({ alignLeft }) => (alignLeft ? 'flex-start' : 'center')};
  width: 100%;
  --card-maxWidth: 280px;
  height: 300px;
  overflow: hidden;
`

const ContentWrapper = styled.div<{ alignLeft: boolean; hasLink: boolean }>`
  display: ${({ hasLink, alignLeft }) => (hasLink ? (alignLeft ? 'flex' : 'inline-grid') : 'inline-grid')};
  align-items: ${({ hasLink, alignLeft }) => (hasLink ? (alignLeft ? 'flex-start' : 'center') : 'center')};
  flex-direction: column;
  height: 100%;
  justify-items: center;

  @media (max-width: 1004px) {
    align-items: center;
    display: inline-grid;
  }
`

const PromoTextTileArray = ({ data, anchor }: { data: PromoTextTileArrayData; anchor?: string }) => {
  const { width } = useWindowSize()
  if (!data.group) return null
  const isMultipleCards = data.group.length > 1

  return (
    <div className="background-none" id={anchor}>
      <Container isMultipleCards={isMultipleCards} isSpacing={data?.spacing}>
        {data.group.map((tile: PromoTextTileData) => {
          const { id, designOptions, action, showLinkLabel, ingress } = tile
          const { background } = designOptions

          return (
            <StyledBackgroundContainer disableContainerWrapper={true} background={background} key={id}>
              <StyledCard
                type="promo"
                textOnly={true}
                alignLeft={isMultipleCards}
                style={
                  {
                    padding: 'var(--space-large) 0 var(--space-xLarge) 0',
                    fontSize: 'var(--typeScale-5)',
                  } as CSSProperties
                }
              >
                <ContentWrapper alignLeft={isMultipleCards} hasLink={!!tile.action}>
                  <Text>
                    <PromoTextTileIngress
                      centered={!isMultipleCards || Boolean(width && width < 1004)}
                      value={ingress as PortableTextBlock[]}
                    />
                  </Text>
                  {action.label && (
                    <Action>
                      {showLinkLabel ? (
                        <PromoTileButton action={action} template="unstyledText" hasImage={true} />
                      ) : (
                        <PromoTileButton action={action} template="icon" hasImage={true} />
                      )}
                    </Action>
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
