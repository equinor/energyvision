import Promotion from './Promotion'
import MultiplePromotions from './MultiplePromotions'
import { twMerge } from 'tailwind-merge'
import { ResourceLink } from '@/core/Link'
import { useId } from 'react'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import { PortableTextBlock } from 'next-sanity'
import { CardData, DesignOptions, EventCardData, LinkData, PeopleCardData, Tag } from '@/types'
import Blocks from '@/portableText/Blocks'
import { getEventDates } from '@/common/helpers/dateUtilities'

// Do we have a way to share types between studio and web?
export type PromotionType = 'promoteTopics' | 'promoteNews' | 'promotePeople' | 'promoteEvents' | 'promoteMagazine'

type PromotionBlock = {
  id: string
  type: string
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  viewAllLink?: LinkData
  designOptions?: DesignOptions
}

export type NewsPromotion = {
  tags?: Tag[]
  countryTags?: Tag[]
  localNewsTags?: Tag[]
  promotions?: CardData[]
} & PromotionBlock

export type PeoplePromotion = {
  promotions?: PeopleCardData[]
} & PromotionBlock

export type MagazinePromotion = {
  manuallySelectArticles?: boolean
  tags?: Tag[]
  promotions?: CardData[]
} & PromotionBlock

export type TopicPromotion = {
  promotions?: CardData[]
} & PromotionBlock

export type EventPromotion = {
  tags?: Tag[]
  promotionType?: 'automatic' | 'manual'
  eventsCount?: number
  promotePastEvents?: boolean
  promotions?: EventCardData[]
} & PromotionBlock

/* export type PromotionsBlockData = {
  content: {
    promotions: CardData[] | PeopleCardData[] | EventCardData[]
    type: PromotionType
    eventPromotionSettings?: EventPromotionSettings
  }
} */

const PromotionsBlock = ({
  variant,
  data,
  anchor,
  className,
}: {
  variant: PromotionType
  data: EventPromotion | MagazinePromotion | TopicPromotion | NewsPromotion | PeoplePromotion
  anchor?: string
  className?: string
}) => {
  const { title, ingress, viewAllLink, designOptions, ...restData } = data
  const { bg, dark } = getBgAndDarkFromBackground(designOptions)

  const sectionTitleId = useId()
  let promotionsCount = data?.promotions?.length
  let promotionList = data?.promotions ?? []
  if (variant === 'promoteEvents' && 'eventsCount' in data && data?.eventsCount && data?.promotions) {
    promotionsCount = data?.eventsCount ?? data?.promotions?.length
    /*     const sortedPromotions = (promotions as EventCardData[]).sort((a, b) => {
          return (
            new Date(getEventDates(a.eventDate).start || a.eventDate.date).getTime() -
            new Date(getEventDates(b.eventDate).start || b.eventDate.date).getTime()
          )
        }) */
    promotionList = data?.promotions.slice(0, data?.eventsCount)
  }

  const paddingClassName = `px-layout-sm 3xl:px-layout-lg`

  return (
    <section className={twMerge(`${bg} ${dark ? 'dark' : ''} pb-page-content`, className)} id={anchor}>
      {title && (
        <div className={paddingClassName}>
          <Blocks variant="h2" id={sectionTitleId} value={title} />
        </div>
      )}
      <div className="flex flex-col gap-6">
        {ingress && (
          <div className={`${paddingClassName} ${viewAllLink?.link?.slug ? '' : ''}`}>
            <Blocks variant="ingress" value={ingress} />
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
          className={`pt-6 ${promotionsCount === 1 ? 'px-layout-sm md:px-layout-lg' : `px-layout-sm 3xl:px-layout-md`}`}
        >
          {promotionsCount === 1 ? (
            <Promotion promotion={promotionList[0]} hasSectionTitle={!!title} />
          ) : (
            <MultiplePromotions
              //@ts-ignore: todo
              data={{
                ...restData,
                promotions: promotionList,
              }}
              variant={variant}
              hasSectionTitle={!!title}
              labelledbyId={sectionTitleId}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default PromotionsBlock
