'use client'
import { forwardRef, HTMLAttributes } from 'react'
import { useMediaQuery } from '../../../lib/hooks/useMediaQuery'
import { Accordion } from '@/core/Accordion'
import RefinementListFilter from './RefinementListFilter'
import SelectedFilters from './SelectedFilters'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'

type NewsRoomFiltersProps = HTMLAttributes<HTMLDivElement>

const NewsRoomFilters = forwardRef<HTMLDivElement, NewsRoomFiltersProps>(function NewsRoomFilters(
  { className = '' },
  ref,
) {
  const intl = useTranslations()
  const isMobile = useMediaQuery(`(max-width: 768px)`)
  return (
    <div ref={ref} className={twMerge(`flex flex-col gap-4`, className)}>
      <a
        href="#newsroom_news"
        className="focus-visible:envis-outline sr-only rounded-xs px-4 py-3 text-sm underline hover:no-underline focus:outline-hidden focus-visible:not-sr-only"
      >
        {intl('newsroom_skip_to_news')}
      </a>
      <SelectedFilters />
      {!isMobile ? (
        <>
          <h2 className="sr-only">{intl('newsroom_filters_label')}</h2>
          <RefinementListFilter limit={50} attribute="topicTags" filterName={intl('newsroom_topic_filter')} />
          <RefinementListFilter attribute="countryTags" filterName={intl('newsroom_country_filter')} />{' '}
          <RefinementListFilter
            sortBy={['name:desc']}
            filterName={intl('newsroom_year_filter')}
            attribute="year"
            limit={50}
          />
        </>
      ) : (
        <Accordion type="single" defaultValue={'filter-topic'} collapsible>
          <Accordion.Item value="filter-topic">
            <Accordion.Header>{intl('newsroom_topic_filter')}</Accordion.Header>
            <Accordion.Content className="py-4">
              <RefinementListFilter variant="accordion" limit={50} attribute="topicTags" />
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="filter-country">
            <Accordion.Header>{intl('newsroom_country_filter')}</Accordion.Header>
            <Accordion.Content className="py-4">
              <RefinementListFilter variant="accordion" attribute="countryTags" />
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="filter-year">
            <Accordion.Header>{intl('newsroom_year_filter')}</Accordion.Header>
            <Accordion.Content className="py-4">
              <RefinementListFilter variant="accordion" sortBy={['name:desc']} attribute="year" limit={50} />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  )
})

export default NewsRoomFilters
