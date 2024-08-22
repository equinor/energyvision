import { Icon } from '@equinor/eds-core-react'
import { close } from '@equinor/eds-icons'
import { forwardRef } from 'react'
import { SearchBox, SearchBoxProps, UseSearchBoxProps } from 'react-instantsearch'
import { useIntl } from 'react-intl'

export type QuickSearchProps = {
  className?: string
} & SearchBoxProps

const QuickSearch = forwardRef<HTMLDivElement, QuickSearchProps>(function QuickSearch(_props, ref) {
  const intl = useIntl()
  const getResetIcon = () => <Icon data={close} />
  const queryHook: UseSearchBoxProps['queryHook'] = (query, search) => {
    if (query !== '') {
      search(query)
    }
  }

  return (
    <SearchBox
      ref={ref}
      queryHook={queryHook}
      searchAsYouType={false}
      placeholder={intl.formatMessage({ id: 'search_quick_search', defaultMessage: 'Quick search' })}
      resetIconComponent={() => getResetIcon()}
      translations={{
        submitButtonTitle: intl.formatMessage({ id: 'search', defaultMessage: 'Search' }),
        resetButtonTitle: intl.formatMessage({ id: 'reset', defaultMessage: 'Reset' }),
      }}
      classNames={{
        root: 'w-full',
        form: 'w-full relative flex',
        input:
          'flex-grow border border-autumn-storm-60 rounded-s-md focus:outline-none focus-visible:envis-outline text-slate-80 px-6 py-3',
        submit: `h-inherit rounded-e-md px-4 py-3 bg-norwegian-woods-100 text-white-100 hover:bg-moss-green-100 focus:outline-none focus-visible:envis-outline`,
        submitIcon: `fill-white-100 size-5`,
        reset: ``,
        resetIcon: ``,
      }}
    />
  )
})

export default QuickSearch
