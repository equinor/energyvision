import { useRef, useState, ChangeEvent, ComponentProps } from 'react'
import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch'
import { close, search } from '@equinor/eds-icons'
import { useIntl } from 'react-intl'
import { Icon } from '@equinor/eds-core-react'
import envisTwMerge from '../../twMerge'

export type SearchBoxProps = {
  className?: string
  resetClassName?: string
  submitClassName?: string
} & ComponentProps<'div'> &
  UseSearchBoxProps

const queryHook: UseSearchBoxProps['queryHook'] = (query, search) => {
  if (query !== '') {
    search(query)
  }
}

export function SearchBox({ className = '', resetClassName = '', submitClassName = '', ...rest }: SearchBoxProps) {
  const intl = useIntl()
  const { query, refine, clear } = useSearchBox({ ...rest, queryHook })
  const [value, setValue] = useState(query)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleReset() {
    setValue('')
    clear()
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    event.stopPropagation()
    refine(value)
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value)
  }

  return (
    <form action="" role="search" noValidate onSubmit={onSubmit} onReset={handleReset} className="flex ">
      <input
        aria-label={intl.formatMessage({ id: 'search', defaultMessage: 'Search' })}
        ref={inputRef}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder={intl.formatMessage({ id: 'search', defaultMessage: 'Search' })}
        spellCheck={false}
        maxLength={512}
        type="search"
        value={value}
        onChange={onChange}
        className={envisTwMerge(
          `flex-grow 
          border-y
          border-l 
          border-white-100 
          bg-slate-blue-95
          rounded-s-xs
          focus:outline-none
          focus-visible:envis-outline-invert
          text-white-100
          pl-6 pr-12
          py-4
          no-webkit-search-cancel
          focus:no-webkit-search-cancel
          focus-visible:no-webkit-search-cancel
          hover:no-webkit-search-cancel
          `,
          className,
        )}
      />
      <button
        type="reset"
        hidden={value.length === 0}
        className={envisTwMerge(
          `group/reset px-4 border-y
          border-r 
          border-white-100 focus:outline-none focus-visible:envis-outline-invert
          text-white-100 group-hover/reset:text-white-100/40`,
          resetClassName,
        )}
      >
        <Icon size={24} data={close} />
      </button>
      <button
        type="submit"
        className={envisTwMerge(
          `h-inherit 
          rounded-e-xs
          px-4
          py-3
          bg-white-100
          text-slate-blue-95
          hover:bg-white-100/40
          hover:text-white-100
          focus:outline-none
          focus-visible:envis-outline-invert`,
          submitClassName,
        )}
      >
        <Icon size={24} data={search} />
      </button>
    </form>
  )
}
