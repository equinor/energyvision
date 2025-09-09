import { Teaser as TeaserLayout } from '@/core/Teaser'
import { getUrlFromAction } from '../../../common/helpers'
import Image from '../../../core/SanityImage/SanityImage'
import type { TeaserData, ImageWithAlt } from '../../../types/index'
import { ResourceLink } from '../../../core/Link'
import { getLocaleFromName } from '../../../lib/localization'
import { Typography } from '@/core/Typography'
import Blocks from '@/portableText/Blocks'

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
          text && <Blocks value={text} as="h2" variant="2xl" className="mb-2 leading-cloudy" />
        ) : (
          <>
            {overline ? (
              <hgroup className="mb-1">
                <Typography variant="overline">{overline}</Typography>
                {title && <Blocks value={title} variant="h2" />}
              </hgroup>
            ) : (
              <>{title && <Blocks value={title} variant="h2" />}</>
            )}
            {text && <Blocks variant="ingress" value={text} className="mb-6" />}
          </>
        )}
        {actions && (
          <div className="flex flex-col gap-8">
            {actions?.map((action, idx) => {
              const url = action && getUrlFromAction(action)
              return (
                <ResourceLink
                  href={url as string}
                  {...(action.link?.lang && { hrefLang: getLocaleFromName(action.link?.lang) })}
                  type={action.type}
                  key={action.id || idx}
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
