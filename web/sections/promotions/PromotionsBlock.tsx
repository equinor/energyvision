'use client'
import type { SanityImageObject } from '@sanity/image-url'
import { type PortableTextBlock, toPlainText } from 'next-sanity'
import { useId, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import {
  getBackgroundPositionForImage,
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
    dark?: boolean
    backgroundPosition?: ObjectPositions
    useGlassEffect?: boolean
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
  const { title, ingress, viewAllLink, designOptions, promotions } = data

  const {
    backgroundImage,
    backgroundPosition,
    dark: bgImageDark,
    useGlassEffect,
    foreground,
  } = designOptions || {}

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
    return (
      ((data as EventPromotion)?.eventsCount
        ? promotions?.slice(0, (data as EventPromotion).eventsCount)
        : promotions) ?? []
    )
  }, [promotions, data])

  const contentElements = (
    <>
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
    </>
  )

  const onColorBg = !(
    designOptions?.background?.backgroundUtility === 'white-100' ||
    designOptions?.background?.backgroundColor === 'White'
  )

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
                'relative z-10 pt-30',
              backgroundImage && bgImageDark && 'dark',
            )}
          >
            {promotionVariant === 'promoteEvents' &&
            backgroundImage &&
            useGlassEffect ? (
              <div
                className={twMerge(
                  `glass-border relative w-fit rounded-card px-6 py-4 **:rounded-card before:z-2 lg:px-8 lg:py-6`,
                )}
              >
                <div className='backdrop-glass before:z-1' />
                <div className='z-1 flex w-fit flex-col *:z-1'>
                  {contentElements}
                </div>
              </div>
            ) : (
              contentElements
            )}
          </div>
        )}
        {promotionVariant === 'promoteEvents' ? (
          <EventPromotions
            promotions={promotionList as EventCardData[]}
            hasSectionTitle={!!title}
            promotePastEvents={
              (data as EventPromotion)?.promotePastEvents ??
              // @ts-ignore: backwards compatibility to old events promotions?
              (data as EventPromotion)?.eventPromotionSettings
                ?.promotePastEvents ??
              false
            }
            background={foreground ?? (onColorBg ? 'white-100' : undefined)}
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
                ? getBackgroundPositionForImage(backgroundPosition)
                : ''
            } `}
            style={{
              //@ts-ignore:todo
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
        )}
      </div>
    </section>
  )
}

export default PromotionsBlock
