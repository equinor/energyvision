import { Teaser as EnvisTeaser, Link, Eyebrow, BackgroundContainer, Text } from '@components'
import styled from 'styled-components'
import IngressText from './portableText/IngressText'
import TitleText from './portableText/TitleText'
import { urlFor } from '../../common/helpers'
import Img from 'next/image'
import Image from './SanityImage'
import { getUrlFromAction } from '../../common/helpers/getUrlFromAction'

import type { TeaserData, ImageWithAlt, LinkData } from '../../types/types'
import { getLocaleFromName } from '../../lib/localization'
import { BlockType } from './portableText/helpers/defaultSerializers'

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

const TeaserAction = ({ action }: { action: LinkData }) => {
  const { type, label, extension } = action
  const url = getUrlFromAction(action)
  if (!url) {
    console.warn(`Missing URL on 'TeaserAction' link with type: '${type}' and label: '${label}'`)
    return null
  }

  if (action.type === 'internalUrl') {
    const locale = getLocaleFromName(action.link?.lang)
    return (
      <Link href={url} locale={locale} variant="readMore" aria-label={action.ariaLabel}>
        {action.label}
      </Link>
    )
  }

  return (
    <Link variant="readMore" href={url} type={action.type} aria-label={action.ariaLabel}>
      {action.label} {extension && `(${extension.toUpperCase()})`}
    </Link>
  )
}

const Teaser = ({ data, anchor }: TeaserProps) => {
  const { title, overline, text, image, action, designOptions, bigTextTeaser } = data
  const { background, imageSize, imagePosition } = designOptions

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
        <Content>
          {overline && <Eyebrow>{overline}</Eyebrow>}

          {title && <TitleText value={title} />}

          {text && (
            <IngressText
              value={text}
              components={
                bigTextTeaser
                  ? {
                      block: {
                        normal: ({ children }: { children: React.ReactNode }) => {
                          return <Text size="big">{children}</Text>
                        },
                      } as BlockType,
                    }
                  : {}
              }
            />
          )}
          {action && <TeaserAction action={action} />}
        </Content>
      </StyledEnvisTeaser>
    </BackgroundContainer>
  )
}

export default Teaser
