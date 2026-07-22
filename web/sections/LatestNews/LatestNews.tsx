'use client'
import { useLocale, useTranslations } from 'next-intl'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import { Promotion } from '@/core/Promotion/Promotion'
import { Typography } from '@/core/Typography'
import { getLocalizedHref } from '@/lib/helpers/getLocalizedHref'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import type { CardData } from '../../types/index'

type LatestNewsProp = {
  data: CardData[]
}

const LatestNews = ({ data }: LatestNewsProp) => {
  const t = useTranslations()
  const iso = useLocale()
  const isMobile = useMediaQuery(`(max-width: 768px)`)

  return (
    <section className='flex w-full flex-col items-start py-20'>
      <div className='px-layout-sm lg:px-layout-lg'>
        <Typography variant='h2' className='mb-10'>
          {t('latest_news')}
        </Typography>
      </div>
      {/*grid auto-rows-fr grid-cols-1 gap-x-6 gap-y-3 max-lg:w-full md:auto-cols-fr md:grid-flow-col*/}
      <ul className='flex w-full flex-col gap-6 3xl:px-layout-md px-layout-sm lg:grid lg:grid-cols-3'>
        {data.map((newsItem: CardData) => {
          const href = getLocalizedHref(newsItem?.slug, iso)
          return (
            <li key={newsItem.id}>
              <Promotion
                variant='default'
                type={isMobile ? 'compact' : 'extended'}
                //extented type will overwrite row to col but that is ok for larger screens
                layoutDirection={`row`}
                //@ts-ignore:todo
                title={newsItem?.title}
                ingress={newsItem?.ingress}
                {...(newsItem?.publishDateTime && {
                  eyebrow: (
                    <FormattedDateTime
                      datetime={newsItem?.publishDateTime}
                      uppercase
                      className='pb-2 font-medium text-xs'
                    />
                  ),
                })}
                image={newsItem?.heroImage?.image}
                href={href}
                hasSectionTitle={true}
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default LatestNews
