import type { PortableTextBlock } from 'next-sanity'
import { useId, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import { ResourceLink } from '@/core/Link/ResourceLink'
import { Promotion } from '@/core/Promotion/Promotion'
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
import PeopleCard from '../cards/PeopleCard/PeopleCard'
import EventPromotions from './event/EventPromotions'

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

export type PromotionsBlockProps = {
  variant: PromotionType
  data:
    | EventPromotion
    | MagazinePromotion
    | TopicPromotion
    | NewsPromotion
    | PeoplePromotion
  anchor?: string
  className?: string
}

const mapOldPromoType = (
  oldType:
    | 'news'
    | 'topics'
    | 'localNews'
    | 'magazine'
    | 'people'
    | 'events'
    | undefined,
) => {
  switch (oldType) {
    case 'people':
      return 'promotePeople'
    case 'events':
      return 'promoteEvents'
    case 'news':
    case 'localNews':
      return 'promoteNews'
    case undefined:
      return undefined
    default:
      return 'promoteTopics'
  }
}

const PromotionsBlock = ({
  variant,
  data,
  anchor,
  className,
}: PromotionsBlockProps) => {
  const {
    title,
    ingress,
    viewAllLink,
    designOptions,
    promotions,
    //@ts-ignore: how to spread union types
    eventsCount,
    //@ts-ignore: how to spread union types
    promotePastEvents,
  } = data
  //const { foreground } = designOptions || {}
  const { bg, dark } = getBgAndDarkFromBackground(designOptions)
  const promotionVariant =
    variant ?? mapOldPromoType(data.promotions?.[0]?.type) ?? 'promoteTopics'

  const sectionTitleId = useId()
  const promotionList = useMemo(() => {
    return (eventsCount ? promotions?.slice(0, eventsCount) : promotions) ?? []
  }, [promotions, eventsCount])

  const onColorBg = designOptions?.background?.backgroundColor !== 'White'
  const paddingClassName = `px-layout-sm lg:px-layout-lg`
  console.log('PromotionsBlock variant', variant)
  console.log('PromotionsBlock data', data)

  return (
    <section
      className={twMerge(`${bg} ${dark ? 'dark' : ''}`, className)}
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

        {promotionVariant === 'promoteEvents' ? (
          <EventPromotions
            promotions={promotionList as EventCardData[]}
            hasSectionTitle={!!title}
            promotePastEvents={promotePastEvents}
          />
        ) : (
          <ul
            className={`pt-6 ${promotionList?.length === 1 ? 'mx-layout-sm md:mx-layout-lg' : `3xl:mx-layout-md mx-layout-sm grid auto-rows-fr grid-cols-1 ${promotionList?.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 2xl:grid-cols-3'} gap-x-4 gap-y-3`}
              `}
          >
            {promotionList?.map((promotion: any) => {
              console.log('promotion item', promotion)
              return (
                <li key={promotion?.id}>
                  {variant === 'promotePeople' && (
                    <PeopleCard
                      data={promotion as PeopleCardData}
                      hasSectionTitle={!!title}
                      variant={
                        promotionList?.length === 1 ? 'single' : 'default'
                      }
                    />
                  )}
                  {variant !== 'promotePeople' && (
                    <Promotion
                      variant='default'
                      type='extended'
                      //@ts-ignore:todo
                      title={promotion?.title}
                      ingress={promotion?.ingress}
                      {...(onColorBg && {
                        background: 'white-100',
                      })}
                      {...(promotion?.publishDateTime && {
                        eyebrow: (
                          <FormattedDateTime
                            variant='date'
                            datetime={promotion?.publishDateTime}
                            uppercase
                            className='pb-2 text-sm'
                          />
                        ),
                      })}
                      image={promotion?.heroImage?.image}
                      href={promotion?.slug}
                      hasSectionTitle={!!title}
                    />
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}

export default PromotionsBlock
