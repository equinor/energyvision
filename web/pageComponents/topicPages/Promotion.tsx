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

  const paddingClassName = `px-layout-sm 3xl:px-layout-lg`

  return (
    <BackgroundContainer {...designOptions} id={anchor} renderFragmentWhenPossible>
      <div className={twMerge(`pb-page-content max-w-viewport mx-auto flex flex-col gap-6`, className)} {...rest}>
        {title && (
          <Heading
            id={sectionTitleId}
            value={title}
            as="h2"
            variant="xl"
            className={`w-full ${paddingClassName} ${!ingress && viewAllLink?.link?.slug ? '' : ''}`}
          />
        )}
        {ingress && (
          <div className={`${paddingClassName} ${viewAllLink?.link?.slug ? '' : ''}`}>
            <IngressText value={ingress} />
          </div>
        )}
        {viewAllLink?.link?.slug && (
          <div className={`${paddingClassName}`}>
            <ResourceLink type="internalUrl" variant="fit" href={viewAllLink?.link?.slug}>
              {viewAllLink?.label}
            </ResourceLink>
          </div>
        )}
        <div
          className={`pt-6 ${
            (variant === 'promoteEvents' &&
              (promoteSingleUpcomingEvent ||
                promotions?.length === 1 ||
                data?.content?.eventPromotionSettings?.promotePastEvents)) ||
            (variant === 'promotePeople' && promotions?.length === 1)
              ? 'px-layout-sm md:px-layout-lg'
              : `px-layout-sm 3xl:px-layout-md`
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
