import { HTMLAttributes } from 'react'
import { BackgroundContainer } from '@components'
import SinglePromotion from './promotions/SinglePromotion'
import MultiplePromotions from './promotions/MultiplePromotions'
import TitleText from '../shared/portableText/TitleText'
import IngressText from '../shared/portableText/IngressText'
import type { PromotionData } from '../../types/types'

const Promotion = ({
  data,
  anchor,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { data: PromotionData; anchor?: string }) => {
  const { title, ingress, content, useHorizontalScroll, designOptions } = data
  // After a while with TW, this isDark should be removed and only use dark from designOptions for dark
  const isDark =
    designOptions?.dark || designOptions?.background === 'Mid Blue' || designOptions?.background === 'Slate Blue'
  // const { articles = [], pages = [] } = data.promotion
  const promotions = content?.promotions || []
  const variant = data.content?.type
  return (
    <BackgroundContainer background={designOptions?.background} id={anchor} twClassName={`${isDark ? 'dark' : ''}`}>
      <div className={`pb-12 pt-8`} {...rest}>
        <header className="max-w-viewport text-center mx-auto pt-0 px-layout-sm">
          {title && (
            <TitleText
              className="max-w-viewport text-center mx-auto pt-0 px-layout-sm pb-8"
              value={title}
              level="h2"
              size="xl"
            />
          )}
          {ingress && (
            <div className="mb-8 max-w-viewport">
              <IngressText value={ingress} centered={true} />
            </div>
          )}
        </header>
        {promotions?.length === 1 ? (
          /*  TODO: More than just people and events */
          <SinglePromotion promotion={promotions[0]} hasSectionTitle={!!title} />
        ) : (
          <MultiplePromotions
            data={promotions}
            variant={variant}
            hasSectionTitle={!!title}
            eventPromotionSettings={content?.eventPromotionSettings}
            useHorizontalScroll={useHorizontalScroll}
          />
        )}
      </div>
    </BackgroundContainer>
  )
}

export default Promotion
