import { BackgroundContainer } from '@components'
import SinglePromotion from './promotions/SinglePromotion'
import MultiplePromotions from './promotions/MultiplePromotions'
import IngressText from '../shared/portableText/IngressText'
import type { PromotionData } from '../../types/index'
import { twMerge } from 'tailwind-merge'
import { ResourceLink } from '@core/Link'
import { Heading } from '@core/Typography'
import { useId } from 'react'

const Promotion = ({
  data,
  anchor,
  className,
  ...rest
}: {
  data: PromotionData
  anchor?: string
  className?: string
}) => {
  const { title, ingress, content, useHorizontalScroll, viewAllLink, designOptions } = data
  // const { articles = [], pages = [] } = data.promotion
  const promotions = content?.promotions || []
  const variant = data.content?.type
  const promoteSingleUpcomingEvent = data?.content?.eventPromotionSettings?.promoteSingleUpcomingEvent
  const sectionTitleId = useId()

  return (
    <BackgroundContainer {...designOptions} id={anchor} renderFragmentWhenPossible>
      <div className={twMerge(`pb-page-content max-w-viewport mx-auto flex flex-col`, className)} {...rest}>
        {title && (
          <Heading
            id={sectionTitleId}
            value={title}
            as="h2"
            variant="xl"
            className={`w-full px-layout-lg ${!ingress && viewAllLink?.link?.slug ? 'mb-5' : 'mb-10'}`}
          />
        )}
        {ingress && (
          <div className={`px-layout-lg ${viewAllLink?.link?.slug ? 'mb-12 xl:mb-16' : 'mb-12 xl:mb-20'}`}>
            <IngressText value={ingress} />
          </div>
        )}
        {viewAllLink?.link?.slug && (
          <div className="px-layout-lg mb-12 xl:mb-20">
            <ResourceLink type="internalUrl" variant="fit" href={viewAllLink?.link?.slug}>
              {viewAllLink?.label}
            </ResourceLink>
          </div>
        )}
        <div
          className={`${
            (variant === 'promoteEvents' &&
              (promoteSingleUpcomingEvent ||
                promotions?.length === 1 ||
                data?.content?.eventPromotionSettings?.promotePastEvents)) ||
            (variant === 'promotePeople' && promotions?.length === 1)
              ? 'px-layout-lg'
              : 'px-layout-lg xl:px-layout-sm'
          }`}
        >
          {promotions?.length === 1 || promoteSingleUpcomingEvent ? (
            <SinglePromotion promotion={promotions[0]} hasSectionTitle={!!title} />
          ) : (
            <MultiplePromotions
              data={promotions}
              variant={variant}
              hasSectionTitle={!!title}
              eventPromotionSettings={content?.eventPromotionSettings}
              useHorizontalScroll={useHorizontalScroll}
              labelledbyId={sectionTitleId}
            />
          )}
        </div>
      </div>
    </BackgroundContainer>
  )
}

export default Promotion
