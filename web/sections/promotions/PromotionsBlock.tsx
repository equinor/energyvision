'use client'
import type { SanityImageObject } from '@sanity/image-url'
import type { PortableTextBlock } from 'next-sanity'
import { useId, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import {
  getObjectPositionForImage,
  type ObjectPositions,
} from '@/core/Image/imageUtilities'
import { ResourceLink } from '@/core/Link/ResourceLink'
import { Promotion } from '@/core/Promotion/Promotion'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import Blocks from '@/portableText/Blocks'
import { resolveImage } from '@/sanity/lib/utils'
import {
  type ColorKeys,
  getBgAndDarkFromBackground,
} from '@/styles/colorKeyToUtilityMap'
import type {
  CardData,
  DesignOptions,
  LinkData,
  PeopleCardData,
  Tag,
} from '@/types'
import type { EventCardData } from '../cards/EventCard/EventCard'
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
    //event
    backgroundImage?: SanityImageObject
    //event
    backgroundPosition?: ObjectPositions
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
    eventPromotionSettings,
  } = data

  const { backgroundImage, backgroundPosition } = designOptions || {}

  const promotionVariant =
    variant ?? mapOldPromoType(data.promotions?.[0]?.type) ?? 'promoteTopics'

  const { bg, dark } = getBgAndDarkFromBackground(designOptions)
  let imageUrl: string
  if (promotionVariant === 'promoteEvents' && backgroundImage) {
    const { url } = resolveImage({
      image: backgroundImage,
      grid: 'full',
      isLargerDisplays: true,
    })
    if (url) {
      imageUrl = url
    }
  }

  const sectionTitleId = useId()
  const promotionList = useMemo(() => {
    return (eventsCount ? promotions?.slice(0, eventsCount) : promotions) ?? []
  }, [promotions, eventsCount])

  const onColorBg = designOptions?.background?.backgroundColor !== 'White'
  console.log()
  return (
    <section
      className={twMerge(`relative ${bg} ${dark ? 'dark' : ''}`, className)}
      id={anchor}
    >
      <div className='mx-auto max-w-content'>
        {(title || ingress || viewAllLink?.link?.slug) && (
          <div
            className={twMerge(
              'flex flex-col px-layout-sm pb-6 lg:px-layout-lg',
              promotionVariant === 'promoteEvents' &&
                backgroundImage &&
                'dark relative z-10 pt-30',
            )}
          >
            {/*@ts-ignore:todo */}
            <Blocks variant='h2' id={sectionTitleId} value={title} />
            {ingress && (
              <Blocks group='paragraph' variant='ingress' value={ingress} />
            )}
            {viewAllLink?.link?.slug && (
              <ResourceLink
                type='internalUrl'
                variant='fit'
                href={viewAllLink?.link?.slug}
              >
                {viewAllLink?.label}
              </ResourceLink>
            )}
          </div>
        )}
        {promotionVariant === 'promoteEvents' ? (
          <EventPromotions
            promotions={promotionList as EventCardData[]}
            hasSectionTitle={!!title}
            promotePastEvents={
              eventPromotionSettings?.promotePastEvents || false
            }
            onColorBg={onColorBg}
            hasBackgroundImage={!!backgroundImage?.asset}
          />
        ) : (
          <ul
            className={twMerge(
              'mx-layout-sm pt-6',
              promotionList?.length === 1 && 'md:mx-layout-lg',
              promotionList?.length > 1 &&
                `3xl:mx-layout-md grid auto-rows-fr grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2 2xl:grid-cols-3`,
              promotionList?.length === 2 && '2xl:grid-cols-2',
              promotionList?.length === 3 && 'md:grid-cols-3',
            )}
          >
            {promotionList?.map((promotion: any) => {
              const href = getUrlFromAction({
                ...promotion,
                type: 'internalUrl',
              })

              return (
                <li key={promotion?.id}>
                  {promotionVariant === 'promotePeople' ? (
                    <PeopleCard
                      data={promotion as PeopleCardData}
                      hasSectionTitle={!!title}
                      variant={
                        promotionList?.length === 1 ? 'single' : 'default'
                      }
                    />
                  ) : (
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
                            className='pb-2 font-medium text-xs'
                          />
                        ),
                      })}
                      image={promotion?.heroImage?.image}
                      href={href}
                      hasSectionTitle={!!title}
                    />
                  )}
                </li>
              )
            })}
          </ul>
        )}
        {promotionVariant === 'promoteEvents' && backgroundImage && (
          <div
            className={`absolute inset-0 z-0 bg-cover bg-no-repeat ${
              backgroundPosition
                ? getObjectPositionForImage(backgroundPosition)
                : ''
            } `}
            style={{
              //@ts-ignore:todo
              backgroundImage: `url(${imageUrl})`,
            }}
          >
            <div className='h-full w-full bg-black/20 px-50 py-20'>
              <div
                className={`h-full w-full rounded-card border border-white-100/40 bg-black-100/10 backdrop-blur-lg`}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default PromotionsBlock
