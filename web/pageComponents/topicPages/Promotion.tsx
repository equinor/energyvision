import { BackgroundContainer } from '@components'
import SinglePromotion from './promotions/SinglePromotion'
import MultiplePromotions from './promotions/MultiplePromotions'
import IngressText from '../shared/portableText/IngressText'
import type { PromotionData } from '../../types/types'
import { twMerge } from 'tailwind-merge'
import { ButtonLink } from '@core/Link'
import { Heading } from '@core/Typography'

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

  return (
    <BackgroundContainer {...designOptions} id={anchor} renderFragmentWhenPossible>
      <div
        className={twMerge(
          `pb-page-content px-4 ${
            promoteSingleUpcomingEvent ? 'lg:px-layout-lg' : 'lg:px-layout-sm'
          } max-w-viewport mx-auto flex flex-col items-center`,
          className,
        )}
        {...rest}
      >
        {title && <Heading value={title} as="h2" variant="xl" className="w-fit mb-10" />}
        {ingress && (
          <div className="mb-24">
            <IngressText value={ingress} />
          </div>
        )}
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
