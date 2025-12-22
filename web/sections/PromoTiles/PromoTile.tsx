import Card from '@sections/cards/Card'
import { forwardRef } from 'react'
import { useIntl } from 'react-intl'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'
import { type ColorKeyTokens, colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'
import type { PromoTileData } from '../../types/index'
import type { Variants } from '../cards/Card/Card'

type PromoTileProps = {
  hasSectionTitle?: boolean
  variant?: Variants
} & PromoTileData

export const PromoTile = forwardRef<HTMLAnchorElement, PromoTileProps>(function PromoTile(
  { id, designOptions, image, title, action, linkLabelAsTitle, hasSectionTitle, variant = 'secondary' },
  ref,
) {
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
      <Card.Content variant={variant} className={`${theme.background !== 'bg-white-100' ? theme.background : ''}`}>
        <Card.Header
          titleLevel={hasSectionTitle ? 'h3' : 'h2'}
          {...(!linkLabelAsTitle && { titleBlock: title })}
          {...(linkLabelAsTitle && { title: action.label })}
        />
      </Card.Content>
    </Card>
  )
})
