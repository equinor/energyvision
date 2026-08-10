'use client'
import { useLocale } from 'next-intl'
import { forwardRef } from 'react'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import Card from '@/sections/cards/Card'
import {
  type ColorKeyTokens,
  colorKeyToUtilityMap,
} from '@/styles/colorKeyToUtilityMap'
import type { PromoTileData } from '@/types/index'
import type { Variants } from '../cards/Card/Card'

type PromoTileProps = {
  hasSectionTitle?: boolean
  variant?: Variants
  /* grey card background as long as not on colored background */
  onColorBg?: boolean
} & PromoTileData

export const PromoTile = forwardRef<HTMLAnchorElement, PromoTileProps>(
  function PromoTile(
    {
      id,
      designOptions,
      image,
      title,
      action,
      linkLabelAsTitle,
      hasSectionTitle,
      variant = 'secondary',
      onColorBg = false,
    },
    ref,
  ) {
    const url = getUrlFromAction(action)
    const intlLocale = useLocale()
    if (!url) {
      return null
    }

    const locale = action.link?.lang
      ? action.link?.lang
      : intlLocale?.lang
    const { background } = designOptions

    const colorName =
      Object.keys(colorKeyToUtilityMap).find(
        key =>
          colorKeyToUtilityMap[key as keyof ColorKeyTokens]?.backgroundName ===
          background?.backgroundColor,
      ) ?? 'white-100'

    const theme = background?.backgroundUtility
      ? colorKeyToUtilityMap[background.backgroundUtility]
      : colorKeyToUtilityMap[colorName as keyof ColorKeyTokens]

    return (
      <Card
        {...(id && { id: id })}
        href={url}
        type={action.type}
        hrefLang={locale}
        ref={ref}
        image={image}
        variant={variant}
        className={`${theme?.dark || background?.dark ? 'dark' : ''} `}
      >
        <Card.Content
          variant={variant}
          className={`${theme.background === 'bg-white-100' && !onColorBg ? '' : theme.background}`}
        >
          <Card.Header
            titleLevel={hasSectionTitle ? 'h3' : 'h2'}
            {...(!linkLabelAsTitle && { titleBlock: title })}
            {...(linkLabelAsTitle && { title: action.label })}
            titleClassName='text-md'
          />
        </Card.Content>
      </Card>
    )
  },
)
