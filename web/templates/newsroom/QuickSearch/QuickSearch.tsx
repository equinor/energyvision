import { SearchBox } from '../../../pageComponents/search/SearchBox'
import { forwardRef } from 'react'
import { SearchBoxProps } from 'react-instantsearch'
import { useIntl } from 'react-intl'

export type QuickSearchProps = {
  className?: string
} & SearchBoxProps

const QuickSearch = forwardRef<HTMLDivElement, QuickSearchProps>(function QuickSearch(_props, ref) {
  const intl = useIntl()

  return (
    <div ref={ref} className="w-full lg:w-fit">
      <SearchBox
        label={intl.formatMessage({
          id: 'search_quick_search_label',
          defaultMessage: 'Search among Equinor corporate-level news releases',
        })}
        placeholder={intl.formatMessage({ id: 'search_quick_search', defaultMessage: 'Quick search' })}
        className="
        bg-white-100 
        border 
        border-slate-blue-95 
        px-6 
        py-3 
        focus-visible:envis-outline 
        dark:focus-visible:envis-outline-invert"
        submitClassName="bg-norwegian-woods-70
          text-slate-blue-95
          hover:text-slate-blue-95
          hover:bg-norwegian-woods-60
          focus:outline-none
          focus-visible:envis-outline
          dark:focus-visible:envis-outline-invert
          border
          border-slate-blue-95
          border-l-0"
      />
    </div>
  )
})

export default QuickSearch
