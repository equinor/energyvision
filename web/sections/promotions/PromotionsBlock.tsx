import type { SanityImageObject } from '@sanity/image-url'
import type { PortableTextBlock } from 'next-sanity'
import { useId, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import {
  getObjectPositionForImage,
  type ObjectPositions,
} from '@/core/Image/Image'
import { ResourceLink } from '@/core/Link/ResourceLink'
import { Promotion } from '@/core/Promotion/Promotion'
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
    promotePastEvents,
  } = data

  const { backgroundImage, backgroundPosition } = designOptions || {}

  console.log('promotion data', data)

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
  console.log('onColorBg', onColorBg)
  const paddingClassName = `px-layout-sm lg:px-layout-lg`

  return (
    <section
      className={twMerge(`relative ${bg} ${dark ? 'dark' : ''}`, className)}
      id={anchor}
    >
      {(title || ingress || viewAllLink?.link?.slug) && (
        <div
          className={`flex flex-col ${promotionVariant === 'promoteEvents' && backgroundImage ? 'dark relative z-10 pt-30' : ''} ${paddingClassName}`}
        >
          {/*@ts-ignore:todo */}
          <Blocks variant='h2' id={sectionTitleId} value={title} />
          {ingress && (
            <Blocks group='paragraph' variant='overline' value={ingress} />
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
          promotePastEvents={promotePastEvents}
          onColorBg={onColorBg}
          hasBackgroundImage={!!backgroundImage?.asset}
        />
      ) : (
        <ul
          className={`pt-6 ${
            promotionList?.length === 1
              ? 'mx-layout-sm md:mx-layout-lg'
              : `3xl:mx-layout-md mx-layout-sm grid auto-rows-fr grid-cols-1 ${
                  promotionList?.length === 3
                    ? 'md:grid-cols-3'
                    : 'md:grid-cols-2 2xl:grid-cols-3'
                } gap-x-4 gap-y-3`
          }
              `}
        >
          {promotionList?.map((promotion: any) => {
            return (
              <li key={promotion?.id}>
                {variant === 'promotePeople' && (
                  <PeopleCard
                    data={promotion as PeopleCardData}
                    hasSectionTitle={!!title}
                    variant={promotionList?.length === 1 ? 'single' : 'default'}
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
    </section>
  )
}

export default PromotionsBlock
