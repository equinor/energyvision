import { HTMLAttributes } from 'react'
import { BackgroundContainer } from '@components'
import SinglePromotion from './promotions/SinglePromotion'
import MultiplePromotions from './promotions/MultiplePromotions'
import TitleText from '../shared/portableText/TitleText'
import IngressText from '../shared/portableText/IngressText'
import type { PromotionData } from '../../types/types'
import { twMerge } from 'tailwind-merge'

const Promotion = ({
  data,
  anchor,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { data: PromotionData; anchor?: string; className?: string }) => {
  const { title, ingress, content, useHorizontalScroll, designOptions } = data
  // const { articles = [], pages = [] } = data.promotion
  const promotions = content?.promotions || []
  const variant = data.content?.type
  return (
    <BackgroundContainer background={designOptions?.background} id={anchor} renderFragmentWhenPossible>
      <div className={twMerge(`pb-page-content px-layout-lg max-w-viewport mx-auto`, className)} {...rest}>
        <header className="flex-col flex items-center gap-8 pb-8">
          {title && <TitleText value={title} level="h2" size="xl" />}
          {ingress && (
            <div className="mb-8 max-w-prose">
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
