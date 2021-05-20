import { Teaser as EnvisTeaser, Heading } from '@components'
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

const TeaserImage = ({ image }: { image: ImageWithAlt }) => {
  const imageSrc =
    image.extension === 'svg' ? urlFor(image).toString() : urlFor(image).size(1200, 800).auto('format').toString()

  if (!imageSrc) return null
  return (
    <>
      {image.extension === 'svg' ? (
        <img alt={image.alt} src={imageSrc} />
      ) : (
        <Img src={imageSrc} alt={image.alt} objectFit="cover" layout="fill" unoptimized />
      )}
    </>
  )
}

const Teaser = ({ data }: TeaserProps) => {
  const { title, overline, text, image } = data
  console.log('image', image)

  return (
    <EnvisTeaser>
      <Media size="small">{image && <TeaserImage image={image} />}</Media>
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
      </Content>
    </EnvisTeaser>
  )
}

export default Teaser
