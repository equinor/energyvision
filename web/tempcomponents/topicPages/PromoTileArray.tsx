import styled from 'styled-components'
import { BackgroundContainer, Card } from '@components'
import type { PromoTileArrayData, PromoTileData } from '../../types/types'
import Image from '../shared/Image'
import { ButtonLink } from '../shared/ButtonLink'

const { Title, Header, Action, Media } = Card

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--space-large);
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
`

const PromoTileArray = ({ data }: { data: PromoTileArrayData }) => {
  console.log(data)
  return (
    <Container>
      {data.group.map((tile: PromoTileData) => (
        <BackgroundContainer
          key={tile.id}
          background={tile.designOptions.background}
          data-fubar={tile.designOptions.background}
        >
          <Card>
            {tile.image && (
              <Media>
                <Image image={tile.image} alt={tile.image.alt} maxWidth={400} aspectRatio={0.56} layout="responsive" />
              </Media>
            )}
            <Header>
              <Title>{tile.title}</Title>
            </Header>
            <Action>
              <ButtonLink action={tile.action} />
            </Action>
          </Card>
        </BackgroundContainer>
      ))}
    </Container>
  )
}

export default PromoTileArray
