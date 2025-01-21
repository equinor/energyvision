import type { EventCardData, FeaturedContentData } from '../../types/index'
import { EventCard } from '@sections/cards/EventCard'
import { Banner } from '@core/Banner/Banner'
import { FormattedMessage } from 'react-intl'
import { Typography } from '@core/Typography'
import { PortableTextBlock } from '@portabletext/types'

type Props = {
  featuredContent: FeaturedContentData
  featuredCTALabel?: string
  featuredIngress: PortableTextBlock[] | undefined
}

const FeaturedContent = ({ featuredContent, featuredCTALabel, featuredIngress }: Props) => {
  if (!featuredContent.type) return null

  const isEvent = (data: FeaturedContentData): boolean => data?.routeContentType === 'event'
  const { type, heroImage, title, ingress, slug } = featuredContent

  return (
    <div className="">
      <Typography
        as="h3"
        variant="h5"
        className={`uppercase
          text-moss-green-95
            font-semibolder
            text-sm
            leading-earthy
            pt-2
            pb-4
            xl:pb-6
            xl:font-semibold
            xl:text-xs
            `}
      >
        <FormattedMessage id="featured_content" defaultMessage="Featured" />
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
          className="h-fit"
        />
      ) : (
        <Banner
          image={heroImage.image}
          variant={type === 'news' || type === 'localNews' ? 'secondary' : 'primary'}
          //@ts-ignore:TODO - find out why any[] and not portabletext[]
          title={title}
          ingress={ingress ?? featuredIngress}
          ctaLink={slug}
          ctaLabel={featuredCTALabel}
        />
      )}
    </div>
  )
}

export default FeaturedContent
