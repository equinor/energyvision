'use client'
import type { PortableTextBlock } from '@portabletext/types'
import { useLocale, useTranslations } from 'next-intl'
import { Banner } from '@/core/Banner/Banner'
import { Typography } from '@/core/Typography'
import { defaultLanguage } from '@/languageConfig'
import { getLocaleFromIso } from '@/sanity/helpers/localization'
import { EventCard } from '@/sections/cards/EventCard'
import type { FeaturedContentData } from '../../types/index'
import type { EventCardData } from '../cards/EventCard/EventCard'


type Props = {
  featuredContent: FeaturedContentData
  featuredCTALabel?: string
  featuredIngress: PortableTextBlock[] | undefined
  linkCallback: () => void
}

const FeaturedContent = ({
  featuredContent,
  featuredCTALabel,
  featuredIngress,
  linkCallback,
}: Props) => {
  const t = useTranslations()
  const iso = useLocale()
  if (!featuredContent.type) return null

  const isEvent = (data: FeaturedContentData): boolean =>
    data?.routeContentType === 'event'
  const { type, heroImage, title, ingress, slug } = featuredContent

  const locale = iso !== defaultLanguage.iso ? `/${getLocaleFromIso(iso)}` : ''
  const href =  locale + slug || ''

  return (
    <div className=''>
      <Typography
        as='h3'
        variant='h5'
        className={`pt-2 pb-4 font-semibolder text-moss-green-95 text-sm uppercase leading-earthy xl:pb-6 xl:font-semibold xl:text-xs`}
      >
        {t('featured_content')}
      </Typography>
      {isEvent(featuredContent) ? (
        <EventCard
          data={
            {
              type: 'events',
              ...featuredContent,
            } as EventCardData
          }
          hasSectionTitle={false}
          className='h-fit'
        />
      ) : (
        <Banner
          image={heroImage.image}
          variant={
            type === 'news' || type === 'localNews' ? 'secondary' : 'primary'
          }
          //@ts-ignore:TODO - find out why any[] and not portabletext[]
          title={title}
          ingress={ingress ?? featuredIngress}
          ctaLink={href}
          ctaLabel={featuredCTALabel}
          linkCallback={linkCallback}
        />
      )}
    </div>
  )
}

export default FeaturedContent
