import { Teaser as EnvisTeaser, Heading, Link, Eyebrow, BackgroundContainer } from '@components'
import styled from 'styled-components'
import { default as NextLink } from 'next/link'
import { IngressBlockRenderer } from '../../common/serializers'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { urlFor } from '../../common/helpers'
import type { TeaserData, ImageWithAlt } from '../../types/types'
import Img from 'next/image'
import Image from '../shared/Image'
import { getUrlFromAction } from '../shared/utils'

const { Content, Media } = EnvisTeaser

type TeaserProps = {
  data: TeaserData
}

const StyledTeaser = styled(EnvisTeaser)`
  /* margin: var(--space-xLarge) 0; */
`

const TeaserImage = ({ image }: { image: ImageWithAlt }) => {
  const imageSrc =
    image.extension === 'svg' ? urlFor(image).toString() : urlFor(image).size(1200, 800).auto('format').toString()

  if (!imageSrc) return null
  return (
    <>
      {image.extension === 'svg' ? (
        <Image image={image} maxWidth={720} layout="responsive" />
      ) : (
        <Img src={imageSrc} alt={image.alt} objectFit="cover" layout="fill" unoptimized />
      )}
    </>
  )
}

const Teaser = ({ data }: TeaserProps) => {
  const { title, overline, text, image, action, designOptions } = data
  const { background, imageSize, imagePosition } = designOptions

  if (!action?.type) return null

  const url = getUrlFromAction(action)

  const isSvg = image?.extension === 'svg'
  return (
    <BackgroundContainer background={background}>
      <StyledTeaser imagePosition={imagePosition}>
        <Media
          size={isSvg && imageSize === 'small' ? 'small' : 'full'}
          center={isSvg ? true : false}
          fixedHeight={isSvg ? false : true}
        >
          {image && <TeaserImage image={image} />}
        </Media>
        <Content>
          {overline && <Eyebrow>{overline}</Eyebrow>}
          <Heading level="h2" size="xl">
            {title}
          </Heading>
          {text && (
            <SimpleBlockContent
              blocks={text}
              serializers={{
                types: {
                  block: IngressBlockRenderer,
                },
              }}
            ></SimpleBlockContent>
          )}
          {action.type === 'internalUrl' ? (
            <NextLink href={url} passHref>
              <Link variant="readMore">{action.label}</Link>
            </NextLink>
          ) : (
            <Link variant="readMore" href={url} type={action.type}>
              {action.label} {action.extension && `(${action.extension.toUpperCase()})`}
            </Link>
          )}
        </Content>
      </StyledTeaser>
    </BackgroundContainer>
  )
}

export default Teaser
