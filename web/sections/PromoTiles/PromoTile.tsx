import Card from '@sections/cards/Card'
import { getUrlFromAction } from '../../common/helpers'
import { ColorKeyTokens, colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'
import { PromoTileData } from '../../types/index'
import { forwardRef } from 'react'

type PromoTileProps = PromoTileData

export const PromoTile = forwardRef<HTMLAnchorElement, PromoTileProps>(function PromoTile(
  { id, designOptions, image, title, action, linkLabelAsTitle },
  ref,
) {
  const url = getUrlFromAction(action)

  const { background } = designOptions
  const colorName =
    Object.keys(colorKeyToUtilityMap).find(
      (key) => colorKeyToUtilityMap[key as keyof ColorKeyTokens]?.backgroundName === background?.backgroundColor,
    ) ?? 'white-100'

  const twBg = background?.backgroundUtility
    ? colorKeyToUtilityMap[background.backgroundUtility]?.background
    : colorKeyToUtilityMap[colorName as keyof ColorKeyTokens]?.background

  return (
    <Card
      {...(id && { id: id })}
      //@ts-ignore:TODO
      href={url}
      ref={ref}
      image={image}
      variant="secondary"
      className={`${background?.dark ? 'dark' : ''} `}
    >
      <Card.Content variant="secondary" className={`${twBg}`}>
        <Card.Header
          {...(!linkLabelAsTitle && { titleBlock: title })}
          {...(linkLabelAsTitle && { title: action.label })}
        />
      </Card.Content>
    </Card>
  )
})
