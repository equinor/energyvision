import Img from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { client } from 'lib/sanity'

const customTest = (imageUrlBuilder, options, max = 800) => {
  return (
    imageUrlBuilder
      .width(options.width || Math.min(options.originalImageDimensions.width, max))
      .blur(20)
      .flipHorizontal()
      //.fit('clip')
      .auto('format')
  )
}

const Page = ({ data }) => {
  const imageProps = useNextSanityImage(client, data.image.asset, { imageBuilder: customTest })

  // It is highly recommended to set the sizes prop when the image is not the same size as the viewport.
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes
  return (
    <>
      <div style={{ maxWidth: '800px' }}>
        <Img {...imageProps} sizes="(max-width: 800px) 100vw, 800px" />
      </div>
      <p>Tekst tekst tekst</p>
      <div style={{ backgroundColor: 'rebeccapurple', padding: '2rem' }}>Hello</div>
      <div style={{ maxWidth: '340px' }}>
        <Img {...imageProps} sizes="(max-width: 340px) 100vw, 340px" />
      </div>
      <p>Tekst tekst tekst</p>
      <div style={{ maxWidth: '500px' }}>
        <Img {...imageProps} width={500} />
      </div>

      <Img {...imageProps} sizes="(max-width: 800px) 100vw, 800px" />
      <div style={{ maxWidth: '340px' }}>
        <Img {...imageProps} sizes="(max-width: 340px) 100vw, 340px" />
      </div>
      <div style={{ maxWidth: '340px' }}>
        <Img {...imageProps} sizes="(max-width: 340px) 100vw, 340px" />
      </div>
      <div style={{ maxWidth: '340px' }}>
        <Img {...imageProps} sizes="(max-width: 340px) 100vw, 340px" />
      </div>
      <div style={{ maxWidth: '340px' }}>
        <Img {...imageProps} sizes="(max-width: 340px) 100vw, 340px" />
      </div>
      <div style={{ maxWidth: '340px' }}>
        <Img {...imageProps} sizes="(max-width: 340px) 100vw, 340px" />
      </div>
    </>
  )
}

/* export const getServerSideProps = async function (context) {
  const { slug = '' } = context.query

  const data = await client.fetch(
    `{
			"mySanityData": *| [_type == "news" && _lang == 'en'  ] | {
          mainImage,
        }
		}`,
    { slug },
  )

  return { props: data }
} */

export async function getStaticProps() {
  const data = await client.fetch(
    ` *| [_type == "news" && _lang == 'en_GB' && slug.current == 'production-continues-at-johan-sverdrup'] | {
          "image": mainImage,
      
		}[0]`,
  )
  return {
    props: {
      data,
    },
    revalidate: 1,
  }
}

export default Page
