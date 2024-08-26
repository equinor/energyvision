import { Typography } from '@core/Typography'
import { Icon } from '@equinor/eds-core-react'
import { close } from '@equinor/eds-icons'
import { forwardRef, useId } from 'react'
import { SearchBox, SearchBoxProps, UseSearchBoxProps } from 'react-instantsearch'
import { FormattedMessage, useIntl } from 'react-intl'

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
  const headingId = useId()

  return (
    <div className="w-full lg:w-fit">
      <Typography id={headingId} as="h2" variant="h6" className="max-w-text py-4">
        <FormattedMessage
          id="search_quick_search_label"
          defaultMessage="Search among Equinor corporate-level news releases"
        />
      </Typography>
      <SearchBox
        aria-labelledby={headingId}
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
          input: `flex-grow 
          border
          border-slate-blue-95
          rounded-s-sm
          text-slate-80
          px-6
          py-3
          focus:outline-none
          focus-visible:envis-outline
          dark:focus-visible:envis-outline-invert`,
          submit: `
          h-inherit
          rounded-e-sm
          border
          border-slate-blue-95
          border-l-0
          px-4
          py-3
          bg-norwegian-woods-70
          text-slate-80
          hover:bg-norwegian-woods-60
          focus:outline-none
          focus-visible:envis-outline
          dark:focus-visible:envis-outline-invert`,
          submitIcon: `fill-slate-blue-95 size-5`,
          reset: ``,
          resetIcon: ``,
        }}
      />
    </div>
  )
})

export default QuickSearch
