import type { PortableTextBlock } from 'next-sanity'
import { useId } from 'react'
import { twMerge } from 'tailwind-merge'
import { ResourceLink } from '@/core/Link'
import Blocks from '@/portableText/Blocks'
import {
  type ColorKeys,
  getBgAndDarkFromBackground,
} from '@/styles/colorKeyToUtilityMap'
import type {
  CardData,
  DesignOptions,
  EventCardData,
  LinkData,
  PeopleCardData,
  Tag,
} from '@/types'
import MultiplePromotions from './MultiplePromotions'
import Promotion from './Promotion'

// Do we have a way to share types between studio and web?
export type PromotionType =
  | 'promoteTopics'
  | 'promoteNews'
  | 'promotePeople'
  | 'promoteEvents'
  | 'promoteMagazine'

type PromotionBlock = {
  id: string
  type: string
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  viewAllLink?: LinkData
  designOptions?: {
    foreground?: ColorKeys
  } & DesignOptions
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
  data:
    | EventPromotion
    | MagazinePromotion
    | TopicPromotion
    | NewsPromotion
    | PeoplePromotion
  anchor?: string
  className?: string
}) => {
  const { title, ingress, viewAllLink, designOptions, ...restData } = data
  const { foreground } = designOptions
  const { bg, dark } = getBgAndDarkFromBackground(designOptions)

  const sectionTitleId = useId()
  let promotionsCount = data?.promotions?.length
  let promotionList = data?.promotions ?? []
  if (
    variant === 'promoteEvents' &&
    'eventsCount' in data &&
    data?.eventsCount &&
    data?.promotions
  ) {
    promotionsCount = data?.eventsCount ?? data?.promotions?.length
    /*     const sortedPromotions = (promotions as EventCardData[]).sort((a, b) => {
          return (
            new Date(getEventDates(a.eventDate).start || a.eventDate.date).getTime() -
            new Date(getEventDates(b.eventDate).start || b.eventDate.date).getTime()
          )
        }) */
    promotionList = data?.promotions.slice(0, data?.eventsCount)
  }

  const paddingClassName = `px-layout-sm lg:px-layout-lg`

  return (
    <section
      className={twMerge(
        `${bg} ${dark ? 'dark' : ''} pb-page-content`,
        className,
      )}
      id={anchor}
    >
      {title && (
        <div className={paddingClassName}>
          <Blocks variant='h2' id={sectionTitleId} value={title} />
        </div>
      )}
      <div className='flex flex-col gap-6'>
        {ingress && (
          <div
            className={`${paddingClassName} ${viewAllLink?.link?.slug ? '' : ''}`}
          >
            <Blocks variant='ingress' value={ingress} />
          </div>
        )}
        {viewAllLink?.link?.slug && (
          <div className={`${paddingClassName}`}>
            <ResourceLink
              type='internalUrl'
              variant='fit'
              href={viewAllLink?.link?.slug}
            >
              {viewAllLink?.label}
            </ResourceLink>
          </div>
        )}
        <div
          className={`pt-6 ${promotionsCount === 1 ? 'px-layout-sm md:px-layout-lg' : `3xl:px-layout-md px-layout-sm`}`}
        >
          {promotionsCount === 1 ? (
            <Promotion
              background={foreground}
              promotion={promotionList[0]}
              hasSectionTitle={!!title}
            />
          ) : (
            <MultiplePromotions
              //@ts-ignore: todo
              data={{
                ...restData,
                promotions: promotionList,
              }}
              background={foreground}
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
