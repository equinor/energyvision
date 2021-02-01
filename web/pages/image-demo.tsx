import Img from 'next/image'
import { useNextSanityImage, UseNextSanityImageBuilderOptions } from 'next-sanity-image'
import { client } from 'lib/sanity'
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import { Image } from '@sanity/types'

const fiveToOne = (
  aspectRatio: number,
  maxWidth: number,
  imageUrlBuilder: ImageUrlBuilder,
  options: UseNextSanityImageBuilderOptions,
) => {
  return imageUrlBuilder
    .width(options.width || Math.min(options.originalImageDimensions.width, maxWidth))
    .height(
      (options.width && Math.round(options.width * aspectRatio)) ||
        Math.min(Math.round(options.originalImageDimensions.width * aspectRatio), maxWidth * aspectRatio),
    )
    .auto('format')
}

type Props = {
  data: { image: Image }[]
}
const Page = ({ data }: Props): JSX.Element => {
  const cards = ['Card one', 'Card two', 'Card three', 'Card four', 'Card five', 'Card six']

  const imageProps = (aspectRatio: number, maxWidth: number) => {
    return useNextSanityImage(client, data[0].image, {
      imageBuilder: (imageUrlBuilder, options) => fiveToOne(aspectRatio, maxWidth, imageUrlBuilder, options),
    })
  }
  const imagePropsWithImage = (image: Image) => {
    return useNextSanityImage(client, image, {
      imageBuilder: (imageUrlBuilder, options) => fiveToOne(0.6, 600, imageUrlBuilder, options),
    })
  }

  // It is highly recommended to set the sizes prop when the image is not the same size as the viewport.
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes
  return (
    <>
      <h1>Demo</h1>
      <div style={{ maxWidth: '800px' }}>
        <Img {...imageProps(0.2, 800)} sizes="(max-width: 800px) 100vw, 800px" />
        <Img {...imageProps(0.6, 800)} sizes="(max-width: 800px) 100vw, 800px" />
      </div>
      <div style={{ maxWidth: '400px' }}>
        <Img {...imageProps(0.2, 400)} sizes="(max-width: 400px) 100vw, 400px" />
        <Img {...imageProps(0.6, 400)} sizes="(max-width: 400px) 100vw, 400px" />
      </div>
      <h2>Cards in flex</h2>
      <p>Tekst tekst tekst</p>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cards.map((card) => (
          <div
            key={card}
            style={{
              flex: '0 0 320px',
              margin: '20px',
              borderRadius: '6px',
              boxShadow: '0 3px 18px 0 rgba(0, 0, 0, 0.2)',
            }}
          >
            <Img {...imageProps(1, 320)} sizes="(max-width: 320px) 100vw, 320px" />
          </div>
        ))}
      </div>
      <p>Tekst tekst tekst</p>
      <div style={{ backgroundColor: 'rebeccapurple', padding: '2rem' }}>Hello</div>
      <h2>Cards in grid</h2>
      <p>Tekst tekst tekst</p>
      <div style={{ display: 'grid', gridGap: '2rem', gridTemplateColumns: 'repeat(2, 240px)' }}>
        {cards.map((card) => (
          <div key={card} style={{ border: '1px solid slategrey' }}>
            <Img {...imageProps(0.5, 240)} sizes="(max-width: 240px) 100vw, 240px" />
            <p style={{ padding: '0.5rem' }}>{card}</p>
          </div>
        ))}
      </div>
      <h2>Lots of them images</h2>
      {data.map((item) => {
        return (
          <div key={item.image.asset._key} style={{ maxWidth: '600px' }}>
            <Img {...imagePropsWithImage(item.image)} sizes="(max-width: 600px) 100vw, 600px" />
          </div>
        )
      })}
    </>
  )
}

export async function getStaticProps() {
  const data = await client.fetch(
    ` *| [_type == "news" && _lang == 'en_GB'] | {
          "image": mainImage,
      
		}`,
  )
  return {
    props: {
      data,
    },
    revalidate: 1,
  }
}

export default Page
