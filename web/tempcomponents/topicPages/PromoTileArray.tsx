import styled from 'styled-components'
import { BackgroundContainer, Card, Button } from '@components'
import type { PromoTileArrayData, PromoTileData, LinkData } from '../../types/types'
import Image from '../shared/Image'
import NextLink from 'next/link'

const { Title, Header, Action, Media } = Card

function getUrl(callToAction: LinkData) {
  const { type, link, href } = callToAction
  let url: string
  if (type === 'internalUrl') {
    url = link?.type === 'news' ? `/news/${link?.slug}` : link?.slug || ''
  } else {
    url = href || ''
  }
  return url
}

const C2ALinkAsButton = ({ callToAction }: { callToAction: LinkData }) => {
  const { type, label, extension } = callToAction

  const url = getUrl(callToAction)

  return (
    <>
      {type === 'internalUrl' ? (
        <NextLink passHref href={url}>
          <Button as="a" variant="outlined" color="secondary">
            {label}
          </Button>
        </NextLink>
      ) : (
        <Button as="a" variant="outlined" href={url} color="secondary">
          {label} {extension && `(${extension.toUpperCase()})`}
        </Button>
      )}
    </>
  )
}

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
              <C2ALinkAsButton callToAction={tile.action} />
            </Action>
          </Card>
        </BackgroundContainer>
      ))}
    </Container>
  )
}

export default PromoTileArray
