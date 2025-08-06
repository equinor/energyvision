import IngressText from '../../../pageComponents/shared/portableText/IngressText'
import { getUrlFromAction } from '../../../common/helpers'
import Image from '../../../core/SanityImage/SanityImage'
import type { ImageWithAlt, LinkData, DesignOptions } from '../../../types/index'
import { ResourceLink } from '../../../core/Link'
import { Heading } from '../../../core/Typography'
import { getLocaleFromName } from '../../../lib/localization'
import { Typography } from '@core/Typography'
import { forwardRef } from 'react'
import { PortableTextBlock } from '@portabletext/types'
import { colorKeyToUtilityMap, getUtilityByBackgroundName } from '../../../styles/colorKeyToUtilityMap'

type ColRatios = '50-50' | '33-66' | '66-33' | '40-60' | '60-40'

type TeaserProps = {
  type: string
  id: string
  title: PortableTextBlock[]
  text: PortableTextBlock[]
  overline?: string
  isBigText?: boolean
  image: ImageWithAlt
  actions?: LinkData[]
  designOptions: DesignOptions & {
    imagePosition?: 'left' | 'right'
    imageSize?: 'small' | 'full'
    //media width(%) - text content width(%)
    colRatio?: ColRatios
  }
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

const Teaser = forwardRef<HTMLElement, TeaserProps>(function Teaser(
  { title, overline, text, image, actions, designOptions, isBigText, anchor },
  ref,
) {
  const { imageSize, imagePosition, background, colRatio } = designOptions

  const { backgroundUtility, backgroundColor } = background

  const teaserBg = backgroundUtility
    ? colorKeyToUtilityMap[backgroundUtility]
    : getUtilityByBackgroundName(backgroundColor)

  if ([title, overline, text, image?.asset, actions].every((i) => !i)) {
    return null
  }
  const colConfig: Record<ColRatios, string> = {
    '50-50': 'grid-cols-2',
    '33-66': imagePosition === 'right' ? 'md:grid-cols-[66%_33%]' : 'md:grid-cols-[33%_66%]',
    '66-33': imagePosition === 'right' ? 'md:grid-cols-[33%_66%]' : 'md:grid-cols-[66%_33%]',
    '40-60': imagePosition === 'right' ? 'md:grid-cols-[60%_40%]' : 'md:grid-cols-[40%_60%]',
    '60-40': imagePosition === 'right' ? 'md:grid-cols-[40%_60%]' : 'md:grid-cols-[60%_40%]',
  }

  return (
    <article ref={ref} id={anchor} className={`${teaserBg.background}`}>
      <div className={`min-h-[400px] px-layout-sm flex flex-col md:grid ${colConfig[colRatio ?? '50-50']}`}>
        <div
          className={`relative ${imagePosition === 'right' ? 'md:order-last' : ''} ${
            imageSize === 'small' ? 'p-12 flex justify-center items-center' : ''
          }`}
        >
          {image?.asset && <TeaserImage image={image} />}
        </div>
        <div className={`py-12 px-8 flex flex-col justify-center gap-y-lg text-pretty`}>
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
              {actions?.map((action, idx) => {
                const url = action && getUrlFromAction(action)
                return (
                  <ResourceLink
                    href={url as string}
                    {...(action.link?.lang && { locale: getLocaleFromName(action.link?.lang) })}
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
        </div>
      </div>
    </article>
  )
})

export default Teaser
