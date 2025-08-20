'use client'
import { Icon } from '@equinor/eds-core-react'
import { forwardRef, useState } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
} from '@floating-ui/react'
import OptionList from './OptionList'
import { chevron_down } from '@equinor/eds-icons'
import { Button } from '@/core/Button'
import { useTranslations } from 'next-intl'

type FilterButtonProps = {
  optionsList: any[]
  onChange: (value: string) => void
  filterName: string
}

const FilterButton = forwardRef<HTMLDivElement, FilterButtonProps>(function FilterButton(
  { optionsList = [], onChange, filterName },
  ref,
) {
  const [isOpen, setIsOpen] = useState(false)
  const intl = useTranslations()

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-start',
    middleware: [offset(), flip(), shift()],
    whileElementsMounted: autoUpdate,
  })
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, {
    role: 'listbox',
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role])

  const refinedItems = optionsList.filter((item) => item.isRefined)
  const buttonStateLabel =
    refinedItems?.length > 0
      ? `${filterName}, ${refinedItems.length} ${intl('newsroom_filters_selected')}`
      : `${filterName}`

  const handleChange = (itemValue: string) => {
    onChange && onChange(itemValue)
    setIsOpen(false)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div ref={ref} className="">
      <Button
        type="button"
        variant="ghost"
        ref={refs.setReference}
        {...getReferenceProps()}
        aria-label={buttonStateLabel}
        onClick={() => setIsOpen(!isOpen)}
        className={`border border-transparent text-sm ${isOpen ? 'rounded-b-none border-x border-t border-b-0 border-autumn-storm-60' : ''} py-2 pr-2 pl-6`}
      >
        <div aria-hidden className="flex items-center gap-1.5">
          <div className="flex items-center gap-2">
            <span className="">{filterName}</span>
            <span
              className={`${
                refinedItems?.length > 0 ? 'bg-moss-green-60' : 'bg-transparent'
              } rounded-xs px-2 py-1 text-slate-80`}
            >
              <span className={`${refinedItems?.length > 0 ? 'block' : 'hidden'}`}>{refinedItems.length}</span>
            </span>
          </div>
          <Icon data={chevron_down} />
        </div>
      </Button>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-[1400] rounded-b-[0.42rem] border border-x-autumn-storm-60 border-y-autumn-storm-60 bg-white-100 text-sm"
          >
            <div className="envis-scrollbar max-h-[350px] min-w-[250px] overflow-y-auto">
              {optionsList && <OptionList onChange={handleChange} optionsList={optionsList} />}
            </div>
            <div className="flex w-full rounded-b-md">
              <Button
                variant="outlined"
                className="w-full rounded-none rounded-bl-md border-x-0 border-b-0 border-autumn-storm-60 px-6 py-4"
                aria-label="Close filter"
                onClick={handleClose}
              >
                ${intl('close')}
              </Button>
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </div>
  )
})

export default FilterButton
