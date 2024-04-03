import { Teaser as EnvisTeaser, Eyebrow, BackgroundContainer } from '@components'
import styled from 'styled-components'
import IngressText from './portableText/IngressText'
import { urlFor } from '../../common/helpers'
import Img from 'next/image'
import Image from './SanityImage'
import type { TeaserData, ImageWithAlt } from '../../types/types'
import ReadMoreLink from './ReadMoreLink'
import { Heading } from '../../core/Typography'

const { Content, Media } = EnvisTeaser

type TeaserProps = {
  data: TeaserData
  anchor?: string
}

const StyledEnvisTeaser = styled(EnvisTeaser)`
  font-size: var(--typeScale-1);
`

const TeaserImage = ({ image }: { image: ImageWithAlt }) => {
  const imageSrc =
    image.extension === 'svg' ? urlFor(image).toString() : urlFor(image).size(1200, 800).auto('format').toString()

  if (!imageSrc) return null
  const altTag = image?.isDecorative ? '' : image?.alt || ''
  return (
    <>
      {image.extension === 'svg' ? (
        <Image image={image} alt={altTag} maxWidth={720} />
      ) : (
        <Img
          src={imageSrc}
          alt={altTag}
          style={{ objectFit: 'cover' }}
          fill
          role={image?.isDecorative ? 'presentation' : undefined}
        />
      )}
    </>
  )
}

const Teaser = ({ data, anchor }: TeaserProps) => {
  const { title, overline, text, image, action, designOptions, isBigText } = data
  const { background, imageSize, imagePosition, dark } = designOptions
  // After a while with TW, this isDark should be removed and only use dark from designOptions for dark
  const isDark = dark || background === 'Mid Blue' || background === 'Slate Blue'

  if ([title, overline, text, image?.asset, action].every((i) => !i)) {
    return null
  }

  const isSvg = image?.extension === 'svg'
  return (
    <BackgroundContainer background={background} id={anchor}>
      <StyledEnvisTeaser imagePosition={imagePosition}>
        <Media
          size={isSvg && imageSize === 'small' ? 'small' : 'full'}
          center={isSvg ? true : false}
          fixedHeight={isSvg ? false : true}
        >
          {image?.asset && <TeaserImage image={image} />}
        </Media>
        <Content className={`${isDark ? 'dark' : ''} gap-y-lg`}>
          {isBigText ? (
            text && <Heading value={text} as="h2" variant="2xl" className="leading-cloudy mb-2" />
          ) : (
            <>
              {overline ? (
                <hgroup className="flex flex-col gap-2 mb-1">
                  <Eyebrow>{overline}</Eyebrow>
                  {title && <Heading value={title} as="h2" variant="xl" />}
                </hgroup>
              ) : (
                <>{title && <Heading value={title} as="h2" variant="xl" className="mb-2" />}</>
              )}
              {text && <IngressText value={text} />}
            </>
          )}
          {action && <ReadMoreLink action={action} variant="readMore" />}
        </Content>
      </StyledEnvisTeaser>
    </BackgroundContainer>
  )
}

export default Teaser
