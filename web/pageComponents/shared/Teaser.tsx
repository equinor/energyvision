import { Teaser as EnvisTeaser, Eyebrow, BackgroundContainer } from '@components'
import styled from 'styled-components'
import IngressText from './portableText/IngressText'
import { getUrlFromAction, urlFor } from '../../common/helpers'
import Img from 'next/image'
import Image from './SanityImage'
import type { TeaserData, ImageWithAlt } from '../../types/types'
import { ReadMoreLink, ResourceLink } from '../../core/Link'
import { Heading } from '../../core/Typography'
import { getLocaleFromName } from '../../lib/localization'

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
  const { title, overline, text, image, actions, designOptions, isBigText, useResourceLinks } = data
  const { imageSize, imagePosition, ...restOptions } = designOptions

  if ([title, overline, text, image?.asset, actions].every((i) => !i)) {
    return null
  }

  const isSvg = image?.extension === 'svg'

  return (
    <BackgroundContainer {...restOptions} id={anchor} renderFragmentWhenPossible>
      <StyledEnvisTeaser imagePosition={imagePosition}>
        <Media
          size={isSvg && imageSize === 'small' ? 'small' : 'full'}
          center={isSvg ? true : false}
          fixedHeight={isSvg ? false : true}
        >
          {image?.asset && <TeaserImage image={image} />}
        </Media>
        <Content className={`gap-y-lg`}>
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
          {actions && (
            <div className="flex flex-col gap-8">
              {actions?.map((action) => {
                const url = action && getUrlFromAction(action)

                return useResourceLinks ? (
                  <ResourceLink
                    href={url as string}
                    {...(action.link?.lang && { locale: getLocaleFromName(action.link?.lang) })}
                    type={action.type}
                    key={action.id}
                  >
                    {`${action.label} ${action.extension ? `(${action.extension.toUpperCase()})` : ''}`}
                  </ResourceLink>
                ) : (
                  <ReadMoreLink
                    href={url as string}
                    key={action.id}
                    {...(action.link?.lang && { locale: getLocaleFromName(action.link?.lang) })}
                    type={action.type}
                  >
                    {`${action.label} ${action.extension ? `(${action.extension.toUpperCase()})` : ''}`}
                  </ReadMoreLink>
                )
              })}
            </div>
          )}
        </Content>
      </StyledEnvisTeaser>
    </BackgroundContainer>
  )
}

export default Teaser
