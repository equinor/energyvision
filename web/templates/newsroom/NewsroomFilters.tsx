import { Typography } from '@core/Typography'
//import { Icon } from '@equinor/eds-core-react'
import { forwardRef, HTMLAttributes } from 'react'
//import { filter_list } from '@equinor/eds-icons'
import FilterButton from '@templates/newsroom/FilterButton/FilterButton'
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch'
import { FormattedMessage, useIntl } from 'react-intl'

type NewsRoomFiltersProps = HTMLAttributes<HTMLDivElement>

export type RefinementListProps = {
  filterName: string
} & React.ComponentProps<'div'> &
  UseRefinementListProps

const RefinementList = ({ filterName, ...rest }: RefinementListProps) => {
  const { items, refine } = useRefinementList(rest)
  return (
    <>
      {items.length > 0 ? (
        <FilterButton optionsList={items} filterName={filterName} onChange={refine} />
      ) : (
        <FormattedMessage id="newsroom_no_relevant_filters" defaultMessage="No relevant content for this filter" />
      )}
    </>
  )
}

const NewsRoomFilters = forwardRef<HTMLDivElement, NewsRoomFiltersProps>(function NewsRoomFilters({ ...props }, ref) {
  const intl = useIntl()

  return (
    <section ref={ref} className="w-full flex justify-end items-center mb-4 border-b border-autumn-storm-60">
      <div className="flex gap-2 items-center">
        {/*         <Icon data={filter_list} className="" /> */}
        <Typography as="h3" variant="sm" className="pr-6">
          Filter by:
        </Typography>
      </div>
      <RefinementList
        attribute="countryTags"
        filterName={intl.formatMessage({
          id: 'newsroom_country_filter',
          defaultMessage: 'Country',
        })}
      />
      <RefinementList
        sortBy={['name:desc']}
        filterName={intl.formatMessage({
          id: 'newsroom_year_filter',
          defaultMessage: 'Year',
        })}
        attribute="year"
        limit={50}
      />
    </section>
  )
})

export default NewsRoomFilters
