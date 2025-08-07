import { getUrlFromAction } from '../../common/helpers'
import { ColorKeyTokens, colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'
import { forwardRef } from 'react'
import { getLocaleFromName } from '../../lib/localization'
import { useIntl } from 'react-intl'
import { PortableTextBlock } from '@portabletext/types'
import { DesignOptions, ImageWithAlt, LinkData } from '../../types'
import Image, { getSmallerThanPxLgSizes } from '@core/SanityImage/SanityImage'
import { Heading, Typography } from '@core/Typography'
import { BaseLink } from '@core/Link'
import Blocks from '../../pageComponents/shared/portableText/Blocks'

type Variants = 'leftRight' | 'topBottom'
export type PromoTileProps = {
  variant?: Variants
  hasSectionTitle?: boolean
  id: string
  title: PortableTextBlock[]
  ingress: PortableTextBlock[]
  image: ImageWithAlt
  action: LinkData
  designOptions: DesignOptions
  linkLabelAsTitle?: boolean
}

export const PromoTile = forwardRef<HTMLDivElement, PromoTileProps>(function PromoTile(
  { id, designOptions, image, title, action, linkLabelAsTitle, hasSectionTitle, ingress, variant = 'leftRight' },
  ref,
) {
  console.log(JSON.stringify(action))
  const url = getUrlFromAction(action)
  const intl = useIntl()
  if (!url) {
    return null
  }
  const locale = action.link?.lang ? getLocaleFromName(action.link?.lang) : getLocaleFromName(intl.locale)
  const { background } = designOptions

  const colorName =
    Object.keys(colorKeyToUtilityMap).find(
      (key) => colorKeyToUtilityMap[key as keyof ColorKeyTokens]?.backgroundName === background?.backgroundColor,
    ) ?? 'white-100'

  const theme = background?.backgroundUtility
    ? colorKeyToUtilityMap[background.backgroundUtility ?? 'white-100']
    : colorKeyToUtilityMap[colorName as keyof ColorKeyTokens]

  return (
    <div
      ref={ref}
      {...(id && { id: id })}
      className={`w-full h-full ${
        variant === 'leftRight' ? 'grid grid-cols-[40%_60%]' : 'grid grid-cols-[40%_60%] lg:flex lg:flex-col'
      } ${theme.background} ${
        theme?.dark || background.dark ? 'dark' : ''
      } rounded-sm border border-moss-green-70 min-h-[120px]`}
    >
      {image && image.asset && (
        <div className={`relative w-full h-auto ${variant === 'leftRight' ? '' : ' lg:aspect-video'}`}>
          <Image image={image} fill maxWidth={600} aspectRatio={'16:9'} sizes={getSmallerThanPxLgSizes()} />
        </div>
      )}
      <BaseLink
        href={url}
        locale={locale}
        prefetch={false}
        className={`flex flex-col justify-start group p-6 lg:px-6 lg:pt-4 lg:pb-10`}
      >
        {title && !linkLabelAsTitle && (
          <Heading value={title} as={hasSectionTitle ? 'h3' : 'h2'} variant="h6" className={`group-hover:underline`} />
        )}
        {linkLabelAsTitle && (
          <Typography as={hasSectionTitle ? 'h3' : 'h2'} variant="h6" className={`group-hover:underline`}>
            {action.label}
          </Typography>
        )}
        {ingress && <Blocks value={ingress} className="mt-4 text-sm" />}
      </BaseLink>
    </div>
  )
})
