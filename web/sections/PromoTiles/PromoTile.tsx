import Card from '@sections/cards/Card'
import { getUrlFromAction } from '../../common/helpers'
import { PromoTileData } from '../../types/index'
import { forwardRef } from 'react'
import { Variants } from '../cards/Card/Card'
import { getLocaleFromName } from '../../lib/localization'
import { useIntl } from 'react-intl'
import getBgClassName from '../../common/helpers/getBackgroundColor'

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
  const theme = getBgClassName(background.backgroundUtility)
  return (
    <Card
      {...(id && { id: id })}
      href={url}
      type={action.type}
      locale={locale}
      ref={ref}
      image={image}
      variant={variant}
    >
      <Card.Content variant={variant} className={`${theme}`}>
        <Card.Header
          titleLevel={hasSectionTitle ? 'h3' : 'h2'}
          {...(!linkLabelAsTitle && { titleBlock: title })}
          {...(linkLabelAsTitle && { title: action.label })}
        />
      </Card.Content>
    </Card>
  )
})
