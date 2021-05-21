import { Teaser as EnvisTeaser, Heading, Link } from '@components'
import styled from 'styled-components'
import { default as NextLink } from 'next/link'
import { imageProps } from '../../common/helpers/sanityImgLoader'
import { IngressBlockRenderer } from '../../common/serializers'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { urlFor } from '../../common/helpers'
// import styled from 'styled-components'
import type { TeaserData, ImageWithAlt } from '../../types/types'
import Img from 'next/image'

const { Content, Media, Eyebrow } = EnvisTeaser

type TeaserProps = {
  data: TeaserData
}

type TempStyleVariants = 'none' | 'one' | 'two' | 'three' | 'four' | 'five'

type StyledTeaserProps = {
  styleVariant?: TempStyleVariants
}
const StyledTeaser = styled(EnvisTeaser)<StyledTeaserProps>`
  /* margin: var(--space-xLarge) 0; */
`

const TeaserImage = ({ image }: { image: ImageWithAlt }) => {
  const imageSrc =
    image.extension === 'svg' ? urlFor(image).toString() : urlFor(image).size(1200, 800).auto('format').toString()

  if (!imageSrc) return null
  return (
    <>
      {image.extension === 'svg' ? (
        <Img {...imageProps(image.asset, 720)} alt={image.alt} layout="responsive" />
      ) : (
        <Img src={imageSrc} alt={image.alt} objectFit="cover" layout="fill" unoptimized />
      )}
    </>
  )
}

const Teaser = ({ data }: TeaserProps) => {
  const { title, overline, text, image, action, background, imagePosition } = data

  // @TODO: We should do this in a more optimal way, but it involves task # 332
  const linkType = action.href ? 'externalUrl' : 'internalUrl'
  let url: string
  if (linkType === 'internalUrl') {
    url = action.link?.type === 'news' ? `/news/${action.link?.slug}` : action.link?.slug || ''
  } else {
    url = action.href || ''
  }
  // @TODO: Find a better way with task #334
  const backgroundColourTitle = background ? background.title : 'none'
  let styleVariant: TempStyleVariants = 'none'
  if (backgroundColourTitle === 'White') {
    styleVariant = 'none'
  } else if (backgroundColourTitle === 'Moss Green') {
    styleVariant = 'one'
  } else if (backgroundColourTitle === 'Lichen Green') {
    styleVariant = 'two'
  } else if (backgroundColourTitle === 'Spruce Wood') {
    styleVariant = 'three'
  } else if (backgroundColourTitle === 'Mist Blue') {
    styleVariant = 'four'
  } else if (backgroundColourTitle === 'Slate Blue') {
    styleVariant = 'five'
  }

  const isSvg = image?.extension === 'svg'

  return (
    <StyledTeaser styleVariant={styleVariant} imagePosition={imagePosition}>
      {/*       // @TODO: When we have size in Sanity, add size small|full dersom SVG
       */}
      <Media center={isSvg ? true : false} fixedHeight={isSvg ? false : true}>
        {image && <TeaserImage image={image} />}
      </Media>
      <Content>
        {overline && <Eyebrow>{overline}</Eyebrow>}
        <Heading level="h2" size="xl">
          {title}
        </Heading>
        <SimpleBlockContent
          blocks={text}
          serializers={{
            types: {
              block: IngressBlockRenderer,
            },
          }}
        ></SimpleBlockContent>
        {linkType === 'internalUrl' ? (
          <NextLink href={url} passHref>
            <Link variant="readMore">{action.label}</Link>
          </NextLink>
        ) : (
          <Link variant="readMore" href={url}>
            {action.label}
          </Link>
        )}
      </Content>
    </StyledTeaser>
  )
}

export default Teaser
