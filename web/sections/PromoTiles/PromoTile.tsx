import Card from '@sections/cards/Card'
import { getUrlFromAction } from '../../common/helpers'
import { ColorKeyTokens, colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'
import { PromoTileData } from '../../types/index'
import { forwardRef } from 'react'

type PromoTileProps = {
  hasSectionTitle?: boolean
} & PromoTileData

export const PromoTile = forwardRef<HTMLAnchorElement, PromoTileProps>(function PromoTile(
  { id, designOptions, image, title, action, linkLabelAsTitle, hasSectionTitle },
  ref,
) {
  const url = getUrlFromAction(action)

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
      //@ts-ignore:TODO
      href={url}
      ref={ref}
      image={image}
      variant="secondary"
      className={`${theme?.dark || background.dark ? 'dark' : ''} `}
    >
      <Card.Content variant="secondary" className={`${theme.background}`}>
        <Card.Header
          titleLevel={hasSectionTitle ? 'h3' : 'h2'}
          {...(!linkLabelAsTitle && { titleBlock: title })}
          {...(linkLabelAsTitle && { title: action.label })}
        />
      </Card.Content>
    </Card>
  )
})
