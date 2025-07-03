'use client'
import type { CardData } from '../../types/index'
import { FormattedDate } from '@/core/FormattedDateTime'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import Card from '@/sections/cards/Card'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { Typography } from '@/core/Typography'
import { useTranslations } from 'next-intl'

type LatestNewsProp = {
  data: CardData[]
}

const LatestNews = ({ data }: LatestNewsProp) => {
  const isMobile = useMediaQuery(`(max-width: 800px)`)
  const t = useTranslations()

  return (
    <section
      className=" 
      max-w-viewport
      px-layout-sm
      3xl:px-layout-md
      my-3xl
      mx-auto
      flex
      flex-col
      items-center
    "
    >
      <Typography variant="xl" as="h2" className="mb-10">
        {t('latest_news')}
      </Typography>
      <ul className="max-lg:w-full grid grid-cols-1 auto-rows-fr gap-x-6 gap-y-3 md:grid-flow-col md:auto-cols-fr">
        {data.map((newsItem: CardData) => {
          return (
            <li key={newsItem.id} className="">
              <Card href={newsItem?.slug} image={newsItem?.heroImage?.image} variant={isMobile ? 'compact' : 'primary'}>
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
                    <Blocks value={newsItem?.ingress} className={`break-word grow hidden lg:block`} clampLines={5} />
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
