import { Dispatch, forwardRef, HTMLAttributes, SetStateAction } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import envisTwMerge from '../../../twMerge'
import { useMediaQuery } from '../../../lib/hooks/useMediaQuery'
import { Accordion } from '@core/Accordion'
import RefinementListFilter from './RefinementListFilter'
import SelectedFilters from './SelectedFilters'

type NewsRoomFiltersProps = {
  onSearch: Dispatch<SetStateAction<boolean>>
} & HTMLAttributes<HTMLDivElement>

const NewsRoomFilters = forwardRef<HTMLDivElement, NewsRoomFiltersProps>(function NewsRoomFilters(
  { onSearch, className = '' },
  ref,
) {
  const intl = useIntl()
  const isMobile = useMediaQuery(`(max-width: 768px)`)
  console.log('newsroom filters')
  return (
    <div ref={ref} className={envisTwMerge(`flex flex-col gap-4`, className)}>
      <a
        href="#newsroom_news"
        className="sr-only
        focus:outline-none
        focus-visible:not-sr-only
        text-sm
        underline
        hover:no-underline
        focus-visible:envis-outline
        px-4
        py-3
        rounded-sm
        "
      >
        <FormattedMessage id="newsroom_skip_to_news" defaultMessage="Skip to list of news" />
      </a>
      <SelectedFilters />
      {!isMobile ? (
        <>
          <h2 className="sr-only">
            <FormattedMessage id="newsroom_filters_label" defaultMessage="Filter by:" />
          </h2>
          <RefinementListFilter
            limit={50}
            attribute="topicTags"
            onSearch={onSearch}
            filterName={intl.formatMessage({
              id: 'newsroom_topic_filter',
              defaultMessage: 'Topic',
            })}
          />
          <RefinementListFilter
            attribute="countryTags"
            onSearch={onSearch}
            filterName={intl.formatMessage({
              id: 'newsroom_country_filter',
              defaultMessage: 'Country',
            })}
          />
          <RefinementListFilter
            sortBy={['name:desc']}
            onSearch={onSearch}
            filterName={intl.formatMessage({
              id: 'newsroom_year_filter',
              defaultMessage: 'Year',
            })}
            attribute="year"
            limit={50}
          />
        </>
      ) : (
        <Accordion type="single" defaultValue={'filter-topic'} collapsible>
          <Accordion.Item value="filter-topic">
            <Accordion.Header>
              {intl.formatMessage({
                id: 'newsroom_topic_filter',
                defaultMessage: 'Topic',
              })}
            </Accordion.Header>
            <Accordion.Content className="py-4" forceMount={true}>
              <RefinementListFilter variant="accordion" limit={50} attribute="topicTags" onSearch={onSearch} />
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="filter-country">
            <Accordion.Header>
              {intl.formatMessage({
                id: 'newsroom_country_filter',
                defaultMessage: 'Country',
              })}
            </Accordion.Header>
            <Accordion.Content className="py-4" forceMount={true}>
              <RefinementListFilter variant="accordion" attribute="countryTags" onSearch={onSearch} />
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="filter-year">
            <Accordion.Header>
              {intl.formatMessage({
                id: 'newsroom_year_filter',
                defaultMessage: 'Year',
              })}
            </Accordion.Header>
            <Accordion.Content className="py-4" forceMount={true}>
              <RefinementListFilter
                variant="accordion"
                sortBy={['name:desc']}
                attribute="year"
                limit={50}
                onSearch={onSearch}
              />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  )
})

export default NewsRoomFilters
