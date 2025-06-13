import { Teaser as TeaserLayout } from '@core/Teaser'
import IngressText from '../../../pageComponents/shared/portableText/IngressText'
import { getUrlFromAction } from '../../../common/helpers'
import Image, { getPxLgSizes } from '../../../core/SanityImage/SanityImage'
import type { TeaserData, ImageWithAlt } from '../../../types/index'
import { ResourceLink } from '../../../core/Link'
import { Heading } from '../../../core/Typography'
import { getLocaleFromName } from '../../../lib/localization'
import { Typography } from '@core/Typography'

const { Content, Media } = TeaserLayout

type TeaserProps = {
  data: TeaserData
  anchor?: string
}

const TeaserImage = ({ image }: { image: ImageWithAlt }) => {
  const isSvg = image.extension?.toLowerCase() === 'svg'

  if (!image?.asset) return null
  const altTag = image?.isDecorative ? '' : image?.alt || ''

  return (
    <Image
      image={image}
      alt={altTag}
      fill
      maxWidth={isSvg ? 720 : 1100}
      role={image?.isDecorative ? 'presentation' : undefined}
    />
  )
}

const Teaser = ({ data, anchor }: TeaserProps) => {
  const { title, overline, text, image, actions, designOptions, isBigText } = data
  const { imageSize, imagePosition, ...restOptions } = designOptions

  if ([title, overline, text, image?.asset, actions].every((i) => !i)) {
    return null
  }

  const isSvg = image.extension?.toLowerCase() === 'svg'

  return (
    <TeaserLayout className="text-sm" id={anchor} {...restOptions} renderFragmentWhenPossible>
      <Media
        size={isSvg && imageSize === 'small' ? 'small' : 'full'}
        center={isSvg ? true : false}
        fixedHeight={isSvg ? false : true}
        mediaPosition={imagePosition || 'left'}
      >
        {image?.asset && <TeaserImage image={image} />}
      </Media>
      <Content className={`gap-y-lg grid auto-cols-auto px-8 py-12`}>
        {isBigText ? (
          text && <Heading value={text} as="h2" variant="2xl" className="leading-cloudy mb-2" />
        ) : (
          <>
            {overline ? (
              <hgroup className="flex flex-col gap-2 mb-1">
                <Typography as="div" className="text-md">
                  {overline}
                </Typography>
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

              return (
                <ResourceLink
                  href={url as string}
                  {...(action.link?.lang && { locale: getLocaleFromName(action.link?.lang) })}
                  type={action.type}
                  key={action.id}
                  variant="fit"
                  extension={action.extension}
                  showExtensionIcon
                >
                  {`${action.label}`}
                </ResourceLink>
              )
            })}
          </div>
        )}
      </Content>
    </TeaserLayout>
  )
}

export default Teaser
