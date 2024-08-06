import { Typography } from '@core/Typography'
//import { Icon } from '@equinor/eds-core-react'
import { Tag } from '../../types'
import { forwardRef } from 'react'
//import { filter_list } from '@equinor/eds-icons'
import FilterButton from '@core/FilterButton/FilterButton'
import { useFilter } from './FilterContext'

type NewsRoomFiltersProps = {
  newsCountryTagList?: Tag[]
  newsYearList?: string[]
}

const NewsRoomFilters = forwardRef<HTMLDivElement, NewsRoomFiltersProps>(function NewsRoomFilters(
  { newsCountryTagList, ...rest },
  ref,
) {
  //console.log('newsCountryTagList', newsCountryTagList)
  const { selectedCountries, setSelectedCountries } = useFilter()

  return (
    <section ref={ref} className="w-full flex justify-end items-center mb-4">
      <div className="flex gap-2 items-center">
        {/*         <Icon data={filter_list} className="" /> */}
        <Typography as="h3" variant="sm" className="pr-6">
          Filter by:
        </Typography>
      </div>
      <FilterButton
        optionsList={newsCountryTagList}
        selectedOptions={selectedCountries}
        onSelection={setSelectedCountries}
        filterName="Country"
      />
    </section>
  )
})

export default NewsRoomFilters
