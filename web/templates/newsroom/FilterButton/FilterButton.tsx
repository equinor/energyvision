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
import { Button } from '@core/Button'
import { FormattedMessage } from 'react-intl'

type FilterButtonProps = {
  optionsList: any[]
  onChange: (value: string) => void
  filterName: string
  listLabel?: string
}

const FilterButton = forwardRef<HTMLDivElement, FilterButtonProps>(function FilterButton(
  { optionsList = [], onChange, filterName, listLabel, ...rest },
  ref,
) {
  const [isOpen, setIsOpen] = useState(false)

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
    refinedItems?.length > 0 ? `${filterName} filter, ${refinedItems.length} selected` : `Filter by ${filterName}`

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
        className={`
          text-sm
          ${isOpen ? 'border border-x border-t border-b-0 border-autumn-storm-60 rounded-b-none' : ''}
          pl-6
          pr-2
          py-2`}
      >
        <div aria-hidden className="flex gap-2 items-center">
          <div className="flex gap-2 items-center">
            <span className="">{filterName}</span>
            <span
              className={`${
                refinedItems?.length > 0 ? 'bg-norwegian-woods-100' : 'bg-transparent'
              } bg-norwegian-woods-100 rounded-sm text-white-100 px-2 py-1`}
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
            className="text-sm bg-white-100 border border-x-autumn-storm-60 
          border-y-autumn-storm-60 rounded-b-[0.42rem] z-[1400]"
          >
            <div className="overflow-y-auto min-w-[250px] max-h-[350px] transparent-v-scrollbar">
              {optionsList && <OptionList onChange={onChange} optionsList={optionsList} />}
            </div>
            <div className="w-full flex rounded-b-md">
              <Button
                variant="outlined"
                className="w-full px-6 py-4 border-l-0 border-b-0 rounded-none rounded-bl-md border-autumn-storm-60"
                aria-label="Close filter"
                onClick={handleClose}
              >
                <FormattedMessage id="Close" defaultMessage="Close" />
              </Button>
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </div>
  )
})

export default FilterButton
