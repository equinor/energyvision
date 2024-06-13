import type { EventCardData, FeaturedContentData } from '../../../types/types'
import PromotionCard from '@sections/cards/PromotionCard/PromotionCard'
import { EventCard } from '@sections/cards/EventCard'

type Props = {
  data: FeaturedContentData
}

const FeaturedContent = ({ data }: Props) => {
  if (!data.type) return null

  const isEvent = (data: FeaturedContentData): boolean => data?.routeContentType === 'event'
  //To destructure and get rid of 2 but keep rest
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { routeContentType, type, ...restData } = data
  const containerClassName = 'hidden xl:block pl-6 border-l border-autumn-storm-50 w-[16vw]'

  if (isEvent(data)) {
    return (
      <div className={containerClassName}>
        <EventCard
          data={
            {
              type: 'events',
              ...restData,
            } as EventCardData
          }
          hasSectionTitle={false}
          className="h-fit"
        />
      </div>
    )
  }

  return (
    <div className={containerClassName}>
      <PromotionCard data={data} hasSectionTitle={false} className="h-fit" />
    </div>
  )
}

export default FeaturedContent
