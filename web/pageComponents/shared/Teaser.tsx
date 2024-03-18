import { Teaser as EnvisTeaser, Eyebrow, BackgroundContainer, Text } from '@components'
import styled from 'styled-components'
import IngressText from './portableText/IngressText'
import TitleText from './portableText/TitleText'
import { getUrlFromAction, urlFor } from '../../common/helpers'
import Img from 'next/image'
import Image from './SanityImage'
import type { TeaserData, ImageWithAlt } from '../../types/types'
import { ReadMoreLink } from '../../core/Link'
import { BlockType } from './portableText/helpers/defaultSerializers'
import { getLocaleFromName } from '../../lib/localization'

const { Content, Media } = EnvisTeaser

type TeaserProps = {
  data: TeaserData
  anchor?: string
}

const StyledEnvisTeaser = styled(EnvisTeaser)`
  font-size: var(--typeScale-1);
`

const StyledEyeBrow = styled(Eyebrow)`
  padding-bottom: var(--space-large);
`

const StyledTeaserTitle = styled(TitleText)`
  padding-bottom: var(--space-large);
`

const ContentWrapper = styled.div`
  padding-bottom: var(--space-large);
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
          {isBigText ? (
            text && (
              <ContentWrapper>
                <IngressText
                  value={text}
                  components={{
                    block: {
                      normal: ({ children }: { children: React.ReactNode }) => (
                        <Text size="lg" lineHeight="2_5">
                          {children}
                        </Text>
                      ),
                    } as BlockType,
                  }}
                />
              </ContentWrapper>
            )
          ) : (
            <ContentWrapper>
              {overline && <StyledEyeBrow>{overline}</StyledEyeBrow>}
              {title && <StyledTeaserTitle value={title} />}
              {text && <IngressText value={text} />}
            </ContentWrapper>
          )}
          {action && (action?.type === 'internalUrl') || action?.type === 'externalUrl') && (
              <ReadMoreLink
                href={getUrlFromAction(action)}
                {...(action.link?.lang && { locale: getLocaleFromName(action.link?.lang) })}
                type={action.type === 'externalUrl' ? 'externalUrl' : 'internalUrl'}
              >
                {`${action.label} ${action.extension ? `(${action.extension.toUpperCase()})` : ''}`}
              </ReadMoreLink>
            )}
        </Content>
      </StyledEnvisTeaser>
    </BackgroundContainer>
  )
}

export default Teaser
