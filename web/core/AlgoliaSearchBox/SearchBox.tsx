import { useRef, useState, ChangeEvent, ComponentProps, useId, SetStateAction, Dispatch } from 'react'
import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch'
import { close, search } from '@equinor/eds-icons'
import { useIntl } from 'react-intl'
import { Icon } from '@equinor/eds-core-react'
import envisTwMerge from '../../twMerge'

type Variants = 'default' | 'inverted'
export type SearchBoxProps = {
  variant?: Variants
  className?: string
  resetClassName?: string
  submitClassName?: string
  labelClassName?: string
  label?: string
  placeholder?: string
  //For newsroom
  setIsQuickSearch?: Dispatch<SetStateAction<boolean>>
} & ComponentProps<'div'> &
  UseSearchBoxProps

const queryHook: UseSearchBoxProps['queryHook'] = (query, search) => {
  if (query !== '') {
    search(query)
  }
}

/** Requires Algolia Instant Search Provider higher up */
export function SearchBox({
  variant = 'default',
  className = '',
  resetClassName = '',
  submitClassName = '',
  labelClassName = '',
  label,
  placeholder,
  setIsQuickSearch,
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
    setIsQuickSearch && setIsQuickSearch(true)
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value)
  }

  const inputVariantClassName = {
    default: 'text-slate-80 focus-visible:envis-outline dark:focus-visible:envis-outline-invert',
    inverted: 'text-white-100 border-y border-l border-white-100 bg-slate-blue-95 focus-visible:envis-outline-invert',
  }
  const resetVariantClassName = {
    default: 'text-slate-80 hover:bg-grey-20 focus-visible:envis-outline',
    inverted: 'text-white-100 hover:bg-white-100 hover:text-slate-blue-95 focus-visible:envis-outline-invert',
  }
  const submitVariantClassName = {
    default:
      'bg-norwegian-woods-70 text-slate-80 hover:bg-norwegian-woods-60 focus-visible:envis-outline dark:focus-visible:envis-outline-invert',
    inverted:
      'bg-white-100 text-slate-blue-95 hover:bg-white-100/40 hover:text-white-100 focus-visible:envis-outline-invert',
  }

  return (
    <form
      action=""
      role="search"
      noValidate
      onSubmit={onSubmit}
      onReset={handleReset}
      className={`grid grid-cols-[1fr_min-content] ${
        label ? 'grid grid-cols-[1fr_min-content] grid-rows-[auto_auto]' : 'grid-rows-1'
      }`}
    >
      {label && (
        <label
          htmlFor={searchId}
          className={envisTwMerge(
            `col-span-2 row-start-1 row-end-1
            text-slate-80 dark:text-white-100 text-base leading-inherit font-normal max-w-text py-4`,
            labelClassName,
          )}
        >
          {label}
        </label>
      )}
      <div className={`${label ? 'row-start-2 row-end-2' : ''} relative flex items-center`}>
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
            rounded-s-xs
            rounded-e-none
            focus:outline-none
            text-white-100
            pl-6
            pr-12
            py-4
            ${inputVariantClassName[variant]}
            `,
            className,
          )}
        />
        <button
          type="reset"
          aria-label={intl.formatMessage({ id: 'reset', defaultMessage: 'Reset' })}
          className={envisTwMerge(
            `${value.length === 0 ? 'hidden' : 'flex'} 
            absolute 
            right-2 
            rounded-full 
            size-8 
            focus:outline-none 
            justify-center
            items-center
            ${resetVariantClassName[variant]}`,
            resetClassName,
          )}
        >
          <Icon size={24} data={close} />
        </button>
      </div>
      <button
        type="submit"
        aria-label={intl.formatMessage({ id: 'search_submit', defaultMessage: 'Submit search' })}
        className={envisTwMerge(
          `h-inherit 
          rounded-e-xs
          px-4
          py-3
          focus:outline-none
          ${label ? 'row-start-2 row-end-2' : ''}
          ${submitVariantClassName[variant]}
          `,
          submitClassName,
        )}
      >
        <Icon size={24} data={search} />
      </button>
    </form>
  )
}
