import { getUrlFromAction } from '../../common/helpers'
import { forwardRef } from 'react'
import { getLocaleFromName } from '../../lib/localization'
import { useIntl } from 'react-intl'
import { PortableTextBlock } from '@portabletext/types'
import { DesignOptions, ImageWithAlt, LinkData } from '../../types'
import Image, { getSmallerThanPxLgSizes } from '@core/SanityImage/SanityImage'
import { Heading, Typography } from '@core/Typography'
import { BaseLink } from '@core/Link'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import getBgClassName from '../../common/helpers/getBackgroundColor'

type Variants = 'leftRight' | 'topBottom'
export type PromoTileProps = {
  variant?: Variants
  hasSectionTitle?: boolean
  id: string
  title: PortableTextBlock[]
  ingress: PortableTextBlock[]
  image: ImageWithAlt
  containImage?: boolean
  action?: {
    link?: LinkData
  }
  designOptions: DesignOptions
  linkLabelAsTitle?: boolean
}

export const PromoTile = forwardRef<HTMLDivElement, PromoTileProps>(function PromoTile(
  {
    id,
    designOptions,
    image,
    title,
    action,
    linkLabelAsTitle = false,
    hasSectionTitle = true,
    containImage = false,
    ingress,
    variant = 'leftRight',
  },
  ref,
) {
  const url = getUrlFromAction(action?.link ?? {})
  const anchor = action?.link?.anchorReference ? `#${action?.link.anchorReference}` : undefined
  const isLink = !!url || !!anchor

  const intl = useIntl()
  const locale =
    action?.link?.link && action?.link.link?.lang
      ? getLocaleFromName(action.link.link?.lang)
      : getLocaleFromName(intl.locale)
  const { background } = designOptions
  const theme = getBgClassName(background.backgroundUtility)

  const contentElement = (
    <>
      {title && !linkLabelAsTitle && (
        <Heading
          value={title}
          as={hasSectionTitle ? 'h3' : 'h2'}
          variant="h5"
          className={` ${isLink ? 'group-hover:underline' : ''}`}
        />
      )}
      {linkLabelAsTitle && action?.link && url && (
        <Typography
          as={hasSectionTitle ? 'h3' : 'h2'}
          variant="h5"
          className={` ${isLink ? 'group-hover:underline' : ''}`}
        >
          {action?.link.label ?? 'Missing link label that is set to be title'}
        </Typography>
      )}
      {ingress && <Blocks value={ingress} className="mt-4 text-sm" />}
    </>
  )

  return (
    <div
      ref={ref}
      {...(id && { id: id })}
      className={`w-full h-full ${
        variant === 'leftRight' ? 'grid grid-cols-[40%_60%]' : 'grid grid-cols-[40%_60%] lg:flex lg:flex-col'
      } ${theme}  rounded-sm border border-moss-green-70 min-h-[120px]`}
    >
      {image && image.asset && (
        <div
          className={`relative w-full h-auto ${variant === 'leftRight' ? '' : ' lg:aspect-video'} ${
            containImage ? 'flex justify-center items-start pt-6 pl-4' : ''
          }`}
        >
          <Image
            image={image}
            {...(!containImage && { fill: true })}
            maxWidth={600}
            aspectRatio={'16:9'}
            sizes={getSmallerThanPxLgSizes()}
            className={`${containImage ? 'object-contain' : ''}`}
          />
        </div>
      )}
      {isLink && (url || anchor) && (
        <BaseLink
          href={url ?? (anchor as string)}
          type={action?.link?.type ?? 'internalUrl'}
          locale={locale}
          prefetch={false}
          className={`flex flex-col justify-start group p-6 lg:px-6 lg:pt-6 lg:pb-10`}
        >
          {contentElement}
        </BaseLink>
      )}
      {!isLink && (
        <div className={`flex flex-col justify-start group p-6 lg:px-6 lg:pt-6 lg:pb-10`}>{contentElement}</div>
      )}
    </div>
  )
})
