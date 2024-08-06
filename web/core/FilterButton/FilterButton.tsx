import { Icon } from '@equinor/eds-core-react'
import { forwardRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
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
  selectedOptions: any[]
  onSelection?: (selectedItem: string) => void
  filterName: string
  listLabel?: string
}

const FilterButton = forwardRef<HTMLDivElement, FilterButtonProps>(function FilterButton(
  { optionsList = [], selectedOptions = [], onSelection, filterName, listLabel, ...rest },
  ref,
) {
  console.log('optionsList', optionsList)
  const [isOpen, setIsOpen] = useState(false)
  //const [selectedItems, setSelectedItems] = useState([])

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(0), flip(), shift()],
    whileElementsMounted: autoUpdate,
  })
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, {
    role: 'listbox',
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role])

  const buttonStateLabel =
    selectedOptions?.length > 0 ? `${filterName} filter, ${selectedOptions.length} selected` : `Filter by ${filterName}`

  const handleClose = () => {
    setIsOpen(false)
  }

  const onSubmit = (data: any, e: any) => {
    e.preventDefault()
    console.log('onSubmit', data)
    //setSelectedItems(data)
    onSelection && onSelection(data)
  }

  const methods = useForm()

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
          ${isOpen ? 'border border-x border-t rounded-b-none' : ''}
          pl-6
          pr-2
          py-2`}
      >
        <div aria-hidden className="flex gap-2">
          <div className="pr-6">
            <span className="text-base">{filterName}</span>
            {selectedOptions?.length > 0 && (
              <span className="bg-slate-80 text-white-100 px-2 py-1">{selectedOptions.length}</span>
            )}
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
            className="bg-white-100 border border-x-autumn-storm-60 
          border-b-autumn-storm-60 z-[1400]"
          >
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="overflow-y-auto">
                  {optionsList && <OptionList selectedOptions={selectedOptions} optionsList={optionsList} />}
                </div>
                <div className="w-full flex border-t border-autumn-storm-60 divide-x divide-autumn-storm-60">
                  <button className="px-6 py-4" aria-label="Close filter" onClick={handleClose}>
                    <FormattedMessage id="Close" defaultMessage="Close" />
                  </button>
                  <button
                    className="px-6 py-4 bg-norwegian-woods-100 text-white-100"
                    aria-label="Submit filter"
                    type="submit"
                  >
                    <FormattedMessage id="Submit" defaultMessage="Submit" />
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </FloatingFocusManager>
      )}
    </div>
  )
})

export default FilterButton
