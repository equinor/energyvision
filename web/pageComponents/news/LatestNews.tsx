'use client'
import { useTranslations } from 'next-intl'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import { Typography } from '@/core/Typography'
import Card from '@/sections/cards/Card'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import Blocks from '../../portableText/Blocks'
import type { CardData } from '../../types/index'

type LatestNewsProp = {
  data: CardData[]
}

const LatestNews = ({ data }: LatestNewsProp) => {
  const isMobile = useMediaQuery(`(max-width: 800px)`)
  const t = useTranslations()

  return (
    <section className='flex flex-col items-start 3xl:px-layout-md px-layout-sm py-20'>
      <Typography variant='h2' className='mb-10'>
        {t('latest_news')}
      </Typography>
      <ul className='grid auto-rows-fr grid-cols-1 gap-x-6 gap-y-3 max-lg:w-full md:auto-cols-fr md:grid-flow-col'>
        {data.map((newsItem: CardData) => {
          return (
            <li key={newsItem.id} className=''>
              <Card
                href={newsItem?.slug}
                image={newsItem?.heroImage?.image}
                variant={isMobile ? 'compact' : 'primary'}
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
                      eyebrow: (
                        <FormattedDateTime
                          variant='date'
                          datetime={newsItem?.publishDateTime}
                          uppercase
                        />
                      ),
                    })}
                    variant={isMobile ? 'compact' : 'primary'}
                  />
                  {newsItem?.ingress && (
                    <Blocks
                      value={newsItem?.ingress}
                      className={`break-word hidden lg:block`}
                      clampLines={5}
                    />
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
