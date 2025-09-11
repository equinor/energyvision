'use client'
import type { CardData } from '../../types/index'
import { FormattedDate } from '@/core/FormattedDateTime'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import Card from '@/sections/cards/Card'
import Blocks from '../../portableText/Blocks'
import { Typography } from '@/core/Typography'
import { useTranslations } from 'next-intl'

type LatestNewsProp = {
  data: CardData[]
}

const LatestNews = ({ data }: LatestNewsProp) => {
  const isMobile = useMediaQuery(`(max-width: 800px)`)
  const t = useTranslations()

  return (
    <section className="mx-auto flex flex-col items-start px-layout-sm py-20 3xl:px-layout-md">
      <Typography variant="xl" as="h2" className="mb-10">
        {t('latest_news')}
      </Typography>
      <ul className="grid auto-rows-fr grid-cols-1 gap-x-6 gap-y-3 max-lg:w-full md:auto-cols-fr md:grid-flow-col">
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
                    <Blocks value={newsItem?.ingress} className={`break-word hidden grow lg:block`} clampLines={5} />
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
