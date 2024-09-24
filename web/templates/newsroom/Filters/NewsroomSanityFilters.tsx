import { forwardRef, HTMLAttributes } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import envisTwMerge from '../../../twMerge'
import { useMediaQuery } from '../../../lib/hooks/useMediaQuery'
import { Accordion } from '@core/Accordion'
import SelectedSanityFilters from './SelectedSanityFilters'
import SanityFilter from './SanityFilter'
import { SearchTags, tagVariants } from '../Newsroom'
import { SanityNewsTag } from '../../../types/types'

export type TagsProps = {
  topic: SanityNewsTag[]
  country: SanityNewsTag[]
  year: SanityNewsTag[]
}
type NewsRoomSanityFiltersProps = {
  tags: TagsProps | undefined
  search?: SearchTags
  onSearch: (filterName: tagVariants, selectedItems: string[]) => void
  onRemoveFilter: (filterName: tagVariants, selectedItem: string) => void
  onClear: () => void
} & HTMLAttributes<HTMLDivElement>

const NewsRoomSanityFilters = forwardRef<HTMLDivElement, NewsRoomSanityFiltersProps>(function NewsRoomSanityFilters(
  { className = '', tags, search, onSearch, onRemoveFilter, onClear },
  ref,
) {
  const intl = useIntl()
  const isMobile = useMediaQuery(`(max-width: 768px)`)

  /*   const handleSearchChange = (filterName: tagVariants, selectedItems: string[]) => {
    onSearch(updatedSearch)
  } */

  /*   const handleRemoveFilterItem = (filterName: tagVariants, key: string) => {
    console.log('handleRemoveFilterItem')
    const updatedSearch = {
      ...search,
      [filterName]: search[filterName].filter((item: string) => item !== key),
    }
    setSearch(updatedSearch)
    onSearch(updatedSearch)
  } */

  const topicFilter = (
    <SanityFilter
      filterLabel={intl.formatMessage({
        id: 'newsroom_topic_filter',
        defaultMessage: 'Topic',
      })}
      filterName="topic"
      variant={isMobile ? 'accordion' : 'list'}
      items={tags.topic}
      selected={search?.topic}
      onSearch={onSearch}
    />
  )
  const countryFilter = (
    <SanityFilter
      filterLabel={intl.formatMessage({
        id: 'newsroom_country_filter',
        defaultMessage: 'Country',
      })}
      filterName="country"
      items={tags.country}
      selected={search?.country}
      variant={isMobile ? 'accordion' : 'list'}
      onSearch={onSearch}
    />
  )
  const yearFilter = (
    <SanityFilter
      filterLabel={intl.formatMessage({
        id: 'newsroom_year_filter',
        defaultMessage: 'Year',
      })}
      filterName="year"
      items={tags.year}
      selected={search?.year}
      variant={isMobile ? 'accordion' : 'list'}
      onSearch={onSearch}
    />
  )

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
      <SelectedSanityFilters tags={tags} search={search} onClear={onClear} onRemove={onRemoveFilter} />
      {!isMobile ? (
        <>
          <h2 className="sr-only">
            <FormattedMessage id="newsroom_filters_label" defaultMessage="Filter by:" />
          </h2>
          {topicFilter}
          {countryFilter}
          {yearFilter}
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
              {topicFilter}
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
              {countryFilter}
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
              {yearFilter}
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  )
})

export default NewsRoomSanityFilters
