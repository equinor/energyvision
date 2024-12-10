import type { EventCardData, FeaturedContentData } from '../../types/index'
import { EventCard } from '@sections/cards/EventCard'
import { Banner } from '@core/Banner/Banner'
import { FormattedMessage } from 'react-intl'
import { Typography } from '@core/Typography'

type Props = {
  data: FeaturedContentData
}

const FeaturedContent = ({ data }: Props) => {
  if (!data.type) return null

  const isEvent = (data: FeaturedContentData): boolean => data?.routeContentType === 'event'
  //To destructure and get rid of 2 but keep rest
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { routeContentType, type, heroImage, title, ingress, publishDateTime, slug } = data

  if (isEvent(data)) {
    return (
      <EventCard
        data={
          {
            type: 'events',
            ...data,
          } as EventCardData
        }
        hasSectionTitle={false}
        className="h-fit"
      />
    )
  }

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
            pb-2
            xl:pt-10 
            xl:px-6
            xl:pb-6
            xl:font-semibold
            xl:text-xs
            xl:p-0
            `}
      >
        <FormattedMessage id="featured_content" defaultMessage="Featured" />
      </Typography>
      <Banner
        image={heroImage.image}
        variant={type === 'news' || type === 'localNews' ? 'secondary' : 'primary'}
        title={title}
        ingress={ingress}
        slug={slug}
      />
    </div>
  )
}

export default FeaturedContent
