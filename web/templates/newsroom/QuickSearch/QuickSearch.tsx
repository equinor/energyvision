import { SearchBox } from '../../../core/AlgoliaSearchBox/SearchBox'
import { Dispatch, forwardRef, SetStateAction } from 'react'
import { SearchBoxProps } from 'react-instantsearch'
import { useIntl } from 'react-intl'

export type QuickSearchProps = {
  className?: string
  onSearch: Dispatch<SetStateAction<boolean>>
  onClear?: () => void
} & SearchBoxProps

const QuickSearch = forwardRef<HTMLDivElement, QuickSearchProps>(function QuickSearch({ onSearch, onClear }, ref) {
  const intl = useIntl()

  return (
    <div ref={ref} className="w-full lg:w-fit">
      <SearchBox
        label={intl.formatMessage({
          id: 'search_quick_search_label',
          defaultMessage: 'Search among Equinor corporate-level news releases',
        })}
        setIsQuickSearch={onSearch}
        placeholder={intl.formatMessage({ id: 'search_quick_search', defaultMessage: 'Quick search' })}
        onClear={onClear}
      />
    </div>
  )
})

export default QuickSearch
