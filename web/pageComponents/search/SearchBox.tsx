import { useRef, useState, ChangeEvent, ComponentProps, useId } from 'react'
import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch'
import { close, search } from '@equinor/eds-icons'
import { useIntl } from 'react-intl'
import { Icon } from '@equinor/eds-core-react'
import envisTwMerge from '../../twMerge'

export type SearchBoxProps = {
  className?: string
  resetClassName?: string
  submitClassName?: string
  labelClassName?: string
  label?: string
  placeholder?: string
} & ComponentProps<'div'> &
  UseSearchBoxProps

const queryHook: UseSearchBoxProps['queryHook'] = (query, search) => {
  if (query !== '') {
    search(query)
  }
}

export function SearchBox({
  className = '',
  resetClassName = '',
  submitClassName = '',
  labelClassName = '',
  label,
  placeholder,
  ...rest
}: SearchBoxProps) {
  const intl = useIntl()
  const { query, refine, clear } = useSearchBox({ ...rest, queryHook })
  const [value, setValue] = useState(query)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchId = useId()

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
    <form
      action=""
      role="search"
      noValidate
      onSubmit={onSubmit}
      onReset={handleReset}
      className={`${label ? 'grid grid-cols-1 grid-rows-[auto_auto]' : 'flex'}`}
    >
      {label && (
        <label
          htmlFor={searchId}
          className={envisTwMerge(
            `row-start-1 row-end-1
            text-slate-80 dark:text-white-100 text-base leading-inherit font-normal max-w-text py-4`,
            labelClassName,
          )}
        >
          {label}
        </label>
      )}
      <input
        {...(!label && {
          'aria-label': intl.formatMessage({ id: 'search', defaultMessage: 'Search' }),
        })}
        ref={inputRef}
        id={searchId}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder={placeholder ?? intl.formatMessage({ id: 'search', defaultMessage: 'Search' })}
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
          ${label ? 'row-start-2 row-end-2' : ''}
          `,
          className,
        )}
      />
      <button
        type="reset"
        hidden={value.length === 0}
        aria-label={intl.formatMessage({ id: 'reset', defaultMessage: 'Reset' })}
        className={envisTwMerge(
          `group/reset px-4 border-y
          border-r 
          border-white-100 focus:outline-none focus-visible:envis-outline-invert
          text-white-100 group-hover/reset:text-white-100/40
          ${label ? 'row-start-2 row-end-2' : ''}`,
          resetClassName,
        )}
      >
        <Icon size={24} data={close} />
      </button>
      <button
        type="submit"
        aria-label={intl.formatMessage({ id: 'search_submit', defaultMessage: 'Submit search' })}
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
          focus-visible:envis-outline-invert
          ${label ? 'row-start-2 row-end-2' : ''}`,
          submitClassName,
        )}
      >
        <Icon size={24} data={search} />
      </button>
    </form>
  )
}
