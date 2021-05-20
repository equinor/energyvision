import { Teaser as EnvisTeaser, Heading, Link } from '@components'
import styled from 'styled-components'
import { default as NextLink } from 'next/link'
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

const StyledTeaser = styled(EnvisTeaser)`
  margin: var(--space-xLarge) 0;
`

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
  const { title, overline, text, image, action } = data

  // @TODO: We should do this in a more optimal way
  const linkType = action.href ? 'externalUrl' : 'internalUrl'

  let url: string
  if (linkType === 'internalUrl') {
    url = action.link?.type === 'news' ? `/news/${action.link?.slug}` : action.link?.slug || ''
  } else {
    url = action.href || ''
  }

  return (
    <StyledTeaser>
      <Media size={image?.extension === 'svg' ? 'small' : 'full'}>{image && <TeaserImage image={image} />}</Media>
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
