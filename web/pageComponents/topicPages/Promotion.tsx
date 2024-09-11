import { BackgroundContainer } from '@components'
import SinglePromotion from './promotions/SinglePromotion'
import MultiplePromotions from './promotions/MultiplePromotions'
import IngressText from '../shared/portableText/IngressText'
import type { PromotionData } from '../../types/index'
import { twMerge } from 'tailwind-merge'
import { ButtonLink } from '@core/Link'
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
      <div
        className={twMerge(
          `pb-page-content px-4 ${
            (variant === 'promoteEvents' &&
              (promoteSingleUpcomingEvent ||
                promotions?.length === 1 ||
                data?.content?.eventPromotionSettings?.promotePastEvents)) ||
            (variant === 'promotePeople' && promotions?.length === 1)
              ? 'lg:px-layout-lg'
              : 'lg:px-layout-sm'
          } max-w-viewport mx-auto flex flex-col items-center`,
          className,
        )}
        {...rest}
      >
        {title && (
          <Heading id={sectionTitleId} value={title} as="h2" variant="xl" className="w-fit mb-10 text-center" />
        )}
        {ingress && (
          <div className="mb-24">
            <IngressText value={ingress} />
          </div>
        )}
        {promotions?.length === 1 ? (
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
        {viewAllLink?.link?.slug && (
          <div className="px-8 flex justify-center mt-12">
            <ButtonLink variant="outlined" href={viewAllLink?.link?.slug} className="px-layout-lg md:px-layout-sm">
              {viewAllLink?.label}
            </ButtonLink>
          </div>
        )}
      </div>
    </BackgroundContainer>
  )
}

export default Promotion
