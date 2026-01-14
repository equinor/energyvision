'use client'
import { useTranslations } from 'next-intl'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import { Promotion } from '@/core/Promotion/Promotion'
import { Typography } from '@/core/Typography'
import type { CardData } from '../../types/index'

type LatestNewsProp = {
  data: CardData[]
}

const LatestNews = ({ data }: LatestNewsProp) => {
  const t = useTranslations()

  return (
    <section className='flex w-full flex-col items-start 3xl:px-layout-md px-layout-sm py-20'>
      <Typography variant='h2' className='mb-10'>
        {t('latest_news')}
      </Typography>
      {/*grid auto-rows-fr grid-cols-1 gap-x-6 gap-y-3 max-lg:w-full md:auto-cols-fr md:grid-flow-col*/}
      <ul className='flex w-full flex-col gap-6 lg:flex-row'>
        {data.map((newsItem: CardData) => {
          return (
            <li key={newsItem.id}>
              <Promotion
                variant='default'
                type='extended'
                //@ts-ignore:todo
                title={newsItem?.title}
                ingress={newsItem?.ingress}
                {...(newsItem?.publishDateTime && {
                  eyebrow: (
                    <FormattedDateTime
                      variant='date'
                      datetime={newsItem?.publishDateTime}
                      uppercase
                      className='pb-2 text-sm'
                    />
                  ),
                })}
                image={newsItem?.heroImage?.image}
                href={newsItem?.slug}
                hasSectionTitle={true}
              />
            </li>
            /*             <li key={newsItem.id} className=''>
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
                    <Typography
                      group='paragraph'
                      variant='simple'
                      className='line-clamp-5 max-lg:hidden'
                    >
                      {plainIngress}
                    </Typography>
                  )}
                </Card.Content>
              </Card>           </li>*/
          )
        })}
      </ul>
    </section>
  )
}

export default LatestNews
