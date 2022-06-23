import { Teaser as EnvisTeaser, Link, Eyebrow, BackgroundContainer } from '@components'
import styled from 'styled-components'
import { default as NextLink } from 'next/link'
import IngressText from '../shared/portableText/IngressText'
import TitleText from '../shared/portableText/TitleText'
import { urlFor } from '../../common/helpers'
import Img from 'next/image'
import Image from '../shared/Image'
import { getUrlFromAction } from '../../common/helpers/getUrlFromAction'

import type { TeaserData, ImageWithAlt, LinkData } from '../../types/types'

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
        <Image image={image} alt={altTag} maxWidth={720} layout="responsive" />
      ) : (
        <Img
          src={imageSrc}
          alt={altTag}
          objectFit="cover"
          layout="fill"
          unoptimized
          role={image?.isDecorative ? 'presentation' : undefined}
        />
      )}
    </>
  )
}

const TeaserAction = ({ action }: { action: LinkData }) => {
  const { type, label, extension } = action
  const url = getUrlFromAction(action)
  if (!url) {
    console.warn(`Missing URL on 'TeaserAction' link with type: '${type}' and label: '${label}'`)
    return null
  }

  if (action.type === 'internalUrl' || action.isStatic) {
    return (
      <NextLink href={url} passHref>
        <Link variant="readMore" aria-label={action.ariaLabel}>
          {action.label}
        </Link>
      </NextLink>
    )
  }

  return (
    <Link variant="readMore" href={url} type={action.type} aria-label={action.ariaLabel}>
      {action.label} {extension && `(${extension.toUpperCase()})`}
    </Link>
  )
}

const Teaser = ({ data, anchor }: TeaserProps) => {
  const { title, overline, text, image, action, designOptions } = data
  const { background, imageSize, imagePosition } = designOptions

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
        <Content>
          {overline && <Eyebrow>{overline}</Eyebrow>}

          {title && <TitleText value={title} />}

          {text && <IngressText value={text} />}
          {action && <TeaserAction action={action} />}
        </Content>
      </StyledEnvisTeaser>
    </BackgroundContainer>
  )
}

export default Teaser
