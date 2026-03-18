import { Teaser as TeaserLayout } from '@core/Teaser'
import { Typography } from '@core/Typography'
import { toPlainText } from '@portabletext/react'
import { getUrlFromAction } from '../../../common/helpers'
import { ResourceLink } from '../../../core/Link'
import Image from '../../../core/SanityImage/SanityImage'
import { Heading } from '../../../core/Typography'
import { getLocaleFromName } from '../../../lib/localization'
import Blocks from '../../../pageComponents/shared/portableText/Blocks'
import IngressText from '../../../pageComponents/shared/portableText/IngressText'
import type { ImageWithAlt, TeaserData } from '../../../types/index'

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
        center={!!isSvg}
        fixedHeight={!isSvg}
        mediaPosition={imagePosition || 'left'}
      >
        {image?.asset && <TeaserImage image={image} />}
      </Media>
      <Content className={`grid auto-cols-auto gap-y-lg px-8 py-12`}>
        {isBigText ? (
          text && <Heading value={text} as="h2" variant="2xl" className="mb-2 leading-cloudy" />
        ) : (
          <>
            {overline ? (
              <hgroup className="mb-1 flex flex-col gap-2">
                <Typography as="div" className="text-md">
                  {overline}
                </Typography>
                {title && <Heading value={title} as="h2" variant="xl" />}
              </hgroup>
            ) : (
              title && <Heading value={title} as="h2" variant="xl" className="mb-2" />
            )}
            {text && toPlainText(text)?.length > 240 ? <Blocks value={text} /> : <IngressText value={text} />}
          </>
        )}
        {actions && (
          <div className="flex flex-col gap-8">
            {actions?.map((action, idx) => {
              const url = action && getUrlFromAction(action)
              const { id, label, type, link, file } = action
              return (
                <ResourceLink
                  href={url as string}
                  file={{
                    ...file,
                    label,
                  }}
                  {...(link?.lang && {
                    locale: getLocaleFromName(link?.lang),
                  })}
                  type={type}
                  key={id ?? idx}
                  variant="fit"
                  showExtensionIcon={true}
                >
                  {`${label}`}
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
