import Promotion from './Promotion'
import MultiplePromotions from './MultiplePromotions'
import { twMerge } from 'tailwind-merge'
import { ResourceLink } from '@/core/Link'
import { useId } from 'react'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import { PortableTextBlock } from 'next-sanity'
import { CardData, DesignOptions, EventCardData, EventPromotionSettings, LinkData, PeopleCardData, Tag } from '@/types'
import Blocks from '@/portableText/Blocks'

// Do we have a way to share types between studio and web?
export type PromotionType = 'promoteTopics' | 'promoteNews' | 'promotePeople' | 'promoteEvents' | 'promoteMagazine'

export type PromotionsBlockData = {
  id: string
  type: string
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  content: {
    tags?: Tag[]
    countryTags?: Tag[]
    localNewsTags?: Tag[]
    promotions: CardData[] | PeopleCardData[] | EventCardData[]
    type: PromotionType
    eventPromotionSettings?: EventPromotionSettings
  }
  viewAllLink?: LinkData
  designOptions: DesignOptions
}

const PromotionsBlock = ({
  data,
  anchor,
  className,
}: {
  data: PromotionsBlockData
  anchor?: string
  className?: string
}) => {
  const { title, ingress, content, viewAllLink, designOptions } = data
  const { bg, dark } = getBgAndDarkFromBackground(designOptions)
  const promotions = content?.promotions || []
  const variant = data.content?.type
  const promoteSingleUpcomingEvent = data?.content?.eventPromotionSettings?.promoteSingleUpcomingEvent
  const sectionTitleId = useId()

  const paddingClassName = `px-layout-sm 3xl:px-layout-lg`

  return (
    <section
      className={twMerge(`${bg} ${dark ? 'dark' : ''} mx-auto max-w-viewport pb-page-content`, className)}
      id={anchor}
    >
      {title && (
        <Blocks
          variant="h2"
          id={sectionTitleId}
          value={title}
          className={`w-full ${paddingClassName} ${!ingress && viewAllLink?.link?.slug ? '' : ''}`}
        />
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
            <Promotion promotion={promotions[0]} hasSectionTitle={!!title} />
          ) : (
            <MultiplePromotions
              data={promotions}
              variant={variant}
              hasSectionTitle={!!title}
              eventPromotionSettings={content?.eventPromotionSettings}
              labelledbyId={sectionTitleId}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default PromotionsBlock
