import { useTranslations } from 'next-intl'
import { SearchBox } from '../../../core/AlgoliaSearchBox/SearchBox'
import { forwardRef } from 'react'
import { SearchBoxProps } from 'react-instantsearch'

export type QuickSearchProps = {
  className?: string
} & SearchBoxProps

const QuickSearch = forwardRef<HTMLDivElement, QuickSearchProps>(function QuickSearch(_props, ref) {
  const intl = useTranslations()

  return (
    <div ref={ref} className="w-full lg:w-fit">
      <SearchBox label={intl('search_quick_search_label')} placeholder={intl('search_quick_search')} />
    </div>
  )
})

export default QuickSearch
