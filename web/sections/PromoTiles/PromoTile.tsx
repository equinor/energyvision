import Card from '@/sections/cards/Card'
import { getUrlFromAction } from '../../common/helpers'
import { ColorKeyTokens, colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'
import { PromoTileData } from '../../types/index'
import { forwardRef } from 'react'
import { Variants } from '../cards/Card/Card'
import { getLocaleFromName } from '../../lib/localization'
import { useLocale } from 'next-intl'

type PromoTileProps = {
  hasSectionTitle?: boolean
  variant?: Variants
} & PromoTileData

export const PromoTile = forwardRef<HTMLAnchorElement, PromoTileProps>(function PromoTile(
  { id, designOptions, image, title, action, linkLabelAsTitle, hasSectionTitle, variant = 'secondary' },
  ref,
) {
  const url = getUrlFromAction(action)
  const intlLocale = useLocale()
  if (!url) {
    return null
  }
  const locale = action.link?.lang ? getLocaleFromName(action.link?.lang) : intlLocale
  const { background } = designOptions

  const colorName =
    Object.keys(colorKeyToUtilityMap).find(
      (key) => colorKeyToUtilityMap[key as keyof ColorKeyTokens]?.backgroundName === background?.backgroundColor,
    ) ?? 'white-100'

  const theme = background?.backgroundUtility
    ? colorKeyToUtilityMap[background.backgroundUtility]
    : colorKeyToUtilityMap[colorName as keyof ColorKeyTokens]

  return (
    <Card
      {...(id && { id: id })}
      href={url}
      type={action.type}
      locale={locale}
      ref={ref}
      image={image}
      variant={variant}
      className={`${theme?.dark || background.dark ? 'dark' : ''} `}
    >
      <Card.Content variant={variant} className={`${theme.background}`}>
        <Card.Header
          titleLevel={hasSectionTitle ? 'h3' : 'h2'}
          {...(!linkLabelAsTitle && { titleBlock: title })}
          {...(linkLabelAsTitle && { title: action.label })}
        />
      </Card.Content>
    </Card>
  )
})
