import type { CardData } from '../../types/index'
import { FormattedMessage } from 'react-intl'
import { FormattedDate } from '@components/FormattedDateTime'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import Card from '@sections/cards/Card'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { Typography } from '@core/Typography'

type LatestNewsProp = {
  data: CardData[]
}

const LatestNews = ({ data }: LatestNewsProp) => {
  const isMobile = useMediaQuery(`(max-width: 1023px)`)

  return (
    <section
      className="px-4 lg:px-layout-sm
    max-w-viewport
    my-3xl
    mx-auto
    flex
    flex-col
    items-center
    "
    >
      <Typography variant="xl" as="h2" className="mb-10">
        <FormattedMessage id="latest_news" defaultMessage="Latest News" />
      </Typography>
      <ul className="max-lg:w-full grid grid-cols-1 auto-rows-fr gap-x-6 gap-y-3 lg:grid-cols-3">
        {data.map((newsItem: CardData) => {
          return (
            <li key={newsItem.id} className="">
              <Card
                href={newsItem?.slug}
                image={newsItem?.heroImage?.image}
                variant={isMobile ? 'compact' : 'primary'}
                className="h-full"
              >
                <Card.Content variant={isMobile ? 'compact' : 'primary'}>
                  <Card.Header
                    {...(typeof newsItem?.title === 'string'
                      ? {
                          title: newsItem?.title,
                        }
                      : {
                          titleBlock: newsItem?.title,
                        })}
                    {...(newsItem?.publishDateTime && {
                      eyebrow: <FormattedDate datetime={newsItem?.publishDateTime} uppercase />,
                    })}
                    variant={isMobile ? 'compact' : 'primary'}
                  />
                  {newsItem?.ingress && (
                    <Blocks value={newsItem?.ingress} className={`break-word grow hidden xl:block`} clampLines={5} />
                  )}
                </Card.Content>
              </Card>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default LatestNews
